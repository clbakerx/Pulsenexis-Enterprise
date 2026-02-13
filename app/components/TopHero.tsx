import Link from "next/link";

type HeroButton = {
  label: string;
  href: string;
  variant?: "primary" | "outline" | "ghost";
  external?: boolean;
};

type TopHeroProps = {
  eyebrow: string; // "PULSENEXIS • SHORTS & JINGLES"
  titlePre: string; // "Music built for "
  titleHighlight: string; // "Shorts"
  titlePost: string; // ", Reels & Brands"
  descriptionLines: string[]; // 1–2 lines under the title
  bullets: string[]; // the ✅ bullet list
  buttons: HeroButton[]; // 2–3 buttons
  footnote?: string; // small line under buttons
};

export default function TopHero({
  eyebrow,
  titlePre,
  titleHighlight,
  titlePost,
  descriptionLines,
  bullets,
  buttons,
  footnote = "Pick a bundle below • Checkout opens in a new tab • No renewals • No Content ID",
}: TopHeroProps) {
  return (
    <section className="rounded-[28px] border border-black/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-10 py-12 text-white shadow-sm">
      <div className="text-xs font-semibold tracking-widest text-white/70">
        {eyebrow}
      </div>

      <h1 className="mt-4 text-5xl font-extrabold leading-tight">
        {titlePre}
        <span className="text-amber-400">{titleHighlight}</span>
        {titlePost}
      </h1>

      <div className="mt-5 max-w-2xl space-y-1 text-sm leading-relaxed text-white/75">
        {descriptionLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <ul className="mt-6 space-y-2 text-sm text-white/80">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="text-emerald-400">✅</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {buttons.map((btn) => {
          const base =
            "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";
          const variants: Record<string, string> = {
            primary: "bg-amber-400 text-black hover:opacity-95",
            outline:
              "border border-white/25 bg-transparent text-white hover:bg-white/10",
            ghost: "bg-white/10 text-white hover:bg-white/15",
          };
          const cls = `${base} ${variants[btn.variant ?? "outline"]}`;

          // external link (Stripe, etc.)
          if (btn.external) {
            return (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noreferrer"
                className={cls}
              >
                {btn.label}
              </a>
            );
          }

          return (
            <Link key={btn.label} href={btn.href} className={cls}>
              {btn.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-white/55">{footnote}</div>
    </section>
  );
}
