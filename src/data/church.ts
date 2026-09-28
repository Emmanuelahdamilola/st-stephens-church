// Official church content. Only supplied facts live here — do not add invented details.
export const church = {
  name: "St. Stephen's Anglican Church",
  tagline: "Agbala Adura",
  intro:
    "We are a vibrant Spirit-filled community of believers dedicated to worship, fellowship, and service. Our mission is to share God's love, grow in faith, and make a positive impact through compassionate outreach and meaningful connections rooted in the truth of Holy Scripture.",
  description:
    "St. Stephen's Anglican Church (Agbala Adura) is a welcoming place where everyone can find support, inspiration, and a sense of belonging. Together, we strive to live out our faith and make a difference in Anaye, Ikere-Ekiti and beyond.",
  address: { street: "Eleyo High School Road", town: "Anaye, Ikere-Ekiti", region: "Ekiti State", country: "Nigeria" },
  service: { day: "Every Sunday", name: "Sunday Worship", time: "9:00 AM" },
  email: "ststephenangchurch@gmail.com",
  facebookHandle: "ststephenangchurch",
  facebookUrl: "https://www.facebook.com/ststephenangchurch",
  // TODO: paste a Google Maps "embed a map" URL here to show a live map. No coordinates are invented.
  mapEmbedUrl: "" as string,
  values: ["Worship", "Fellowship", "Service", "God's love", "Faith", "Holy Scripture", "Compassionate outreach", "Community"],
} as const;
