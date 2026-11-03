import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "laverie_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "laverie-laundry-secure-session-key-2026-prod-secret";
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export interface AdminUser {
  email: string;
  name: string;
}

interface SessionPayload extends AdminUser {
  exp: number; // unix timestamp in seconds
}

/**
 * Hash a password using SHA-256
 */
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * Sign payload using HMAC SHA-256
 */
function signPayload(data: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("base64url");
}

/**
 * Create a signed session token
 */
export function createSessionToken(user: AdminUser): string {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + ONE_WEEK_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

/**
 * Verify a signed session token and return user if valid
 */
export function verifySessionToken(token: string): AdminUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const expectedSignature = signPayload(encodedPayload);

    // Constant time comparison to prevent timing attacks
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }

    const json = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload: SessionPayload = JSON.parse(json);

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      email: payload.email,
      name: payload.name || payload.email.split("@")[0],
    };
  } catch {
    return null;
  }
}

/**
 * Get current admin session from server components or actions
 */
export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Set session cookie
 */
export async function setSessionCookie(user: AdminUser) {
  const token = createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK_SECONDS,
  });
}

/**
 * Clear session cookie on logout
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

