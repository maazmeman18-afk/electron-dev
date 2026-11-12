import type { ReactNode } from "react";

/*
 * "Walk through a project" simulator for the Why Us page.
 *
 * Built on radio inputs + CSS (like SoftwareShowcase), so it works without
 * JavaScript and with the keyboard: Tab to the stage group, then use the
 * arrow keys. The visual for each stage re-plays its short entrance each time
 * the stage opens (CSS animations restart when a panel goes from hidden to
 * shown). Reduced motion turns those entrances off (see globals.css).
 */

type Stage = {
  id: string;
  label: string;
  title: string;
  you: string;
  we: string;
  youGet: string;
  visual: ReactNode;
};

const pop = (i: number) =>
  ({ "--i": i }) as React.CSSProperties;

function BrowserMock({
  url,
  badge,
  children,
}: {
  url: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="card-outline overflow-hidden rounded-3xl bg-paper">
      <div className="flex items-center gap-2 border-b-2 border-ink bg-sand px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
        </span>
        <span className="ml-2 min-w-0 flex-1 truncate rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-muted">
          {url}
        </span>
        {badge}
      </div>
      <div className="relative aspect-[16/11] p-5 sm:p-6">{children}</div>
    </div>
  );
}

function SiteSkeleton({
  styled,
  compact = false,
}: {
  styled: boolean;
  compact?: boolean;
}) {
  // The same page drawn twice: grey wireframe (design) and styled (build).
  const block = styled ? "" : "border-2 border-dashed border-ink/30 bg-transparent";
  return (
    <div className="flex h-full flex-col gap-3">
      <div
        className={`sim-pop flex items-center justify-between rounded-xl px-3 py-2 ${styled ? "bg-ink" : block}`}
        style={pop(0)}
      >
        <span className={`h-2.5 w-16 rounded-full ${styled ? "bg-paper" : "bg-ink/20"}`} />
        <span className="flex gap-2">
          <span className={`h-2 w-8 rounded-full ${styled ? "bg-paper/60" : "bg-ink/15"}`} />
          <span className={`h-2 w-8 rounded-full ${styled ? "bg-paper/60" : "bg-ink/15"}`} />
          <span className={`h-2 w-10 rounded-full ${styled ? "bg-accent" : "bg-ink/20"}`} />
        </span>
      </div>
      <div
        className={`sim-pop flex flex-1 flex-col justify-center gap-2 rounded-xl p-4 ${styled ? "bg-sand" : block}`}
        style={pop(1)}
      >
        <span className={`h-4 w-3/4 rounded-md ${styled ? "bg-ink" : "bg-ink/20"}`} />
        <span className={`h-4 w-1/2 rounded-md ${styled ? "bg-primary" : "bg-ink/20"}`} />
        <span
          className={`mt-2 h-6 w-24 rounded-full ${styled ? "border-2 border-ink bg-accent" : "bg-ink/15"}`}
        />
      </div>
      <div className={`grid grid-cols-3 gap-3 ${compact ? "hidden" : ""}`}>
        {[2, 3, 4].map((i) => (
          <span
            key={i}
            className={`sim-pop h-12 rounded-xl ${styled ? "border-2 border-ink bg-paper" : block}`}
            style={pop(i)}
          />
        ))}
      </div>
    </div>
  );
}

