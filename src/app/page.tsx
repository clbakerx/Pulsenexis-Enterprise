// Server Component (default)
export const dynamic = 'force-dynamic'; // optional; disables caching for this route

import SharedPlayer from '../components/SharedPlayer.client'; // use the client wrapper which forwards to the clean implementation
import FloatingPlayer from '../components/FloatingPlayer';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#0B0B0B', color: '#EDE6D8', padding: 16 }}>
      <SharedPlayer baseUrl="https://filedn.com/ldxHrdHcf3tV7YntUkvw8R0/" />
      <FloatingPlayer />
    </main>
  );
}
