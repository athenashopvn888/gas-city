import { ARTICLE_H1, ARTICLE_PATH } from "../../resources/cannabis-packaging-recycling-toronto/articleCopy.ts";
import { RESOURCE_PAGES } from "../../resources/resourceData.ts";
import type { CodedArticleLink } from "./articles.ts";

/** Coded /resources pages. A fleet article with the same slug is omitted. */
export function codedArticleLinks(): CodedArticleLink[] {
  const fromResources = RESOURCE_PAGES.filter((page) => page.slug).map((page) => ({
    slug: page.slug,
    title: page.title,
    href: `/resources/${page.slug}`,
  }));
  const extra: CodedArticleLink = {
    slug: ARTICLE_PATH.replace(/^\/resources\//, ""),
    title: ARTICLE_H1,
    href: ARTICLE_PATH,
  };
  if (fromResources.some((page) => page.slug === extra.slug)) return fromResources;
  return [...fromResources, extra];
}
