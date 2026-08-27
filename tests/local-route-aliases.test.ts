import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { SEO_PAGES } from "../app/lib/seoPages.ts";
import nextConfig from "../next.config.ts";

const aliasDestinations = new Map([
  ["/info/york-weed-dispensary", "/info/toronto-weed-dispensary"],
  ["/info/cheap-weed-york", "/info/cheap-weed-toronto"],
  ["/info/native-cigarettes-york", "/info/native-cigarettes-toronto"],
  ["/info/weed-store-near-brampton", "/info/weed-store-near-east-york-o-connor"],
  ["/info/dispensary-near-me-york", "/info/dispensary-near-me-toronto"],
]);

test("legacy York and Brampton aliases are not generated or included in the sitemap", () => {
  const generatedSlugs = new Set(SEO_PAGES.map((page) => page.slug));
  for (const [source, destination] of aliasDestinations) {
    assert.equal(generatedSlugs.has(source.replace("/info/", "")), false, source);
    assert.equal(generatedSlugs.has(destination.replace("/info/", "")), true, destination);
  }

  const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(sitemapSource, /SEO_PAGES\.map/);
});

test("legacy aliases permanently redirect to their canonical local routes", async () => {
  assert.ok(nextConfig.redirects);
  const redirects = await nextConfig.redirects();

  for (const [source, destination] of aliasDestinations) {
    const redirect = redirects.find((entry) => entry.source === source);
    assert.deepEqual(redirect, { source, destination, permanent: true });
  }
});

