import ContactPage from "@/app/components/ContactForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string; tier?: string }>;
}) {
  const { paid, tier } = await searchParams;
  return <ContactPage paid={paid === "true"} tier={tier} />;
}
