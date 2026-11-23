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
} from "../app/resources/what-is-a-nectar-collector/articleCopy.ts";

const forbiddenWeight = ["3", ".5"].join("");

function plain(inlines: Inline[]): string {
  return inlineText(inlines);
}

test("nectar collector article keeps the exact heading, canonical, dateline, and one-sentence description", () => {
  assert.equal(ARTICLE_PATH, "/resources/what-is-a-nectar-collector");
  assert.equal(ARTICLE_CANONICAL, "https://www.gascitycannabis.com/resources/what-is-a-nectar-collector");
  assert.equal(ARTICLE_H1, "Nectar Collector: The Dab Straw, Its Parts, and How It Differs From a Rig");
  assert.equal(ARTICLE_LAST_CHECKED, "Last checked: November 17, 2026");
  assert.equal(ARTICLE_DATE, "2026-11-23");
  assert.ok(ARTICLE_DESCRIPTION.length <= 155);
  assert.equal((ARTICLE_DESCRIPTION.match(/\./g) || []).length, 1);
  assert.equal(ARTICLE_DESCRIPTION.endsWith("."), true);
  assert.equal(
    ARTICLE_DESCRIPTION,
    "A nectar collector is in the second group: a handheld, straight-through piece for concentrates, without the big standing rig.",
  );
  const intro = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "p" }> => {
    return block.type === "p" && !plain(block.inlines).startsWith("Last checked:");
  });
  assert.ok(intro);
  assert.equal(plain(intro.inlines).includes(ARTICLE_DESCRIPTION), true);
});

test("nectar collector article renders the approved body and only the three internal links", () => {
  const headings = ARTICLE_BLOCKS.filter((block) => block.type === "h1" || block.type === "h2").map((block) => block.text);
  assert.deepEqual(headings, [
    "Nectar Collector: The Dab Straw, Its Parts, and How It Differs From a Rig",
    "What is a nectar collector?",
    "Collector vs dab rig: what's different?",
    "The parts, end to end",
    "How do you use a nectar collector?",
    "Electric vs torch",
    "Cleaning the parts",
    "Keeping the gear story straight",
    "Quick recap",
    "Ask us on O'Connor",
  ]);

  const table = ARTICLE_BLOCKS.find((block) => block.type === "table");
  assert.ok(table && table.type === "table");
  assert.deepEqual(table.headers.map(plain), ["", "This piece", "Standing dab rig"]);
  assert.deepEqual(table.rows.map((row) => row.map(plain)), [
    ["Shape", "Straight, straw-like", "Base, chamber and mouthpiece"],
    ["Heated part", "Tip", "Nail or banger"],
    ["What moves", "The tip goes to the concentrate", "The concentrate goes to the heated part"],
    ["Water", "Some models have a chamber", "Usually has a water chamber"],
  ]);

  const lists = ARTICLE_BLOCKS.filter((block) => block.type === "ol" || block.type === "ul");
  assert.deepEqual(lists.map((block) => block.items.map(plain)), [
    [
      "Mouthpiece. The end you hold at your mouth.",
      "Body. The middle section, often glass or silicone. Some have a water chamber.",
      "Tip. The heated end, commonly quartz or titanium.",
      "Joint or connection. Where the tip fits into the body. Designs vary, so follow the maker's instructions for your model.",
    ],
    [
      "Read your model's instructions. Electric and torch-heated versions aren't the same.",
      "Use a flat, stable surface. Put the concentrate in a dish made for this kind of heat.",
      "Check the connections. Tip seated, body secure. If it wobbles, stop and fix that first.",
      "Heat only as directed. Don't guess temperatures from a blog.",
      "Bring the tip to the concentrate. That's the defining motion of a dab straw.",
      "Set it down to cool. The tip stays hot after use, so have the resting place ready before you start.",
    ],
    [
      "Nectar collector: a handheld dab straw for concentrates.",
      "Parts: mouthpiece, body, tip.",
      "Difference from a rig: the heated tip goes to the concentrate, not the other way around.",
      "Handling: follow the maker, use a heat-safe surface, plan where the hot tip rests.",
      "Cleaning: know the materials; never soak electronics.",
    ],
  ]);

  const links = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "p") return block.inlines;
    if (block.type === "ul" || block.type === "ol") return block.items.flat();
    if (block.type === "table") return [...block.headers.flat(), ...block.rows.flat(2)];
    return [];
  }).filter((inline) => inline.type === "link");
  assert.deepEqual(links, [
    { type: "link", text: "how to clean a dry-herb vaporizer", href: "/resources/how-to-clean-a-dry-herb-vaporizer" },
    { type: "link", text: "cannabis storage-accessories glossary", href: "/resources/cannabis-storage-accessories-glossary" },
    { type: "link", text: "visit page", href: "/visit" },
  ]);

  const visible = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "h1" || block.type === "h2") return [block.text];
    if (block.type === "p") return [plain(block.inlines)];
    if (block.type === "table") return [...block.headers.map(plain), ...block.rows.map((row) => row.map(plain).join(" | "))];
    return block.items.map(plain);
  }).join("\n");
  assert.match(visible, /Last checked: November 17, 2026/);
  assert.match(visible, /985 O'Connor Dr in East York/);
  assert.equal(visible.includes("/flower/"), false);
  assert.equal(visible.includes("/items/"), false);
  assert.equal(visible.includes(forbiddenWeight), false);
  assert.equal(ARTICLE_MARKDOWN.includes(forbiddenWeight), false);
  assert.equal(/farmers link/i.test(visible), false);
  assert.equal(/telnyx/i.test(visible), false);
  assert.equal(/\b\d{3}[-.)]\d{3}[-.)]\d{4}\b/.test(visible), false);
  assert.equal(/https?:\/\//i.test(ARTICLE_MARKDOWN), false);
  assert.equal(/we carry/i.test(visible), false);
});

