export interface Leader {
  id: string;
  name: string;
  title: string;
  credentials?: string; // post-nominals, only as printed by the church
  image?: string;       // add a portrait path once supplied
  bio?: string;         // only fill with supplied information
  // Personal contact links shown when the card is hovered. Add only links the person has approved.
  // `phone` is in international format, e.g. "+2348012345678".
  socials?: { facebook?: string; instagram?: string; x?: string; youtube?: string; email?: string; phone?: string };
}

// Clergy, in order of seniority, as listed on the church bulletin (27 September 2026).
// A leader without `socials` falls back to the church's own channels on hover.
export const leaders: Leader[] = [
  { id: "bankole", name: "Rt. Rev. Francis O. Bankole", title: "Bishop of Ekiti South", credentials: "Dip. Th, Dip. R.S, B.A. Hons, M.A" },
  { id: "ajayi", name: "Ven. M.O. Ajayi", title: "Archdeacon, Uro" },
  { id: "oshatimehin", name: "Ven. J.A.O. Oshatimehin", title: "Vicar", socials: { phone: "+2348038644443" } },
  { id: "aluko", name: "Revd. S.S. Aluko", title: "Curate", socials: { phone: "+2347039538117" } },
];

export interface Officer { id: string; name: string; title: string }

// Church officers listed on the bulletin. Lay readers and vergers on the bulletin look like a
// per-service roster, so they are not listed here; add them if they are standing roles.
export const officers: Officer[] = [
  { id: "vicars-warden", name: "Mr. Adeleye Owoyemi", title: "Vicar's Warden" },
  { id: "peoples-warden", name: "Mr. Ajayi Emmanuel", title: "People's Warden" },
  { id: "organist", name: "Mr. Babatope Ogundare", title: "Organist & Choir Master" },
  { id: "verger-I", name: "Dr. Tolu Omoyeni", title: "Verger I" },
  { id: "verger-II", name: "Mr. Olarewaju Afuye", title: "Verger II" },
  { id: "lay-reader-I", name: "Dr. Matthew Olatunji", title: "Lay Reader I" },
  { id: "lay-reader-II", name: "Mrs. O.B. Adeyanju", title: "Lay Reader II" },
  { id: "lay-reader-III", name: "Mrs. F.T. Akinbode", title: "Lay Reader III" },
];