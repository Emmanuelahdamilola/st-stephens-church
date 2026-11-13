// Shared by the Preloader component and the tiny inline script in the root layout.
// The splash shows once per browser session (until the tab is closed), so people moving around
// the site, or refreshing, aren't made to watch it again. Set to false to show it on every full load.
export const PRELOADER_ONCE_PER_SESSION = true;
export const PRELOADER_KEY = "ssac-preloader-seen";

export const PRELOADER_MIN_MS = 900;  // never flash by faster than this, even on a fast connection
export const PRELOADER_MAX_MS = 7000; // never trap a visitor on a slow connection: reveal the page after this
export const PRELOADER_EXIT_MS = 700; // length of the slide-away animation