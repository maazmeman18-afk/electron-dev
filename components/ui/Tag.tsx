export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 text-xs font-medium">
      {label}
    </span>
  );
}
