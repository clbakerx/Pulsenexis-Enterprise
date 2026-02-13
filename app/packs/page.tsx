import { Suspense } from "react";
import PacksClient from "./PacksClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading packs…</div>}>
      <PacksClient />
    </Suspense>
  );
}
