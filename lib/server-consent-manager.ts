// lib/server-consent-manager.ts
"use server";

import { cookies } from "next/headers";
import { ConsentSettings } from "./privacy-fingerprinting";

const CONSENT_COOKIE = "pn_consent";
const FINGERPRINT_COOKIE = "pn_fingerprint_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days

export interface ServerConsentData {
  general: "accepted" | "declined";
  fingerprinting: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
}

export async function setGeneralConsent(value: "accepted" | "declined") {
  const cookieStore = await cookies();
  cookieStore.set(CONSENT_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function setDetailedConsent(settings: ConsentSettings) {
  const cookieStore = await cookies();
  
  const consentData: ServerConsentData = {
    general: settings.fingerprinting || settings.analytics || settings.marketing ? "accepted" : "declined",
    fingerprinting: settings.fingerprinting,
    analytics: settings.analytics,
    marketing: settings.marketing,
    functional: settings.functional,
    timestamp: Date.now(),
  };

  // Set both cookies for compatibility
  cookieStore.set(CONSENT_COOKIE, consentData.general, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });

  cookieStore.set(FINGERPRINT_COOKIE, JSON.stringify(consentData), {
    httpOnly: true,
    sameSite: "lax", 
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });

  return consentData;
}

export async function getServerConsent(): Promise<ServerConsentData | null> {
  const cookieStore = await cookies();
  
  // Try to get detailed consent first
  const detailedConsent = cookieStore.get(FINGERPRINT_COOKIE);
  if (detailedConsent?.value) {
    try {
      const parsed = JSON.parse(detailedConsent.value) as ServerConsentData;
      
      // Check if consent is still valid (within 180 days)
      const isExpired = Date.now() - parsed.timestamp > (180 * 24 * 60 * 60 * 1000);
      if (!isExpired) {
        return parsed;
      }
    } catch (error) {
      console.warn("Failed to parse detailed consent cookie:", error);
    }
  }

  // Fallback to general consent
  const generalConsent = cookieStore.get(CONSENT_COOKIE);
  if (generalConsent?.value) {
    return {
      general: generalConsent.value as "accepted" | "declined",
      fingerprinting: generalConsent.value === "accepted",
      analytics: generalConsent.value === "accepted",
      marketing: false, // Default to false for general consent
      functional: true,
      timestamp: Date.now(),
    };
  }

  return null;
}

export async function hasValidConsent(): Promise<boolean> {
  const consent = await getServerConsent();
  return consent?.general === "accepted" || false;
}

export async function hasFingerprintingConsent(): Promise<boolean> {
  const consent = await getServerConsent();
  return consent?.fingerprinting || false;
}

export async function hasAnalyticsConsent(): Promise<boolean> {
  const consent = await getServerConsent();
  return consent?.analytics || false;
}

export async function hasMarketingConsent(): Promise<boolean> {
  const consent = await getServerConsent();
  return consent?.marketing || false;
}

export async function clearAllConsent() {
  const cookieStore = await cookies();
  cookieStore.delete(CONSENT_COOKIE);
  cookieStore.delete(FINGERPRINT_COOKIE);
}

export async function updateConsentTimestamp() {
  const consent = await getServerConsent();
  if (consent) {
    const updatedConsent = {
      ...consent,
      timestamp: Date.now(),
    };
    
    const cookieStore = await cookies();
    cookieStore.set(FINGERPRINT_COOKIE, JSON.stringify(updatedConsent), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: MAX_AGE,
    });
  }
}