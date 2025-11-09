// types/fingerprinting.d.ts
export interface FingerprintData {
  visitorId: string;
  timestamp: number;
  browserInfo: {
    userAgent: string;
    language: string;
    platform: string;
    cookieEnabled: boolean;
    doNotTrack: boolean | null;
    hardwareConcurrency: number;
  };
  screenInfo: {
    width: number;
    height: number;
    colorDepth: number;
    pixelRatio: number;
  };
  timezoneInfo: {
    timezone: string;
    offset: number;
  };
  canvasFingerprint?: string;
  audioFingerprint?: string;
}

export interface ConsentSettings {
  analytics: boolean;
  fingerprinting: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface PrivacyCompliantFingerprint {
  hasConsent: boolean;
  consentTimestamp?: number;
  limitedFingerprint?: Partial<FingerprintData>;
  fullFingerprint?: FingerprintData;
  consentSettings: ConsentSettings;
}

export interface FingerprintAnalytics {
  visitorId: string;
  timestamp: number;
  sessionId?: string;
  pageUrl: string;
  referrer: string;
  userAgent: string;
  ipAddress: string;
  fingerprint: FingerprintData;
}