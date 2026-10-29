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
} from "../app/resources/cannabis-storage-accessories-glossary/articleCopy.ts";

const forbiddenWeight = ["3", ".5"].join("");

function plain(inlines: Inline[]): string {
  return inlineText(inlines);
}

test("storage glossary keeps the exact heading, canonical, dateline, and one-sentence description", () => {
  assert.equal(ARTICLE_PATH, "/resources/cannabis-storage-accessories-glossary");
  assert.equal(ARTICLE_CANONICAL, "https://www.gascitycannabis.com/resources/cannabis-storage-accessories-glossary");
  assert.equal(ARTICLE_H1, "Cannabis Storage Accessories: Doob Tubes, Smell-Proof Bags and Lock Boxes, Explained");
  assert.equal(ARTICLE_LAST_CHECKED, "Last checked: October 25, 2026");
  assert.equal(ARTICLE_DATE, "2026-10-29");
  assert.ok(ARTICLE_DESCRIPTION.length <= 155);
  assert.equal((ARTICLE_DESCRIPTION.match(/\./g) || []).length, 1);
  assert.equal(ARTICLE_DESCRIPTION.endsWith("."), true);
  assert.equal(
    ARTICLE_DESCRIPTION,
    "Gas City Cannabis, at 985 O'Connor Dr, wrote this home-life glossary of cannabis storage accessories for adults 19+, with a how-to list for each.",
  );
  const intro = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "p" }> => {
    return block.type === "p" && !plain(block.inlines).startsWith("Last checked:");
  });
  assert.ok(intro);
  assert.equal(plain(intro.inlines).includes(ARTICLE_DESCRIPTION), true);
});

test("storage glossary renders the approved body, table, and only the two internal links", () => {
  const headings = ARTICLE_BLOCKS.filter((block) => block.type === "h1" || block.type === "h2").map((block) => block.text);
  assert.deepEqual(headings, [
    "Cannabis Storage Accessories: Doob Tubes, Smell-Proof Bags and Lock Boxes, Explained",
    "Why storage gear matters at home",
    "The glossary",
    "How-to: set up a simple home storage spot",
    "How-to: choose the right accessory for the job",
    "Keep the label with the product",
    "What not to do",
    "Pets count too",
    "Carrying sealed packages",
    "Quick home checklist, East York style",
    "Accessory care",
    "From the O'Connor Drive counter",
  ]);

  const lists = ARTICLE_BLOCKS.filter((block) => block.type === "ol" || block.type === "ul");
  assert.deepEqual(lists.map((block) => block.items.map(plain)), [
    [
      "Safety. Cannabis packaging carries the warning KEEP OUT OF REACH OF CHILDREN. Storage gear helps you do that.",
      "Freshness. Air, heat and light change flower over time.",
      "Odour. A sealed container keeps smell where it belongs.",
    ],
    [
      "Pick a cool, dark, dry spot, away from the stove, the dishwasher and sunny windows.",
      "Keep products in their original labelled, child-resistant packaging.",
      "Put those packages inside a lock box or a locked cabinet.",
      "Keep the spot up high and out of sight of kids.",
      "Keep it separate from food and snacks so nothing gets mixed up.",
      "Check packaging dates now and then.",
    ],
    [
      "Don't store cannabis in food containers that kids might open.",
      "Don't leave it in a car, where heat builds up.",
      "Don't keep it next to the stove or in a sunny spot.",
      "Don't toss packaging without checking local recycling guidance.",
    ],
    [
      "Is everything still in its original labelled package?",
      "Is the lock box locked?",
      "Is the storage spot still cool, dark and dry?",
      "Is anything past a date you're comfortable with?",
      "Are kids' snacks and cannabis products stored well apart?",
    ],
    [
      "Wipe jars and tubes with a dry cloth.",
      "Let anything washed dry fully before reuse.",
      "Replace cracked lids or broken zips.",
      "Keep spare keys for lock boxes somewhere only adults know.",
    ],
  ]);

  const table = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "table" }> => block.type === "table");
  assert.ok(table);
  assert.deepEqual(table.headers.map(plain), ["You want to...", "Try..."]);
  assert.deepEqual(table.rows.map((row) => row.map(plain)), [
    ["Stop a pre-roll from getting crushed", "Doob tube"],
    ["Keep flower away from air", "Airtight jar"],
    ["Keep packages from smelling up a bag", "Smell-proof bag"],
    ["Keep everything away from kids", "Lock box"],
    ["Keep light out", "Opaque container"],
  ]);

  const links = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "p") return block.inlines;
    if (block.type === "ul" || block.type === "ol") return block.items.flat();
    if (block.type === "table") return [...block.headers.flat(), ...block.rows.flat(2)];
    return [];
  }).filter((inline) => inline.type === "link");
  assert.deepEqual(links, [
    { type: "link", text: "O'Connor Drive weed dispensary", href: "/weed-dispensary-oconnor-east-york" },
    { type: "link", text: "visit page", href: "/visit" },
  ]);

  const visible = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "h1" || block.type === "h2") return [block.text];
    if (block.type === "p") return [plain(block.inlines)];
    if (block.type === "table") return [...block.headers.map(plain), ...block.rows.map((row) => row.map(plain).join(" | "))];
    return block.items.map(plain);
  }).join("\n");
  assert.match(visible, /Last checked: October 25, 2026/);
  assert.match(visible, /Doob tube/);
  assert.equal(visible.includes(forbiddenWeight), false);
  assert.equal(ARTICLE_MARKDOWN.includes(forbiddenWeight), false);
  assert.equal(/farmers link/i.test(visible), false);
  assert.equal(/telnyx/i.test(visible), false);
  assert.equal(/\b\d{3}[-.)]\d{3}[-.)]\d{4}\b/.test(visible), false);
});

test("storage glossary schema is an Article with the required dates and no offer markup", () => {
  const schema = articleJsonLd();
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.headline, ARTICLE_H1);
  assert.equal(schema.datePublished, "2026-10-29");
  assert.equal(schema.dateModified, "2026-10-29");
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

test("sitemap and page metadata add only this glossary url", () => {
  const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const needle = "${BASE}/resources/cannabis-storage-accessories-glossary";
  assert.equal(sitemapSource.split(needle).length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/cannabis-packaging-recycling-toronto").length - 1, 1);
  assert.match(sitemapSource, /\.\.\.packagingRecyclingArticle, \.\.\.storageAccessoriesArticle/);

  const page = readFileSync(new URL("../app/resources/cannabis-storage-accessories-glossary/page.tsx", import.meta.url), "utf8");
  assert.match(page, /title: \{ absolute: ARTICLE_H1 \}/);
  assert.match(page, /canonical: ARTICLE_CANONICAL/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /<h1>\{ARTICLE_H1\}<\/h1>/);
  assert.equal(page.includes("BreadcrumbList"), false);
  assert.equal(page.includes(forbiddenWeight), false);
});
