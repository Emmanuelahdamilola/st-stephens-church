// Every real photo used on the site, in one place. Files live in /public/images.
// To add a photo: drop it in /public/images, add an entry here, then use it in data/hero.ts, data/gallery.ts, etc.
export const images = {
  churchBuilding: { src: "/images/church-building.jpg", alt: "The front of the church building, with a cross on its gabled roof" },
  worshipProcession: { src: "/images/worship-procession.jpg", alt: "Ministers in red and black gowns carrying a cross in procession through the church" },
  choirProcession: { src: "/images/choir-procession.jpg", alt: "Worshippers processing through the church, some wearing green robes" },
  congregation: { src: "/images/congregation.jpg", alt: "Worshippers gathered in the church as a woman speaks into a microphone" },
  speaker: { src: "/images/speaker.jpg", alt: "A woman speaking into a microphone in front of the congregation" },
  clergyGroup: { src: "/images/clergy-group.jpg", alt: "Clergy in vestments and guests standing together outdoors" },
  preaching: { src: "/images/preaching.jpg", alt: "A minister in white vestments preaching from a lectern" },
} as const;
