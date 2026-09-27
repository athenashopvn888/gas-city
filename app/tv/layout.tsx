import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gas City Cannabis In-Store Flower Display",
  description: "Operational in-store flower menu display for GAS CITY CANNABIS.",
  robots: { index: false, follow: false },
};

export default function TvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
