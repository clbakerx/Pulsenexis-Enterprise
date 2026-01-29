// components/ServerConsentChecker.tsx
import { getServerConsent } from '@/lib/server-consent-manager';
import { ConsentSettings } from '@/lib/privacy-fingerprinting';

interface ServerConsentCheckerProps {
  children: React.ReactNode;
  requireConsent?: boolean;
  fallback?: React.ReactNode;
}

export async function ServerConsentChecker({ 
  children, 
  requireConsent = false, 
  fallback 
}: ServerConsentCheckerProps) {
  const serverConsent = await getServerConsent();
  
  // If consent is required but not given, show fallback
  if (requireConsent && (!serverConsent || serverConsent.general !== "accepted")) {
    return fallback || (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-800">
          This feature requires your consent. Please accept cookies to continue.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

// Helper to get consent settings for client components
export async function getServerConsentSettings(): Promise<ConsentSettings | null> {
  const serverConsent = await getServerConsent();
  
  if (!serverConsent) return null;

  return {
    analytics: serverConsent.analytics,
    fingerprinting: serverConsent.fingerprinting,
    marketing: serverConsent.marketing,
    functional: serverConsent.functional,
  };
}

export default ServerConsentChecker;