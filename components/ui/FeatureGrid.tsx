import type { ReactNode } from "react";

type FeatureGridItem = {
  icon: ReactNode;
  title: string;
  text: string;
};

type FeatureGridProps = {
  items: FeatureGridItem[];
  className?: string;
};

export function FeatureGrid({
  items,
  className = "",
}: FeatureGridProps) {
  return (
    <div
      className={`grid gap-6 sm:grid-cols-2 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} ${className}`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="card-outline reveal group rounded-3xl bg-sand p-6 sm:p-8 transition-colors duration-300 hover:bg-lime"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-primary text-paper">
              {item.icon}
            </div>
            <h3 className="font-display text-base font-extrabold uppercase leading-tight tracking-tight">
              {item.title}
            </h3>
          </div>
          <p className="text-muted leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
