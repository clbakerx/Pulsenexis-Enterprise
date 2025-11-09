// app/api/fingerprint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hasFingerprintingConsent, hasAnalyticsConsent } from '@/lib/server-consent-manager';

export interface FingerprintAnalytics {
  visitorId: string;
  timestamp: number;
  sessionId?: string;
  pageUrl: string;
  referrer: string;
  userAgent: string;
  ipAddress: string;
  fingerprint: {
    visitorId: string;
    browserInfo: {
      userAgent: string;
      language: string;
      platform: string;
      cookieEnabled: boolean;
      doNotTrack: string | null;
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
  };
}

// Store fingerprint data (in production, use a database)
const fingerprintStore = new Map<string, FingerprintAnalytics>();

export async function POST(request: NextRequest) {
  try {
    // Check server-side consent first
    const hasFingerprinting = await hasFingerprintingConsent();
    const hasAnalytics = await hasAnalyticsConsent();
    
    if (!hasFingerprinting && !hasAnalytics) {
      return NextResponse.json(
        { error: 'Insufficient consent for fingerprinting' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { fingerprint, sessionId, pageUrl } = body;

    if (!fingerprint || !fingerprint.visitorId) {
      return NextResponse.json(
        { error: 'Invalid fingerprint data' },
        { status: 400 }
      );
    }

    // Get client IP (handle various proxy headers)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwarded 
      ? forwarded.split(',')[0].trim() 
      : realIp || 'unknown';

    // Create analytics record
    const analyticsData: FingerprintAnalytics = {
      visitorId: fingerprint.visitorId,
      timestamp: Date.now(),
      sessionId: sessionId || generateSessionId(),
      pageUrl: pageUrl || '',
      referrer: request.headers.get('referer') || '',
      userAgent: request.headers.get('user-agent') || '',
      ipAddress: clientIp,
      fingerprint,
    };

    // Store the data (in production, save to database)
    fingerprintStore.set(fingerprint.visitorId, analyticsData);

    // Log for debugging (remove in production)
    console.log('Fingerprint received:', {
      visitorId: fingerprint.visitorId,
      isReturning: fingerprintStore.has(fingerprint.visitorId),
      browserInfo: fingerprint.browserInfo?.userAgent?.substring(0, 50) + '...',
    });

    return NextResponse.json({
      success: true,
      visitorId: fingerprint.visitorId,
      isReturning: fingerprintStore.has(fingerprint.visitorId),
      message: 'Fingerprint recorded successfully',
    });

  } catch (error) {
    console.error('Fingerprint API error:', error);
    return NextResponse.json(
      { error: 'Failed to process fingerprint' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const visitorId = searchParams.get('visitorId');

    if (!visitorId) {
      // Return analytics summary
      return NextResponse.json({
        totalVisitors: fingerprintStore.size,
        recentVisitors: Array.from(fingerprintStore.values())
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 10)
          .map(visitor => ({
            visitorId: visitor.visitorId,
            timestamp: visitor.timestamp,
            userAgent: visitor.userAgent.substring(0, 50) + '...',
            ipAddress: visitor.ipAddress,
          })),
      });
    }

    // Return specific visitor data
    const visitorData = fingerprintStore.get(visitorId);
    if (!visitorData) {
      return NextResponse.json(
        { error: 'Visitor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(visitorData);

  } catch (error) {
    console.error('Fingerprint GET API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve fingerprint data' },
      { status: 500 }
    );
  }
}

// Helper function to generate session ID
function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}