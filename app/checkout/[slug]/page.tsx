// app/checkout/[slug]/page.tsx
import { redirect } from "next/navigation";

const STRIPE_PACK_CHECKOUT_URL = "https://buy.stripe.com/fZu3cv7En2751uh8lv4ZG0l";

export default function CheckoutRedirect() {
  redirect(STRIPE_PACK_CHECKOUT_URL);
}
