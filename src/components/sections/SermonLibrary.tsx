"use client";
import { useMemo, useState } from "react";
import type { Sermon } from "@/types/content";
import { SermonCard } from "@/components/cards/SermonCard";
import { EmptyState } from "@/components/ui/EmptyState";

const selectClass = "w-full border rounded-md border-primary/40 bg-white px-3 py-3";

export function SermonLibrary({ sermons }: { sermons: Sermon[] }) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("All");
  const [category, setCategory] = useState("All");
  const unique = (values: (string | undefined)[]) => ["All", ...Array.from(new Set(values.filter((v): v is string => Boolean(v))))];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sermons
      .filter((s) => (series === "All" || s.series === series) && (category === "All" || s.category === category))
      .filter((s) => !q || `${s.title} ${s.speaker} ${s.description ?? ""}`.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [sermons, query, series, category]);

  return (
    <div>
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <div><label htmlFor="sermon-search" className="mb-1.5 block text-sm font-semibold">Search</label>
          <input id="sermon-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Title or speaker" className={selectClass} /></div>
        <div><label htmlFor="sermon-series" className="mb-1.5 block text-sm font-semibold">Series</label>
          <select id="sermon-series" value={series} onChange={(e) => setSeries(e.target.value)} className={selectClass}>{unique(sermons.map((s) => s.series)).map((o) => <option key={o}>{o}</option>)}</select></div>
        <div><label htmlFor="sermon-category" className="mb-1.5 block text-sm font-semibold">Category</label>
          <select id="sermon-category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>{unique(sermons.map((s) => s.category)).map((o) => <option key={o}>{o}</option>)}</select></div>
      </div>
      <p aria-live="polite" className="mb-6 text-sm text-muted">{results.length} {results.length === 1 ? "sermon" : "sermons"}</p>
      {results.length === 0 ? <EmptyState title="No sermons found." message="Try a different search or filter." /> : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{results.map((s) => <SermonCard key={s.id} sermon={s} />)}</div>
      )}
    </div>
  );
}
