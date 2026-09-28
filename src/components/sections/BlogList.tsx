"use client";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/types/content";
import { BlogCard } from "@/components/cards/BlogCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => (category === "All" || p.category === category) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q))).sort((a, b) => b.date.localeCompare(a.date));
  }, [posts, query, category]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-end gap-6">
        <div className="min-w-64 flex-1"><label htmlFor="blog-search" className="mb-1.5 block text-sm font-semibold">Search</label>
          <input id="blog-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full border border-primary/40 bg-white px-3 py-3" /></div>
        <div role="group" aria-label="Categories" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${category === c ? "border-dark bg-dark text-white" : "border-primary text-primary hover:bg-primary hover:text-white"}`}>{c}</button>
          ))}
        </div>
      </div>
      {results.length === 0 ? <EmptyState title="No posts found." message="Try a different search or category." /> : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{results.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      )}
    </div>
  );
}
