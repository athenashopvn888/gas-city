import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gas City Cannabis In-Store Accessories Display",
  description: "Operational in-store accessories menu display for GAS CITY CANNABIS.",
  robots: { index: false, follow: false },
};

export default function TvTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
