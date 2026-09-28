export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="border border-dashed border-primary/40 bg-light px-6 py-16 text-center">
      <p className="font-heading text-2xl">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-muted">{message}</p>
    </div>
  );
}
