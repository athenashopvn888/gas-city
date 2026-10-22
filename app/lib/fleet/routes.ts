import { FLEET_ARTICLES_PATH } from "./config.ts";

/** Paths revalidated when a content bundle is published. */
export const FLEET_AFFECTED_PATHS = [
  "/",
  "/contact",
  "/visit",
  "/hours",
  "/faq",
  "/tv",
  "/tv2",
  "/exotic",
  "/premium",
  "/aaa",
  "/aa",
  "/budget",
  "/items/vapes",
  "/items/vape-disposables",
  "/items/edibles",
  "/items/concentrates",
  "/items/prerolls",
  "/items/add-ons",
  "/items/magic",
  "/items/cigarettes",
  "/cigarettes",
  "/delivery",
  "/guides",
  "/resources",
  FLEET_ARTICLES_PATH,
  "/native-cigarettes-oconnor-east-york",
  "/nicotine-vape-oconnor-east-york",
  "/weed-dispensary-oconnor-east-york",
  "/weed-dispensary-toronto",
] as const;

/** Dynamic article pages. Passed to revalidatePath with type "page". */
export const FLEET_DYNAMIC_PATHS = ["/articles/[slug]"] as const;
