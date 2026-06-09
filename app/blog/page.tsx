import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — GAS CITY CANNABIS | GTA",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from GAS CITY CANNABIS in GTA.",
  alternates: {
    canonical: "https://gascitycannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
