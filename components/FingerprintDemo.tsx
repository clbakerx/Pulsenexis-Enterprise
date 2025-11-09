// components/FingerprintDemo.tsx
'use client';

import { useFingerprinting } from '@/hooks/useFingerprinting';
import { useServerConsent } from '@/hooks/useServerConsent';
import { useState } from 'react';

export function FingerprintDemo() {
  const { 
    fingerprint, 
    isLoading, 
    error, 
    isReturningVisitor, 
    generateFingerprint, 
    clearFingerprint 
  } = useFingerprinting();

  const {
    hasServerConsent,
    isLoading: serverConsentLoading,
    error: serverConsentError,
    checkServerConsent,
    clearConsent: clearServerConsent,
  } = useServerConsent();
  
  const [showDetails, setShowDetails] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  const sendToAPI = async () => {
    if (!fingerprint) return;

    try {
      const response = await fetch('/api/fingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fingerprint,
          sessionId: Date.now().toString(),
          pageUrl: window.location.href,
        }),
      });

      const result = await response.json();
      setApiResponse(result);
    } catch (error) {
      console.error('Failed to send fingerprint to API:', error);
      setApiResponse({ error: 'Failed to send to API' });
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Device Fingerprinting Demo</h3>
      
      {/* Status */}
      <div className="mb-4 p-4 rounded-lg bg-neutral-50">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            isLoading ? 'bg-yellow-500' : 
            fingerprint ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <span className="font-medium">
            {isLoading ? 'Generating fingerprint...' : 
             fingerprint ? 'Fingerprint ready' : 'No fingerprint'}
          </span>
        </div>

        {/* Server Consent Status */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-3 h-3 rounded-full ${
            serverConsentLoading ? 'bg-yellow-500' : 
            hasServerConsent ? 'bg-blue-500' : 'bg-red-400'
          }`} />
          <span className="font-medium text-sm">
            Server Consent: {serverConsentLoading ? 'Checking...' : 
             hasServerConsent ? '✓ Granted' : '✗ Not granted'}
          </span>
        </div>
        
        {fingerprint && (
          <div className="text-sm text-neutral-600 space-y-1">
            <div><strong>Visitor ID:</strong> {fingerprint.visitorId}</div>
            <div><strong>Status:</strong> {isReturningVisitor ? '🔄 Returning visitor' : '✨ New visitor'}</div>
            <div><strong>Browser:</strong> {fingerprint.browserInfo.platform} / {fingerprint.browserInfo.language}</div>
            <div><strong>Screen:</strong> {fingerprint.screenInfo.width}x{fingerprint.screenInfo.height}</div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm mt-2">
            Error: {error}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={generateFingerprint}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Fingerprint'}
        </button>
        
        <button
          onClick={clearFingerprint}
          className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
        >
          Clear Client Data
        </button>

        <button
          onClick={() => {
            clearServerConsent();
            checkServerConsent();
          }}
          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
        >
          Clear Server Consent
        </button>

        {fingerprint && (
          <button
            onClick={sendToAPI}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Send to API
          </button>
        )}
      </div>

      {/* API Response */}
      {apiResponse && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
          <h4 className="font-medium text-green-800 mb-2">API Response:</h4>
          <pre className="text-sm text-green-700 overflow-x-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}

      {/* Detailed View */}
      {fingerprint && (
        <div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3"
          >
            {showDetails ? '▼ Hide Details' : '▶ Show Details'}
          </button>

          {showDetails && (
            <div className="bg-neutral-50 rounded-lg p-4 text-sm">
              <h4 className="font-semibold mb-3">Complete Fingerprint Data:</h4>
              <pre className="whitespace-pre-wrap text-neutral-700 overflow-x-auto">
                {JSON.stringify(fingerprint, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Privacy Notice */}
      <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Privacy Note:</strong> This fingerprinting is for demonstration purposes. 
          In production, ensure compliance with privacy regulations (GDPR, CCPA) and 
          obtain proper user consent.
        </p>
      </div>
    </div>
  );
}

export default FingerprintDemo;