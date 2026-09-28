import type { MetadataRoute } from "next";
import { ministries } from "@/data/ministries";
import { getBlogPosts, getEvents } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/leadership", "/sermons", "/ministries", "/events", "/holy-communion", "/prayer", "/give", "/blog", "/gallery", "/plan-a-visit", "/contact"];
  const paths = [
    ...pages,
    ...ministries.map((m) => `/ministries/${m.slug}`),
    ...(await getEvents()).map((e) => `/events/${e.id}`),
    ...(await getBlogPosts()).map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
