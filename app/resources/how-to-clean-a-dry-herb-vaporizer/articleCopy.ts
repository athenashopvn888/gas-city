export const ARTICLE_PATH = "/resources/how-to-clean-a-dry-herb-vaporizer";
export const ARTICLE_CANONICAL = "https://www.gascitycannabis.com" + ARTICLE_PATH;
export const ARTICLE_DATE = "2026-11-05";

export const ARTICLE_MARKDOWN = `# How to Clean a Dry Herb Vaporizer: The East York Home Routine

Last checked: October 30, 2026

A dry herb vaporizer heats flower instead of burning it, which sounds tidy. It isn't. Residue, crumbs and sticky film still build up in the chamber, the screens and the mouthpiece. Here's GAS CITY CANNABIS's home routine for **how to clean a dry herb vaporizer**, step by step, from O'Connor Drive. For adults 19+. No product recommendations and no claims about effects.

## Read the manual first

Every vaporizer is built differently. Some have removable chambers and glass mouthpieces. Others are sealed units with only a screen that comes out. Before you start, check the manufacturer's instructions: what can be removed, what can be soaked and what must stay dry. The heating element and battery should never get wet.

## What you'll need

- Isopropyl alcohol
- Cotton swabs and pipe cleaners
- A small brush (many vaporizers come with one)
- A small dish or jar for soaking removable parts
- A soft cloth
- Paper towels

## Before you begin: power off and cool down

Turn the vaporizer off and let it cool completely. Unplug it if it's charging. Never clean a warm chamber.

## Step 1: Empty and brush the chamber

Tip out the used flower over a bin. Use the small brush to sweep out loose bits from the chamber and around the edges. Do this after every session and the deep clean becomes much easier.

## Step 2: Remove the screens and mouthpiece

Most vaporizers have one or two screens that sit above or below the chamber, plus a removable mouthpiece. Take them out carefully. Screens are thin and bend easily.

## Step 3: Soak the removable parts

Place the screens, mouthpiece and any other removable parts that the manual says can be soaked in a small dish of isopropyl alcohol. Let them sit while you work on the rest. Sticky residue will soften and start to come off.

## Step 4: Clean the chamber with a swab

Dip a cotton swab in isopropyl alcohol and squeeze out the excess. It should be damp, not dripping. Wipe the inside of the chamber gently. Repeat with fresh swabs until they come out clean. Never pour alcohol into the chamber.

## Step 5: Clean the parts

After soaking, use pipe cleaners and swabs to clear the screens and mouthpiece. Rinse them with warm water until there's no alcohol smell left.

## Step 6: Dry everything

Lay all the parts on a paper towel and let them dry completely. Let the chamber air out too. Only reassemble when everything is dry and odour-free.

## Step 7: Wipe the outside

A soft cloth with a touch of alcohol cleans fingerprints and residue from the body. Avoid the charging port and buttons.

## How often should you clean a dry herb vaporizer?

- **After every session:** empty the chamber and brush it out.
- **Every few sessions:** wipe the chamber and screens with alcohol.
- **When the draw feels tight or the taste changes:** full clean of all removable parts.

## Signs it's time

- The draw is harder than it used to be.
- Screens look dark or clogged.
- The vaporizer smells stale even when off.
- The mouthpiece is sticky.

## Mistakes that damage a vaporizer

- **Getting the battery or heating element wet.** This can permanently damage the device.
- **Soaking parts the manual says not to.** Some plastics and seals don't tolerate alcohol.
- **Bending screens.** Handle them gently.
- **Reassembling while damp.** Alcohol and electronics shouldn't meet.
- **Scraping with metal.** Use soft tools.

## Storage at home

Keep the vaporizer in a case when you're not using it. That keeps dust out and keeps it away from children and pets. Our [storage accessories glossary](/resources/cannabis-storage-accessories-glossary) explains common storage terms, and our [packaging recycling guide](/resources/cannabis-packaging-recycling-toronto) covers what to do with the containers.

## Quick answers

**Can I use water to clean a dry herb vaporizer?** Only on parts the manual says can get wet. Isopropyl alcohol is the standard for residue.

**What about the oven of a sealed device?** Use a barely damp swab and let it dry fully before use.

**Why learn how to clean a dry herb vaporizer properly?** A clean device draws easier and tastes like the flower.

## Find us in East York

GAS CITY CANNABIS is at 985 O'Connor Dr, East York. Adults 19+ only. Bring government-issued photo ID.
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
  | { type: "ol"; items: Inline[][] }
  | { type: "table"; headers: Inline[][]; rows: Inline[][][] };

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

function isTableLine(line: string): boolean {
  return line.startsWith("|") && line.endsWith("|");
}

function splitRow(line: string): string[] {
  return line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isSeparatorRow(line: string): boolean {
  const cells = splitRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function parseArticle(markdown: string): Block[] {
  const withoutComments = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const blocks: Block[] = [];
  let list: { type: "ul" | "ol"; items: Inline[][] } | null = null;
  let tableLines: string[] | null = null;

  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  const flushTable = () => {
    if (!tableLines) return;
    const rows = tableLines.filter((line) => !isSeparatorRow(line)).map(splitRow);
    tableLines = null;
    if (rows.length === 0) return;
    const [headers, ...body] = rows;
    blocks.push({
      type: "table",
      headers: headers.map(parseInlines),
      rows: body.map((row) => row.map(parseInlines)),
    });
  };

  const flush = () => {
    flushList();
    flushTable();
  };

  for (const raw of withoutComments.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (isTableLine(line)) {
      flushList();
      if (!tableLines) tableLines = [];
      tableLines.push(line);
      continue;
    }
    flushTable();
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      blocks.push({ type: "h1", text: line.slice(2).trim() });
      continue;
    }
    const unordered = line.match(/^- (.*)$/);
    if (unordered) {
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(parseInlines(unordered[1]));
      continue;
    }
    const ordered = line.match(/^\d+\. (.*)$/);
    if (ordered) {
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(parseInlines(ordered[1]));
      continue;
    }
    flushList();
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

export const ARTICLE_DESCRIPTION = "Here's GAS CITY CANNABIS's home routine for how to clean a dry herb vaporizer, step by step, from O'Connor Drive.";

const lastCheckedBlock = ARTICLE_BLOCKS.find((block): block is Extract<Block, { type: "p" }> => {
  return block.type === "p" && inlineText(block.inlines).startsWith("Last checked:");
});
export const ARTICLE_LAST_CHECKED = lastCheckedBlock ? inlineText(lastCheckedBlock.inlines) : "";

export function articleJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ARTICLE_H1,
    description: ARTICLE_DESCRIPTION,
    datePublished: ARTICLE_DATE,
    dateModified: ARTICLE_DATE,
    mainEntityOfPage: { "@type": "WebPage", "@id": ARTICLE_CANONICAL, url: ARTICLE_CANONICAL },
    url: ARTICLE_CANONICAL,
    author: {
      "@type": "Organization",
      name: "Gas City Cannabis",
      url: "https://www.gascitycannabis.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Gas City Cannabis",
      url: "https://www.gascitycannabis.com",
    },
  };
}
