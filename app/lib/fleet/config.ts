import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { STORE } from "../storeIdentity.ts";
import type { Nap, ResolvedBanner, ResolvedPage } from "./types.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 */
export const FLEET_STORE_CODE = "GCC01";
export const FLEET_STORE_NAME = "Gas City Cannabis";
export const FLEET_AREA = "O'Connor / East York";
export const FLEET_DOMAIN = "www.gascitycannabis.com";
export const FLEET_DOMAINS = ["www.gascitycannabis.com", "gascitycannabis.com"] as const;
export const FLEET_ORIGIN = "https://www.gascitycannabis.com";

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#111827",
  bannerText: "#ffffff",
  accent: "#f59e0b",
  background: "#170b03",
} as const;

/**
 * Digits or formatted numbers. An article containing any of these is dropped.
 * Copy that names a blocked desk is dropped separately, without listing those numbers here.
 */
export const FLEET_BLOCKED_PHONES: readonly string[] = [];

export const FLEET_ARTICLES_PATH = "/articles";

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Fullscreen takeover defaults: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

/**
 * Coded homepage banners. Copy and art match FleetAnnouncementBanner and the
 * category images in app/lib/corePromotionBanners.ts. Hours stay 11:00-03:00.
 */
export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/exotic",
    categoryName: "Exotic Weed",
    hidden: false,
    render: "image",
    image: "/banners/core-top-weed.webp",
    codedImage: "/banners/core-top-weed.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} Exotic, Premium and AAA+ flower tiers`,
    title: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    textBar: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    caption: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/items/vapes",
    categoryName: "Nicotine Vapes",
    hidden: false,
    render: "image",
    image: "/banners/core-vapes-nicotine-thc.webp",
    codedImage: "/banners/core-vapes-nicotine-thc.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} nicotine and THC vape categories`,
    title: "Nicotine + THC vapes",
    textBar: "Nicotine + THC vapes",
    caption: "Nicotine + THC vapes",
  },
  {
    id: "cigarettes",
    page: "Home",
    spot: "Coded cigarette banner",
    href: "/items/cigarettes",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-cigarette-mix-match.webp",
    codedImage: "/banners/core-cigarette-mix-match.webp",
    imageWidth: 2048,
    imageHeight: 768,
    alt: `${FLEET_STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`,
    title: "2 PACKS $5 / $25 CARTON",
    textBar: "2 PACKS $5 / $25 CARTON",
    caption: "2 PACKS $5 / $25 CARTON",
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/items/cigarettes",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-premium-cigarettes.webp",
    codedImage: "/banners/core-premium-cigarettes.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
    title: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    textBar: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
  },
  {
    id: "welcome",
    page: "Home",
    spot: "Promo banner 3",
    href: "/",
    categoryName: "Welcome",
    hidden: false,
    render: "image",
    image: "/banners/welcome_banner.webp",
    codedImage: "/banners/welcome_banner.webp",
    alt: "Welcome to GAS CITY CANNABIS — East York Cannabis Dispensary",
    title: "Welcome to GAS CITY CANNABIS — East York Cannabis Dispensary",
    textBar: "",
    caption: "",
  },
];

/** Coded STORE_INFO. Hours are the store's 11:00-03:00 label, not an all-day claim. */
export const CODED_NAP: Nap = {
  name: FULL_NAME_NAP.fullName,
  street: STORE.streetAddress,
  city: STORE.locality,
  province: STORE.region,
  postalCode: STORE.postalCode,
  cityLine: `${STORE.locality}, ${STORE.region} ${STORE.postalCode}`,
  area: FULL_NAME_NAP.neighbourhood,
  intersection: FULL_NAME_NAP.intersection,
  areaLine: FULL_NAME_NAP.neighbourhood,
  phoneDisplay: FULL_NAME_NAP.phoneDisplay,
  phoneTel: STORE.phoneE164,
  hours: STORE.hoursLabel,
  mapsSearchUrl: FULL_NAME_NAP.mapsUrl,
  mapsEmbedUrl: FULL_NAME_NAP.mapsUrl,
  lat: "43.7086100",
  lng: "-79.3101300",
  schemaName: FULL_NAME_NAP.fullName,
  website: STORE.url,
};

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description:
      "GAS CITY CANNABIS is a cannabis dispensary on O'Connor Dr with adult 19+ store info and category browsing for flower, pre-rolls, vapes, edibles, concentrates, and accessories. Open daily 11:00 AM - 3:00 AM.",
    metaTitle: "",
    metaDescription:
      "GAS CITY CANNABIS is a cannabis dispensary on O'Connor Dr with adult 19+ store info and category browsing for flower, pre-rolls, vapes, edibles, concentrates, and accessories. Open daily 11:00 AM - 3:00 AM.",
  },
  Contact: {
    description:
      "Visit GAS CITY CANNABIS at 985 O'Connor Dr, East York, ON M4B 2T1. Use this page for store contact and visit information.",
    metaTitle: "Contact Us — GAS CITY CANNABIS | 985 O'Connor Dr, East York",
    metaDescription:
      "Visit GAS CITY CANNABIS at 985 O'Connor Dr, East York, ON M4B 2T1. Use this page for store contact and visit information.",
  },
};
