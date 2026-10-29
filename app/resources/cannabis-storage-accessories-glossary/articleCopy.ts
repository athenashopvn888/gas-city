export const ARTICLE_PATH = "/resources/cannabis-storage-accessories-glossary";
export const ARTICLE_CANONICAL = "https://www.gascitycannabis.com" + ARTICLE_PATH;
export const ARTICLE_DATE = "2026-10-29";

export const ARTICLE_MARKDOWN = `# Cannabis Storage Accessories: Doob Tubes, Smell-Proof Bags and Lock Boxes, Explained

Last checked: October 25, 2026

At home in East York, the questions are rarely about the product. They're about where to put it. Tubes, jars, bags, boxes: the accessory aisle has its own vocabulary. Gas City Cannabis, at 985 O'Connor Dr, wrote this home-life glossary of **cannabis storage accessories** for adults 19+, with a how-to list for each. No brand names, no stock claims, just what each item is for.

## Why storage gear matters at home

Three reasons, all practical:
1. **Safety.** Cannabis packaging carries the warning KEEP OUT OF REACH OF CHILDREN. Storage gear helps you do that.
2. **Freshness.** Air, heat and light change flower over time.
3. **Odour.** A sealed container keeps smell where it belongs.

## The glossary

**Doob tube**: a small, rigid tube sized for a single pre-roll. Many legal pre-rolls come in one. It protects the roll from getting crushed in a bag or pocket.

**Airtight jar**: glass or plastic jar with a sealing lid. Good for keeping flower away from air. Glass doesn't hold odours the way some plastics can.

**Smell-proof bag**: a pouch with lined layers and a sealing zip, designed to hold odour in. Useful for carrying sealed packages.

**Lock box**: a small box with a key or combination lock. The simplest way to add a physical barrier between cannabis and curious hands.

**Humidity pack**: a small two-way pack placed inside a container to help keep humidity steady. An add-on, not a container.

**Opaque container**: any container that blocks light. Light is one of the things that changes stored cannabis over time.

**Child-resistant packaging**: the packaging legal products already come in. It's designed to be hard for children to open.

## How-to: set up a simple home storage spot

1. Pick a cool, dark, dry spot, away from the stove, the dishwasher and sunny windows.
2. Keep products in their original labelled, child-resistant packaging.
3. Put those packages inside a lock box or a locked cabinet.
4. Keep the spot up high and out of sight of kids.
5. Keep it separate from food and snacks so nothing gets mixed up.
6. Check packaging dates now and then.

## How-to: choose the right accessory for the job

| You want to... | Try... |
|---|---|
| Stop a pre-roll from getting crushed | Doob tube |
| Keep flower away from air | Airtight jar |
| Keep packages from smelling up a bag | Smell-proof bag |
| Keep everything away from kids | Lock box |
| Keep light out | Opaque container |

## Keep the label with the product

It's tempting to move flower into a nice jar. If you do, keep the original labelled package too. The label holds the class, net weight, Total THC and Total CBD, lot number and packaging date. Those details matter if you ever need to check them. The simplest habit: put the whole labelled package inside your accessory instead of decanting.

## What not to do

- Don't store cannabis in food containers that kids might open.
- Don't leave it in a car, where heat builds up.
- Don't keep it next to the stove or in a sunny spot.
- Don't toss packaging without checking local recycling guidance.

## Pets count too

Dogs and cats are curious. A lock box or a high, closed cabinet keeps cannabis away from pets as well as kids.

## Carrying sealed packages

If you're bringing cannabis home, keep it sealed in its original package. A smell-proof bag can help with odour. Ontario's public possession limit for adults is 30 g of dried cannabis or the equivalent.

## Quick home checklist, East York style

Run through this once a month:

- Is everything still in its original labelled package?
- Is the lock box locked?
- Is the storage spot still cool, dark and dry?
- Is anything past a date you're comfortable with?
- Are kids' snacks and cannabis products stored well apart?

Five questions, two minutes.

## Accessory care

Containers need a little upkeep too:
1. Wipe jars and tubes with a dry cloth.
2. Let anything washed dry fully before reuse.
3. Replace cracked lids or broken zips.
4. Keep spare keys for lock boxes somewhere only adults know.

## From the O'Connor Drive counter

Store details are on our [O'Connor Drive weed dispensary](/weed-dispensary-oconnor-east-york) page, and the [visit page](/visit) has the rest.

Cannabis storage accessories are simple tools: tubes, jars, bags and boxes that keep products safe, fresh and contained. Gas City Cannabis is for adults 19 and over. Staff ask for ID from anyone who looks under 25.
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

export const ARTICLE_DESCRIPTION = "Gas City Cannabis, at 985 O'Connor Dr, wrote this home-life glossary of cannabis storage accessories for adults 19+, with a how-to list for each.";

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
