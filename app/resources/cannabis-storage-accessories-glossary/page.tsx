import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  ARTICLE_BLOCKS,
  ARTICLE_CANONICAL,
  ARTICLE_DESCRIPTION,
  ARTICLE_H1,
  articleJsonLd,
  type Block,
  type Inline,
} from "./articleCopy";
import styles from "./article.module.css";

export const metadata: Metadata = {
  title: { absolute: ARTICLE_H1 },
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: ARTICLE_CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: ARTICLE_H1,
    description: ARTICLE_DESCRIPTION,
    url: ARTICLE_CANONICAL,
    type: "article",
  },
};

function renderInlines(inlines: Inline[]) {
  return inlines.map((inline, index) => {
    if (inline.type === "strong") return <strong key={index}>{inline.text}</strong>;
    if (inline.type === "em") return <em key={index}>{inline.text}</em>;
    if (inline.type === "link") return <Link key={index} href={inline.href}>{inline.text}</Link>;
    return <span key={index}>{inline.text}</span>;
  });
}

function renderBlock(block: Block, key: string) {
  if (block.type === "h1" || block.type === "h2") return null;
  if (block.type === "p") return <p key={key}>{renderInlines(block.inlines)}</p>;
  if (block.type === "ul") {
    return (
      <ul key={key}>
        {block.items.map((item, index) => (
          <li key={index}>{renderInlines(item)}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "table") {
    return (
      <div key={key} className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              {block.headers.map((cell, index) => (
                <th key={index} scope="col">{renderInlines(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, index) => (
                  <td key={index}>{renderInlines(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <ol key={key}>
      {block.items.map((item, index) => (
        <li key={index}>{renderInlines(item)}</li>
      ))}
    </ol>
  );
}

function articleSections(blocks: Block[]) {
  const rest = blocks.filter((block) => block.type !== "h1");
  const firstHeading = rest.findIndex((block) => block.type === "h2");
  const lead = firstHeading === -1 ? rest : rest.slice(0, firstHeading);
  const sections: Block[][] = [];
  if (firstHeading !== -1) {
    let current: Block[] = [];
    for (const block of rest.slice(firstHeading)) {
      if (block.type === "h2" && current.length > 0) {
        sections.push(current);
        current = [];
      }
      current.push(block);
    }
    if (current.length > 0) sections.push(current);
  }
  return { lead, sections };
}

export default function CannabisStorageAccessoriesGlossaryPage() {
  const jsonLd = articleJsonLd();
  const { lead, sections } = articleSections(ARTICLE_BLOCKS);

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <article>
        <header className={styles.hero}>
          <div className={styles.wrap}>
            <h1>{ARTICLE_H1}</h1>
            <div className={styles.lead}>{lead.map((block, index) => renderBlock(block, `lead-${index}`))}</div>
          </div>
        </header>
        <div className={styles.body}>
          {sections.map((section, sectionIndex) => (
            <section key={sectionIndex} className={styles.section}>
              <h2>{section[0].type === "h2" ? section[0].text : ""}</h2>
              {section.slice(1).map((block, index) => renderBlock(block, `section-${sectionIndex}-${index}`))}
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  );
}
