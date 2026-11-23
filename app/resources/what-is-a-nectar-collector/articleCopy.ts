export const ARTICLE_PATH = "/resources/what-is-a-nectar-collector";
export const ARTICLE_CANONICAL = "https://www.gascitycannabis.com" + ARTICLE_PATH;
export const ARTICLE_DATE = "2026-11-23";

export const ARTICLE_MARKDOWN = `# Nectar Collector: The Dab Straw, Its Parts, and How It Differs From a Rig

Last checked: November 17, 2026

Some cannabis gear looks like lab equipment. Some looks like a straw. A **nectar collector** is in the second group: a handheld, straight-through piece for concentrates, without the big standing rig. GAS CITY CANNABIS walks through the parts and handling here, neighbourhood-practical and hype-free. For adults 19+.

## What is a nectar collector?

A nectar collector is a handheld dab straw: a body with a mouthpiece at one end and a tip at the other, used with cannabis concentrates. The tip is heated, then brought to the concentrate. That's the basic design, according to Leafly's cannabis glossary. It describes a straw-like vertical shape, a glass or silicone body, and a titanium or quartz tip heated by a torch or electric power.

## Collector vs dab rig: what's different?

The main difference is which part moves. With a traditional rig, the concentrate goes into a nail or banger on the rig. With a collector, the heated tip goes to the concentrate. The collector is handheld; a rig stands on a base.

| | This piece | Standing dab rig |
|---|---|---|
| Shape | Straight, straw-like | Base, chamber and mouthpiece |
| Heated part | Tip | Nail or banger |
| What moves | The tip goes to the concentrate | The concentrate goes to the heated part |
| Water | Some models have a chamber | Usually has a water chamber |

Different hardware layouts, not a ranking.

## The parts, end to end

Most collectors are easy to map:

- **Mouthpiece.** The end you hold at your mouth.
- **Body.** The middle section, often glass or silicone. Some have a water chamber.
- **Tip.** The heated end, commonly quartz or titanium.
- **Joint or connection.** Where the tip fits into the body. Designs vary, so follow the maker's instructions for your model.

## How do you use a nectar collector?

You use one by heating its tip as the maker directs, bringing the tip to concentrate in a heat-safe dish, then setting it down somewhere heat-safe to cool. This is a hardware-handling outline, not a temperature or consumption guide.

1. **Read your model's instructions.** Electric and torch-heated versions aren't the same.
2. **Use a flat, stable surface.** Put the concentrate in a dish made for this kind of heat.
3. **Check the connections.** Tip seated, body secure. If it wobbles, stop and fix that first.
4. **Heat only as directed.** Don't guess temperatures from a blog.
5. **Bring the tip to the concentrate.** That's the defining motion of a dab straw.
6. **Set it down to cool.** The tip stays hot after use, so have the resting place ready before you start.

One torch note: keep the flame and hot tip away from anything flammable. Set the torch aside fully extinguished before moving on.

## Electric vs torch

An electric collector heats the tip with a battery-powered element. A torch-heated one uses an external flame. Leafly notes both types exist. The body may look similar, but the instructions are different, and so is cleaning: never soak a powered body just because the glass version can be soaked.

## Cleaning the parts

Leafly describes a collector as easy to reach with a cotton swab, and says plain pieces can be submerged in isopropyl alcohol. The catch: know what your piece is made of and follow the maker's cleaning directions. Plain glass isn't the same as silicone, seals or electronics.

Our guide on [how to clean a dry-herb vaporizer](/resources/how-to-clean-a-dry-herb-vaporizer) is a useful read for the general habit: separate the removable parts from the powered body, and don't get either one confused. It's not the same device, so don't blindly copy every step.

## Keeping the gear story straight

This piece is one item in a much bigger accessory vocabulary. If you're trying to sort the names out, the [cannabis storage-accessories glossary](/resources/cannabis-storage-accessories-glossary) maps the rest of the gear without turning every word into a science project.

## Quick recap

- **Nectar collector:** a handheld dab straw for concentrates.
- **Parts:** mouthpiece, body, tip.
- **Difference from a rig:** the heated tip goes to the concentrate, not the other way around.
- **Handling:** follow the maker, use a heat-safe surface, plan where the hot tip rests.
- **Cleaning:** know the materials; never soak electronics.

## Ask us on O'Connor

Want to talk nectar collector parts without the sales pitch? GAS CITY CANNABIS is at 985 O'Connor Dr in East York. Come in with the gear word that's stumped you, and we'll work through it. Check the [visit page](/visit) before heading over.

Bring government-issued photo ID.
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

export const ARTICLE_DESCRIPTION = "A nectar collector is in the second group: a handheld, straight-through piece for concentrates, without the big standing rig.";

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
