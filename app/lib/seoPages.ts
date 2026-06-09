/* ── Geo-targeted SEO landing pages for GTA/Weston keywords ── */

export interface SeoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  banner?: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "york-weed-dispensary",
    title: "GTA Weed Dispensary — GAS CITY CANNABIS | 24 Hours | 985 O'Connor Dr & Nearby Expressway",
    metaDescription: "GAS CITY CANNABIS is GTA's #1 24-hour weed dispensary at 985 O'Connor Dr near Weston. 200+ strains, THC up to 39%, edibles, vapes, concentrates & more. Walk in anytime.",
    h1: "GTA Weed Dispensary — GAS CITY CANNABIS",
    icon: "✨",
    heroTagline: "Premium Cannabis on 985 O'Connor Dr & Nearby Expressway · Open 24 Hours · Walk-In Welcome",
    banner: "",
    sections: [
      {
        heading: "GTA's Premier Cannabis Destination",
        body: "GAS CITY CANNABIS is a premium cannabis dispensary located at 985 O'Connor Dr in the heart of GTA's vibrant 985 O'Connor Dr & Nearby Expressway area. We carry over 200 hand-picked cannabis strains across five quality tiers — from ultra-rare Exotic genetics with THC up to 39% to affordable Budget flower starting at just $3/g. Whether you're a connoisseur seeking the rarest strains or a daily smoker looking for reliable value, GAS CITY CANNABIS has the perfect flower for you. We're proud to be one of GTA's most trusted dispensaries, serving our community 24 hours a day, 7 days a week.",
      },
      {
        heading: "Five Tiers of Quality Cannabis — Transparent Pricing",
        body: "Our unique tier system ensures transparent pricing and quality grading so you always know what you're getting. Exotic ($10-$12/g) features top-shelf, ultra-rare genetics with THC levels reaching 35-39% — these are the strains connoisseurs travel across GTA to find. Premium ($7-$10/g) offers connoisseur-grade strains at THC 32-34%, balancing quality and value. AAA+ ($5-$6/g) delivers heavy hitters at THC 30-32% — our most popular tier for experienced users. AA ($4/g) provides quality daily drivers at THC 27-29%, perfect for regular consumption. Budget ($3/g) offers value ounces from $40 without sacrificing reliability. Every tier is lab-tested, properly cured, and freshly rotated.",
      },
      {
        heading: "Beyond Flower — Edibles, Vapes, Concentrates & More",
        body: "GAS CITY CANNABIS is more than just a flower shop. We carry a comprehensive selection of cannabis edibles (gummies, chocolates, baked goods), vape pens and disposable vapes, concentrates (shatter, wax, hash, diamonds, live resin), pre-rolled joints, magic mushrooms, native cigarettes, rolling papers, and accessories. Our live digital menu at gascitycannabis.com updates in real time so you always know exactly what's in stock before you make the trip.",
      },
      {
        heading: "Open 24 Hours on 985 O'Connor Dr & Nearby Expressway",
        body: "Unlike most dispensaries that close at midnight, GAS CITY CANNABIS is open around the clock — 24 hours a day, 7 days a week, 365 days a year. Whether you're finishing a late shift, heading out for the night, or need something at 3 AM, our doors are always open. We're centrally located at 985 O'Connor Dr, near major transit bus routes, close to major highways and central stations. Free street parking is available near the dispensary.",
      },
      {
        heading: "Unbeatable Promotions on Every Purchase",
        body: "Every purchase at GAS CITY CANNABIS comes with our signature promotions. Our Buy 2g Get 1g FREE deal applies to every single tier — you always get a bonus gram. Our top three tiers (Exotic, Premium, and AAA+) also qualify for Buy 3g Get 3g FREE, effectively doubling your order. Combined with our already competitive pricing, GAS CITY CANNABIS offers some of the best cannabis value in GTA, Toronto, and the surrounding area.",
      },
      {
        heading: "Serving GTA, Toronto & Mississauga",
        body: "GAS CITY CANNABIS proudly serves customers from across the Greater Toronto Area. Whether you're coming from Weston, Mount Dennis, North GTA, Etobicoke, Mississauga, Brampton, or downtown Toronto, we welcome you. Our 24-hour operation means you can visit on your own schedule. Call us at (647) 638-1494 or visit us at 985 O'Connor Dr, GTA, ON M4B 2T1.",
      },
    ],
    faqs: [
      { q: "Where is GAS CITY CANNABIS located?", a: "We are located at 985 O'Connor Dr, GTA, ON M4B 2T1 — in the heart of 985 O'Connor Dr & Nearby Expressway area — one of GTA's most accessible areas. We're near major transit bus routes and close to major highways." },
      { q: "What are the hours for GAS CITY CANNABIS?", a: "We are open 24 hours a day, 7 days a week, 365 days a year. Walk in anytime — no appointment needed. Whether it's 2 PM or 2 AM, our staff is here to help." },
      { q: "What cannabis products does GAS CITY CANNABIS carry?", a: "We carry 200+ strains of cannabis flower across 5 quality tiers (Exotic, Premium, AAA+, AA, Budget), plus edibles, vapes, concentrates, pre-rolls, magic mushrooms, native cigarettes, and accessories. Our menu updates in real time online." },
      { q: "What is the cheapest weed at GAS CITY CANNABIS?", a: "Our Budget tier starts at $3/g with value ounces from $40. Our AA tier is $4/g. Every tier includes our Buy 2g Get 1g FREE promotion, making our prices even more competitive." },
      { q: "Does GAS CITY CANNABIS have a live menu?", a: "Yes! Our online menu at gascitycannabis.com updates in real time with current stock, prices, and availability. You can see exactly what we have before you visit." },
      { q: "What makes GAS CITY CANNABIS different from other GTA dispensaries?", a: "Three things set us apart: (1) We're open 24 hours, (2) our transparent 5-tier pricing system means no confusing markups, and (3) every purchase includes our Buy 2g Get 1g FREE promotion. Plus we carry one of GTA's largest selections with over 200 strains." },
      { q: "Can I check stock before visiting?", a: "Absolutely. Visit gascitycannabis.com to see our live menu. All flower, edibles, vapes, and accessories are listed with real-time stock status, THC levels, and pricing." },
      { q: "Is there parking near GAS CITY CANNABIS?", a: "Yes. Free street parking is available nearby and surrounding residential streets. We're also easily accessible via local transit." },
    ],
  },

  {
    slug: "cheap-weed-york",
    title: "Cheap Weed GTA — Budget Cannabis Deals From $3/g | GAS CITY CANNABIS",
    metaDescription: "Looking for cheap weed in GTA? GAS CITY CANNABIS has budget flower from $3/g, ounces from $40, and Buy 2g Get 1g FREE promos. Open 24 hours at 985 O'Connor Dr.",
    h1: "Cheap Weed GTA — Budget Cannabis Deals",
    icon: "💰",
    heroTagline: "Budget Flower From $3/g · Ounces From $40 · Always Open",
    banner: "",
    sections: [
      {
        heading: "GTA's Best Prices on Quality Cannabis",
        body: "Looking for cheap weed in GTA without sacrificing quality? GAS CITY CANNABIS offers some of the most competitive cannabis prices in the city. Our Budget tier starts at just $3/g with value ounces from $40. Our AA tier ($4/g) and AAA+ tier ($5-$6/g) also deliver incredible value with THC levels from 27% to 32%. We believe great cannabis shouldn't break the bank, and our transparent tier-based pricing ensures you always get exactly what you pay for — no hidden markups, no gimmicks.",
      },
      {
        heading: "Unbeatable Promotions That Stack",
        body: "Every tier at GAS CITY CANNABIS comes with our signature Buy 2g Get 1g FREE promotion — meaning you always get a free gram with every purchase. Our top three tiers (Exotic, Premium, AAA+) also offer Buy 3g Get 3g FREE, effectively doubling your order. When you combine our already low prices with these promos, GAS CITY CANNABIS delivers the best cannabis value in GTA. A $15 AAA+ 3g purchase actually gets you 3g of flower — that's just $5/g for THC 30%+ cannabis.",
      },
      {
        heading: "Budget Doesn't Mean Low Quality",
        body: "At GAS CITY CANNABIS, cheap doesn't mean low quality. Every strain in our Budget and AA tiers delivers reliable potency (THC 24-29%) from trusted Canadian growers. We rotate our inventory frequently to ensure freshness and maintain our quality standards across all price points. Our Budget strains are perfect for rolling, sessions, or anyone who prefers value over premium aesthetics. Our AA tier is a step up — solid daily drivers with consistent effects.",
      },
      {
        heading: "Compare Our Prices",
        body: "Budget: $3/g — $40/oz. AA: $4/g — $90/oz. AAA+: $5-$6/g — $100/oz. Premium: $7-$10/g. Exotic: $10-$12/g. Every tier includes Buy 2g Get 1g FREE. Top tiers include Buy 3g Get 3g FREE. These are some of the lowest prices you'll find at any dispensary in GTA, 985 O'Connor Dr & Nearby Expressway and surrounding areas.",
      },
    ],
    faqs: [
      { q: "What is the cheapest weed at GAS CITY CANNABIS?", a: "Our Budget tier starts at $3/g with value ounces from $40. These are quality, properly-cured strains at GTA's most competitive prices." },
      { q: "Do you have ounce deals?", a: "Yes! Budget ounces from $40, AA ounces from $90, AAA+ ounces from $100. All with excellent quality, freshness guaranteed, and Buy 2g Get 1g FREE promotions on top." },
      { q: "Is cheap weed still good quality?", a: "Absolutely. Our Budget flower delivers THC 24-27% from trusted Canadian growers. We never sell old, dry, or improperly stored flower. Every product meets our quality standards regardless of price point." },
      { q: "Where can I buy cheap weed in GTA?", a: "GAS CITY CANNABIS at 985 O'Connor Dr, GTA. Open 24 hours a day, walk in anytime, no appointment needed. We're in the heart of 985 O'Connor Dr & Nearby Expressway area." },
      { q: "What promotions do you offer?", a: "Every tier includes Buy 2g Get 1g FREE (pay for 2g, get 3g). Our Exotic, Premium, and AAA+ tiers also offer Buy 3g Get 3g FREE (pay for 3g, get 6g). These promos apply on every visit." },
      { q: "Do you offer bulk discounts?", a: "Yes — our ounce pricing is deeply discounted compared to per-gram rates. Budget ounces are $40, AA ounces $90, and AAA+ ounces $100. The more you buy, the more you save." },
    ],
  },

  {
    slug: "native-cigarettes-york",
    title: "Native Cigarettes GTA — Discount Tobacco | GAS CITY CANNABIS",
    metaDescription: "Buy native cigarettes in GTA at GAS CITY CANNABIS. Wide selection of premium and value tobacco brands at the best prices. 985 O'Connor Dr, 985 O'Connor Dr & Nearby Expressway. Open 24/7.",
    h1: "Native Cigarettes GTA — Discount Tobacco",
    icon: "🏷️",
    heroTagline: "Premium & Value Brands · Best Prices in GTA · Open 24 Hours",
    banner: "",
    sections: [
      {
        heading: "GTA's Best Selection of Native Cigarettes",
        body: "GAS CITY CANNABIS carries one of the widest selections of native cigarettes in GTA. Located at 985 O'Connor Dr near 985 O'Connor Dr & Nearby Expressway, we stock a comprehensive range of both premium and value native cigarette brands at competitive prices. Whether you prefer full-flavour, light, menthol, or specialty blends, our tobacco selection has something for every smoker. We're proud to be one of the few stores in GTA that combines a full cannabis dispensary with a comprehensive tobacco counter — one stop for everything you need.",
      },
      {
        heading: "Why GTA Smokers Choose GAS CITY CANNABIS",
        body: "There are three reasons GTA smokers keep coming back to GAS CITY CANNABIS for their cigarettes. First, our prices are among the lowest in the 985 O'Connor Dr & Nearby Expressway area — we buy in volume and pass the savings to our customers. Second, our selection is comprehensive — we carry brands and varieties that many other shops simply don't stock. Third, we're open 24 hours a day, 7 days a week. Need cigarettes at midnight? 3 AM? We're here. No other tobacco shop in GTA offers this level of convenience.",
      },
      {
        heading: "Convenient 985 O'Connor Dr & Nearby Expressway Location",
        body: "Our shop at 985 O'Connor Dr is centrally located in GTA — easily accessible from Weston Rd, Lawrence Ave W, Highway 401, and all major Peel/Toronto routes. Whether you're walking, driving, or taking the bus, GAS CITY CANNABIS is easy to reach. Free evening street parking is available nearby. We serve customers from across GTA including 985 O'Connor Dr & Nearby Expressway and surrounding areas.",
      },
      {
        heading: "More Than Just Cigarettes",
        body: "While you're picking up your cigarettes, browse our full cannabis menu — over 200 strains of flower, plus edibles, vapes, concentrates, pre-rolls, and accessories. Many of our customers appreciate the convenience of getting their cigarettes and cannabis in one trip. Our knowledgeable staff can help you with both sides of our inventory.",
      },
    ],
    faqs: [
      { q: "Does GAS CITY CANNABIS sell native cigarettes?", a: "Yes! We carry one of the widest selections of native cigarettes in GTA, including premium brands, value brands, full-flavour, light, and menthol varieties." },
      { q: "What cigarette brands do you carry?", a: "We stock a comprehensive range of native cigarette brands in multiple varieties. Our selection rotates regularly. Visit us at 985 O'Connor Dr to see our full current inventory and pricing." },
      { q: "Where can I buy cheap cigarettes in GTA?", a: "GAS CITY CANNABIS at 985 O'Connor Dr offers some of the best cigarette prices in GTA's Weston area. We're open 24 hours so you can shop on your own schedule." },
      { q: "Are you open late for cigarette purchases?", a: "We're open 24 hours a day, 7 days a week. Whether you need cigarettes at noon or 3 AM, our doors are always open." },
      { q: "Can I buy cigarettes and cannabis at GAS CITY CANNABIS?", a: "Absolutely. GAS CITY CANNABIS is both a fully-licensed cannabis dispensary and a tobacco retailer. Many customers appreciate the convenience of one stop for both products." },
      { q: "Where is GAS CITY CANNABIS located?", a: "985 O'Connor Dr, GTA, ON M4B 2T1 — in 985 O'Connor Dr & Nearby Expressway area. Near transit routes with free street parking available." },
    ],
  },

  {
    slug: "weed-store-near-toronto",
    title: "Weed Store Near Toronto — GAS CITY CANNABIS",
    metaDescription: "Looking for a weed store near Toronto? GAS CITY CANNABIS at 985 O'Connor Dr, GTA is just minutes away via major highways. 200+ strains, open 24 hours.",
    h1: "Weed Store Near Toronto — GAS CITY CANNABIS",
    icon: "🚗",
    heroTagline: "Just Minutes From Mississauga via major highways · Open 24 Hours",
    banner: "",
    sections: [
      {
        heading: "The Closest Quality Dispensary to Mississauga",
        body: "GAS CITY CANNABIS is one of the closest premium cannabis dispensaries to Toronto. Located at 985 O'Connor Dr in GTA — just minutes up Highway 410 and East on 401 — we're the easiest dispensary to reach when you're coming from the surrounding area. Whether you're driving from Toronto and surrounding areas, GAS CITY CANNABIS is the fastest, most convenient option for top-tier cannabis.",
      },
      {
        heading: "Why Make the Drive to GAS CITY CANNABIS?",
        body: "GAS CITY CANNABIS offers a wider selection and more competitive pricing than most local Peel options. You'll find over 200 strains across five quality tiers — from ultra-rare Exotic genetics (THC 35-39%) to affordable Budget flower at just $3/g. Our Buy 2g Get 1g FREE promotion applies to every tier, and our top three tiers offer Buy 3g Get 3g FREE. With prices starting at $3/g and ounces from $40, GAS CITY CANNABIS delivers value that's worth the short drive from Toronto.",
      },
      {
        heading: "Open 24 Hours — Perfect for Late Night Visits",
        body: "Unlike most dispensaries in Peel Region with limited hours, GAS CITY CANNABIS is open 24 hours a day, 7 days a week. Whether you're heading home from a late shift in Mississauga, going out for the night, or just need a quick pickup after hours, you can stop by GAS CITY CANNABIS anytime. Early morning, late night, weekends, holidays — we're always here.",
      },
      {
        heading: "Directions From Toronto",
        body: "We are located centrally at 985 O'Connor Dr, GTA, making it easy to drive or take transit from Toronto. Total drive time is just a few minutes. Free street parking is available.",
      },
      {
        heading: "Full Menu — Cannabis, Edibles, Vapes & More",
        body: "When you make the trip up to GTA, make it count. GAS CITY CANNABIS carries a full selection including 200+ flower strains, edibles, vape pens, disposable vapes, concentrates (shatter, wax, hash, live resin), pre-rolled joints, magic mushrooms, native cigarettes, and accessories. Check our live online menu at gascitycannabis.com before you visit to see exactly what's in stock.",
      },
    ],
    faqs: [
      { q: "How far is GAS CITY CANNABIS from Mississauga?", a: "We're located at 985 O'Connor Dr in GTA — just a 15-20 minute drive from central Mississauga via Highway 401 East." },
      { q: "Is it worth driving from Mississauga for cannabis?", a: "Absolutely. GAS CITY CANNABIS offers 200+ strains, prices starting at $3/g, and promotions like Buy 2g Get 1g FREE that make the short drive incredibly worthwhile." },
      { q: "Is GAS CITY CANNABIS open late?", a: "We're open 24 hours a day, 7 days a week. Whether you're driving up from Mississauga at noon or midnight, we're open and ready to serve you." },
      { q: "What's the cheapest weed near Toronto?", a: "GAS CITY CANNABIS has Budget flower from $3/g and value ounces from $40. With our Buy 2g Get 1g FREE promo, these are some of the best prices in the Greater Toronto Area." },
      { q: "Is there parking at GAS CITY CANNABIS?", a: "Yes. Free evening street parking is available near the store and surrounding residential streets." },
      { q: "Can I take transit from Toronto to GAS CITY CANNABIS?", a: "Yes! Local transit connects directly subway and bus routes that will drop you off right near our location." },
      { q: "Do you carry products besides cannabis?", a: "Yes — we also carry native cigarettes, rolling papers, grinders, and other accessories. Many Mississauga customers appreciate the one-stop convenience." },
    ],
  },

  {
    slug: "dispensary-near-me-york",
    title: "Cannabis Dispensary Near Me GTA — GAS CITY CANNABIS | Open 24 Hours",
    metaDescription: "Find a cannabis dispensary near you in GTA. GAS CITY CANNABIS at 985 O'Connor Dr has 200+ strains from $3/g. Open 24 hours. Walk in anytime, no appointment needed.",
    h1: "Cannabis Dispensary Near Me — GTA",
    icon: "🗺️",
    heroTagline: "Walk-In Welcome · Open 24 Hours · 200+ Strains In Stock",
    banner: "",
    sections: [
      {
        heading: "Find Premium Cannabis Near You in GTA",
        body: "If you're searching for a cannabis dispensary near you in GTA, GAS CITY CANNABIS is conveniently located at 985 O'Connor Dr — in the heart of 985 O'Connor Dr & Nearby Expressway area. We serve customers from across GTA, North GTA, Etobicoke, Mississauga, and Toronto.",
      },
      {
        heading: "Why Choose GAS CITY CANNABIS Over Other Dispensaries?",
        body: "What sets GAS CITY CANNABIS apart from other GTA dispensaries is our combination of selection, pricing, and convenience. We carry 200+ strains across five clear quality tiers — no confusing markups, no inconsistent pricing. Our Buy 2g Get 1g FREE promotion applies to every tier, every purchase. And unlike most dispensaries that close at midnight, we're open 24 hours a day, 7 days a week. Whether you need flower, edibles, vapes, or concentrates at any hour, GAS CITY CANNABIS is here.",
      },
      {
        heading: "Areas We Serve in Greater Toronto Area",
        body: "GAS CITY CANNABIS is centrally located and easily accessible from anywhere in GTA and West Toronto. We regularly serve customers from: 985 O'Connor Dr & Nearby Expressway and surrounding areas including GTA, Toronto, and nearby neighbourhoods."
      },
    ],
    faqs: [
      { q: "Where is the closest dispensary in 985 O'Connor Dr & Nearby Expressway?", a: "GAS CITY CANNABIS at 985 O'Connor Dr is conveniently located in the heart of GTA — easily accessible from 985 O'Connor Dr & Nearby Expressway." },
      { q: "Is GAS CITY CANNABIS walk-in friendly?", a: "Absolutely! No appointment needed. Walk in anytime — we're open 24 hours a day, 7 days a week. Our friendly staff is always ready to help." },
      { q: "What neighbourhoods does GAS CITY CANNABIS serve?", a: "We serve all of GTA and surrounding areas, including 985 O'Connor Dr & Nearby Expressway and surrounding areas." },
      { q: "How do I check what's in stock?", a: "Visit gascitycannabis.com for our live menu with real-time stock, pricing, and THC levels for all products." },
      { q: "Do you sell edibles and vapes?", a: "Yes! In addition to 200+ flower strains, we carry edibles (gummies, chocolates), vape pens, disposable vapes, concentrates, pre-rolls, and accessories." },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}
