export default function SellComingSoon() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="mx-auto mb-6 h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center text-lg font-bold">
          PN
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Sell Your Music on PulseNexis
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          We’re building a creator-first marketplace where artists can upload music,
          set licensing prices, and earn automatically when creators license their tracks.
        </p>

        <div className="bg-slate-50 border rounded-2xl p-6 text-left mb-8">
          <ul className="space-y-3 text-slate-700">
            <li>✔ Upload original music & artwork</li>
            <li>✔ Set your own licensing prices</li>
            <li>✔ Earn from creators, brands, and businesses</li>
            <li>✔ Automatic payouts with no middlemen</li>
          </ul>
        </div>

        <p className="text-sm text-slate-500 mb-6">
          Creator marketplace features will launch after the PulseNexis licensing catalog
          reaches stable profitability.
        </p>

        <div className="inline-flex items-center gap-3">
          <span className="rounded-full bg-black text-white px-5 py-2 text-sm font-semibold">
            Coming Soon
          </span>

          <a
            href="/licensing"
            className="rounded-full border px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Explore Licensing
          </a>
        </div>
      </div>
    </main>
  );
}
