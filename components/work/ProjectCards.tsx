function Deliverables({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wide"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const domainOf = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export { Deliverables, domainOf };
