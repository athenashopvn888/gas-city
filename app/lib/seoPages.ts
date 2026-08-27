const NATIVE_HERO_DISCLOSURE = "Brand preview only. Selection varies by store; check the current cigarette menu before visiting.";

const NATIVE_HERO_PRODUCTS = [
  { name: "BB Lights", image: "/products/1001-BB-LIGHTS-CARTONS.webp" },
  { name: "BB Full", image: "/products/1003-BB-FULL-CARTON.webp" },
  { name: "Canadian Lights", image: "/products/1005-CANADIAN-LIGHTS.webp" },
  { name: "Canadian Full", image: "/products/1006-CANADIAN-FULL.webp" },
  { name: "Canadian Classics Silver", image: "/products/1015-CANADIAN-CLASSICS-SILVER.webp" },
  { name: "Canadian Menthol", image: "/products/1013-CANADIAN-MENTHOL.webp" },
] as const;

export interface SeoPageData {
  slug: string;
  title: string;
  absoluteTitle?: boolean;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  banner?: string;
  heroPreview?: {
    eyebrow: string;
    intro: string;
    products: readonly { name: string; image: string; sourceSlug?: string }[];
    disclosure: string;
    theme?: "cigarettes" | "nicotine";
    menuHref?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    identityStrip?: string;
    featuredHeading?: string;
    featuredIntro?: string;
    warning?: string;
  };
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    "slug": "toronto-weed-dispensary",
    "title": "Gas City Cannabis Weed Dispensary in Toronto",
    "metaDescription": "Gas City Cannabis is a weed dispensary in Toronto with flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and shopper resources.",
    "h1": "Gas City Cannabis Weed Dispensary in Toronto",
    "icon": "*",
    "heroTagline": "Menu shopping around East York / O'Connor",
    "sections": [
      {
        "heading": "Shop Gas City Cannabis With A Plan",
        "body": "Gas City Cannabis helps adults compare the menu without overcomplicating the visit. Start with the store page, then choose the category that matches the visit: flower, pre-rolls, edibles, THC vapes, concentrates, accessories, or cigarettes where listed."
      },
      {
        "heading": "Local Menu Notes For East York / O'Connor",
        "body": "If you searched for a weed dispensary in East York / O'Connor or a cannabis dispensary in Toronto, use this page to get oriented. East York / O'Connor, O'Connor Dr, East York, Woodbine Ave are useful local cues, but the current menu and staff are the right place for details that change."
      },
      {
        "heading": "What To Check Before Visiting",
        "body": "Confirm the store page, directions, contact options, listed hours, and menu category first. For current product names, prices, and package details, use the menu or ask staff before leaving."
      }
    ],
    "faqs": [
      {
        "q": "Is Gas City Cannabis a cannabis dispensary in Toronto?",
        "a": "Yes. Gas City Cannabis serves shoppers looking for a cannabis dispensary in Toronto. Use the store page for directions, contact options, and listed hours."
      },
      {
        "q": "What should I check before visiting Gas City Cannabis?",
        "a": "Start with the store page, then use the current menu to compare product names, formats, prices, and item notes."
      },
      {
        "q": "Does Gas City Cannabis carry flower and pre-rolls?",
        "a": "The site has menu categories for flower tiers and pre-rolls. Check the current menu or ask staff for current details."
      }
    ]
  },
  {
    "slug": "cheap-weed-toronto",
    "title": "Gas City Cannabis Cheap Weed and Budget Weed Guide",
    "metaDescription": "A value-minded Gas City Cannabis guide for cheap weed, budget weed, affordable weed, and flower tier shopping in Toronto.",
    "h1": "Gas City Cannabis Cheap Weed and Budget Weed Guide",
    "icon": "$",
    "heroTagline": "Value shopping with clearer category choices",
    "sections": [
      {
        "heading": "Start With Budget And AA",
        "body": "If cheap weed or affordable weed is the mission, start with the Budget and AA flower lanes before jumping around the rest of the menu. That keeps the comparison clean."
      },
      {
        "heading": "Compare The Current Menu",
        "body": "Look at product name, format, weight, posted price, and item notes. Menus change, so use this page for the shopping method and the live menu or staff for current details."
      },
      {
        "heading": "Know When To Move Up",
        "body": "If Budget or AA does not fit the visit, compare AAA+, Premium, or Exotic flower next. A better tier choice starts with the category, then the current product details."
      }
    ],
    "faqs": [
      {
        "q": "Where should value shoppers start at Gas City Cannabis?",
        "a": "Start with Budget and AA flower, then compare current menu details before choosing."
      },
      {
        "q": "Does affordable weed mean guessing?",
        "a": "No. Compare the category, product name, format, size, posted price, and item notes. Ask staff if anything is unclear."
      },
      {
        "q": "Where can shoppers confirm current prices?",
        "a": "Use the current menu or ask staff for the prices and item details currently listed."
      }
    ]
  },
  {
    "slug": "native-cigarettes-toronto",
    "title": "Gas City Cannabis Native Cigarettes Resource",
    "metaDescription": "Gas City Cannabis Native cigarettes resource with brand names shown on the menu and $25 carton notes where listed.",
    "h1": "Gas City Cannabis Native Cigarettes Resource",
    "icon": "#",
    "heroTagline": "$25 carton notes and brand names where listed",
    "heroPreview": {
      "eyebrow": "Gas City Cannabis · 985 O'Connor Dr, Toronto",
      "intro": "Cigarette category and visit information for O'Connor Drive",
      "products": NATIVE_HERO_PRODUCTS,
      "disclosure": NATIVE_HERO_DISCLOSURE
    },
    "sections": [
      {
        "heading": "Start With The Cigarette Category",
        "body": "The cigarette menu may show carton-style Native smoke options around $25, with brand names such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, Canadian Menthol, Canadian Classics Original, and Canadian Classics Silver. Check the current menu or ask staff before making the trip."
      },
      {
        "heading": "Keep Cannabis And Smokes Separate",
        "body": "If you are also shopping flower, pre-rolls, edibles, THC vapes, or concentrates, compare those categories separately. It keeps the visit cleaner."
      },
      {
        "heading": "Confirm What Matters Today",
        "body": "Specific brands, carton options, and prices can change. Use this resource for the shopping path, then confirm current details with the menu or staff."
      }
    ],
    "faqs": [
      {
        "q": "Does Gas City Cannabis list Native cigarette options?",
        "a": "The menu may show Native smoke brands such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, and Canadian Menthol. Confirm current options before visiting."
      },
      {
        "q": "Are $25 cartons guaranteed?",
        "a": "This page points shoppers toward menu listings where $25 carton-style options are shown. Check the current listed price and package details before choosing."
      },
      {
        "q": "Where should shoppers start?",
        "a": "Open the cigarette category, then use the store page for directions, contact options, and listed hours."
      }
    ]
  },
  {
    "slug": "weed-store-near-east-york-o-connor",
    "title": "Weed Store Near East York / O'Connor | Gas City Cannabis",
    "metaDescription": "Looking for a weed store near East York / O'Connor? Use Gas City Cannabis for store-page checks, menu categories, and local visit planning in Toronto.",
    "h1": "Weed Store Near East York / O'Connor",
    "icon": ">",
    "heroTagline": "Local visit notes for East York / O'Connor, O'Connor Dr, East York, Woodbine Ave",
    "sections": [
      {
        "heading": "Confirm The Right Store Page",
        "body": "When you search for a weed store near East York / O'Connor, open the Gas City Cannabis store page first. Confirm directions, contact options, listed hours, and the menu category before visiting."
      },
      {
        "heading": "Choose The Product Category",
        "body": "Flower, pre-rolls, edibles, THC vapes, concentrates, and accessories all shop differently. Pick the category first, then compare current product details."
      },
      {
        "heading": "Use Staff For The Close Call",
        "body": "If one detail decides the visit, ask staff. That is the cleanest way to handle current product questions."
      }
    ],
    "faqs": [
      {
        "q": "What is the best first step for a East York / O'Connor visit?",
        "a": "Open the Gas City Cannabis store page, then use the current menu category that matches the visit."
      },
      {
        "q": "Should shoppers rely on old blog prices?",
        "a": "No. Use the current menu or staff for details that change."
      },
      {
        "q": "What categories can shoppers compare?",
        "a": "Use the menu categories for flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes where listed."
      }
    ]
  },
  {
    "slug": "dispensary-near-me-toronto",
    "title": "Cannabis Dispensary Near Me in Toronto | Gas City Cannabis",
    "metaDescription": "Use Gas City Cannabis when searching for a cannabis dispensary near me in Toronto; compare menu categories and confirm current details before visiting.",
    "h1": "Cannabis Dispensary Near Me in Toronto",
    "icon": "o",
    "heroTagline": "Store page first, menu category second",
    "sections": [
      {
        "heading": "Make The Search Useful",
        "body": "Gas City Cannabis gives nearby shoppers a clear path to the store page, menu categories, and resources."
      },
      {
        "heading": "Compare Categories Naturally",
        "body": "Use normal shopping language: cannabis dispensary in Toronto, weed dispensary in East York / O'Connor, cheap weed, budget weed, premium flower, pre-rolls, edibles, THC vapes, and concentrates. The point is to help the shopper, not stuff a sentence."
      },
      {
        "heading": "Check Current Details",
        "body": "For current product names, prices, and package details, use the menu or ask staff. This page is for orientation and visit planning."
      }
    ],
    "faqs": [
      {
        "q": "Is Gas City Cannabis useful for a near-me cannabis search?",
        "a": "Yes. Use the store page to confirm Gas City Cannabis, then open the menu category that matches your visit."
      },
      {
        "q": "Can shoppers browse before visiting?",
        "a": "Yes. Use the current menu and resources section before heading over."
      },
      {
        "q": "What should shoppers avoid?",
        "a": "Avoid guessing from old examples. Confirm current details with the menu or staff."
      }
    ]
  },
  {
    slug: "nicotine-vapes-toronto",
    title: "Nicotine Vapes in Toronto | GAS CITY CANNABIS",
    absoluteTitle: true,
    metaDescription:
      "Adults 19+: review six verified nicotine vape product pages from GAS CITY CANNABIS in Toronto, then check /items/vapes for the current category. Nicotine is addictive.",
    h1: "Nicotine Vapes at GAS CITY CANNABIS",
    icon: "NV",
    heroTagline: "Adults 19+ · Nicotine is addictive.",
    heroPreview: {
      eyebrow: "GAS CITY CANNABIS • EAST YORK / O'CONNOR • ADULTS 19+",
      intro:
        "Searching for nicotine vapes near me around East York or O'Connor? This adult-only GAS CITY CANNABIS guide features six verified VAPE PENS product pages. Compare the supported product names, then use /items/vapes for the current nicotine category. Product details can change. Nicotine is addictive.",
      products: [
        {
          name: "ENVI DRIP’N 5% — 28K Puffs",
          image:
            "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1092-Envi-Dripn-28K.webp",
          sourceSlug: "envi-dripn-5-28k-puffs",
        },
        {
          name: "Geek Promax 5% — 30K Puffs",
          image:
            "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/GEEK-PROMAX.jpg",
          sourceSlug: "geek-promax-5-30k-puffs",
        },
        {
          name: "Geek Universe — 25K Puffs",
          image:
            "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/geek_universe_pulse_x_25k.webp",
          sourceSlug: "geek-universe-25k-puffs",
        },
        {
          name: "NEXA PIX — 30K Puffs — Many Flavors",
          image:
            "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/nexa_showcase_600x600.webp",
          sourceSlug: "nexa-pix-30k-puffs-many-flavors",
        },
        {
          name: "OVNS 10000 5% — 10K Puffs",
          image:
            "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1081OVNS10000.jpg",
          sourceSlug: "ovns-10000-5-10k-puffs",
        },
        {
          name: "OVNS Disposable 5% — 8 mL — Many Flavors",
          image:
            "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/OVNS500x500HQ.webp",
          sourceSlug: "ovns-disposable-5-8ml-many-flavors",
        },
      ],
      disclosure:
        "Featured cards are verified starting points, not guarantees of current stock, price or availability.",
      theme: "nicotine",
      menuHref: "/items/vapes",
      primaryLabel: "Browse Nicotine Vapes",
      secondaryLabel: "Compare the Six Featured Items",
      secondaryHref: "#featured-vapes",
      identityStrip:
        "GAS CITY CANNABIS | East York / O'Connor | Adults 19+ | Nicotine is addictive.",
      featuredHeading: "Six Verified GAS CITY CANNABIS Vape Cards",
      featuredIntro:
        "This shortlist contains verified ENVI, Geek, NEXA and OVNS VAPE PENS product pages. Use each card for its supported display name, then rely on /items/vapes for the current GAS CITY CANNABIS category listing.",
      warning: "Adults 19+. Nicotine is addictive.",
    },
    sections: [
      {
        heading: "Read Each Product Format Carefully",
        body: "One verified listing explicitly identifies an OVNS disposable. Keep that format attached only to its own product, and do not relabel another featured item unless its current page verifies the same format.",
      },
      {
        heading: "Puff Counts Identify Listings",
        body: "Several verified names include puff counts. Use those numbers to distinguish the listings, not as guarantees of duration, performance or superiority.",
      },
      {
        heading: "Keep Nicotine and Cannabis Vape Routes Separate",
        body: "This adult-only GAS CITY CANNABIS guide uses VAPE PENS products under /items/vapes. THC and cannabis vape products under /items/vape-disposables are excluded.",
      },
      {
        heading: "Review the Current Toronto Category",
        body: "Before choosing, open /items/vapes and the individual product page for current supported details. This guide does not claim prices, stock or guaranteed availability.",
      },
    ],
    faqs: [
      {
        q: "Where should I check GAS CITY CANNABIS’s current nicotine selection?",
        a: "Use /items/vapes. The six featured cards are verified starting points while the current category listing controls selection information.",
      },
      {
        q: "Is a disposable nicotine vape represented?",
        a: "Yes. The verified set includes OVNS Disposable 5% — 8 mL — Many Flavors. Check its current product page for updated details.",
      },
      {
        q: "Does this page include cannabis vapes?",
        a: "No. It covers nicotine products from the VAPE PENS category for adults 19+. THC and cannabis vape products under /items/vape-disposables are excluded.",
      },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}

