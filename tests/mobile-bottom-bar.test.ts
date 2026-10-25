import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { FULL_NAME_NAP } from "../app/lib/fullNameNap.ts";
import { STORE } from "../app/lib/storeIdentity.ts";
import { storeHoursStatus, type OpeningHoursSpec } from "../app/lib/storeHoursStatus.ts";

const layout = fs.readFileSync("app/layout.tsx", "utf8");
const globals = fs.readFileSync("app/globals.css", "utf8");
const bar = fs.readFileSync("app/components/MobileBottomBar.tsx", "utf8");
const css = fs.readFileSync("app/components/MobileBottomBar.module.css", "utf8");
const products = fs.readFileSync("app/lib/products.ts", "utf8");

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

function daily(opens: string, closes: string, days: readonly string[] = WEEK): OpeningHoursSpec[] {
  return [{ dayOfWeek: days, opens, closes }];
}

test("Gas City hours are daily 11:00 a.m. to 3:00 a.m. in Toronto", () => {
  assert.equal(STORE.opens, "11:00");
  assert.equal(STORE.closes, "03:00");
  assert.equal(STORE.hoursLabel, "Open daily 11:00 AM - 3:00 AM");

  const sundayEvening = storeHoursStatus(new Date("2026-10-25T22:00:00.000Z"));
  assert.deepEqual(sundayEvening, { kind: "open", label: "Open now · until 3 a.m." });

  const overnight = storeHoursStatus(new Date("2026-10-26T06:30:00.000Z"));
  assert.deepEqual(overnight, { kind: "open", label: "Open now · until 3 a.m." });

  const beforeOpen = storeHoursStatus(new Date("2026-10-26T12:00:00.000Z"));
  assert.deepEqual(beforeOpen, { kind: "closed", label: "Closed · opens 11 a.m." });

  const winterAfternoon = storeHoursStatus(new Date("2026-01-15T20:00:00.000Z"));
  assert.deepEqual(winterAfternoon, { kind: "open", label: "Open now · until 3 a.m." });

  const winterMorning = storeHoursStatus(new Date("2026-01-15T14:00:00.000Z"));
  assert.deepEqual(winterMorning, { kind: "closed", label: "Closed · opens 11 a.m." });
});

test("an all-day window reads as open 24 hours", () => {
  const hours = daily("00:00", "23:59");
  for (const iso of ["2026-01-15T15:00:00.000Z", "2026-07-15T04:30:00.000Z", "2026-10-26T03:59:00.000Z"]) {
    const status = storeHoursStatus(new Date(iso), hours);
    assert.equal(status.kind, "always");
    assert.equal(status.label, "Open 24 hours");
  }
});

test("limited hours say open until the close, or the next open, in Toronto", () => {
  const hours = daily("09:00", "21:00");
  const sundayEvening = storeHoursStatus(new Date("2026-10-25T22:00:00.000Z"), hours);
  assert.deepEqual(sundayEvening, { kind: "open", label: "Open now · until 9 p.m." });

  const beforeOpen = storeHoursStatus(new Date("2026-10-26T12:00:00.000Z"), hours);
  assert.deepEqual(beforeOpen, { kind: "closed", label: "Closed · opens 9 a.m." });

  const afterClose = storeHoursStatus(new Date("2026-10-26T02:30:00.000Z"), hours);
  assert.equal(afterClose.kind, "closed");
  assert.equal(afterClose.label, "Closed · opens Mon 9 a.m.");

  const winterAfternoon = storeHoursStatus(new Date("2026-01-15T20:00:00.000Z"), hours);
  assert.deepEqual(winterAfternoon, { kind: "open", label: "Open now · until 9 p.m." });
});