const Check = () => (
  <svg className="h-3 w-3" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const stages: Stage[] = [
  {
    id: "brief",
    label: "Brief",
    title: "We start by listening",
    you: "Tell us about your business, your customers and what you want the product to do.",
    we: "Turn that into a clear list of pages or features, priorities and a timeline.",
    youGet: "A written scope you can check before anything is built.",
    visual: (
      <BrowserMock url="Project brief">
        <ul className="space-y-3">
          {[
            "Who are your customers?",
            "What should the product do?",
            "Which pages or features?",
            "When do you need it?",
          ].map((q, i) => (
            <li
              key={q}
              className="sim-pop flex items-center gap-3 rounded-xl border-2 border-ink bg-paper px-3 py-2.5 text-sm font-semibold sm:text-base"
              style={pop(i)}
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-paper">
                <Check />
              </span>
              {q}
            </li>
          ))}
        </ul>
      </BrowserMock>
    ),
  },
  {
    id: "design",
    label: "Design",
    title: "You see it before we build it",
    you: "Review the layout and tell us what to change.",
    we: "Design the structure first, then the look, using your brand.",
    youGet: "Page designs you approve before development starts.",
    visual: (
      <BrowserMock
        url="Design review"
        badge={
          <span className="rounded-full border-2 border-ink bg-paper px-2 py-0.5 text-[10px] font-bold uppercase">
            Wireframe
          </span>
        }
      >
        <SiteSkeleton styled={false} />
      </BrowserMock>
    ),
  },
  {
    id: "build",
    label: "Build",
    title: "We build, you watch it grow",
    you: "Click through a working preview and send feedback as we go.",
    we: "Develop, connect the pieces and test on phones, tablets and desktops.",
    youGet: "A working preview link with regular updates.",
    visual: (
      <BrowserMock url="preview.yourbrand.com">
        <div className="flex h-full flex-col gap-3">
          <div className="min-h-0 flex-1">
            <SiteSkeleton styled compact />
          </div>
          <div
            className="sim-pop rounded-xl border-2 border-ink bg-paper px-3 py-2"
            style={pop(5)}
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide">
              <span>Building on preview</span>
              <span className="text-primary">Testing</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
              <span className="sim-fill block h-full w-[80%] rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </BrowserMock>
    ),
  },
  {
    id: "launch",
    label: "Launch",
    title: "Live on your own domain",
    you: "Give the final go-ahead.",
    we: "Put it live, check everything works and hand over your logins.",
    youGet: "Your product live, with access to everything you own.",
    visual: (
      <BrowserMock
        url="yourbrand.com"
        badge={
          <span className="sim-pop inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-accent px-2 py-0.5 text-[10px] font-bold uppercase" style={pop(5)}>
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            Live
          </span>
        }
      >
        <SiteSkeleton styled />
      </BrowserMock>
    ),
  },
  {
    id: "support",
    label: "Support",
    title: "We stay after launch",
    you: "Message us when you need a change or something new.",
    we: "Fix, update and extend it as your business grows.",
    youGet: "A team that already knows your product.",
    visual: (
      <BrowserMock url="Support chat">
        <div className="flex h-full flex-col justify-end gap-3">
          <p
            className="sim-pop max-w-[85%] self-start rounded-2xl rounded-bl-md border-2 border-ink bg-paper px-4 py-2.5 text-sm font-medium sm:text-base"
            style={pop(0)}
          >
            Can we add a new product category before the sale?
          </p>
          <p
            className="sim-pop max-w-[85%] self-end rounded-2xl rounded-br-md border-2 border-ink bg-ink px-4 py-2.5 text-sm font-medium text-paper sm:text-base"
            style={pop(1)}
          >
            On it. We will send you a preview to check first.
          </p>
          <p
            className="sim-pop inline-flex items-center gap-2 self-end rounded-full border-2 border-ink bg-accent px-3 py-1 text-xs font-bold uppercase"
            style={pop(2)}
          >
            <Check /> Done and live
          </p>
        </div>
      </BrowserMock>
    ),
  },
];

const inputId = (id: string) => `sim-${id}`;

// Static rules generated from the stage list above (no user input).
const rules = stages
  .map((stage, index) => {
    const input = `#${inputId(stage.id)}`;
    const tab = `.sim-tab[for="${inputId(stage.id)}"]`;
    return `
${input}:checked ~ .sim-layout ${tab} { background: var(--color-ink); color: var(--color-paper); }
${input}:checked ~ .sim-layout ${tab} .sim-tab-num { background: var(--color-accent); color: var(--color-ink); }
${input}:focus-visible ~ .sim-layout ${tab} { outline: 3px solid var(--color-primary); outline-offset: 3px; }
${input}:checked ~ .sim-layout .sim-panel[data-stage="${stage.id}"] { display: block; }
${input}:checked ~ .sim-layout .sim-progress > span { width: ${((index + 1) / stages.length) * 100}%; }`;
  })
  .join("\n");

// Kept with the component so it never depends on a stale globals.css; the
// first stage shows if the browser restores a state with nothing checked.
const baseRules = `
.sim .sim-panel { display: none; }
.sim:not(:has(input[name="sim-stage"]:checked)) .sim-panel:first-child { display: block; }`;

export function ProjectSimulator() {
  return (
    <div className="sim">
      {stages.map((stage, index) => (
        <input
          key={stage.id}
          type="radio"
          name="sim-stage"
          autoComplete="off"
          id={inputId(stage.id)}
          defaultChecked={index === 0}
          aria-label={`Stage ${index + 1}: ${stage.label}`}
          className="sr-only"
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: baseRules + rules }} />

      <div className="sim-layout grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Stage picker. min-w-0 stops the scrolling tab row widening the column on phones. */}
        <div className="min-w-0 lg:col-span-4">
          <div
            aria-hidden="true"
            className="sim-progress h-2 overflow-hidden rounded-full border-2 border-ink bg-paper"
          >
            <span className="block h-full bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none" />
          </div>
          <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {stages.map((stage, index) => (
              <label
                key={stage.id}
                htmlFor={inputId(stage.id)}
                className="sim-tab flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink bg-paper px-4 py-3 font-display text-base font-extrabold uppercase tracking-tight transition-colors duration-150 hover:bg-sand lg:text-lg"
              >
                <span className="sim-tab-num grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sand font-sans text-xs font-bold">
                  {index + 1}
                </span>
                {stage.label}
              </label>
            ))}
          </div>
          <p className="mt-4 hidden text-sm text-muted lg:block">
            Pick a stage to see what happens, or use Next.
          </p>
        </div>

        {/* Stage panels */}
        <div className="min-w-0 lg:col-span-8">
          {stages.map((stage, index) => {
            const prev = stages[index - 1];
            const next = stages[index + 1];
            return (
              <div key={stage.id} data-stage={stage.id} className="sim-panel">
                <div className="grid gap-6 xl:grid-cols-2 xl:items-center">
                  {stage.visual}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Stage {index + 1} of {stages.length}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">
                      {stage.title}
                    </h3>
                    <dl className="mt-5 space-y-4">
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                          You
                        </dt>
                        <dd className="mt-1 leading-relaxed">{stage.you}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                          We
                        </dt>
                        <dd className="mt-1 leading-relaxed">{stage.we}</dd>
                      </div>
                    </dl>
                    <p className="mt-5 rounded-2xl border-l-4 border-accent bg-sand px-4 py-3 font-semibold">
                      You get: {stage.youGet}
                    </p>

                    {/* Mouse and touch shortcuts; keyboard users use the arrow keys on the stage group. */}
                    <div aria-hidden="true" className="mt-6 flex gap-3">
                      {prev && (
                        <label
                          htmlFor={inputId(prev.id)}
                          className="inline-flex h-12 cursor-pointer items-center rounded-full border-2 border-ink px-5 font-semibold transition-colors duration-150 hover:bg-ink hover:text-paper"
                        >
                          &larr; {prev.label}
                        </label>
                      )}
                      {next && (
                        <label
                          htmlFor={inputId(next.id)}
                          className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full border-2 border-ink bg-accent px-5 font-bold uppercase tracking-wide shadow-[3px_3px_0_var(--color-ink)] transition-colors duration-150 hover:bg-ink hover:text-accent sm:flex-none"
                        >
                          Next: {next.label} &rarr;
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
