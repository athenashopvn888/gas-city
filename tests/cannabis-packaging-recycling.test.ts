import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  ARTICLE_BLOCKS,
  ARTICLE_CANONICAL,
  ARTICLE_DATE_MODIFIED,
  ARTICLE_DESCRIPTION,
  ARTICLE_H1,
  ARTICLE_LAST_CHECKED,
  ARTICLE_PATH,
  ARTICLE_TITLE,
  articleJsonLd,
  inlineText,
} from "../app/resources/cannabis-packaging-recycling-toronto/articleCopy.ts";

const forbiddenWeight = ["3", ".5"].join("");

test("packaging article keeps the approved heading, dateline, and opening paragraph", () => {
  assert.equal(ARTICLE_PATH, "/resources/cannabis-packaging-recycling-toronto");
  assert.equal(ARTICLE_CANONICAL, "https://www.gascitycannabis.com/resources/cannabis-packaging-recycling-toronto");
  assert.equal(ARTICLE_H1, "Cannabis packaging in Toronto: how to check the blue bin rules, and what never goes in");
  assert.equal(ARTICLE_TITLE, "Cannabis packaging in Toronto: how to check the blue bin rules");
  assert.ok(ARTICLE_TITLE.length <= 65);
  assert.equal(ARTICLE_H1.startsWith(ARTICLE_TITLE), true);
  assert.equal(ARTICLE_LAST_CHECKED, "Last checked: September 30, 2026");
  assert.equal(ARTICLE_DATE_MODIFIED, "2026-09-30");
  assert.equal(
    ARTICLE_DESCRIPTION,
    "Cannabis comes in a lot of packaging for the amount of product inside. A small jar might sit in a cardboard sleeve, with a seal, a child-resistant lid and a sticker or two. When it's empty, where does each piece go? This guide shows Toronto households how to check (adults 19+ only). It sticks to packaging only: the containers, lids, pouches, boxes and devices, not the product.",
  );
});

test("packaging article renders the body without editor notes, ratings, or weight shorthand", () => {
  const visible = ARTICLE_BLOCKS.flatMap((block) => {
    if (block.type === "h1" || block.type === "h2") return [block.text];
    if (block.type === "p") return [inlineText(block.inlines)];
    return block.items.map((item) => inlineText(item));
  }).join("\n");

  assert.match(visible, /Directions are on our visit page/);
  assert.equal(visible.includes("LOCAL NOTE"), false);
  assert.equal(visible.includes("store_code"), false);
  assert.equal(visible.includes(forbiddenWeight), false);
  const visit = ARTICLE_BLOCKS.flatMap((block) => (block.type === "p" ? block.inlines : [])).find((inline) => inline.type === "link");
  assert.deepEqual(visit, { type: "link", text: "visit page", href: "/visit" });

  const schema = JSON.stringify(articleJsonLd());
  assert.match(schema, /"@type":"Article"/);
  assert.equal(/review|rating/i.test(schema), false);
  assert.equal(schema.includes(ARTICLE_CANONICAL), true);
  assert.equal(schema.includes(ARTICLE_H1), true);
});

test("sitemap gains only the new packaging article url", () => {
  const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const needle = "${BASE}/resources/cannabis-packaging-recycling-toronto";
  assert.equal(sitemapSource.split(needle).length - 1, 1);
  assert.match(sitemapSource, /RESOURCE_PAGES\.map/);
  assert.match(sitemapSource, /\.\.\.seoPages, \.\.\.packagingRecyclingArticle/);
});
