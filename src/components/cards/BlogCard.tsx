import Link from "next/link";
import type { BlogPost } from "@/types/content";
import { formatDate } from "@/lib/utils";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Media src={post.image} alt={post.title} className="aspect-video" />
      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-primary">{post.category} <span className="text-muted">· {formatDate(post.date)}</span></p>
        <h3 className="mt-2 font-heading text-xl">{post.title}</h3>
        <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
        <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">Read more <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1.5" /></p>
      </div>
    </Link>
  );
}
