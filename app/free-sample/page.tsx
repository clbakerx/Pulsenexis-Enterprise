import FreeSampleForm from "@/app/components/FreeSampleForm";

export const metadata = {
  title: "Get a Free Sample — Pulsenexis",
  description:
    "Pulsenexis picks a free sample from the catalog for you. No card required.",
};

export default function FreeSamplePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <FreeSampleForm />
    </main>
  );
}
