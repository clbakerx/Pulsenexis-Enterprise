export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { readFile } from 'fs/promises';
import { join } from 'path';
import Link from 'next/link';

type TrackJson = { title?: string; artist?: string; streamPath?: string };
type TracksFile = { album?: string; baseURL?: string; tracks: TrackJson[] };

const PAGE_SIZE = 15;

async function readCatalog(): Promise<TracksFile> {
  try {
    const p = join(process.cwd(), 'public', 'tracks.json');
    const raw = await readFile(p, 'utf8');
    return JSON.parse(raw) as TracksFile;
  } catch {
    return { album: 'Catalog', tracks: [] };
  }
}

export default async function Page({ params }: { params: { page: string } }) {
  const pageNum = Math.max(1, Number(params.page || '1'));
  const data = await readCatalog();
  const total = data.tracks?.length ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (pageNum - 1) * PAGE_SIZE;
  const slice = (data.tracks || []).slice(start, start + PAGE_SIZE);

  return (
    <div style={{ maxWidth: 980, margin: '2rem auto', padding: 16 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <Link href="/catalog"><a style={{ textDecoration: 'none' }}><h1 style={{ margin: 0 }}>{data.album ?? 'Catalog'}</h1></a></Link>
        <div style={{ marginLeft: 'auto', color: '#666' }}>{total} tracks</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {slice.map((t, i) => (
          <article key={start + i} style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', background: '#fff' }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{t.title}</div>
            {t.artist ? <div style={{ fontSize: 13, color: '#666' }}>{t.artist}</div> : null}
          </article>
        ))}
      </div>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 18 }}>
        {pageNum > 1 ? (
          <Link href={`/catalog/page/${pageNum - 1}`}><a><button>Prev</button></a></Link>
        ) : <button disabled>Prev</button>}

        <div style={{ alignSelf: 'center' }}>Page {pageNum} of {pages}</div>

        {pageNum < pages ? (
          <Link href={`/catalog/page/${pageNum + 1}`}><a><button>Next</button></a></Link>
        ) : <button disabled>Next</button>}
      </nav>
    </div>
  );
}
