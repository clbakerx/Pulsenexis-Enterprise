// app/fingerprint-demo/page.tsx
import FingerprintDemo from '@/components/FingerprintDemo';
import Link from 'next/link';

export default function FingerprintDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Device Fingerprinting Demo
              </h1>
              <p className="text-neutral-600 mt-1">
                Privacy-compliant device identification and analytics
              </p>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Demo Component */}
          <div className="lg:col-span-2">
            <FingerprintDemo />
          </div>

          {/* Information Cards */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900">
              📊 What is Device Fingerprinting?
            </h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p>
                Device fingerprinting creates a unique identifier by collecting various 
                device and browser characteristics without using cookies.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Browser version and user agent</li>
                <li>Screen resolution and color depth</li>
                <li>Available fonts and plugins</li>
                <li>Canvas and WebGL rendering</li>
                <li>Audio context fingerprinting</li>
                <li>Hardware concurrency</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900">
              🔒 Privacy & Compliance
            </h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p>
                Our implementation prioritizes user privacy and regulatory compliance:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Requires explicit user consent</li>
                <li>GDPR & CCPA compliant</li>
                <li>Data minimization principles</li>
                <li>Right to be forgotten</li>
                <li>Transparent data usage</li>
                <li>Limited data retention</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900">
              🎯 Use Cases
            </h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p>
                Common applications of device fingerprinting:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Fraud prevention and security</li>
                <li>User experience personalization</li>
                <li>Analytics and behavior tracking</li>
                <li>A/B testing and optimization</li>
                <li>Cross-device user identification</li>
                <li>Bot and spam detection</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-neutral-900">
              ⚙️ Technical Features
            </h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p>
                Advanced fingerprinting capabilities:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Multiple fingerprinting techniques</li>
                <li>Fallback mechanisms</li>
                <li>Client-side and server-side tracking</li>
                <li>Real-time visitor identification</li>
                <li>Session management</li>
                <li>API integration ready</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">
            🚀 Quick Integration
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-blue-800">
              Add fingerprinting to your site in just a few steps:
            </p>
            
            <div className="bg-white rounded-lg p-4 font-mono text-sm">
              <div className="text-green-600 mb-2">{`// 1. Install the library`}</div>
              <div className="text-neutral-700">npm install @fingerprintjs/fingerprintjs</div>
              
              <div className="text-green-600 mb-2 mt-4">{`// 2. Import and use the hook`}</div>
              <div className="text-neutral-700">
                import {`{useFingerprinting}`} from &apos;@/hooks/useFingerprinting&apos;;<br/>
                const {`{fingerprint, isLoading}`} = useFingerprinting();
              </div>
              
              <div className="text-green-600 mb-2 mt-4">{`// 3. Handle consent`}</div>
              <div className="text-neutral-700">
                import ConsentBanner from &apos;@/components/ConsentBanner&apos;;<br/>
                {`<ConsentBanner onConsentChange={handleConsent} />`}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}