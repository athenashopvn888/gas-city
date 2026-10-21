import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { DELIVERY_GUIDE_STORE, type DeliveryGuideEntry } from "../../lib/deliveryGuideRegistry";
import { SHOW_CIGARETTES, isPreservedSmokeItem } from "../../lib/siteConfig";
import DeliveryGuideBody, { stripDeliveryMarkdown } from "./DeliveryGuideBody";
import styles from "./guide.module.css";

const BASE = `https://${DELIVERY_GUIDE_STORE.domain}`;
export default function DeliveryGuidePage({ guide }: { guide: DeliveryGuideEntry }) {
  const canonical = `${BASE}/guides/${guide.slug}`;
  const faqs = SHOW_CIGARETTES ? guide.faq_items : guide.faq_items.filter((faq) => !/grabba/i.test(`${faq.question} ${faq.answer}`));
  const secondaryHref = !SHOW_CIGARETTES && isPreservedSmokeItem({ name: guide.name, slug: guide.slug }) ? "/items/add-ons" : guide.category_path;
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: guide.h1, item: canonical }] },
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: guide.title, description: guide.description },
    { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: stripDeliveryMarkdown(faq.question), acceptedAnswer: { "@type": "Answer", text: stripDeliveryMarkdown(faq.answer) } })) },
  ] };
  return <main className={styles.main}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} /><Navbar /><article className={styles.article}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{guide.h1}</span></nav><header className={styles.hero}><h1>{guide.h1}</h1></header><section className={styles.section} aria-label={`${guide.h1} guide`}><DeliveryGuideBody markdown={guide.body_md} faqs={faqs} /><div className={styles.actions}><Link className={styles.primary} href={guide.action_path}>{guide.main_button}</Link><Link className={styles.secondary} href={secondaryHref}>{guide.second_button}</Link></div></section></article><Footer /></main>;
}
