import { Suspense } from "react";
import CatalogClient from "../CatalogPacksClient";


export default function Page() {
  return (
    <Suspense fallback={null}>
      <CatalogClient />
    </Suspense>
  );
}
