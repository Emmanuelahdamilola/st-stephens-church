export interface Leader {
  id: string;
  name: string;
  title: string;
  image?: string; // add a portrait path once supplied
  bio?: string;   // only fill with supplied information
  // Personal links shown when the card is hovered. Add only links the leader has approved.
  socials?: { facebook?: string; instagram?: string; x?: string; youtube?: string; email?: string };
}

// Add more leaders here; the section renders whatever is in this array.
export const leaders: Leader[] = [
  { id: "bankole", name: "Rt. Rev. Bankole", title: "Bishop of Ekiti South" },
  { id: "oshatimehin", name: "Ven. J.A.O. Oshatimehin", title: "Vicar" },
];
