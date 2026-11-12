import { homeProcessSteps } from "@/lib/content/home";

export function ProcessRow({ className = "" }: { className?: string }) {
  return (
    <section className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted mb-8">
          How we work
        </p>
        <h2 className="text-display-lg uppercase font-extrabold leading-none tracking-tight mb-14">
          Four steps. No mystery.
        </h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeProcessSteps.map((step, index) => (
            <li
              key={step.title}
              className="card-outline reveal group rounded-3xl bg-sand p-6 sm:p-8 transition-colors duration-300 hover:bg-lime"
            >
              <span
                aria-hidden="true"
                className="block font-display text-7xl font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-ink)] transition-colors duration-300 group-hover:text-primary"
              >
                0{index + 1}
              </span>
              <h3 className="mt-6 font-display text-xl font-extrabold uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
