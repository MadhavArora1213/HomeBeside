import type { ConfirmationResult } from "firebase/auth";

export type PendingOtp = {
  phone: string;
  confirmation: ConfirmationResult;
};

type Listener = () => void;

let pending: PendingOtp | null = null;
const listeners = new Set<Listener>();

function emit(): void {
  for (const listener of [...listeners]) listener();
}

export function subscribePendingOtp(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPendingOtp(): PendingOtp | null {
  return pending;
}

export function getServerPendingOtp(): PendingOtp | null {
  return null;
}

export function setPendingOtp(next: PendingOtp): void {
  pending = next;
  emit();
}

export function clearPendingOtp(): void {
  pending = null;
  emit();
}
