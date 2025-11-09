// components/ConsentBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { privacyFingerprinting, ConsentSettings } from '@/lib/privacy-fingerprinting';

interface ConsentBannerProps {
  onConsentChange?: (settings: ConsentSettings) => void;
}

export function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>({
    analytics: false,
    fingerprinting: false,
    marketing: false,
    functional: true,
  });

  useEffect(() => {
    // Check if user has already given consent
    const currentSettings = privacyFingerprinting.getConsentSettings();
    const hasConsent = privacyFingerprinting.hasConsent();
    
    if (!hasConsent && !currentSettings.fingerprinting) {
      setShowBanner(true);
    }
    
    setSettings(currentSettings);
  }, []);

  const handleAcceptAll = async () => {
    const allConsent: ConsentSettings = {
      analytics: true,
      fingerprinting: true,
      marketing: true,
      functional: true,
    };
    
    // Update client-side consent
    privacyFingerprinting.setConsent(allConsent);
    
    // Update server-side consent via API
    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set',
          detailedSettings: allConsent,
        }),
      });
    } catch (error) {
      console.warn('Failed to sync server consent:', error);
    }
    
    setSettings(allConsent);
    setShowBanner(false);
    onConsentChange?.(allConsent);
  };

  const handleRejectAll = async () => {
    const minimalConsent: ConsentSettings = {
      analytics: false,
      fingerprinting: false,
      marketing: false,
      functional: true,
    };
    
    // Update client-side consent
    privacyFingerprinting.setConsent(minimalConsent);
    
    // Update server-side consent via API
    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set',
          detailedSettings: minimalConsent,
        }),
      });
    } catch (error) {
      console.warn('Failed to sync server consent:', error);
    }
    
    setSettings(minimalConsent);
    setShowBanner(false);
    onConsentChange?.(minimalConsent);
  };

  const handleSavePreferences = async () => {
    // Update client-side consent
    privacyFingerprinting.setConsent(settings);
    
    // Update server-side consent via API
    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set',
          detailedSettings: settings,
        }),
      });
    } catch (error) {
      console.warn('Failed to sync server consent:', error);
    }
    
    setShowBanner(false);
    setShowDetails(false);
    onConsentChange?.(settings);
  };

  const handleToggleSetting = (key: keyof ConsentSettings) => {
    if (key === 'functional') return; // Functional cookies are required
    
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-2xl">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {!showDetails ? (
          // Simple banner
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900 mb-1">
                🍪 We use cookies and fingerprinting
              </h3>
              <p className="text-sm text-neutral-600">
                We use cookies and device fingerprinting to improve your experience, 
                analyze site usage, and assist with marketing. You can customize your preferences.
              </p>
            </div>
            
            <div className="flex gap-3 sm:flex-shrink-0">
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Detailed preferences
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900">Cookie & Fingerprinting Preferences</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Functional */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">Functional</h4>
                  <p className="text-sm text-neutral-600">
                    Essential for basic site functionality. Always enabled.
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={true}
                    className="w-12 h-6 bg-green-500 rounded-full appearance-none cursor-not-allowed"
                  />
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow"></div>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200">
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">Analytics</h4>
                  <p className="text-sm text-neutral-600">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <button
                  onClick={() => handleToggleSetting('analytics')}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                    settings.analytics ? 'bg-blue-500' : 'bg-neutral-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    settings.analytics ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              {/* Fingerprinting */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200">
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">Device Fingerprinting</h4>
                  <p className="text-sm text-neutral-600">
                    Collect device characteristics to prevent fraud and improve security.
                  </p>
                </div>
                <button
                  onClick={() => handleToggleSetting('fingerprinting')}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                    settings.fingerprinting ? 'bg-blue-500' : 'bg-neutral-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    settings.fingerprinting ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200">
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">Marketing</h4>
                  <p className="text-sm text-neutral-600">
                    Used to deliver personalized ads and track campaign effectiveness.
                  </p>
                </div>
                <button
                  onClick={() => handleToggleSetting('marketing')}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                    settings.marketing ? 'bg-blue-500' : 'bg-neutral-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    settings.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Your Privacy:</strong> You can change these preferences anytime. 
                We respect your choices and will only use the data you&apos;ve consented to share.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsentBanner;