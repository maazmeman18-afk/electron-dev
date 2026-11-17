import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServiceFlow } from "@/lib/content/service-flows";

function Cross() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Tick() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/**
 * Before / After comparison with a two-option switch. Built on native radio
 * inputs and CSS `:has()` (see .ba-* in globals.css), so it needs no
 * JavaScript; browsers without `:has()` simply show both columns. Defaults
 * to "After". The honest note under it always renders.
 */
export function BeforeAfter({ data, id }: { data: ServiceFlow["beforeAfter"]; id: string }) {
  const name = `${id}-view`;
  return (
    <section aria-labelledby={`${id}-heading`} className="ba mt-20 sm:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="The difference" size="md">
          <span id={`${id}-heading`}>{data.heading}</span>
        </SectionHeading>

        <fieldset className="shrink-0">
          <legend className="sr-only">Show the situation</legend>
          <div className="inline-flex rounded-full border-2 border-ink bg-paper p-1">
            <input type="radio" id={`${name}-before`} name={name} value="before" className="sr-only" />
            <label
              htmlFor={`${name}-before`}
              data-view="before"
              className="ba-option cursor-pointer rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors duration-150"
            >
              Before
            </label>
            <input type="radio" id={`${name}-after`} name={name} value="after" defaultChecked className="sr-only" />
            <label
              htmlFor={`${name}-after`}
              data-view="after"
              className="ba-option cursor-pointer rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide transition-colors duration-150"
            >
              After
            </label>
          </div>
        </fieldset>
      </div>

      <p className="ba-before-caption mt-4 text-sm font-semibold text-muted">
        Before: {data.beforeLabel}
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {data.rows.map((row) => (
          <li key={row.area} className="card-outline reveal rounded-2xl bg-paper p-5">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-tight text-primary">
              {row.area}
            </h3>
            <p className="ba-before mt-2 flex gap-2 leading-relaxed text-muted">
              <Cross />
              <span>
                <span className="sr-only">Before: </span>
                {row.before}
              </span>
            </p>
            <p className="ba-after mt-2 flex gap-2 font-semibold leading-relaxed">
              <span className="text-primary">
                <Tick />
              </span>
              <span>
                <span className="sr-only">After: </span>
                {row.after}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted">{data.note}</p>
    </section>
  );
}