test("overnight windows stay open past midnight and name the next open day", () => {
  const hours = daily("10:00", "02:00", ["Friday"]);
  const fridayNight = storeHoursStatus(new Date("2026-10-24T03:00:00.000Z"), hours);
  assert.deepEqual(fridayNight, { kind: "open", label: "Open now · until 2 a.m." });

  const saturdayEarly = storeHoursStatus(new Date("2026-10-24T05:00:00.000Z"), hours);
  assert.deepEqual(saturdayEarly, { kind: "open", label: "Open now · until 2 a.m." });

  const saturdayLater = storeHoursStatus(new Date("2026-10-24T07:00:00.000Z"), hours);
  assert.deepEqual(saturdayLater, { kind: "closed", label: "Closed · opens Fri 10 a.m." });
});

test("a split day uses the window that is actually open", () => {
  const hours: OpeningHoursSpec[] = [
    { dayOfWeek: ["Monday"], opens: "09:00", closes: "12:00" },
    { dayOfWeek: ["Monday"], opens: "14:00", closes: "18:00" },
  ];
  assert.equal(storeHoursStatus(new Date("2026-10-26T15:00:00.000Z"), hours).label, "Open now · until 12 p.m.");
  assert.equal(storeHoursStatus(new Date("2026-10-26T17:00:00.000Z"), hours).label, "Closed · opens 2 p.m.");
  assert.equal(storeHoursStatus(new Date("2026-10-26T19:30:00.000Z"), hours).label, "Open now · until 6 p.m.");
});

test("the bar is mounted on every page, hidden on TV, and only pads the body on small screens", () => {
  assert.match(layout, /import MobileBottomBar from "\.\/components\/MobileBottomBar"/);
  assert.match(layout, /<MobileBottomBar \/>/);
  assert.match(bar, /HIDDEN_PATHS = new Set\(\["\/tv", "\/tv2"\]\)/);
  assert.match(bar, /if \(HIDDEN_PATHS\.has\(pathname\)\) return null/);
  assert.match(globals, /--mobile-action-bar-height:\s*0px/);
  assert.match(
    globals,
    /@media \(max-width:\s*768px\)\s*\{[\s\S]*--mobile-action-bar-height:\s*calc\(68px \+ env\(safe-area-inset-bottom, 0px\)\)[\s\S]*padding-bottom:\s*var\(--mobile-action-bar-height\)/,
  );
});

test("directions, hours, menu, and delivery fit the bar and call is absent", () => {
  assert.match(bar, /href=\{FULL_NAME_NAP\.mapsUrl\}/);
  assert.equal(FULL_NAME_NAP.mapsUrl, "https://www.google.com/maps/place/?q=place_id:ChIJXS-WHh_N1IkR7ZP8wWjQBTk");
  assert.equal(FULL_NAME_NAP.mapsUrl.includes("google.com/maps"), true);
  assert.match(bar, /href="\/hours"/);
  assert.match(bar, /href="\/exotic"/);
  assert.match(bar, />\s*Menu\s*</);
  assert.match(bar, /href="\/delivery"/);
  assert.match(bar, />\s*Delivery\s*</);
  assert.match(bar, />\s*Directions\s*</);
  assert.doesNotMatch(bar, /Call|tel:/);
  assert.doesNotMatch(bar, /href="\/exotic-weed"|href="\/menu"/);
  assert.equal(fs.existsSync("app/hours/page.tsx"), true);
  assert.equal(fs.existsSync("app/delivery/page.tsx"), true);
  assert.equal(fs.existsSync("app/tv/page.tsx"), true);
  assert.equal(fs.existsSync("app/tv2/page.tsx"), true);
  assert.equal(fs.existsSync("app/[tier]/page.tsx"), true);
  assert.match(products, /slug:\s*"exotic"/);
  assert.match(css, /\.bar\s*\{[^}]*display:\s*none/s);
  assert.match(css, /@media \(max-width:\s*768px\)\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /bottom:\s*0/);
  assert.match(css, /minmax\(0,\s*1\.25fr\)\s+minmax\(0,\s*1\.5fr\)\s+minmax\(44px,\s*0\.72fr\)\s+minmax\(44px,\s*0\.9fr\)/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /min-width:\s*44px/);
  assert.match(css, /max-width:\s*100%/);
  assert.match(css, /var\(--green-dark/);
});
