import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "sk_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "skabaya-admin-2026";
}

/** The opaque token stored in the cookie — a hash of the password, never the password itself. */
export function sessionToken(): string {
  return createHash("sha256")
    .update(`sk-abaya::${adminPassword()}`)
    .digest("hex");
}

export function checkPassword(input: string): boolean {
  return input === adminPassword();
}

/** Reads the admin cookie and validates it against the expected token. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === sessionToken();
}

/** Redirects to the login page if the request is not authenticated. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) redirect("/admin/login");
}
