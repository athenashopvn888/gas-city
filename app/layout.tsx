import { cigaretteSafeContent, SHOW_CIGARETTES } from "./lib/siteConfig";
import CigaretteStateProvider from "./components/CigaretteStateProvider";
import FleetContentProvider from "./components/FleetContentProvider";
import FullNameNap from "./components/FullNameNap";
import PinnedNavClearance from "./components/PinnedNavClearance";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getPublicCigaretteFlags } from "./lib/cigaretteFeed";
import { CODED_PAGES } from "./lib/fleet/coded";
import { getFleetContent } from "./lib/fleetContent";
import { STORE, storeSchema } from "./lib/storeIdentity";
import { HOME_DOC_TITLE } from "./lib/homeDelivery";

export const revalidate = 300;

const metadata: Metadata = cigaretteSafeContent({
  metadataBase: new URL("https://www.gascitycannabis.com"),
  title: {
    default: HOME_DOC_TITLE,
    template: "%s | GAS CITY CANNABIS",
  },
  description:
    "GAS CITY CANNABIS is a cannabis dispensary on O'Connor Dr with adult 19+ store info and category browsing for flower, pre-rolls, vapes, edibles, concentrates, and accessories. Open daily 11:00 AM - 3:00 AM.",
  keywords: [
    "cannabis dispensary East York",
    "weed store East York",
    "exotic flower East York",
    "premium cannabis",
    "GAS CITY CANNABIS",
    "cheap weed East York",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles East York",
    "vapes",
    "pre-rolls",
    "native cigarettes East York",
    "weed store East York",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.gascitycannabis.com",
    siteName: "GAS CITY CANNABIS",
    title: HOME_DOC_TITLE,
    description:
      "Browse flower tiers and cannabis categories at GAS CITY CANNABIS on O'Connor Dr in East York. Open daily 11:00 AM - 3:00 AM.",
    images: [
      {
        url: "https://www.gascitycannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "GAS CITY CANNABIS - Cannabis Dispensary East York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_DOC_TITLE,
    description: "Browse GAS CITY CANNABIS categories at 985 O'Connor Dr in East York.",
    images: ["https://www.gascitycannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.gascitycannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  const home = fleet.pages.Home;
  const coded = CODED_PAGES.Home;
  if (
    home.description === coded.description
    && home.metaTitle === coded.metaTitle
    && home.metaDescription === coded.metaDescription
  ) {
    return metadata;
  }
  const description = home.metaDescription || home.description;
  return {
    ...metadata,
    ...(home.metaTitle ? { title: { absolute: home.metaTitle } } : {}),
    description,
    openGraph: {
      ...metadata.openGraph,
      ...(home.metaTitle ? { title: home.metaTitle } : {}),
      description,
    },
  };
}

/* JSON-LD Structured Data */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
  { ...storeSchema(), additionalType: "https://schema.org/Store",
  name: "Gas City Cannabis Dispensary Weed Delivery",
  alternateName: "Gas City Cannabis",
  description: "Cannabis dispensary at 985 O'Connor Dr in East York, ON, with category browsing and store information for adults 19+.",
  url: "https://www.gascitycannabis.com",
  telephone: "+14374660318",
  image: "https://www.gascitycannabis.com/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "985 O'Connor Dr",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M4B 2T1",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7086100,
    longitude: -79.3101300,
  },
  sameAs: [
    "https://www.gascitycannabis.com/",
    "https://www.google.com/maps/place/?q=place_id:ChIJXS-WHh_N1IkR7ZP8wWjQBTk",
  ],
  hasMap: "https://www.google.com/maps/place/?q=place_id:ChIJXS-WHh_N1IkR7ZP8wWjQBTk",
  areaServed: {
    "@type": "City",
    name: "East York",
  } },
  { "@type": "WebSite", "@id": `${STORE.url}/#website`, url: STORE.url, name: STORE.name },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fleet = await getFleetContent();
  const cigarettes = await getPublicCigaretteFlags(fleet);
  return (
    <html lang="en">
      <head>
        <meta name="fleet-content-version" content={fleet.version} />
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="East York" />
        <meta name="geo.position" content="43.7086100;-79.3101300" />
        <meta name="ICBM" content="43.7086100, -79.3101300" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cigaretteSafeContent(jsonLd)).replace(/</g, "\\u003c") }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T74HZ36EV9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T74HZ36EV9');
            `
          }}
        />
      </head>
      <body>
        <FleetContentProvider value={fleet.active ? { active: true, version: fleet.version, nap: fleet.nap, banners: fleet.banners } : undefined}>
          <CigaretteStateProvider value={fleet.active ? { ...cigarettes, web: SHOW_CIGARETTES ? cigarettes.web : false } : undefined}>
            <Link className="deliveryAnnouncement" href="/delivery">
              NEW DELIVERY MENU IS HERE — CLICK TO EXPLORE
            </Link>
            {children}
            <FullNameNap />
            <PinnedNavClearance />
          </CigaretteStateProvider>
        </FleetContentProvider>
      </body>
    </html>
  );
}
