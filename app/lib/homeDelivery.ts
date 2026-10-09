export const HOME_TITLE = "Gas City Cannabis Dispensary - Weed Delivery in East York";
export const HOME_DELIVERY_H2 = "Weed Delivery in East York";
export const HOME_DELIVERY_PARAGRAPHS = [
  "Gas City Cannabis provides a separate local delivery path from the O'Connor Drive storefront in East York. Use the delivery page for the current menu and let the ordering flow confirm the address and next step.",
  "This homepage keeps the service area tied to East York and the O'Connor corridor. It does not turn the store into a far-city delivery directory or promise that every listed item is available at every moment.",
  "Choose STORE MENU to browse the existing flower tiers, or choose Delivery for the local delivery page. Adults 19+ need valid government-issued photo ID.",
] as const;
export const HOME_DELIVERY_CARDS = [
  { href: "/delivery", title: "East York delivery", text: "Open the current delivery page for menu and ordering details." },
  { href: "/weed-dispensary-oconnor-east-york", title: "O'Connor dispensary guide", text: "Review the local storefront and East York visit context." },
  { href: "/faq", title: "Store FAQ", text: "Read answers about the store, ID, menus, and local service." },
  { href: "/visit", title: "Visit Gas City", text: "Use the address and directions page for an O'Connor Drive walk-in." },
] as const;
export const HOME_DELIVERY_FAQS = [
  { q: "Does Gas City Cannabis offer weed delivery in East York?", a: "Gas City Cannabis has a separate delivery page for local East York requests. Current details and the exact address are confirmed through that flow." },
  { q: "Where is Gas City Cannabis?", a: "The storefront is at 985 O'Connor Dr in East York. Use the Visit page for the current address and directions." },
  { q: "How do I start a delivery request?", a: "Open Delivery, review the current menu information, and follow the linked ordering steps." },
  { q: "Where is the store menu?", a: "The gold STORE MENU button opens the existing Exotic flower route at /exotic." },
  { q: "Do I need photo ID?", a: "Yes. Cannabis browsing, walk-in service, and delivery are for adults 19+ with valid government-issued photo ID." },
  { q: "Are homepage listings a live availability promise?", a: "No. Use the delivery or store menu for current details and confirm a specific item through the store's ordering path." },
] as const;

// Document <title> only (exact Google name | area). H1 keeps HOME_TITLE.
export const HOME_DOC_TITLE = "Gas City Cannabis Dispensary Weed Delivery | East York";
