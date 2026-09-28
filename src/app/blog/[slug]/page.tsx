import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() { return (await getBlogPosts()).map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${slug}` } } : {};
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  return (
    <>
      <PageHero eyebrow={`${post.category} · ${formatDate(post.date)}`} title={post.title} />
      <article className="py-20">
        <Container className="max-w-3xl">
          {post.image && <div className="mb-10"><Media src={post.image} alt={post.title} className="aspect-video" sizes="100vw" /></div>}
          <div className="space-y-5 text-lg leading-relaxed">{post.body.map((p, i) => <p key={i}>{p}</p>)}</div>
        </Container>
      </article>
    </>
  );
}
