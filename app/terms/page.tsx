export const metadata = {
  title: "Terms & Licensing • PulseNexis",
  description: "License grant, usage rules, and limitations for PulseNexis music.",
};

export default function TermsPage() {
  return (
    <main className="prose prose-indigo mx-auto max-w-3xl px-4 py-12">
      <h1>Terms & Licensing</h1>
      <p><strong>Last updated:</strong> {new Date().getFullYear()}-10-26</p>

      <h2>License Grant</h2>
      <p>
        Upon signing up Creator Membership, PulseNexis grants you a non-exclusive, non-transferable license to
        use the selected music track(s) as described in the Membership tier you choose.
      </p>

      <h2>Permitted Use</h2>
      <ul>
        <li>Sync the track to your video, podcast, or social post</li>
        <li>Use in commercial projects up to the limits of your tier</li>
        <li>Unlimited edits/cuts within the same end product</li>
      </ul>

      <h2>Restrictions</h2>
      <ul>
        <li>Do not resell or redistribute the raw audio files</li>
        <li>Do not claim authorship of the underlying composition</li>
        <li>For broadcast, theatrical, or large ad campaigns, contact us for an extended license</li>
      </ul>

      <h2>Attribution</h2>
      <p>
        Where practical, please credit: <em>&ldquo;Music by PulseNexis.&rdquo;</em>
      </p>

      <h2>Refunds</h2>
      <p>
        All sales are final. If you experience file issues, contact support for a corrected delivery.
      </p>
      <p>
      <h2>Contact</h2>

      
        Licensing questions: <a href="mailto:info@pulsenexis.com">info@pulsenexis.com</a>
      </p>
    </main>
  );
}