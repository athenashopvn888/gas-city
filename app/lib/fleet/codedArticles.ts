import { ARTICLE_H1 as PACKAGING_H1, ARTICLE_PATH as PACKAGING_PATH } from "../../resources/cannabis-packaging-recycling-toronto/articleCopy.ts";
import { ARTICLE_H1 as STORAGE_H1, ARTICLE_PATH as STORAGE_PATH } from "../../resources/cannabis-storage-accessories-glossary/articleCopy.ts";
import { RESOURCE_PAGES } from "../../resources/resourceData.ts";
import type { CodedArticleLink } from "./articles.ts";

/** Coded /resources pages. A fleet article with the same slug is omitted. */
export function codedArticleLinks(): CodedArticleLink[] {
  const fromResources = RESOURCE_PAGES.filter((page) => page.slug).map((page) => ({
    slug: page.slug,
    title: page.title,
    href: `/resources/${page.slug}`,
  }));
  const extras: CodedArticleLink[] = [
    {
      slug: PACKAGING_PATH.replace(/^\/resources\//, ""),
      title: PACKAGING_H1,
      href: PACKAGING_PATH,
    },
    {
      slug: STORAGE_PATH.replace(/^\/resources\//, ""),
      title: STORAGE_H1,
      href: STORAGE_PATH,
    },
  ];
  const seen = new Set(fromResources.map((page) => page.slug));
  return [...fromResources, ...extras.filter((page) => !seen.has(page.slug))];
}
