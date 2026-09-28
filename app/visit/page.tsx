import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { STORE, storeSchema } from "../lib/storeIdentity";
import styles from "./visit.module.css";

export const metadata:Metadata={title:{absolute:"Visit Gas City Cannabis | 985 O'Connor Dr, East York"},description:"Address, live Google hours, phone and map details for Gas City Cannabis on O'Connor Drive in East York.",alternates:{canonical:"/visit"}};
const faqs=[{q:"What is the address?",a:STORE.addressLine},{q:"What are the store hours?",a:STORE.hoursLabel},{q:"What should adults bring?",a:"Government-issued photo ID showing they are 19 or older."}];
export default function Page(){const schema={"@context":"https://schema.org","@graph":[storeSchema(),{"@type":"FAQPage","@id":`${STORE.url}/visit#faq`,mainEntity:faqs.map((faq)=>({"@type":"Question",name:faq.q,acceptedAnswer:{"@type":"Answer",text:faq.a}}))}]};return <main className={styles.main}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><Navbar/>
  <section className={styles.hero}><div className={styles.wrap}><span>985 O&apos;Connor Dr · East York</span><h1>How to find Gas City Cannabis on O&apos;Connor Drive</h1><p>Gas City Cannabis is at 985 O&apos;Connor Dr, Toronto ON M4B 2T1, on O&apos;Connor Drive in East York. Set your maps app to that address, or use the map link on this page. Store hours are open daily 11:00 AM to 3:00 AM. Call +1 437 466 0318 if you want staff to check an item before you come in. It is a walk-in store for adults 19+, so bring government photo ID. No appointment is needed.</p><div className={styles.actions}><a href={STORE.mapUrl} target="_blank" rel="noopener noreferrer">Open Google Maps</a><a href={`tel:${STORE.phoneE164}`}>Call {STORE.phoneDisplay}</a></div></div></section>
  <section className={styles.details}><div className={styles.wrap}><article><h2>Store details</h2><p><strong>{STORE.name}</strong><br/>{STORE.addressLine}<br/>{STORE.hoursLabel}<br/>{STORE.phoneDisplay}</p></article><article><h2>Before you arrive</h2><p>Bring government-issued photo ID showing you are 19 or older. Check the current menu before leaving when one specific item matters.</p><Link href="/weed-dispensary-oconnor-east-york">Open the East York store guide</Link></article><section className={styles.faq}><h2>Visit FAQ</h2>{faqs.map((faq)=><details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</section></div></section><Footer/>
</main>}
