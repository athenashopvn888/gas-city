import type { Metadata } from "next"; import AuthorityLanding from "../components/AuthorityLanding"; import {AUTHORITY_PAGES} from "../lib/authorityPages";
export const metadata:Metadata={title:{absolute:"Native Cigarettes | O'Connor Dr, East York | Gas City Cannabis"},description:AUTHORITY_PAGES.cigarettes.summary,alternates:{canonical:"/native-cigarettes-oconnor-east-york"}};
export default function Page(){return <AuthorityLanding page={AUTHORITY_PAGES.cigarettes}/>;}
