import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  ARTICLE_BLOCKS,
  ARTICLE_CANONICAL,
  ARTICLE_DATE,
  ARTICLE_DESCRIPTION,
  ARTICLE_H1,
  ARTICLE_LAST_CHECKED,
  ARTICLE_MARKDOWN,
  ARTICLE_PATH,
  articleJsonLd,
  inlineText,
  type Block,
  type Inline,
} from "../app/resources/how-to-clean-a-dry-herb-vaporizer/articleCopy.ts";

const forbiddenWeight = ["3", ".5"].join("");

function plain(inlines: Inline[]): string {
  return inlineText(inlines);
}

test("vaporizer clean article keeps the exact heading, canonical, dateline, and one-sentence description", () => {
  assert.equal(ARTICLE_PATH, "/resources/how-to-clean-a-dry-herb-vaporizer");
  assert.equal(ARTICLE_CANONICAL, "https://www.gascitycannabis.com/resources/how-to-clean-a-dry-herb-vaporizer");
  assert.equal(ARTICLE_H1, "How to Clean a Dry Herb Vaporizer: The East York Home Routine");
  assert.equal(ARTICLE_LAST_CHECKED, "Last checked: October 30, 2026");
  assert.equal(ARTICLE_DATE, "2026-11-05");
  assert.ok(ARTICLE_DESCRIPTION.length <= 155);
  assert.equal((ARTICLE_DESCRIPTION.match(/\./g) || []).length, 1);
  assert.equal(ARTICLE_DESCRIPTION.endsWith("."), true);
  assert.equal(
    ARTICLE_DESCRIPTION,
    "Here's GAS CITY CANNABIS's home routine for how to clean a dry herb vaporizer, step by step, from O'Connor Drive.",
  );
  const intro = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "p" }> => {
    return block.type === "p" && !plain(block.inlines).startsWith("Last checked:");
  });
  assert.ok(intro);
  assert.equal(plain(intro.inlines).includes(ARTICLE_DESCRIPTION), true);
});

test("vaporizer clean article renders the approved body and only the two internal links", () => {
  const headings = ARTICLE_BLOCKS.filter((block) => block.type === "h1" || block.type === "h2").map((block) => block.text);
  assert.deepEqual(headings, [
    "How to Clean a Dry Herb Vaporizer: The East York Home Routine",
    "Read the manual first",
    "What you'll need",
    "Before you begin: power off and cool down",
    "Step 1: Empty and brush the chamber",
    "Step 2: Remove the screens and mouthpiece",
    "Step 3: Soak the removable parts",
    "Step 4: Clean the chamber with a swab",
    "Step 5: Clean the parts",
    "Step 6: Dry everything",
    "Step 7: Wipe the outside",
    "How often should you clean a dry herb vaporizer?",
    "Signs it's time",
    "Mistakes that damage a vaporizer",
    "Storage at home",
    "Quick answers",
    "Find us in East York",
  ]);

  const lists = ARTICLE_BLOCKS.filter((block) => block.type === "ul");
  assert.deepEqual(lists.map((block) => block.items.map(plain)), [
    [
      "Isopropyl alcohol",
      "Cotton swabs and pipe cleaners",
      "A small brush (many vaporizers come with one)",
      "A small dish or jar for soaking removable parts",
      "A soft cloth",
      "Paper towels",
    ],
    [
      "After every session: empty the chamber and brush it out.",
      "Every few sessions: wipe the chamber and screens with alcohol.",
      "When the draw feels tight or the taste changes: full clean of all removable parts.",
    ],
    [
      "The draw is harder than it used to be.",
      "Screens look dark or clogged.",
      "The vaporizer smells stale even when off.",
      "The mouthpiece is sticky.",
    ],
    [
      "Getting the battery or heating element wet. This can permanently damage the device.",
      "Soaking parts the manual says not to. Some plastics and seals don't tolerate alcohol.",
      "Bending screens. Handle them gently.",
      "Reassembling while damp. Alcohol and electronics shouldn't meet.",
      "Scraping with metal. Use soft tools.",
    ],
  ]);

  const links = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "p") return block.inlines;
    if (block.type === "ul" || block.type === "ol") return block.items.flat();
    if (block.type === "table") return [...block.headers.flat(), ...block.rows.flat(2)];
    return [];
  }).filter((inline) => inline.type === "link");
  assert.deepEqual(links, [
    { type: "link", text: "storage accessories glossary", href: "/resources/cannabis-storage-accessories-glossary" },
    { type: "link", text: "packaging recycling guide", href: "/resources/cannabis-packaging-recycling-toronto" },
  ]);

  const visible = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "h1" || block.type === "h2") return [block.text];
    if (block.type === "p") return [plain(block.inlines)];
    if (block.type === "table") return [...block.headers.map(plain), ...block.rows.map((row) => row.map(plain).join(" | "))];
    return block.items.map(plain);
  }).join("\n");
  assert.match(visible, /Last checked: October 30, 2026/);
  assert.match(visible, /Never pour alcohol into the chamber/);
  assert.match(visible, /985 O'Connor Dr, East York/);
  assert.equal(visible.includes(forbiddenWeight), false);
  assert.equal(ARTICLE_MARKDOWN.includes(forbiddenWeight), false);
  assert.equal(/farmers link/i.test(visible), false);
  assert.equal(/telnyx/i.test(visible), false);
  assert.equal(/\b\d{3}[-.)]\d{3}[-.)]\d{4}\b/.test(visible), false);
  assert.equal(ARTICLE_BLOCKS.some((block) => block.type === "table"), false);
});

test("vaporizer clean schema is an Article with the required dates and no offer markup", () => {
  const schema = articleJsonLd();
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.headline, ARTICLE_H1);
  assert.equal(schema.datePublished, "2026-11-05");
  assert.equal(schema.dateModified, "2026-11-05");
  assert.equal(schema.url, ARTICLE_CANONICAL);
  assert.equal(schema.mainEntityOfPage.url, ARTICLE_CANONICAL);
  assert.equal(schema.mainEntityOfPage["@id"], ARTICLE_CANONICAL);
  assert.equal(schema.author.name, "Gas City Cannabis");
  assert.equal(schema.publisher.name, "Gas City Cannabis");
  const raw = JSON.stringify(schema);
  assert.equal(/review|rating|product|offer/i.test(raw), false);
  assert.equal(raw.includes("BreadcrumbList"), false);
  assert.equal(raw.includes(forbiddenWeight), false);
});

test("sitemap and page metadata add only this vaporizer article url", () => {
  const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const needle = "${BASE}/resources/how-to-clean-a-dry-herb-vaporizer";
  assert.equal(sitemapSource.split(needle).length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/cannabis-storage-accessories-glossary").length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/cannabis-packaging-recycling-toronto").length - 1, 1);
  assert.match(sitemapSource, /\.\.\.packagingRecyclingArticle, \.\.\.storageAccessoriesArticle, \.\.\.vaporizerCleanArticle/);

  const page = readFileSync(new URL("../app/resources/how-to-clean-a-dry-herb-vaporizer/page.tsx", import.meta.url), "utf8");
  assert.match(page, /title: \{ absolute: ARTICLE_H1 \}/);
  assert.match(page, /canonical: ARTICLE_CANONICAL/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /<h1>\{ARTICLE_H1\}<\/h1>/);
  assert.equal(page.includes("BreadcrumbList"), false);
  assert.equal(page.includes(forbiddenWeight), false);

  const redirects = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.equal(redirects.includes("how-to-clean-a-dry-herb-vaporizer"), false);
});
