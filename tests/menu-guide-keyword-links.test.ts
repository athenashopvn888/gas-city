import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { articleBodyParts } from "../app/resources/articleLinks.ts";

const forbiddenWeight = ["3", ".5"].join("");
const source = readFileSync(new URL("../app/resources/resourceData.ts", import.meta.url), "utf8");
const expectedLinks = [
  { text: "weed dispensary in East York", href: "/weed-dispensary-oconnor-east-york" },
  { text: "weed dispensary in Toronto", href: "/weed-dispensary-toronto" },
  { text: "weed delivery in East York", href: "/delivery" },
];

function sectionBodies(slug: string, nextSlug: string) {
  const marker = `"slug": "${slug}"`;
  const start = source.indexOf(marker);
  const end = source.indexOf(`"slug": "${nextSlug}"`, start + marker.length);
  assert.ok(start >= 0 && end > start, slug);
  return [...source.slice(start, end).matchAll(/"body": "([^"]*)"/g)].map((match) => match[1]);
}

test("menu guide adds the three same-site keyword links and leaves existing sentences in place", () => {
  const bodies = sectionBodies("menu-guide", "flower-guide");
  const body = bodies.join("\n");
  const parts = bodies.flatMap((section) => articleBodyParts(section));
  const links = parts.filter((part) => part.type === "link");

  assert.deepEqual(links, expectedLinks.map((link) => ({ type: "link", ...link })));
  assert.equal(bodies[0].startsWith("If you want flower, start with flower. If you want pre-rolls, stay in pre-rolls. If the visit is about edibles, vapes, concentrates, or accessories, open that section and compare there first."), true);
  assert.equal(bodies[1].startsWith("Use this guide for the shopping method, then use the current menu and staff for the product names, prices, and package details currently listed."), true);
  assert.equal(body.includes(forbiddenWeight), false);
  assert.equal(/farmers/i.test(body), false);
  assert.equal(body.includes("["), true);
  assert.equal(parts.some((part) => part.type === "text" && part.text.includes("[")), false);
  assert.equal(links.some((link) => /tobacco|cigarette|smoke|grabba/i.test(link.text) || /^https?:/i.test(link.href) || link.href.startsWith("//")), false);

  const untouched = articleBodyParts("See [another store](https://example.com/shop) or [protocol](//example.com/shop).");
  assert.deepEqual(untouched, [{ type: "text", text: "See [another store](https://example.com/shop) or [protocol](//example.com/shop)." }]);

  const nativeBody = sectionBodies("native-smokes", "native-smokes/native-cigarettes-guide").join("\n");
  for (const link of expectedLinks) {
    assert.equal(nativeBody.includes(link.text), false);
    assert.equal(nativeBody.includes(`](${link.href})`), false);
  }
});
