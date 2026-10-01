export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export type PublicUser = {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  profilePhotoUrl: string | null;
  preferredLanguage: string | null;
  timezone: string | null;
  currency: string | null;
  status: string | null;
};

export type SessionSnapshot = {
  accessToken: string;
  user: PublicUser;
  roles: string[];
  permissions: string[];
  onboardingComplete: boolean;
};

type SessionResponse = SessionSnapshot & { expiresIn: number; refreshExpiresIn: number };

type SessionListener = (session: SessionSnapshot | null) => void;

let snapshot: SessionSnapshot | null = null;
const listeners = new Set<SessionListener>();

export function getSession(): SessionSnapshot | null {
  return snapshot;
}

export function subscribeSession(listener: SessionListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function publish(next: SessionSnapshot | null): void {
  snapshot = next;
  for (const listener of [...listeners]) listener(next);
}

function toSnapshot(data: SessionResponse): SessionSnapshot {
  return {
    accessToken: data.accessToken,
    user: data.user,
    roles: data.roles,
    permissions: data.permissions,
    onboardingComplete: data.onboardingComplete,
  };
}

function deviceInfo(): { deviceId?: string; deviceName?: string; platform: "web" } {
  if (typeof window === "undefined") return { platform: "web" };
  let deviceId = window.localStorage.getItem("hb_device_id");
  if (!deviceId) {
    deviceId =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem("hb_device_id", deviceId);
  }
  return { deviceId, deviceName: (navigator.userAgent ?? "web").slice(0, 150), platform: "web" };
}

async function parseResponse<T>(res: Response, authed: boolean): Promise<T> {
  if (res.ok) {
    if (res.status === 204) return undefined as T;
    const text = await res.text();
    return (text ? (JSON.parse(text) as T) : (undefined as T));
  }
  let code = `HTTP_${res.status}`;
  let message = res.statusText || "Request failed";
  try {
    const body = (await res.json()) as { code?: unknown; message?: unknown };
    if (typeof body.code === "string") code = body.code;
    if (typeof body.message === "string") message = body.message;
    else if (Array.isArray(body.message)) message = body.message.join(", ");
  } catch {
    // non-JSON error body
  }
  if (res.status === 401 && authed) publish(null);
  throw new ApiError(res.status, code, message);
}

type RequestOptions = RequestInit & { skipAuthRefresh?: boolean };

async function send<T>(path: string, options: RequestOptions = {}, allowRefresh = true): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const authed = Boolean(snapshot?.accessToken);
  if (authed) headers.set("Authorization", `Bearer ${snapshot?.accessToken}`);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: "include" });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Could not reach the server. Check your connection.");
  }

  if (res.status === 401 && authed && allowRefresh && !options.skipAuthRefresh) {
    const renewed = await refreshSession();
    if (renewed) {
      headers.set("Authorization", `Bearer ${renewed.accessToken}`);
      try {
        res = await fetch(`${API_URL}${path}`, { ...options, headers, credentials: "include" });
      } catch {
        throw new ApiError(0, "NETWORK_ERROR", "Could not reach the server. Check your connection.");
      }
    }
  }

  return parseResponse<T>(res, authed);
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return send<T>(path, options);
}

export function apiPost<T>(path: string, body?: unknown): Promise<T> {
  return send<T>(path, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) });
}

export function apiPatch<T>(path: string, body: unknown): Promise<T> {
  return send<T>(path, { method: "PATCH", body: JSON.stringify(body) });
}

let refreshInFlight: Promise<SessionSnapshot | null> | null = null;

export function refreshSession(): Promise<SessionSnapshot | null> {
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    try {
      const data = await send<SessionResponse>(
        "/auth/session/refresh",
        { method: "POST", body: "{}", skipAuthRefresh: true },
        false,
      );
      if (!data?.accessToken) {
        publish(null);
        return null;
      }
      const next = toSnapshot(data);
      publish(next);
      return next;
    } catch {
      publish(null);
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();
  return refreshInFlight;
}

export async function startSession(idToken: string, audience: "customer" | "helper" = "customer"): Promise<SessionSnapshot> {
  const data = await send<SessionResponse>("/auth/session", {
    method: "POST",
    body: JSON.stringify({ idToken, audience, ...deviceInfo() }),
  });
  const next = toSnapshot(data);
  publish(next);
  return next;
}

export async function logout(): Promise<void> {
  try {
    await send<void>("/auth/session/revoke", { method: "POST", body: "{}", skipAuthRefresh: true }, false);
  } catch {
    // local session is cleared regardless
  }
  publish(null);
}

export function adoptSession(data: SessionResponse): SessionSnapshot {
  const next = toSnapshot(data);
  publish(next);
  return next;
}

export async function adminLogin(email: string, password: string): Promise<SessionSnapshot> {
  const data = await apiPost<SessionResponse>("/auth/admin/login", { email, password });
  return adoptSession(data);
}
