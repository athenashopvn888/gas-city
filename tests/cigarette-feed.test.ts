import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  CIG_WORDING_FALLBACK,
  cigaretteAccessFrom,
  cigarettePageUnavailable,
  cigarettePublicHeaders,
  decideCigaretteGuide,
  decideCigaretteSurface,
  includeCigaretteCard,
  readCigaretteTvHeader,
  reconcileSurfaceItems,
  resolveCigWording,
  resolveSurfaceFlag,
} from "../app/lib/cigDecision.ts";

const carton = { category: "CIGARETTES", name: "BB FULL CARTON", slug: "bb-full-carton" };
const grabba = { category: "CIGARETTES", name: "GRABBA", slug: "grabba" };
const backwoods = { category: "CIGARETTES", name: "BACKWOODS ASSORTED FLAVORS", slug: "backwoods-assorted-flavors" };
const pouch = { category: "CIGARETTES", name: "NICOTINE POUCHES , VELO", slug: "nicotine-pouches-velo" };
const wrap = { category: "CIGARETTES", name: "HEMP WRAPS", slug: "hemp-wraps" };
const paper = { category: "CIGARETTES", name: "RAW ROLLING PAPERS", slug: "raw-rolling-papers" };
const zyn = { category: "CIGARETTES", name: "ZYN CITRUS", slug: "zyn-citrus" };
const cigarillo = { category: "CIGARETTES", name: "SHOW CIGARILLOS", slug: "show-cigarillos" };
const vape = { category: "VAPE PENS", name: "Mango Ice", slug: "mango-ice" };
const boards = [
  { id: "VAPES" },
  { id: "CIGARETTES" },
  { id: "MAGIC" },
];

const wording = {
  bannerText: "FEED BANNER",
  promoBrands: "FEED BRANDS",
  tv2BoardTitle: "FEED BOARD",
  wrapsTitle: "🍂 WRAPS & POUCHES",
  tickerLine1: "FEED TICKER",
  priceTwoPack: "$5",
  priceCarton: "$25",
  priceBelmont: "$10",
  priceBB2Pack: "$5",
};

function cig(extra: Record<string, unknown> = {}) {
  return { on: false, tvOn: false, webOn: false, webFollowsTv: true, wording, ...extra };
}

test("website follows webOn and TV follows tvOn, with on as the fallback", () => {
  const items = [carton, backwoods];
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "web" }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "web" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "tv" }).show, true);
  assert.equal(resolveSurfaceFlag({ on: true }, "web"), true);
  assert.equal(resolveSurfaceFlag({ on: true }, "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false }), "web"), false);
  assert.equal(resolveSurfaceFlag(cig({ on: false, tvOn: true, webFollowsTv: true }), "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false, webFollowsTv: true }), "web"), false);
});

test("a feed error or a missing feed keeps the coded switch on the website only", () => {
  const items = [carton, grabba, backwoods];
  const missing = decideCigaretteSurface({ cig: null, items, surface: "web" });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, false);
  assert.equal(decideCigaretteSurface({ cig: null, items, surface: "web", codedShow: true }).show, true);
  assert.equal(decideCigaretteSurface({ cig: null, items, surface: "tv", codedShow: false }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig(), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items: [backwoods, pouch], surface: "web" }).reason, "no-items");
  const errored = decideCigaretteSurface({ cig: cig({ on: true, webOn: false, tvOn: false }), items, surface: "web", errored: true });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: false, tvOn: false }), items, surface: "tv", errored: true, codedShow: false }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", envRaw: "false" }).reason, "env");
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "web", envRaw: "false" }).reason, "env");
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "web", envRaw: "true" }).show, true);
});

test("tvOn shows the cigarettes card and items while webOn false keeps the website hidden", () => {
  const items = [vape, carton, grabba, backwoods, pouch, wrap, paper, zyn, cigarillo];
  const feed = cig({ on: false, webOn: false, tvOn: true });
  const tv = decideCigaretteSurface({ cig: feed, items, surface: "tv", codedShow: false });
  const web = decideCigaretteSurface({ cig: feed, items, surface: "web", codedShow: false });
  assert.equal(tv.show, true);
  assert.equal(tv.reason, "on");
  assert.equal(web.show, false);
  assert.equal(web.reason, "off");
  assert.deepEqual(includeCigaretteCard(boards, true).map((card) => card.id), ["VAPES", "CIGARETTES", "MAGIC"]);
  assert.deepEqual(includeCigaretteCard(boards, false).map((card) => card.id), ["VAPES", "MAGIC"]);
  const shown = reconcileSurfaceItems(items, items, true);
  assert.ok(shown.some((item) => item.slug === carton.slug));
  assert.deepEqual(
    reconcileSurfaceItems(items, items, false).map((item) => item.slug),
    [vape.slug, backwoods.slug, pouch.slug, wrap.slug, paper.slug, zyn.slug, cigarillo.slug],
  );
  const headers = cigarettePublicHeaders({ web: web.show, tv: tv.show, wording: tv.wording });
  assert.equal(headers["x-tv-data-cig-tv"], "1");
  assert.equal(headers["x-tv-data-cig-web"], "0");
  assert.equal(readCigaretteTvHeader({ get: (name) => headers[name] ?? null }).show, true);
  const hidden = cigarettePublicHeaders({ web: false, tv: false, wording: CIG_WORDING_FALLBACK });
  assert.equal(hidden["x-tv-data-cig-tv"], "0");
  assert.equal(readCigaretteTvHeader({ get: (name) => hidden[name] ?? null }).show, false);
});

