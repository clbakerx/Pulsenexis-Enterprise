# Server-Side Consent Management

This document explains the server-side consent management system that complements the client-side fingerprinting implementation.

## 🎯 **What's New**

Your server-side consent management is now **fully integrated** with the existing fingerprinting system! This provides:

### ✅ **Server Actions**
- **HTTP-only secure cookies** for consent storage
- **180-day consent validity** with automatic expiration
- **GDPR-compliant consent management**
- **Cross-session consent persistence**

### ✅ **Dual Consent System**
- **Client-side consent** (localStorage) for immediate UI updates
- **Server-side consent** (HTTP-only cookies) for secure backend validation
- **Automatic synchronization** between client and server
- **Fallback handling** when one system is unavailable

## 🚀 **Implementation Details**

### **Files Added/Modified:**

#### **Server Actions:**
- `lib/consent-actions.ts` - Your original server actions (exactly as requested)
- `lib/server-consent-manager.ts` - Enhanced server consent with detailed settings
- `app/api/consent-check/route.ts` - API endpoint for consent validation

#### **Client Integration:**
- `hooks/useServerConsent.ts` - React hook for server consent management
- `components/ConsentBanner.tsx` - Updated with server-side sync
- `components/ServerConsentChecker.tsx` - Server component for consent checking

#### **Enhanced API:**
- `app/api/fingerprint/route.ts` - Now validates server-side consent before processing

## 🔧 **Usage Examples**

### **1. Basic Server Actions (Your Original Code)**

```typescript
import { setConsent, clearConsent, getConsent } from '@/lib/consent-actions';

// Set basic consent
await setConsent("accepted");
await setConsent("declined");

// Check consent
const consent = await getConsent(); // "accepted" | "declined" | null

// Clear consent
await clearConsent();
```

### **2. Enhanced Server Management**

```typescript
import { 
  setDetailedConsent, 
  getServerConsent, 
  hasFingerprintingConsent 
} from '@/lib/server-consent-manager';

// Set detailed consent preferences
await setDetailedConsent({
  analytics: true,
  fingerprinting: true,
  marketing: false,
  functional: true,
});

// Check specific consent types
const hasFingerprinting = await hasFingerprintingConsent();
const serverConsent = await getServerConsent();
```

### **3. Client-Server Sync**

```typescript
import { useServerConsent } from '@/hooks/useServerConsent';

function MyComponent() {
  const { 
    hasServerConsent, 
    isLoading, 
    syncConsent, 
    clearConsent 
  } = useServerConsent();

  const handleConsentUpdate = async (settings: ConsentSettings) => {
    // This automatically syncs to server
    await syncConsent(settings);
  };

  return (
    <div>
      Server Consent: {hasServerConsent ? '✅ Granted' : '❌ Not granted'}
    </div>
  );
}
```

### **4. Server Component Protection**

```typescript
import ServerConsentChecker from '@/components/ServerConsentChecker';

export default async function ProtectedPage() {
  return (
    <ServerConsentChecker requireConsent fallback={<div>Consent required</div>}>
      <div>This content requires consent to view</div>
    </ServerConsentChecker>
  );
}
```

## 🛡️ **Security Features**

### **HTTP-Only Cookies**
- **Cannot be accessed by client-side JavaScript** (XSS protection)
- **Secure flag enabled** in production
- **SameSite=lax** for CSRF protection
- **180-day expiration** with automatic cleanup

### **Server-Side Validation**
```typescript
// API routes automatically check consent
export async function POST(request: NextRequest) {
  const hasConsent = await hasFingerprintingConsent();
  
  if (!hasConsent) {
    return NextResponse.json(
      { error: 'Insufficient consent' }, 
      { status: 403 }
    );
  }
  
  // Process request...
}
```

### **Consent Verification API**
```bash
# Check current consent status
GET /api/consent-check

# Clear server-side consent
POST /api/consent-check
Content-Type: application/json
{"action": "clear"}
```

## 📱 **Testing the Integration**

### **Visit the Demo:**
1. Go to `http://localhost:3001/fingerprint-demo`
2. You'll see **both client and server consent status**
3. **Accept/decline consent** - watch both systems sync
4. **Clear data** - test both client and server clearing
5. **Refresh page** - server consent persists across sessions

### **API Testing:**
```bash
# Test server consent check
curl http://localhost:3001/api/consent-check

# Test fingerprinting with consent validation  
curl -X POST http://localhost:3001/api/fingerprint \
  -H "Content-Type: application/json" \
  -d '{"fingerprint": {"visitorId": "test"}}'
```

## 🔄 **Migration Path**

### **Your Existing Code Works Unchanged:**
- Your original `setConsent`, `clearConsent`, `getConsent` functions work exactly as designed
- **Secure: true** flag is set (as in your original code)
- **180-day expiration** for both "accepted" and "declined" (as requested)
- **HTTP-only cookies** with proper security headers

### **Enhanced Features Available:**
- **Detailed consent settings** (analytics, fingerprinting, marketing)
- **Automatic client-server sync**
- **API consent validation**
- **Server component protection**

## 🎉 **Benefits**

### **For Users:**
- **Persistent consent** across browser sessions
- **Granular privacy controls**
- **Secure data handling**
- **Transparent consent management**

### **For Developers:**
- **Server-side consent validation** 
- **Automatic security** (HTTP-only, secure cookies)
- **Easy API integration**
- **GDPR/CCPA compliance built-in**

### **For Business:**
- **Legal compliance** with privacy regulations
- **User trust** through transparency
- **Analytics accuracy** with proper consent
- **Risk mitigation** through proper consent handling

## 🚨 **Important Notes**

- **Both systems work together** - don't disable one without the other
- **Server consent is authoritative** for backend operations  
- **Client consent provides immediate UI feedback**
- **Always check server consent in API routes** for security
- **Consent expires after 180 days** - users will need to re-consent

Your fingerprinting system now has enterprise-grade server-side consent management! 🎯