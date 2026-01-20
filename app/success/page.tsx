"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SuccessPage() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);
  const [err, setErr] = useState<string>("");

  async function getLinks() {
    setErr("");
    setLinks([]);
    if (!sessionId) return setErr("Missing session_id.");
    if (!email.trim()) return setErr("Enter the email you used at checkout.");

    const r = await fetch(
      `/api/download-links?session_id=${encodeURIComponent(sessionId)}&email=${encodeURIComponent(email.trim())}`
    );

    if (!r.ok) return setErr(await r.text());
    const data = await r.json();
    setLinks(data.files);
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>Payment successful</h1>
      <p>Enter your checkout email to unlock your downloads.</p>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email used at checkout"
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <button onClick={getLinks} style={{ marginTop: 12, padding: 10 }}>
        Get my downloads
      </button>

      {err && <p style={{ marginTop: 12 }}>{err}</p>}

      {links.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <h3>Your files</h3>
          <ul>
            {links.map((f) => (
              <li key={f.name}>
                <a href={f.url} target="_blank" rel="noreferrer">
                  Download {f.name}
                </a>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 8 }}>
            Links expire for security. If they expire, click “Get my downloads” again.
          </p>
        </div>
      )}
    </div>
  );
}
