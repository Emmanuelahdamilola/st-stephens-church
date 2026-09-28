// Shapes of the content the backend will eventually provide.
export interface Sermon { id: string; title: string; speaker: string; date: string; series?: string; category?: string; image?: string; videoUrl?: string; audioUrl?: string; description?: string }
export interface ChurchEvent { id: string; title: string; date: string; time: string; location: string; description: string; image?: string; registerUrl?: string }
export interface BlogPost { slug: string; title: string; category: string; date: string; excerpt: string; body: string[]; image?: string }
export interface Testimonial { id: string; name: string; quote: string }
export interface PrayerRequest { name: string; email: string; request: string; isPrivate: boolean }
export interface ContactMessage { name: string; email: string; message: string }
export interface GivingOption { id: string; title: string; description: string; href?: string }
export interface GalleryImage { id: string; alt: string; category: string; src?: string }
