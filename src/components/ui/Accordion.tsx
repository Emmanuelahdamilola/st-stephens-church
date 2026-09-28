// Native <details> gives keyboard and screen-reader support for free.
export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-primary/20 border-y border-primary/20">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-lg">
            {item.question}
            <span aria-hidden className="text-primary transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
