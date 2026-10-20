export const ARTICLE_PATH = "/resources/cannabis-packaging-recycling-toronto";
export const ARTICLE_CANONICAL = "https://www.gascitycannabis.com" + ARTICLE_PATH;

export const ARTICLE_MARKDOWN = `
# Cannabis packaging in Toronto: how to check the blue bin rules, and what never goes in

*Last checked: September 30, 2026*
Cannabis comes in a lot of packaging for the amount of product inside. A small jar might sit in a cardboard sleeve, with a seal, a child-resistant lid and a sticker or two. When it's empty, where does each piece go? This guide shows Toronto households how to check (adults 19+ only). It sticks to packaging only: the containers, lids, pouches, boxes and devices, not the product.

## Why there's so much packaging in the first place

It isn't just marketing. Under section 108 of the federal Cannabis Regulations, the container that holds a cannabis product has to:

- be opaque or translucent (with one exception, below)
- prevent contamination
- keep dried cannabis dry
- have a security feature that shows it hasn't been opened
- meet the child-resistant package standard in the Food and Drug Regulations
- hold no more than what counts as 30 g of dried cannabis

There's one exception, which SOR/2025-43 added in 2025. Section 108(2) now reads: "Despite paragraph (1)(a), the immediate container in which dried cannabis or fresh cannabis is packaged may be transparent." So a clear container for dried or fresh cannabis is allowed; other products still need an opaque or translucent one.

That's why you end up with sturdy lids, tamper seals and mixed materials. Each piece may need a different bin.

## Toronto's recycling changed in 2026

If you last checked the city's rules a while ago, this is the part to know. According to toronto.ca, **starting January 1, 2026, the City no longer collects residential recycling.** A provincial regulation (O. Reg. 391/21, the Blue Box regulation) makes the producers of packaging responsible for it, and a new recycling service provider, **Circular Materials**, now handles recycling collection for homes. For missed pickups, bin requests and other residential recycling questions, toronto.ca points residents to the Circular Materials website or 1-888-921-2686.

The City also warns that **not every item with a recycling symbol is accepted**, and suggests its Waste Wizard lookup tool when you're not sure.

## How to check each piece before it goes in the bin

The City's page on the recycling change is direct about the one rule that matters most here: "Not all items with a recycling symbol are accepted in Toronto's Blue Bin recycling program." It adds: "If unsure about whether or not an item can be recycled, check Waste Wizard." The same page also notes that from January 1, 2026, "there will be changes to the materials accepted in the new Blue Bin recycling program," and sends residents to Circular Materials for the details.

Cannabis packaging is a good example of "unsure." A jar, its lid, a pouch, a sleeve and a tube can each be a different material, and some combine two. So we haven't published a sorting chart of our own. Instead:

- **Look up each piece separately.** Search Waste Wizard for the jar, then the lid, then the pouch or box, rather than assuming the whole package goes one way.
- **If Waste Wizard doesn't settle it,** ask Circular Materials, the service provider the City names for residential recycling, at 1-888-921-2686 or through its website.
- **Don't go by the recycling symbol alone.** The City's warning above is exactly about that.
- **When in doubt, hold the piece back** until Waste Wizard or Circular Materials has answered.

## Devices with batteries: never in any bin

Vape hardware is the exception to everything above. Toronto classes batteries as household hazardous waste, so they can't go in the garbage, the Blue Bin or the Green Bin. The City's reason: this kind of waste can hurt the people who collect it and start fires in trucks and at waste facilities. Its lithium-ion page lists vaping devices among the everyday products with these batteries inside.

Where it can go instead, according to the City:

- **Six City depots** take household hazardous waste: Bermondsey (188 Bermondsey Rd), Commissioners (400 Commissioners St), Disco (120 Disco Rd), Ingram (50 Ingram Dr), Scarborough (1 Transfer Place) and Victoria Park (3350 Victoria Park Ave). You have to arrive in a motor vehicle, and hazardous items have their own drop-off times, so check the depot page before going.
- **Community Environment Days**, which move around the city.
- **Toxic Taxi**, a free City pickup once you've built up at least 10 L or 10 kg (the cap is 50).

A wrinkle for vapes: the depots turn away batteries still sitting inside the device they power, and a disposable's battery is sealed in. Leave the casing closed, then search the device in Waste Wizard or phone 311 before heading out.

## A four-step routine for the empties

1. **Empty it completely.** Recycling takes packaging, not product.
2. **Split it up.** Take the sleeve off the box and set the device apart from everything else, and treat the jar and its lid as separate pieces to look up.
3. **Check every piece.** Search Waste Wizard for each one, and treat anything with a battery as household hazardous waste.
4. **Store it safely until collection day.** Federal label rules make every cannabis container carry a child-safety warning, so give the empties the same care until they leave the house.

## Questions at the counter

GAS CITY CANNABIS is at 985 O'Connor Dr in East York. Legal cannabis in Ontario is for adults 19 and over. Directions are on our [visit page](/visit).

**Where this comes from.** City of Toronto pages on the 2026 recycling change, household hazardous waste, lithium-ion batteries and depot locations. Federal Cannabis Regulations sections 108 and 123 on Justice Canada's laws site.
`;

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "em"; text: string }
  | { type: "link"; text: string; href: string };

