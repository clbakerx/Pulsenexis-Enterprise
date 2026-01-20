import type { CheckoutSku } from "@/lib/checkoutCatalog";

export async function startCheckout(sku: CheckoutSku, quantity = 1) {
  const res = await fetch("/api/checkout/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sku, quantity }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error ?? "Checkout failed");

  window.location.href = data.url;
}
