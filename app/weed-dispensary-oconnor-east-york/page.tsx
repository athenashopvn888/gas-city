import type { Metadata } from "next"; import AuthorityLanding from "../components/AuthorityLanding"; import {AUTHORITY_PAGES} from "../lib/authorityPages";
export const metadata:Metadata={title:{absolute:"Weed Dispensary | O'Connor Dr, East York | Gas City Cannabis"},description:AUTHORITY_PAGES.geo.summary,alternates:{canonical:"/weed-dispensary-oconnor-east-york"}};
export default function Page(){return <AuthorityLanding page={AUTHORITY_PAGES.geo}/>;}
