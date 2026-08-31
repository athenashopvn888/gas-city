import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

test("FMD-approved East York identity is used by the primary location source", () => {
  const location = read("app/lib/gbp-location.ts");
  assert.match(location, /city: "East York"/);
  assert.match(location, /985 O'Connor Dr, East York, ON M4B 2T1/);
  assert.match(location, /phoneIntl: "\+14374660318"/);
});

test("weak-query owners avoid duplicate title branding and competing near-me copy", () => {
  const categoryPage = read("app/items/[category]/page.tsx");
  const localPage = read("app/weed-dispensary-toronto/page.tsx");
  const localOwner = read("app/components/GBPLandingPage.tsx");
  const deliveryPage = read("app/delivery/page.tsx");
  const deliveryOwner = read("app/delivery/DeliveryContent.tsx");

  assert.match(categoryPage, /title:\s*\{\s*absolute:/);
  assert.match(localPage, /title:\s*\{\s*absolute:\s*gbpLocation\.seoTitle\s*\}/);
  assert.match(localOwner, /href="\/info\/weed-store-near-east-york-o-connor"/);
  assert.match(deliveryPage, /absolute:\s*"Weed Delivery Menu \| GAS CITY CANNABIS"/);
  assert.match(deliveryOwner, /<h1>Weed Delivery Menu<\/h1>/);
});

test("East York and Native guide owners suppress the site-wide title suffix", () => {
  const guides = read("app/lib/seoPages.ts");
  assert.match(guides, /"slug": "native-cigarettes-toronto",[\s\S]*?"absoluteTitle": true/);
  assert.match(guides, /"slug": "weed-store-near-east-york-o-connor",[\s\S]*?"absoluteTitle": true/);
});
