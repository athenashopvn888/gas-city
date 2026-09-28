export type AuthorityPage = { path:string; eyebrow:string; title:string; summary:string; body:string; menuHref:string; menuLabel:string; faqs:{q:string;a:string}[] };

export const AUTHORITY_PAGES: Record<string, AuthorityPage> = {
  geo: {
    path: "/weed-dispensary-oconnor-east-york",
    eyebrow: "O'Connor Drive · East York",
    title: "Weed Dispensary on O'Connor Drive in East York",
    summary: "A practical guide to Gas City Cannabis, its five flower tiers, and the walk-in counter at 985 O'Connor Dr.",
    body: "Gas City Cannabis is a walk-in dispensary at 985 O'Connor Dr in East York. The counter carries five flower tiers, from budget up to exotic, along with pre-rolls, edibles, concentrates and vapes. It is the O'Connor Drive stop for East York and nearby Parkview Hills and Woodbine Gardens households. Check the live menu before you leave, then bring photo ID showing you are 19 or older.",
    menuHref: "/exotic",
    menuLabel: "Browse flower tiers",
    faqs: [
      { q: "Where is Gas City Cannabis?", a: "At 985 O'Connor Dr in Toronto, on O'Connor Drive in East York." },
      { q: "Can I compare flower tiers before visiting?", a: "Yes. The site has dedicated Exotic, Premium, AAA+, AA and Budget Cannabis Flower pages." },
    ],
  },
  cigarettes: {
    path: "/native-cigarettes-oconnor-east-york",
    eyebrow: "Adult cigarette shelf · O'Connor Drive",
    title: "Native Cigarettes on O'Connor Drive in East York",
    summary: "Check the current cigarette category before visiting the Gas City counter on O'Connor Drive.",
    body: "Gas City keeps a cigarette shelf beside the cannabis counter on O'Connor Drive. The menu has listed BB full and lights cartons, Canadian Classics, Canadian Goose, Canadian Full and Lights, Nexus, Belmont king packs, Time and Rolled Gold, plus Backwoods and Grabba. Check the cigarette page before you drive over, because popular cartons go fast. Photo ID showing 19+ is required.",
    menuHref: "/items/cigarettes",
    menuLabel: "Check cigarette category",
    faqs: [
      { q: "Where can I check the cigarette selection?", a: "Use the current cigarette category before visiting because listings can change." },
      { q: "What ID is required?", a: "Adults 19+ need government-issued photo ID at the counter." },
    ],
  },
  vape: {
    path: "/nicotine-vape-oconnor-east-york",
    eyebrow: "Adult nicotine products · O'Connor Drive",
    title: "Nicotine Vapes on O'Connor Drive in East York",
    summary: "Browse nicotine disposables, pods and pouches separately from the THC vape shelf.",
    body: "East York customers can buy nicotine disposables and pods at the O'Connor Drive counter. The menu has carried Envi Dripn, Geek Pro Max, Nexa Pix and OVNS disposables, Zpods refills, and both Zyn and Velo pouches. Flavours rotate often, so open the vape-disposables page first. Nicotine products are for adults 19+ and are kept separate from THC vapes.",
    menuHref: "/items/vape-disposables",
    menuLabel: "Check nicotine vape category",
    faqs: [
      { q: "Are nicotine and THC vapes the same category?", a: "No. Nicotine products and THC vape products are listed separately." },
      { q: "Does this page guarantee a flavour is available?", a: "No. Flavours rotate, so check the current category and ask staff." },
    ],
  },
};
