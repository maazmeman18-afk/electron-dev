import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServiceFlow } from "@/lib/content/service-flows";

/**
 * Desktop grid placement for an 8-step loop: steps 1–4 left to right on the
 * top row, steps 5–8 right to left on the bottom row, so the connector runs
 * round the board like the text diagrams in the content drafts.
 */
const PLACEMENT = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-4 lg:row-start-1",
  "lg:col-start-4 lg:row-start-2",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-1 lg:row-start-2",
];

/**
 * "How it works" flow for a service page. Server-rendered and CSS-only:
 * the connector draws as the section scrolls into view (scroll-driven
 * animation, see .flow-* in globals.css); with reduced motion or without
 * support it is simply shown. The steps are an ordered list, so they read
 * in order for screen readers whatever the visual layout.
 */
export function FlowDiagram({ flow, id }: { flow: ServiceFlow; id: string }) {
  const steps = flow.steps.slice(0, 8);
  const feeds = flow.feeds;

  return (
    <section aria-labelledby={`${id}-heading`} className="mt-20 sm:mt-28">
      <SectionHeading eyebrow="How it works" size="md">
        <span id={`${id}-heading`}>{flow.heading}</span>
      </SectionHeading>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{flow.intro}</p>

      <div className="flow-board relative mt-10 sm:mt-12">
        {/* Desktop loop connector through the centres of the cards: four
            segments (top →, right ↓, bottom ←, left ↑). Offsets match the
            grid: 4 columns with a 2rem gap, 2 rows with a 3rem gap. */}
        <div aria-hidden="true" className="flow-loop pointer-events-none absolute inset-0 hidden lg:block">
          <span className="flow-seg flow-seg-top" />
          <span className="flow-seg flow-seg-right" />
          <span className="flow-seg flow-seg-bottom" />
          <span className="flow-seg flow-seg-left" />
        </div>

        {/* Phone timeline connector. */}
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-[1.4rem] top-6 w-[3px] rounded-full bg-line lg:hidden"
        />
        <span
          aria-hidden="true"
          className="flow-line absolute bottom-6 left-[1.4rem] top-6 w-[3px] origin-top rounded-full bg-accent lg:hidden"
        />

        <ol className="relative grid gap-4 lg:grid-cols-4 lg:grid-rows-[1fr_1fr] lg:gap-x-8 lg:gap-y-12">
          {steps.map((step, i) => {
            const isSource = feeds?.from === i;
            const isFed = feeds?.to.includes(i);
            return (
              <li
                key={step.title}
                data-feed-source={isSource || undefined}
                data-fed={isFed || undefined}
                className={`flow-step reveal relative flex gap-4 pl-0 lg:flex-col lg:gap-3 ${PLACEMENT[i]}`}
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent font-display text-sm font-extrabold text-ink lg:absolute lg:-top-4 lg:left-5"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`flow-card flex-1 rounded-2xl border-2 border-ink p-4 transition-colors duration-200 sm:p-5 lg:pt-8 ${
                    isSource ? "bg-lime" : "bg-paper"
                  }`}
                >
                  <h3 className="font-display text-base font-extrabold uppercase tracking-tight">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                  {isSource && feeds && (
                    <p className="mt-3 inline-flex rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide">
                      {feeds.label}
                    </p>
                  )}
                  {isFed && (
                    <p className="flow-fed-tag mt-3 inline-flex rounded-full bg-sand px-2.5 py-0.5 text-[0.7rem] font-semibold text-primary">
                      Updated from step {feeds!.from + 1}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-10 rounded-2xl border-l-4 border-accent bg-sand px-5 py-4 text-base font-semibold leading-relaxed sm:text-lg">
        {flow.takeaway}
      </p>

      {/* Step-by-step detail: collapsible, works without JavaScript. */}
      <details className="flow-details group mt-6 rounded-2xl border-2 border-ink bg-paper">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display font-extrabold uppercase tracking-tight [&::-webkit-details-marker]:hidden">
          See what happens at each step
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
          >
            +
          </span>
        </summary>
        <div className="border-t-2 border-line px-5 pb-5">
          <div
            aria-hidden="true"
            className="hidden grid-cols-[9rem_1fr_1fr] gap-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-muted md:grid"
          >
            <span>Step</span>
            <span>{flow.actorLabel}</span>
            <span>{flow.systemLabel}</span>
          </div>
          <ol className="divide-y divide-line">
            {steps.map((step, i) => (
              <li key={step.title} className="grid gap-2 py-4 md:grid-cols-[9rem_1fr_1fr] md:gap-6">
                <h4 className="font-display font-extrabold uppercase tracking-tight">
                  <span className="text-primary">{String(i + 1).padStart(2, "0")}</span> {step.title}
                </h4>
                <p className="text-sm leading-relaxed">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted md:sr-only">
                    {flow.actorLabel}
                  </span>
                  {step.actor}
                </p>
                <p className="text-sm leading-relaxed">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted md:sr-only">
                    {flow.systemLabel}
                  </span>
                  {step.system}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </details>
    </section>
  );
}
