import * as React from "react";
import { CartProvider } from "./providers";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
