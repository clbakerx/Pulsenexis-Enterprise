import FreeSampleForm from '@/app/components/FreeSampleForm';

export const metadata = {
  title: 'Free R&B Sample | PulseNexis',
  description:
    'Drop your email and get a free royalty-free R&B sample from the PulseNexis catalog — one handpicked track, no card, no catch.',
};

export default function FreeBeatsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <FreeSampleForm />
      </div>
    </main>
  );
}
