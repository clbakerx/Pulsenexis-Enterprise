// app/api/consent-check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { 
  getServerConsent, 
  hasValidConsent, 
  hasFingerprintingConsent,
  hasAnalyticsConsent,
  hasMarketingConsent 
} from '@/lib/server-consent-manager';

export async function GET(request: NextRequest) {
  try {
    const serverConsent = await getServerConsent();
    const hasConsent = await hasValidConsent();
    const hasFingerprinting = await hasFingerprintingConsent();
    const hasAnalytics = await hasAnalyticsConsent();
    const hasMarketing = await hasMarketingConsent();

    return NextResponse.json({
      hasConsent,
      consentDetails: {
        general: serverConsent?.general || null,
        fingerprinting: hasFingerprinting,
        analytics: hasAnalytics,
        marketing: hasMarketing,
        functional: serverConsent?.functional || false,
        timestamp: serverConsent?.timestamp || null,
      },
      isExpired: serverConsent ? 
        (Date.now() - serverConsent.timestamp > (180 * 24 * 60 * 60 * 1000)) : 
        true,
    });

  } catch (error) {
    console.error('Consent check API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check consent',
        hasConsent: false,
        consentDetails: null,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // This endpoint can be used to update consent from the client
    const body = await request.json();
    const { action } = body;

    if (action === 'clear') {
      // Import the server action
      const { clearAllConsent } = await import('@/lib/server-consent-manager');
      await clearAllConsent();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Consent cleared successfully' 
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Consent update API error:', error);
    return NextResponse.json(
      { error: 'Failed to update consent' },
      { status: 500 }
    );
  }
}