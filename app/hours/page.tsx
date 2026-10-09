import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./seo.module.css";

const ORIGIN = "https://www.gascitycannabis.com";
const PAGE_URL = `${ORIGIN}/hours`;
const TITLE = "Gas City Cannabis Hours | Daily 11:00 AM – 3:00 AM at 985 O'Connor Dr";
const DESCRIPTION = "Gas City Cannabis at 985 O'Connor Dr, East York, ON M4B 2T1: daily 11:00 am – 3:00 am. Day-by-day hours, phone +1 (437) 466-0318 and visit links. Adults 19+ with photo ID.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "website" },
};

const FAQS = [
  { q: "What are Gas City Cannabis's hours?", a: "Daily 11:00 AM – 3:00 AM. Day-by-day hours are listed on this page." },
  { q: "Where is Gas City Cannabis?", a: "985 O'Connor Dr, East York, ON M4B 2T1. Call +1 (437) 466-0318." },
  { q: "Who can shop here?", a: "Adults 19+ with valid government-issued photo ID." },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": "https://www.gascitycannabis.com/#store",
      name: "Gas City Cannabis",
      url: ORIGIN,
      telephone: "+14374660318",
      address: { "@type": "PostalAddress", streetAddress: "985 O'Connor Dr", addressLocality: "East York", addressRegion: "ON", postalCode: "M4B 2T1", addressCountry: "CA" },
      openingHoursSpecification: [{"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "11:00", "closes": "03:00"}],
    },
    { "@type": "WebPage", "@id": `${PAGE_URL}#webpage`, url: PAGE_URL, name: TITLE, description: DESCRIPTION, about: { "@id": "https://www.gascitycannabis.com/#store" } },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN },
        { "@type": "ListItem", position: 2, name: "Store Hours", item: PAGE_URL },
      ],
    },
    { "@type": "FAQPage", "@id": `${PAGE_URL}#faq`, mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function HoursPage() {
  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <div className={styles.content}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Store Hours</span></nav>
        <p className={styles.kicker}>Store hours · Adults 19+</p>
        <h1 className={styles.title}>Gas City Cannabis Hours</h1>
        <p className={styles.lead}>Gas City Cannabis at 985 O&apos;Connor Dr in East York is daily 11:00 AM – 3:00 AM. These are the same hours published in this site&apos;s store details. Adults 19+ with government-issued photo ID.</p>
        <div className={styles.card}>
          <p><strong>Gas City Cannabis</strong></p>
          <p>985 O&apos;Connor Dr, East York, ON M4B 2T1</p>
          <p>Phone: <a href="tel:+14374660318">+1 (437) 466-0318</a></p>
          <p>Daily 11:00 AM – 3:00 AM</p>
          <p><a href="https://www.google.com/maps/search/?api=1&query=985+O%27Connor+Dr%2C+East+York%2C+ON+M4B+2T1" target="_blank" rel="noreferrer">Open in Google Maps</a></p>
        </div>
        <section className={styles.section}>
          <h2>Weekly hours</h2>
          <div className={styles.weekRow}><span>Monday</span><strong>11:00 AM – 3:00 AM</strong></div>
          <div className={styles.weekRow}><span>Tuesday</span><strong>11:00 AM – 3:00 AM</strong></div>
          <div className={styles.weekRow}><span>Wednesday</span><strong>11:00 AM – 3:00 AM</strong></div>
          <div className={styles.weekRow}><span>Thursday</span><strong>11:00 AM – 3:00 AM</strong></div>
          <div className={styles.weekRow}><span>Friday</span><strong>11:00 AM – 3:00 AM</strong></div>
          <div className={styles.weekRow}><span>Saturday</span><strong>11:00 AM – 3:00 AM</strong></div>
          <div className={styles.weekRow}><span>Sunday</span><strong>11:00 AM – 3:00 AM</strong></div>
        </section>
        <section className={styles.section}>
          <h2>Plan your visit</h2>
          <div className={styles.ctaRow}>
            <a href="tel:+14374660318" className={`${styles.cta} ${styles.ctaPrimary}`}>Call +1 (437) 466-0318</a>
            <Link href="/" className={styles.cta}>Store menu</Link>
            <Link href="/visit" className={styles.cta}>Visit &amp; directions</Link>
          </div>
          <p className={styles.note}>Adults 19+. Government-issued photo ID required.</p>
        </section>
        <section className={styles.section}>
          <h2>Hours FAQs</h2>
          {FAQS.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