test("wording uses the feed and falls back to the current copy field by field", () => {
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  ", wrapsTitle: "" }).bannerText, "FEED BANNER");
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  " }).wrapsTitle, CIG_WORDING_FALLBACK.wrapsTitle);
  assert.equal(resolveCigWording(undefined).tickerLine1, CIG_WORDING_FALLBACK.tickerLine1);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false }), items: [backwoods], surface: "web" }).wording.wrapsTitle, "🍂 WRAPS & POUCHES");
  assert.equal(decideCigaretteSurface({ cig: null, items: [], surface: "tv" }).wording.bannerText, CIG_WORDING_FALLBACK.bannerText);
});

test("null flags with real cigarettes stay open and an explicit false still hides", () => {
  const open = decideCigaretteSurface({ cig: { on: null, webOn: null, tvOn: null, wording }, items: [carton], surface: "web" });
  assert.equal(open.show, true);
  assert.equal(open.reason, "on");
  assert.equal(decideCigaretteSurface({ cig: { on: false }, items: [carton], surface: "tv" }).reason, "off");
  assert.equal(decideCigaretteGuide({ cig: { master: null, on: null }, items: [carton] }).show, true);
});

test("guide pages follow the master switch and a feed error stays on the coded switch", () => {
  const items = [carton];
  assert.equal(decideCigaretteGuide({ cig: cig({ on: false, master: false, webOn: true }), items }).show, false);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true, webOn: false }), items }).show, true);
  assert.equal(decideCigaretteGuide({ cig: null, items, errored: true }).show, false);
  assert.equal(decideCigaretteGuide({ cig: null, items, errored: true, codedShow: true }).show, true);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true }), items, envRaw: "off" }).reason, "env");
});

test("webOn false stays on the URL and each surface keeps wraps and pouches", () => {
  const off = decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items: [carton], surface: "web" });
  assert.equal(cigarettePageUnavailable(off), true);
  assert.equal(cigaretteAccessFrom({ fleetActive: true, decision: off }), "unavailable");
  assert.equal(cigaretteAccessFrom({ fleetActive: false, decision: off }), "redirect");
  const menu = [vape, carton, grabba, backwoods, pouch];
  const hidden = reconcileSurfaceItems(menu, menu, false);
  assert.deepEqual(hidden.map((item) => item.slug), [vape.slug, backwoods.slug, pouch.slug]);
  const shown = reconcileSurfaceItems([vape, backwoods], [carton, backwoods], true);
  assert.deepEqual(shown.map((item) => item.slug), [vape.slug, backwoods.slug, carton.slug]);
});

test("tv boards and the items route follow the feed flag, and the website gate stays put", () => {
  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  const itemsRoute = readFileSync(new URL("../app/api/tv-data/route.ts", import.meta.url), "utf8");
  const statusRoute = readFileSync(new URL("../app/api/content-status/route.ts", import.meta.url), "utf8");
  const feed = readFileSync(new URL("../app/lib/cigaretteFeed.ts", import.meta.url), "utf8");
  assert.match(tv2, /readCigaretteTvHeader/);
  assert.match(tv2, /includeCigaretteCard/);
  assert.doesNotMatch(tv2, /SHOW_CIGARETTES/);
  assert.match(tv, /readCigaretteTvHeader/);
  assert.match(itemsRoute, /reconcileSurfaceItems/);
  assert.match(itemsRoute, /snapshotHeaders/);
  assert.doesNotMatch(itemsRoute, /SHOW_CIGARETTES/);
  assert.match(statusRoute, /cig: \{ web: cig\.web\.show, tv: cig\.tv\.show, guides: cig\.guides\.show \}/);
  assert.match(statusRoute, /mode: fleet\.mode/);
  assert.match(feed, /surface: "tv", errored \}/);
  assert.match(feed, /surface: "web", errored, codedShow: SHOW_CIGARETTES/);
});
