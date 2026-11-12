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
} from "../app/resources/red-congolese-strain/articleCopy.ts";

const forbiddenWeight = ["3", ".5"].join("");

function plain(inlines: Inline[]): string {
  return inlineText(inlines);
}

test("red congolese article keeps the exact heading, canonical, dateline, and one-sentence description", () => {
  assert.equal(ARTICLE_PATH, "/resources/red-congolese-strain");
  assert.equal(ARTICLE_CANONICAL, "https://www.gascitycannabis.com/resources/red-congolese-strain");
  assert.equal(ARTICLE_H1, "Red Congolese Strain, Explained: A Name That Covers Three Continents");
  assert.equal(ARTICLE_LAST_CHECKED, "Last checked: November 3, 2026");
  assert.equal(ARTICLE_DATE, "2026-11-12");
  assert.ok(ARTICLE_DESCRIPTION.length <= 155);
  assert.equal((ARTICLE_DESCRIPTION.match(/\./g) || []).length, 1);
  assert.equal(ARTICLE_DESCRIPTION.endsWith("."), true);
  assert.equal(
    ARTICLE_DESCRIPTION,
    "If you've searched the Red Congolese strain, you've probably seen a lot of confident claims online that don't agree with each other.",
  );
  const intro = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "p" }> => {
    return block.type === "p" && !plain(block.inlines).startsWith("Last checked:");
  });
  assert.ok(intro);
  assert.equal(plain(intro.inlines).includes(ARTICLE_DESCRIPTION), true);
});

test("red congolese article renders the approved body and only the two internal links", () => {
  const headings = ARTICLE_BLOCKS.filter((block) => block.type === "h1" || block.type === "h2").map((block) => block.text);
  assert.deepEqual(headings, [
    "Red Congolese Strain, Explained: A Name That Covers Three Continents",
    "What is the Red Congolese strain?",
    "Red Congolese lineage: where the sources split",
    "Why is it called Red Congolese?",
    "What does Red Congolese smell like?",
    "How do you read a Red Congolese label?",
    "Is Red Congolese a sativa?",
    "A name online isn't a promise on the shelf",
    "Red Congolese strain: quick answers",
    "Bring your Red Congolese strain questions to Gas City Cannabis",
  ]);

  const table = ARTICLE_BLOCKS.find((block) => block.type === "table");
  assert.ok(table && table.type === "table");
  assert.deepEqual(table.headers.map(plain), ["Claim", "What it means", "Source"]);
  assert.deepEqual(table.rows.map((row) => row.map(plain)), [
    ["African sativa landrace", "A regional plant adapted over a long time to one area", "Leafly notes some argue this"],
    ["California version with Mexican and Afghani roots", "A blend of several regional plants", "Leafly"],
    ["Indica-like appearance", "How the California version tends to look", "Leafly"],
  ]);

  const lists = ARTICLE_BLOCKS.filter((block) => block.type === "ol" || block.type === "ul");
  assert.deepEqual(lists.map((block) => block.items.map(plain)), [
    [
      "Tags are averages. They come from a database, not from your jar.",
      "Batches vary. Growing, drying and curing all change aroma.",
      "Storage matters. Keep flower the way the label says, sealed and out of the light. Our storage accessories glossary walks through the gear.",
    ],
    [
      "Class of cannabis. Flower is dried cannabis.",
      "Total THC and Total CBD, on the front of the package.",
      "Packaging date and lot number.",
      "Brand name.",
      "Recommended storage conditions.",
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
    { type: "link", text: "visit page", href: "/visit" },
  ]);

  const emphasis = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "p") return block.inlines;
    if (block.type === "ul" || block.type === "ol") return block.items.flat();
    if (block.type === "table") return [...block.headers.flat(), ...block.rows.flat(2)];
    return [];
  }).filter((inline) => inline.type === "em");
  assert.deepEqual(emphasis, [{ type: "em", text: "said" }]);

  const visible = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "h1" || block.type === "h2") return [block.text];
    if (block.type === "p") return [plain(block.inlines)];
    if (block.type === "table") return [...block.headers.map(plain), ...block.rows.map((row) => row.map(plain).join(" | "))];
    return block.items.map(plain);
  }).join("\n");
  assert.match(visible, /Last checked: November 3, 2026/);
  assert.match(visible, /985 O'Connor Dr, East York/);
  assert.equal(visible.includes("/flower/"), false);
  assert.equal(visible.includes("/guides/"), false);
  assert.equal(visible.includes(forbiddenWeight), false);
  assert.equal(ARTICLE_MARKDOWN.includes(forbiddenWeight), false);
  assert.equal(/farmers link/i.test(visible), false);
  assert.equal(/telnyx/i.test(visible), false);
  assert.equal(/\b\d{3}[-.)]\d{3}[-.)]\d{4}\b/.test(visible), false);
});

test("red congolese schema is an Article with the required dates and no offer markup", () => {
  const schema = articleJsonLd();
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.headline, ARTICLE_H1);
  assert.equal(schema.datePublished, "2026-11-12");
  assert.equal(schema.dateModified, "2026-11-12");
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

test("sitemap and page metadata add only this red congolese article url", () => {
  const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const needle = "${BASE}/resources/red-congolese-strain";
  assert.equal(sitemapSource.split(needle).length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/how-to-clean-a-dry-herb-vaporizer").length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/cannabis-storage-accessories-glossary").length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/cannabis-packaging-recycling-toronto").length - 1, 1);
  assert.match(sitemapSource, /\.\.\.packagingRecyclingArticle, \.\.\.storageAccessoriesArticle, \.\.\.vaporizerCleanArticle, \.\.\.redCongoleseArticle/);

  const page = readFileSync(new URL("../app/resources/red-congolese-strain/page.tsx", import.meta.url), "utf8");
  assert.match(page, /title: \{ absolute: ARTICLE_H1 \}/);
  assert.match(page, /canonical: ARTICLE_CANONICAL/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /<h1>\{ARTICLE_H1\}<\/h1>/);
  assert.equal(page.includes("BreadcrumbList"), false);
  assert.equal(page.includes(forbiddenWeight), false);

  const redirects = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.equal(redirects.includes("red-congolese-strain"), false);

  const links = readFileSync(new URL("../app/lib/fleet/codedArticles.ts", import.meta.url), "utf8");
  assert.match(links, /red-congolese-strain/);
});
