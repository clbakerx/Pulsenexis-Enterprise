// hooks/useServerConsent.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ConsentSettings } from '@/lib/privacy-fingerprinting';

export interface ServerConsentState {
  hasServerConsent: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useServerConsent() {
  const [state, setState] = useState<ServerConsentState>({
    hasServerConsent: false,
    isLoading: true,
    error: null,
  });

  const checkServerConsent = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if server has consent by making a simple API call
      const response = await fetch('/api/consent-check', {
        method: 'GET',
        credentials: 'same-origin',
      });

      if (response.ok) {
        const data = await response.json();
        setState({
          hasServerConsent: data.hasConsent,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          hasServerConsent: false,
          isLoading: false,
          error: 'Failed to check server consent',
        });
      }
    } catch (error) {
      setState({
        hasServerConsent: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, []);

  const syncConsent = useCallback(async (settings: ConsentSettings) => {
    try {
      const response = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set',
          detailedSettings: settings,
        }),
      });

      if (response.ok) {
        setState(prev => ({ 
          ...prev, 
          hasServerConsent: settings.fingerprinting || settings.analytics,
          error: null,
        }));
        return true;
      } else {
        throw new Error('Failed to sync consent to server');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to sync consent',
      }));
      return false;
    }
  }, []);

  const clearConsent = useCallback(async () => {
    try {
      const response = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'clear',
          detailedSettings: true,
        }),
      });

      if (response.ok) {
        setState({
          hasServerConsent: false,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        throw new Error('Failed to clear server consent');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to clear consent',
      }));
      return false;
    }
  }, []);

  // Check server consent on mount
  useEffect(() => {
    checkServerConsent();
  }, [checkServerConsent]);

  return {
    ...state,
    checkServerConsent,
    syncConsent,
    clearConsent,
  };
}