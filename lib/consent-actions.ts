"use server";

import { cookies } from "next/headers";

const COOKIE = "pn_consent"; // "accepted" | "declined"
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export async function setConsent(value: "accepted" | "declined") {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: value === "accepted" ? MAX_AGE : MAX_AGE,
  });
}

export async function clearConsent() {
  const cookieStore = await cookies();
  cookieStore.delete("pn_consent");
}

export async function getConsent(): Promise<"accepted" | "declined" | null> {
  const cookieStore = await cookies();
  const consent = cookieStore.get(COOKIE);
  return consent?.value as "accepted" | "declined" | null;
}

export async function hasValidConsent(): Promise<boolean> {
  const consent = await getConsent();
  return consent === "accepted";
}