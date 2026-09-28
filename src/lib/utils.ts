export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// UTC keeps server and browser output identical (avoids hydration mismatches).
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

export function dateParts(iso: string): { day: string; month: string } {
  const d = new Date(iso);
  return { day: String(d.getUTCDate()), month: d.toLocaleString("en-NG", { month: "short", timeZone: "UTC" }) };
}
