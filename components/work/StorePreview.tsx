/**
 * Illustrated preview of the gujjubazar.com storefront, built from the real
 * categories and showroom cities on the live site. It is a drawing, not a
 * screenshot: replace it with a real screenshot when one is available
 * (set `storePreview: false` on the project and point `image` at the file).
 */
const categories = ["Beds", "Wardrobes", "Sofas", "Dining", "Office", "Pooja mandirs"];
const cities = ["Ahmedabad", "Surat", "Vadodara", "Bangalore"];

export function StorePreview({
  className = "",
  browsing = false,
}: {
  className?: string;
  /** Walk a highlight across the categories (used by the project showcase). */
  browsing?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label="Illustration of the gujjubazar.com storefront: furniture categories and showroom cities"
      className={`card-outline overflow-hidden rounded-3xl bg-paper ${className}`}
    >
      <div className="flex items-center gap-2 border-b-2 border-ink bg-sand px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-muted">
          gujjubazar.com
        </span>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-center justify-between rounded-xl bg-ink px-3 py-2 text-paper">
          <span className="font-display text-sm font-extrabold uppercase tracking-tight">
            Gujju Bazar
          </span>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-ink">
            Get the app
          </span>
        </div>

        <div className="rounded-2xl border-2 border-ink bg-lime p-4 sm:p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">
            Factory direct
          </p>
          <p className="mt-1 font-display text-xl font-extrabold uppercase leading-none tracking-tight sm:text-2xl">
            Furniture for every room
          </p>
          <span className="mt-3 inline-flex rounded-full border-2 border-ink bg-paper px-3 py-1 text-[11px] font-bold uppercase">
            Shop by category
          </span>
        </div>

        <ul className="grid grid-cols-3 gap-2">
          {categories.map((name, i) => (
            <li
              key={name}
              className="relative overflow-hidden rounded-xl border border-line bg-sand px-2 py-2.5 text-center text-[11px] font-semibold sm:text-xs"
            >
              {browsing && (
                <span
                  aria-hidden="true"
                  className="sc-browse absolute inset-0 bg-accent"
                  style={{ animationDelay: `${400 + i * 900}ms` }}
                />
              )}
              <span className="relative">{name}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
          <span className="text-muted">Showrooms:</span>
          {cities.map((city) => (
            <span key={city} className="rounded-full bg-ink px-2 py-0.5 text-paper">
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
