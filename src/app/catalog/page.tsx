export const dynamic = 'force-dynamic';        // avoid stale cache during dev
export const runtime = 'nodejs';               // if you use fs or path anywhere

import Link from 'next/link';

export default async function Page() {
  return (
    <div style={{ maxWidth: 960, margin: '2rem auto', padding: 16 }}>
      <h1>Catalog</h1>
      <p>Open the paginated catalog:</p>
      <Link href="/catalog/page/1"><a><button>View catalog (page 1)</button></a></Link>
    </div>
  );
}
