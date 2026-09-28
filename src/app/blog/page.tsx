import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { BlogList } from "@/components/sections/BlogList";

export const metadata: Metadata = { title: "News", description: "News and reflections from St. Stephen's Anglican Church.", alternates: { canonical: "/blog" } };

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <PageHero eyebrow="News" title="From Our Church" />
      <section className="py-20"><Container><BlogList posts={posts} /></Container></section>
    </>
  );
}
