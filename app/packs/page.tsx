import { Suspense } from "react";
import PacksClient from "./PacksClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PacksClient />
    </Suspense>
  );
}
