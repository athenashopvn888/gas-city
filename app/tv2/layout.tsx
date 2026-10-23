import type { Metadata } from "next";
import CigaretteStateProvider from "../components/CigaretteStateProvider";
import { getCigaretteSnapshot, toPublicCigaretteState } from "../lib/cigaretteFeed";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gas City Cannabis In-Store Accessories Display",
  description: "Operational in-store accessories menu display for GAS CITY CANNABIS.",
  robots: { index: false, follow: false },
};

export default async function TvTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cigarettes = toPublicCigaretteState(await getCigaretteSnapshot());
  return <CigaretteStateProvider value={cigarettes}>{children}</CigaretteStateProvider>;
}
