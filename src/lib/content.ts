// One place for all content reads. When the backend exists, swap the bodies for fetch() calls.
import { sermons } from "@/data/sermons";
import { events } from "@/data/events";
import { blogPosts } from "@/data/blog";
import { testimonials } from "@/data/testimonials";
import { galleryImages } from "@/data/gallery";
import type { BlogPost, ChurchEvent, GalleryImage, Sermon, Testimonial } from "@/types/content";

// TODO: Replace mock sermons with API
export async function getSermons(): Promise<Sermon[]> { return sermons; }
export async function getSermon(id: string): Promise<Sermon | undefined> { return sermons.find((s) => s.id === id); }
// TODO: Connect events to database
export async function getEvents(): Promise<ChurchEvent[]> { return events; }
export async function getEvent(id: string): Promise<ChurchEvent | undefined> { return events.find((e) => e.id === id); }
// TODO: Connect blog posts to CMS/API
export async function getBlogPosts(): Promise<BlogPost[]> { return blogPosts; }
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> { return blogPosts.find((p) => p.slug === slug); }
export async function getTestimonials(): Promise<Testimonial[]> { return testimonials; }
export async function getGalleryImages(): Promise<GalleryImage[]> { return galleryImages; }