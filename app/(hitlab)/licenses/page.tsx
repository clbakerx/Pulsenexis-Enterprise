export default function LicensingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-10 py-12">
      <h1 className="text-3xl font-bold mb-6">Licensing</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Creator", price: "$39", desc: "YouTube, socials, podcasts, personal projects." },
          { name: "Business", price: "$149", desc: "Ads, brands, monetized campaigns, client work." },
          { name: "Exclusive", price: "$999+", desc: "One buyer. Track removed from store." },
        ].map((t) => (
          <div key={t.name} className="rounded-xl border border-white/10 p-5">
            <div className="text-xl font-bold">{t.name}</div>
            <div className="mt-2 text-yellow-300 font-semibold">{t.price}</div>
            <p className="mt-3 text-white/70">{t.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
