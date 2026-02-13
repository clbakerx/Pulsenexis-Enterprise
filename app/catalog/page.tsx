// app/catalog/packs/page.tsx
import { Suspense } from "react";
import CatalogPacksClient from "./CatalogPacksClient";


export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading packs…</div>}>
      <CatalogPacksClient />
    </Suspense>
  );
}
