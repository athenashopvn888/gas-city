import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "GAS CITY CANNABIS Blog | Cannabis Menu Guides",
  description: "Read GAS CITY CANNABIS cannabis menu guides, flower tier notes, and local store checks for Toronto shoppers.",
  alternates: {
    canonical: "https://www.gascitycannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
