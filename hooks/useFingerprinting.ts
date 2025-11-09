// hooks/useFingerprinting.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { fingerprinting, FingerprintData } from '@/lib/fingerprinting';

export interface FingerprintingState {
  fingerprint: FingerprintData | null;
  isLoading: boolean;
  error: string | null;
  isReturningVisitor: boolean;
}

export function useFingerprinting(autoGenerate: boolean = true) {
  const [state, setState] = useState<FingerprintingState>({
    fingerprint: null,
    isLoading: false,
    error: null,
    isReturningVisitor: false,
  });

  const generateFingerprint = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if returning visitor first
      const isReturning = await fingerprinting.isReturningVisitor();
      
      // Generate new fingerprint
      const fingerprint = await fingerprinting.generateFingerprint();
      
      // Store the fingerprint
      await fingerprinting.storeFingerprint(fingerprint);

      setState({
        fingerprint,
        isLoading: false,
        error: null,
        isReturningVisitor: isReturning,
      });

      return fingerprint;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Fingerprinting failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return null;
    }
  }, []);

  const clearFingerprint = useCallback(() => {
    localStorage.removeItem('device_fingerprint');
    setState({
      fingerprint: null,
      isLoading: false,
      error: null,
      isReturningVisitor: false,
    });
  }, []);

  // Auto-generate on mount if enabled
  useEffect(() => {
    if (autoGenerate && typeof window !== 'undefined') {
      // Check for existing fingerprint first
      const existing = fingerprinting.getStoredFingerprint();
      if (existing) {
        setState(prev => ({
          ...prev,
          fingerprint: existing,
          isReturningVisitor: true,
        }));
      } else {
        generateFingerprint();
      }
    }
  }, [autoGenerate, generateFingerprint]);

  return {
    ...state,
    generateFingerprint,
    clearFingerprint,
    refreshFingerprint: generateFingerprint,
  };
}