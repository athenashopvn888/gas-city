export const ARTICLE_PATH = "/resources/red-congolese-strain";
export const ARTICLE_CANONICAL = "https://www.gascitycannabis.com" + ARTICLE_PATH;
export const ARTICLE_DATE = "2026-11-12";

export const ARTICLE_MARKDOWN = `# Red Congolese Strain, Explained: A Name That Covers Three Continents

Last checked: November 3, 2026

Some strain names are jokes. Some are mash-ups. And some, like this one, are a geography lesson stuffed into two words. If you've searched the **Red Congolese strain**, you've probably seen a lot of confident claims online that don't agree with each other. Gas City Cannabis sorts it out the practical way, with a quick list: what the name refers to, what lineage sources report and where they disagree, the aroma words people use, and how to read the label. Adults 19+ only.

## What is the Red Congolese strain?

The Red Congolese strain is a cultivar whose story Leafly's strain database tells in two parts. Some argue it's an **African sativa landrace**. Leafly says the version popularized in California **weaves in Mexican and Afghani roots**, which gives it a more indica-like appearance.

So the short answer has a catch: depending on who's telling it, Red Congolese is either a single regional plant or a blend of several.

## Red Congolese lineage: where the sources split

Here's the disagreement laid out:

| Claim | What it means | Source |
|---|---|---|
| African sativa landrace | A regional plant adapted over a long time to one area | Leafly notes some argue this |
| California version with Mexican and Afghani roots | A blend of several regional plants | Leafly |
| Indica-like appearance | How the California version tends to look | Leafly |

A landrace is a regional plant that adapted to its local environment over many years. That's all the definition this article needs.

The practical point is that two products sold under the same name could come from different branches of this story. That's normal for older names. Treat the lineage as background, not a guarantee.

## Why is it called Red Congolese?

"Congolese" points to the Congo region, where the African side of the story places the plant's roots. Strain sites don't settle where the "Red" comes from, so this guide won't guess. The name tells you where a strain is *said* to come from. It doesn't tell you anything about a product beyond that.

## What does Red Congolese smell like?

Leafly lists the top flavour tags for Red Congolese as **spicy/herbal, sage and chestnut**. That's an unusual set next to all the fruit-and-dessert names on most menus, and it's probably the most useful thing the database gives you.

A few things to keep in mind at home:

1. **Tags are averages.** They come from a database, not from your jar.
2. **Batches vary.** Growing, drying and curing all change aroma.
3. **Storage matters.** Keep flower the way the label says, sealed and out of the light. Our [storage accessories glossary](/resources/cannabis-storage-accessories-glossary) walks through the gear.

## How do you read a Red Congolese label?

Here's the twist most strain guides miss. Health Canada's consumer label guide lists the **strain name as optional information**. A producer can print "Red Congolese," but the law doesn't require it. These lines are required:

- **Class of cannabis.** Flower is dried cannabis.
- **Total THC and Total CBD**, on the front of the package.
- **Packaging date and lot number.**
- **Brand name.**
- **Recommended storage conditions.**

Start with those lines, and if the name and the label ever disagree, go with the label.

## Is Red Congolese a sativa?

Strain databases lean that way. Leafly's write-up centres on the sativa side of its genetics, while noting that the California version looks more indica-like. Either way, "sativa" and "indica" are type tags from databases, not lines Canadian law requires on a package. They describe how a plant is classified, not what a product will do.

## A name online isn't a promise on the shelf

Menus change. Seeing a strain name online is a good reason to ask, but it doesn't mean the strain is on the shelf today. This guide explains the name and doesn't list products.

## Red Congolese strain: quick answers

**Is Red Congolese a landrace?** Some argue it is. Leafly says the version popularized in California blends Mexican and Afghani roots.

**Does the name say anything about the product?** Only where the strain is said to come from.

**What tells me what's in the package?** The class, Total THC and Total CBD, and the packaging date on the label.

## Bring your Red Congolese strain questions to Gas City Cannabis

Want to dig into Red Congolese or any other name on the board? Visit Gas City Cannabis at 985 O'Connor Dr, East York, ask to see the label, and we'll go through it with you. Check our [visit page](/visit) before you head over. Adults 19+ only. Bring government-issued photo ID.
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
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    .filter((part) => part.length > 0)
    .map((part) => {
      const strong = part.match(/^\*\*([^*]+)\*\*$/);
      if (strong) return { type: "strong", text: strong[1] };
      const emphasis = part.match(/^\*([^*]+)\*$/);
      if (emphasis) return { type: "em", text: emphasis[1] };
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

export const ARTICLE_DESCRIPTION = "If you've searched the Red Congolese strain, you've probably seen a lot of confident claims online that don't agree with each other.";

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
