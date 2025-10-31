export const metadata = {
  title: "Privacy Policy • PulseNexis",
  description: "How PulseNexis collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="prose prose-indigo mx-auto max-w-3xl px-4 py-12">
      <h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> {new Date().getFullYear()}-10-26</p>

      <h2>What we collect</h2>
      <p>
       - Name and email (when submitting a license request)
       - Payment details (handled securely via third-party services)
       - Site usage via cookies (for analytics)
       - Device information (e.g., IP address, browser type)
      </p>

      <h2>How we use data</h2>
      <ul>
        <li>Provide and improve the PulseNexis service</li>
        <li>Process payments and deliver licensed files</li>
        <li>Send important transactional emails (receipts, license keys)</li>
        <li>Respond to support requests</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We do not sell your personal information. We share data only with vendors who
        help us operate the service (e.g., payment processing, analytics, customer
        support), under contracts that restrict their use.
      </p>

      <h2>Cookies</h2>
      <p>
        We use necessary cookies for site functionality and optional analytics cookies.
        You can control cookies in your browser settings.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access, correction, or deletion of your data at any time by
        emailing <a href="mailto:info@pulsenexis.com">info@pulsenexis.com</a>.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, contact <a href="mailto:info@pulsenexis.com">info@pulsenexis.com</a>.
      </p>
    </main>
  );
}