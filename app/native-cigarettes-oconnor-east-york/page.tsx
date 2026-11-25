import type { Metadata } from "next";
import AuthorityLanding from "../components/AuthorityLanding";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CigaretteUnavailable from "../components/CigaretteUnavailable";
import { AUTHORITY_PAGES } from "../lib/authorityPages";
import { getCigaretteAccess } from "../lib/cigaretteFeed";

export const metadata: Metadata = {
  title: { absolute: "Native Cigarettes | O'Connor Dr, East York | Gas City Cannabis" },
  description: AUTHORITY_PAGES.cigarettes.summary,
  alternates: { canonical: "/native-cigarettes-oconnor-east-york" },
};

export default async function Page() {
    if ((await getCigaretteAccess()) === "unavailable") {
    return (
      <main>
        <Navbar />
        <div style={{ paddingTop: 120 }}>
          <CigaretteUnavailable />
        </div>
        <Footer />
      </main>
    );
  }
  return <AuthorityLanding page={AUTHORITY_PAGES.cigarettes} />;
}
