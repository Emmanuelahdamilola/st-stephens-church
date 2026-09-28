import { Container } from "./Container";

// Used by each route's loading.tsx while content loads.
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Container className="py-32" >
      <div role="status" aria-label="Loading content" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-light" />
            <div className="mt-4 h-5 w-3/4 bg-light" />
            <div className="mt-3 h-4 w-1/2 bg-light" />
          </div>
        ))}
      </div>
    </Container>
  );
}
