import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { STORE } from "../storeIdentity.ts";
import { FLEET_STORE_CODE, type Nap, type ResolvedBanner, type ResolvedPage } from "./types.ts";

const STORE_NAME = "Gas City Cannabis";

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
    alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`,
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
    alt: `${STORE_NAME} nicotine and THC vape categories`,
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
    alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`,
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
    alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
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

export function fleetVersion(contentVersion: number | null): string {
  return contentVersion == null ? `${FLEET_STORE_CODE}:coded` : `${FLEET_STORE_CODE}:${contentVersion}`;
}

export function codedBannerFor(id: ResolvedBanner["id"]): ResolvedBanner | undefined {
  return CODED_BANNERS.find((entry) => entry.id === id);
}
