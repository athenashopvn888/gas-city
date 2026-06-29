import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://gascitycannabis.com"),
  title: {
    default: "GAS CITY CANNABIS | O'Connor Dr Dispensary",
    template: "%s | GAS CITY CANNABIS",
  },
  description:
    "GAS CITY CANNABIS is a cannabis dispensary on O'Connor Dr with adult 19+ store info and category browsing for flower, pre-rolls, vapes, edibles, concentrates, and accessories. Open Daily: 10:00 AM - 03:00 AM.",
  keywords: [
    "cannabis dispensary GTA",
    "weed store GTA",
    "exotic flower GTA",
    "premium cannabis",
    "GAS CITY CANNABIS",
    "cheap weed GTA",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles GTA",
    "vapes",
    "pre-rolls",
    "native cigarettes GTA",
    "weed store Mississauga",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://gascitycannabis.com",
    siteName: "GAS CITY CANNABIS",
    title: "GAS CITY CANNABIS — Premium GTA Cannabis Dispensary",
    description:
      "200+ strains from $3/g. Exotic to Budget. GTA's uplifting dispensary at 985 O'Connor Dr. Open Daily: 10:00 AM - 03:00 AM.",
    images: [
      {
        url: "https://gascitycannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "GAS CITY CANNABIS — Premium Cannabis Dispensary GTA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GAS CITY CANNABIS — GTA's Uplifting Dispensary",
    description: "200+ strains from $3/g. Open Daily: 10:00 AM - 03:00 AM at 985 O'Connor Dr, GTA.",
    images: ["https://gascitycannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
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
    canonical: "https://gascitycannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://gascitycannabis.com",
  name: "GAS CITY CANNABIS",
  description: "Cannabis dispensary at 985 O'Connor Dr in GTA, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open Daily: 10:00 AM - 03:00 AM.",
  url: "https://gascitycannabis.com",
  telephone: "+16476381494",
  image: "https://gascitycannabis.com/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "985 O'Connor Dr",
    addressLocality: "GTA",
    addressRegion: "ON",
    postalCode: "M4B 2T1",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7086100,
    longitude: -79.3101300,
  },
  openingHoursSpecification: [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "10:00",
    "closes": "03:00"
  }
],
  sameAs: [
    "https://gascitycannabis.com/",
    "https://gascitycannabis.com/",
  ],
  hasMap: "https://gascitycannabis.com/",
  areaServed: {
    "@type": "City",
    name: "GTA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="GTA" />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
