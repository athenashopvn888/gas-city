import strainGuideData from "./strainGuides.json";

/** GCC01 strain guides (50). Educational only: no prices, no potency numbers, no stock promises. Lineage is "commonly reported". */
export type StrainGuide = { slug: string; name: string; type: string; group: "indica" | "sativa" | "hybrid"; lineage: string; aroma: string; note: string; intro: string; about: string; tip: string; faq: { q: string; a: string }; compare: string[]; local: string; closer: string; h1: string; title: string; description: string };

export const STRAIN_GUIDE_STORE = {
  "code": "GCC01",
  "name": "Gas City Cannabis",
  "domain": "www.gascitycannabis.com",
  "street": "985 O'Connor Dr",
  "address": "985 O'Connor Dr, East York, ON M4B 2T1",
  "area": "East York",
  "near": "O'Connor Drive",
  "phone": "+1 (437) 466-0318",
  "hours": "open daily from 11 AM to 3 AM",
  "delivery": true,
  "menuHref": "/"
} as const;

export const STRAIN_GUIDES = strainGuideData as StrainGuide[];
export const getStrainGuide = (slug: string) => STRAIN_GUIDES.find((guide) => guide.slug === slug);