test("nectar collector schema is an Article with the required dates and no offer markup", () => {
  const schema = articleJsonLd();
  assert.equal(schema["@type"], "Article");
  assert.equal(schema.headline, ARTICLE_H1);
  assert.equal(schema.datePublished, "2026-11-23");
  assert.equal(schema.dateModified, "2026-11-23");
  assert.equal(schema.url, ARTICLE_CANONICAL);
  assert.equal(schema.mainEntityOfPage.url, ARTICLE_CANONICAL);
  assert.equal(schema.mainEntityOfPage["@id"], ARTICLE_CANONICAL);
  assert.equal(schema.author.name, "GAS CITY CANNABIS");
  assert.equal(schema.publisher.name, "GAS CITY CANNABIS");
  const raw = JSON.stringify(schema);
  assert.equal(/review|rating|product|offer/i.test(raw), false);
  assert.equal(raw.includes("BreadcrumbList"), false);
  assert.equal(raw.includes(forbiddenWeight), false);
});

test("sitemap and page metadata add only this nectar collector article url", () => {
  const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const needle = "${BASE}/resources/what-is-a-nectar-collector";
  assert.equal(sitemapSource.split(needle).length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/red-congolese-strain").length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/how-to-clean-a-dry-herb-vaporizer").length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/cannabis-storage-accessories-glossary").length - 1, 1);
  assert.equal(sitemapSource.split("${BASE}/resources/cannabis-packaging-recycling-toronto").length - 1, 1);
  assert.match(sitemapSource, /\.\.\.redCongoleseArticle, \.\.\.nectarCollectorArticle/);

  const page = readFileSync(new URL("../app/resources/what-is-a-nectar-collector/page.tsx", import.meta.url), "utf8");
  assert.match(page, /title: \{ absolute: ARTICLE_H1 \}/);
  assert.match(page, /canonical: ARTICLE_CANONICAL/);
  assert.match(page, /index: true/);
  assert.match(page, /follow: true/);
  assert.match(page, /<h1>\{ARTICLE_H1\}<\/h1>/);
  assert.equal(page.includes("BreadcrumbList"), false);
  assert.equal(page.includes(forbiddenWeight), false);

  const redirects = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.equal(redirects.includes("what-is-a-nectar-collector"), false);
  assert.equal(redirects.includes('source: "/resources"'), false);

  const links = readFileSync(new URL("../app/lib/fleet/codedArticles.ts", import.meta.url), "utf8");
  assert.match(links, /what-is-a-nectar-collector/);
});
