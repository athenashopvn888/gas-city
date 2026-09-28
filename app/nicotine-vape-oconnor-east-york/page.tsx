import type { Metadata } from "next"; import AuthorityLanding from "../components/AuthorityLanding"; import {AUTHORITY_PAGES} from "../lib/authorityPages";
export const metadata:Metadata={title:{absolute:"Nicotine Vape | O'Connor Dr, East York | Gas City Cannabis"},description:AUTHORITY_PAGES.vape.summary,alternates:{canonical:"/nicotine-vape-oconnor-east-york"}};
export default function Page(){return <AuthorityLanding page={AUTHORITY_PAGES.vape}/>;}
