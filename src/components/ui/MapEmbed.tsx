import { church } from "@/data/church";

export function MapEmbed() {
  const query = encodeURIComponent(`${church.address.street}, ${church.address.town}, ${church.address.region}, ${church.address.country}`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;
  if (church.mapEmbedUrl) {
    return <iframe title={`Map showing ${church.name}`} src={church.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border-0 lg:h-full lg:min-h-80" />;
  }
  return (
    <div className="flex h-80 flex-col items-center justify-center bg-light p-6 text-center lg:h-full lg:min-h-80">
      <p className="font-heading text-xl">{church.address.street}</p>
      <p className="text-muted">{church.address.town}, {church.address.region}</p>
      <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary underline underline-offset-4">Open in Google Maps</a>
    </div>
  );
}
