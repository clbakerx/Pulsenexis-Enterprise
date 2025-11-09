// lib/fingerprinting.ts
import FingerprintJS from '@fingerprintjs/fingerprintjs';

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

export class DeviceFingerprinting {
  private static instance: DeviceFingerprinting;
  private fpPromise: Promise<any> | null = null;

  private constructor() {}

  public static getInstance(): DeviceFingerprinting {
    if (!DeviceFingerprinting.instance) {
      DeviceFingerprinting.instance = new DeviceFingerprinting();
    }
    return DeviceFingerprinting.instance;
  }

  /**
   * Initialize FingerprintJS (call this once)
   */
  private async initFingerprinting(): Promise<any> {
    if (!this.fpPromise) {
      this.fpPromise = FingerprintJS.load();
    }
    return this.fpPromise;
  }

  /**
   * Generate comprehensive device fingerprint
   */
  public async generateFingerprint(): Promise<FingerprintData> {
    try {
      // Initialize FingerprintJS
      const fp = await this.initFingerprinting();
      const result = await fp.get();

      // Collect additional browser information
      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: (navigator as any).doNotTrack,
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
      };

      // Collect screen information
      const screenInfo = {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio || 1,
      };

      // Collect timezone information
      const timezoneInfo = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        offset: new Date().getTimezoneOffset(),
      };

      // Generate canvas fingerprint
      const canvasFingerprint = this.generateCanvasFingerprint();

      // Generate audio fingerprint
      const audioFingerprint = await this.generateAudioFingerprint();

      return {
        visitorId: result.visitorId,
        timestamp: Date.now(),
        browserInfo,
        screenInfo,
        timezoneInfo,
        canvasFingerprint,
        audioFingerprint,
      };
    } catch (error) {
      console.warn('Fingerprinting failed:', error);
      // Fallback to basic fingerprinting
      return this.generateBasicFingerprint();
    }
  }

  /**
   * Generate canvas-based fingerprint
   */
  private generateCanvasFingerprint(): string {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return '';

      canvas.width = 200;
      canvas.height = 50;

      // Draw text with different fonts and colors
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Fingerprint Test 🎵', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Fingerprint Test 🎵', 4, 17);

      // Convert to data URL and create hash
      return this.simpleHash(canvas.toDataURL());
    } catch (error) {
      console.warn('Canvas fingerprinting failed:', error);
      return '';
    }
  }

  /**
   * Generate audio-based fingerprint
   */
  private async generateAudioFingerprint(): Promise<string> {
    try {
      if (!window.AudioContext && !(window as any).webkitAudioContext) {
        return '';
      }

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const analyser = audioContext.createAnalyser();
      const gainNode = audioContext.createGain();
      const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

      return new Promise((resolve) => {
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        oscillator.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(gainNode);
        gainNode.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = (event) => {
          const buffer = event.inputBuffer.getChannelData(0);
          const hash = this.simpleHash(buffer.slice(0, 100).join(''));
          audioContext.close();
          resolve(hash);
        };

        oscillator.start(0);
        setTimeout(() => {
          oscillator.stop();
          resolve('');
        }, 100);
      });
    } catch (error) {
      console.warn('Audio fingerprinting failed:', error);
      return '';
    }
  }

  /**
   * Fallback basic fingerprinting
   */
  private generateBasicFingerprint(): FingerprintData {
    const basicId = this.simpleHash(
      navigator.userAgent +
      navigator.language +
      screen.width +
      screen.height +
      new Date().getTimezoneOffset()
    );

    return {
      visitorId: basicId,
      timestamp: Date.now(),
      browserInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: (navigator as any).doNotTrack,
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
      },
      screenInfo: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio || 1,
      },
      timezoneInfo: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        offset: new Date().getTimezoneOffset(),
      },
    };
  }

  /**
   * Simple hash function
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Store fingerprint data (customize based on your needs)
   */
  public async storeFingerprint(fingerprint: FingerprintData): Promise<void> {
    try {
      // Store in localStorage
      localStorage.setItem('device_fingerprint', JSON.stringify(fingerprint));

      // Optionally send to your analytics endpoint
      // await fetch('/api/analytics/fingerprint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(fingerprint),
      // });

      console.log('Fingerprint stored:', fingerprint.visitorId);
    } catch (error) {
      console.warn('Failed to store fingerprint:', error);
    }
  }

  /**
   * Retrieve stored fingerprint
   */
  public getStoredFingerprint(): FingerprintData | null {
    try {
      const stored = localStorage.getItem('device_fingerprint');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to retrieve fingerprint:', error);
      return null;
    }
  }

  /**
   * Check if this is a returning visitor
   */
  public async isReturningVisitor(): Promise<boolean> {
    const stored = this.getStoredFingerprint();
    if (!stored) return false;

    const current = await this.generateFingerprint();
    return stored.visitorId === current.visitorId;
  }
}

// Export singleton instance
export const fingerprinting = DeviceFingerprinting.getInstance();