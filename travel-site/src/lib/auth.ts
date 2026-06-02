import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "travel_admin";

function secret() {
  return process.env.AUTH_SECRET || "local-dev-secret";
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function adminToken() {
  return createHash("sha256")
    .update(`${adminPassword()}:${secret()}`)
    .digest("hex");
}

export async function setAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdmin() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return false;

  const expected = Buffer.from(adminToken());
  const received = Buffer.from(value);

  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
}

export function verifyAdminPassword(password: string) {
  return password === adminPassword();
}
