export const STORE = {
  name: "GAS CITY CANNABIS",
  url: "https://www.gascitycannabis.com",
  addressLine: "985 O'Connor Dr, Toronto, ON M4B 2T1",
  streetAddress: "985 O'Connor Dr",
  locality: "Toronto",
  region: "ON",
  postalCode: "M4B 2T1",
  phoneDisplay: "+1 437 466 0318",
  phoneE164: "+14374660318",
  hoursLabel: "Open daily 11:00 AM - 3:00 AM",
  opens: "11:00",
  closes: "03:00",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=985+O%27Connor+Dr+Toronto+ON+M4B+2T1",
} as const;

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export function storeSchema() {
  return {
    "@type": "Store",
    "@id": `${STORE.url}/#store`,
    name: STORE.name,
    url: STORE.url,
    telephone: STORE.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE.streetAddress,
      addressLocality: STORE.locality,
      addressRegion: STORE.region,
      postalCode: STORE.postalCode,
      addressCountry: "CA",
    },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS, opens: STORE.opens, closes: STORE.closes }],
    hasMap: STORE.mapUrl,
  };
}
