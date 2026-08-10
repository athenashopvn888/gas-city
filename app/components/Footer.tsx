import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>GAS CITY CANNABIS</div>
            <p className={styles.desc}>
              Your Local Cannabis Dispensary At 985 O&apos;Connor Dr, Toronto. Visit
              GAS CITY CANNABIS For Premium Flower, Edibles, Vapes &amp; More.
              Open: Open Daily: 10:00 AM - 03:00 AM.
            </p>
            <div className={styles.buttons}></div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>985 O&apos;Connor Dr</span>
              <span>Toronto, ON M4B 2T1</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span>
                <a href="tel:+14374660318" style={{ color: "inherit" }}>
                  +1 (437) 466-0318
                </a>
              </span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>Open Daily: 10:00 AM - 03:00 AM</span>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/exotic">Exotic Flower</Link>
              <Link href="/premium">Premium Flower</Link>
              <Link href="/aaa">AAA+ Flower</Link>
              <Link href="/aa">AA Flower</Link>
              <Link href="/budget">Budget Flower</Link>
              <Link href="/items/edibles">Edibles</Link>
              <Link href="/items/cigarettes">Cigarettes</Link>
              <Link href="/items/vapes">Vape Pens</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/delivery">Delivery Menu</Link>
              <Link href="/info/toronto-weed-dispensary">Toronto Dispensary</Link>
              <Link href="/info/cheap-weed-toronto">Cheap Weed Toronto</Link>
              <Link href="/info/native-cigarettes-toronto">Native Cigarettes</Link>
              <Link href="/info/weed-store-near-east-york-o-connor">Weed Store Near East York</Link>
              <Link href="/weed-dispensary-toronto/">GAS CITY CANNABIS Weed Dispensary in Toronto</Link>
              <Link href="/contact">Contact Us</Link>
              <a
                href="https://www.gascitycannabis.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            (c) {new Date().getFullYear()} GAS CITY CANNABIS. Must be 19+ to
            enter.
          </p>
        </div>
      </div>
    </footer>
  );
}
