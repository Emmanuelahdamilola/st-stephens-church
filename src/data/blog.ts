import type { BlogPost } from "@/types/content";

// SAMPLE POSTS for layout only.
// TODO: Connect blog posts to CMS/API
export const blogPosts: BlogPost[] = [
  { slug: "sample-news-post", title: "Sample news post", category: "News", date: "2026-01-05", excerpt: "A short sample excerpt showing how church news will appear.", body: ["This is sample content. The church will publish real news here."] },
  { slug: "sample-reflection", title: "Sample reflection", category: "Reflections", date: "2026-01-12", excerpt: "A short sample excerpt for a reflection post.", body: ["This is sample content. The church will publish real reflections here."] },
];
