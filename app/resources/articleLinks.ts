export type ArticlePart =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string };

function isSameSiteHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\") || href.includes("://")) return false;
  try {
    return new URL(href, "https://www.gascitycannabis.com").origin === "https://www.gascitycannabis.com";
  } catch {
    return false;
  }
}

export function articleBodyParts(text: string): ArticlePart[] {
  const pattern = /\[([^\]\n]+)\]\((\/(?!\/)[^)\s]+)\)/g;
  const parts: ArticlePart[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    const label = match[1];
    const href = match[2];
    if (!label || !href || !isSameSiteHref(href)) continue;
    if (start > last) parts.push({ type: "text", text: text.slice(last, start) });
    parts.push({ type: "link", text: label, href });
    last = start + match[0].length;
  }
  if (last < text.length) parts.push({ type: "text", text: text.slice(last) });
  return parts;
}
