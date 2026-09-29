import assert from "node:assert/strict"; import fs from "node:fs"; import test from "node:test";
import { HOME_DELIVERY_CARDS, HOME_DELIVERY_FAQS, HOME_TITLE } from "../app/lib/homeDelivery.ts";
const page=fs.readFileSync("app/page.tsx","utf8"); const layout=fs.readFileSync("app/layout.tsx","utf8");
test("locked title and metadata",()=>{assert.equal(HOME_TITLE,"Gas City Cannabis Dispensary - Weed Delivery in East York");assert.match(page,/\{HOME_TITLE\}/);assert.match(layout,/default: HOME_TITLE/);assert.match(layout,/openGraph:[\s\S]*title: HOME_TITLE/);});
test("correct menu paths",()=>{assert.match(page,/href="\/exotic"[\s\S]*>STORE MENU<\/Link>/);assert.match(page,/href="\/delivery"[\s\S]*>Delivery<\/Link>/);});
test("local body contract",()=>{assert.ok(HOME_DELIVERY_FAQS.length>=5&&HOME_DELIVERY_FAQS.length<=8);assert.ok(HOME_DELIVERY_CARDS.length>=3&&HOME_DELIVERY_CARDS.length<=6);for(const c of HOME_DELIVERY_CARDS)assert.match(c.href,/^\/(delivery|faq|visit|weed-dispensary-oconnor-east-york)$/);});
