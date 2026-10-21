const SHOW_CIGARETTES = process.env.NEXT_PUBLIC_SHOW_CIGARETTES?.trim().toLowerCase() === "true";
const cigaretteRedirects = SHOW_CIGARETTES ? [] : [
  { source: "/items/cigarettes/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/cigarettes/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/cigarette/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/items/tobacco/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/tobacco/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/native-cigarettes-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/native-cigarette-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/info/native-cigarettes-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/info/native-cigarette-:slug", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/resources/native-smokes/native-cigarettes-guide", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/resources/native-smokes/backwoods-grabba-guide", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/grabba-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/grabba", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/grabba/:path*", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/item/:slug(.*grabba.*)", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/bb-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/bb-full-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/bb-light-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/belmont-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-classics-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-classics-original-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-classics-silver-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-full-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-goose-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-goose-full-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-goose-light-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/canadian-light-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/nexus-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/nexus-full-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/nexus-light-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/playfare-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/playfare-ultra-light-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/putters-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/rolled-gold-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/rolled-gold-full-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/rolled-gold-light-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/time-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/time-full-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
  { source: "/guides/time-light-delivery-east-york", destination: "/items/vapes", statusCode: 302 as const },
];

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "gascitycannabis.com" },
      { protocol: "https", hostname: "kennedyloudcannabis.com" },
      { protocol: "https", hostname: "stclaircannabis.com" },
      { protocol: "https", hostname: "pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev", pathname: "/products/**" },
      { protocol: "https", hostname: "athena-cannabis-images.vercel.app", pathname: "/products/delivery/v1/**" },
    ],
  },
  async redirects() {
    return [
      ...cigaretteRedirects,
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:path*", destination: "/resources", permanent: true },
      { source: "/info/york-weed-dispensary", destination: "/info/toronto-weed-dispensary", permanent: true },
      { source: "/info/cheap-weed-york", destination: "/info/cheap-weed-toronto", permanent: true },
      { source: "/info/native-cigarettes-york", destination: "/info/native-cigarettes-toronto", permanent: true },
      { source: "/info/weed-store-near-brampton", destination: "/info/weed-store-near-east-york-o-connor", permanent: true },
      { source: "/info/dispensary-near-me-york", destination: "/info/dispensary-near-me-toronto", permanent: true },
      { source: "/edibles", destination: "/items/edibles", permanent: true },
      { source: "/vapes", destination: "/items/vapes", permanent: true },
      { source: "/vape-disposables", destination: "/items/vape-disposables", permanent: true },
      { source: "/concentrates", destination: "/items/concentrates", permanent: true },
      { source: "/prerolls", destination: "/items/prerolls", permanent: true },
      { source: "/add-ons", destination: "/items/add-ons", permanent: true },
      { source: "/cigarettes", destination: "/items/cigarettes", permanent: true },
      { source: "/magic", destination: "/items/magic", permanent: true },
    ];
  },
};

export default nextConfig;