export type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; inlines: Inline[] }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] };

const MONTHS: Record<string, string> = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export function parseInlines(input: string): Inline[] {
  return input
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter((part) => part.length > 0)
    .map((part) => {
      const strong = part.match(/^\*\*([^*]+)\*\*$/);
      if (strong) return { type: "strong", text: strong[1] };
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) return { type: "link", text: link[1], href: link[2] };
      return { type: "text", text: part };
    });
}

export function parseArticle(markdown: string): Block[] {
  const withoutComments = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const blocks: Block[] = [];
  let list: { type: "ul" | "ol"; items: Inline[][] } | null = null;
  const flush = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const raw of withoutComments.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith("# ")) {
      flush();
      blocks.push({ type: "h1", text: line.slice(2).trim() });
      continue;
    }
    const unordered = line.match(/^- (.*)$/);
    if (unordered) {
      if (!list || list.type !== "ul") {
        flush();
        list = { type: "ul", items: [] };
      }
      list.items.push(parseInlines(unordered[1]));
      continue;
    }
    const ordered = line.match(/^\d+\. (.*)$/);
    if (ordered) {
      if (!list || list.type !== "ol") {
        flush();
        list = { type: "ol", items: [] };
      }
      list.items.push(parseInlines(ordered[1]));
      continue;
    }
    flush();
    const italic = line.match(/^\*([^*]+)\*$/);
    if (italic) {
      blocks.push({ type: "p", inlines: [{ type: "em", text: italic[1] }] });
      continue;
    }
    blocks.push({ type: "p", inlines: parseInlines(line) });
  }
  flush();
  return blocks;
}

export function inlineText(inlines: Inline[]): string {
  return inlines.map((part) => part.text).join("");
}

export const ARTICLE_BLOCKS = parseArticle(ARTICLE_MARKDOWN.trim());

const heading = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "h1" }> => block.type === "h1");
export const ARTICLE_H1 = heading?.text ?? "";

const firstUseful = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "p" }> => {
  if (block.type !== "p") return false;
  return !inlineText(block.inlines).startsWith("Last checked:");
});
export const ARTICLE_DESCRIPTION = firstUseful ? inlineText(firstUseful.inlines) : "";

const titleCut = ARTICLE_H1.indexOf(",");
export const ARTICLE_TITLE = titleCut > 0 ? ARTICLE_H1.slice(0, titleCut) : ARTICLE_H1;

const lastCheckedBlock = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "p" }> => {
  return block.type === "p" && inlineText(block.inlines).startsWith("Last checked:");
});
export const ARTICLE_LAST_CHECKED = lastCheckedBlock ? inlineText(lastCheckedBlock.inlines) : "";

export function articleDateModified(lastChecked: string): string {
  const match = lastChecked.match(/^Last checked: ([A-Za-z]+) (\d{1,2}), (\d{4})$/);
  if (!match) return "";
  const month = MONTHS[match[1]];
  if (!month) return "";
  return `${match[3]}-${month}-${match[2].padStart(2, "0")}`;
}

export const ARTICLE_DATE_MODIFIED = articleDateModified(ARTICLE_LAST_CHECKED);

export function articleJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ARTICLE_H1,
    description: ARTICLE_DESCRIPTION,
    dateModified: ARTICLE_DATE_MODIFIED,
    mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_CANONICAL },
    url: ARTICLE_CANONICAL,
    author: {
      "@type": "Organization",
      name: "GAS CITY CANNABIS",
      url: "https://www.gascitycannabis.com",
    },
    publisher: {
      "@type": "Organization",
      name: "GAS CITY CANNABIS",
      url: "https://www.gascitycannabis.com",
    },
  };
}
