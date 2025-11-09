// app/api/consent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { setConsent, clearConsent, getConsent } from '@/lib/consent-actions';
import { setDetailedConsent, clearAllConsent, getServerConsent } from '@/lib/server-consent-manager';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, value, detailedSettings } = body;

    switch (action) {
      case 'set':
        if (detailedSettings) {
          // Set detailed consent settings
          await setDetailedConsent(detailedSettings);
        } else if (value === 'accepted' || value === 'declined') {
          // Set basic consent
          await setConsent(value);
        } else {
          return NextResponse.json(
            { error: 'Invalid consent value' },
            { status: 400 }
          );
        }
        break;

      case 'clear':
        if (detailedSettings) {
          await clearAllConsent();
        } else {
          await clearConsent();
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Consent API error:', error);
    return NextResponse.json(
      { error: 'Failed to update consent' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const basicConsent = await getConsent();
    const detailedConsent = await getServerConsent();

    return NextResponse.json({
      basic: basicConsent,
      detailed: detailedConsent,
      hasConsent: basicConsent === 'accepted' || (detailedConsent?.general === 'accepted'),
    });

  } catch (error) {
    console.error('Consent GET API error:', error);
    return NextResponse.json(
      { error: 'Failed to get consent' },
      { status: 500 }
    );
  }
}