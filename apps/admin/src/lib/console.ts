export const CONSOLE_ROLES = ["ADMIN", "SUPERADMIN", "OPS"] as const;

export function hasConsoleRole(roles: string[]): boolean {
  return roles.some((role) => (CONSOLE_ROLES as readonly string[]).includes(role));
}
