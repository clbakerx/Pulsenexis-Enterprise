// lib/privacy-fingerprinting.ts
import { fingerprinting, FingerprintData } from './fingerprinting';

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

export class PrivacyFriendlyFingerprinting {
  private static instance: PrivacyFriendlyFingerprinting;
  private consentKey = 'fingerprint_consent';

  private constructor() {}

  public static getInstance(): PrivacyFriendlyFingerprinting {
    if (!PrivacyFriendlyFingerprinting.instance) {
      PrivacyFriendlyFingerprinting.instance = new PrivacyFriendlyFingerprinting();
    }
    return PrivacyFriendlyFingerprinting.instance;
  }

  /**
   * Check if user has given consent for fingerprinting
   */
  public hasConsent(): boolean {
    try {
      const consent = localStorage.getItem(this.consentKey);
      if (!consent) return false;

      const parsed = JSON.parse(consent);
      return parsed.fingerprinting && parsed.timestamp > Date.now() - (365 * 24 * 60 * 60 * 1000); // 1 year
    } catch {
      return false;
    }
  }

  /**
   * Set user consent preferences
   */
  public setConsent(settings: ConsentSettings): void {
    const consentData = {
      ...settings,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.consentKey, JSON.stringify(consentData));
  }

  /**
   * Get current consent settings
   */
  public getConsentSettings(): ConsentSettings {
    try {
      const consent = localStorage.getItem(this.consentKey);
      if (!consent) {
        return {
          analytics: false,
          fingerprinting: false,
          marketing: false,
          functional: true, // Essential cookies allowed
        };
      }
      
      const parsed = JSON.parse(consent);
      return {
        analytics: parsed.analytics || false,
        fingerprinting: parsed.fingerprinting || false,
        marketing: parsed.marketing || false,
        functional: parsed.functional !== false, // Default to true
      };
    } catch {
      return {
        analytics: false,
        fingerprinting: false,
        marketing: false,
        functional: true,
      };
    }
  }

  /**
   * Generate privacy-compliant fingerprint
   */
  public async generatePrivacyCompliantFingerprint(): Promise<PrivacyCompliantFingerprint> {
    const consentSettings = this.getConsentSettings();
    const hasFullConsent = this.hasConsent();

    if (hasFullConsent && consentSettings.fingerprinting) {
      // User has consented to full fingerprinting
      const fullFingerprint = await fingerprinting.generateFingerprint();
      
      return {
        hasConsent: true,
        consentTimestamp: Date.now(),
        fullFingerprint,
        consentSettings,
      };
    } else if (consentSettings.functional) {
      // Only functional/essential fingerprinting
      const limitedFingerprint = await this.generateLimitedFingerprint();
      
      return {
        hasConsent: false,
        limitedFingerprint,
        consentSettings,
      };
    } else {
      // No fingerprinting at all
      return {
        hasConsent: false,
        consentSettings,
      };
    }
  }

  /**
   * Generate limited fingerprint with only essential data
   */
  private async generateLimitedFingerprint(): Promise<Partial<FingerprintData>> {
    // Only collect essential information needed for basic functionality
    const basicId = this.generateBasicId();
    
    return {
      visitorId: basicId,
      timestamp: Date.now(),
      browserInfo: {
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        // Don't include userAgent, platform for privacy
        userAgent: '',
        platform: '',
        doNotTrack: (navigator as Navigator & { doNotTrack?: string | null }).doNotTrack,
        hardwareConcurrency: 0,
      },
      screenInfo: {
        // Generic screen info to avoid detailed fingerprinting
        width: Math.round(screen.width / 100) * 100,
        height: Math.round(screen.height / 100) * 100,
        colorDepth: 0,
        pixelRatio: 1,
      },
      timezoneInfo: {
        timezone: '', // Don't track timezone for privacy
        offset: 0,
      },
    };
  }

  /**
   * Generate basic identifier that's privacy-friendly
   */
  private generateBasicId(): string {
    // Create a simple session-based ID that doesn't persist long-term
    const sessionData = [
      Date.now().toString().slice(-8), // Last 8 digits of timestamp
      Math.random().toString(36).substring(2, 8), // Random component
    ].join('');
    
    return `session_${sessionData}`;
  }

  /**
   * Clear all fingerprinting data (GDPR compliance)
   */
  public clearAllData(): void {
    localStorage.removeItem('device_fingerprint');
    localStorage.removeItem(this.consentKey);
  }

  /**
   * Export user's fingerprinting data (GDPR compliance)
   */
  public exportUserData(): { fingerprint: FingerprintData | null; consent: ConsentSettings | null; exportTimestamp: string } {
    const fingerprint = fingerprinting.getStoredFingerprint();
    const consent = this.getConsentSettings();
    
    return {
      fingerprint,
      consent,
      exportTimestamp: new Date().toISOString(),
    };
  }
}

export const privacyFingerprinting = PrivacyFriendlyFingerprinting.getInstance();