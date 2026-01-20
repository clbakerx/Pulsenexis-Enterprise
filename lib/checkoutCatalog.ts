export type CheckoutSku =
  | "rnb_blueprint_instant"
  | "rnb_blueprint_custom"
  | "cinema_pack_cinematic_reveal_vol1"
  | "loop_creator_creator"
  | "loop_creator_pro"
  | "loop_creator_studio";

export const PRICE_BY_SKU: Record<CheckoutSku, string> = {
  rnb_blueprint_instant: process.env.STRIPE_PRICE_RNB_BLUEPRINT_INSTANT!,
  rnb_blueprint_custom: process.env.STRIPE_PRICE_RNB_BLUEPRINT_CUSTOM!,

  cinema_pack_cinematic_reveal_vol1: process.env.STRIPE_PRICE_CINEMA_VOL1!, // add env

  loop_creator_creator: process.env.STRIPE_PRICE_LOOP_CREATOR_CREATOR!,
  loop_creator_pro: process.env.STRIPE_PRICE_LOOP_CREATOR_PRO!,
  loop_creator_studio: process.env.STRIPE_PRICE_LOOP_CREATOR_STUDIO!,
};
