import Image from "next/image";

// Shows a real image when `src` exists, otherwise a branded placeholder. `className` sets the aspect ratio.
export function Media({ src, alt, className = "aspect-[4/3]", sizes = "(min-width: 1024px) 33vw, 100vw" }: { src?: string; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-dark ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-primary to-dark transition-transform duration-500 group-hover:scale-105" />
      )}
    </div>
  );
}
