"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Answers = {
  name: string;
  phone: string;
  lookingFor: string[];
  about: string;
  brand: string;
  email: string;
  hasWebsite: "" | "Yes" | "No";
  website: string;
  stage: string;
  budget: string;
};

const EMPTY: Answers = {
  name: "",
  phone: "",
  lookingFor: [],
  about: "",
  brand: "",
  email: "",
  hasWebsite: "",
  website: "",
  stage: "",
  budget: "",
};

const LOOKING_FOR = [
  "New website",
  "Online store",
  "Website redesign",
  "CRM or ERP software",
  "Inventory or billing system",
  "Not sure yet",
];

const STAGES = [
  "Just an idea",
  "New business",
  "Running, no website yet",
  "Running, website needs work",
  "Growing, need better systems",
];

const BUDGETS = [
  "Not sure yet",
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "Over ₹5,00,000",
];

const MAX_WORDS = 120;
const TOTAL = 7;

const STEPS = [
  { title: "What should we call you?", hint: "First name is plenty." },
  {
    title: "What’s your phone number?",
    hint: "We only use it to talk about your project.",
  },
  { title: "What are you looking for?", hint: "Pick all that apply." },
  {
    title: "Tell us about your business",
    hint: "In short: what you do, and where you want to get to.",
  },
  { title: "What’s your brand called?", hint: "The name your customers know you by." },
  {
    title: "Where can we reach you?",
    hint: "Your email, and your website if you have one.",
  },
  {
    title: "Where is your brand today?",
    hint: "Two quick picks, so we can prepare before we call.",
  },
];

const countWords = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

function validate(step: number, a: Answers): string | null {
  switch (step) {
    case 1:
      return a.name.trim().length < 2 ? "Please enter your name." : null;
    case 2: {
      const digits = a.phone.replace(/\D/g, "");
      const ok =
        digits.length === 10 ||
        (digits.length === 12 && digits.startsWith("91"));
      return ok ? null : "Please enter a 10-digit phone number.";
    }
    case 3:
      return a.lookingFor.length === 0 ? "Pick at least one option." : null;
    case 4: {
      const words = countWords(a.about);
      if (words < 3)
        return "For a faster reply, tell us briefly about your business and what you need.";
      if (words > MAX_WORDS) return `Please keep it under ${MAX_WORDS} words.`;
      return null;
    }
    case 5:
      return a.brand.trim() ? null : "Please enter your brand name.";
    case 6:
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim()))
        return "Please enter a valid email address.";
      if (!a.hasWebsite) return "Let us know if you already have a website.";
      return null;
    case 7:
      return a.stage ? null : "Pick where your brand is today.";
    default:
      return null;
  }
}

function buildMessage(a: Answers) {
  const lines = [
    "New project enquiry (electrondevelopers.com)",
    "",
    `Name: ${a.name.trim()}`,
    `Phone: ${a.phone.trim()}`,
    `Email: ${a.email.trim()}`,
    `Brand: ${a.brand.trim()}`,
    `Looking for: ${a.lookingFor.join(", ")}`,
    `Has a website: ${a.hasWebsite}${a.website.trim() ? ` (${a.website.trim()})` : ""}`,
    `Brand today: ${a.stage}`,
    `Budget: ${a.budget || "Not shared"}`,
    "",
    "About the business:",
    a.about.trim(),
  ];
  return lines.join("\n");
}

const inputClass =
  "w-full rounded-2xl border-2 border-ink bg-sand px-4 py-3.5 text-lg text-ink placeholder:text-muted/70 shadow-[3px_3px_0_var(--color-accent)] focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary";

const chipClass =
  "rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-lime aria-pressed:bg-ink aria-pressed:text-paper";

function Chips({
  options,
  selected,
  onToggle,
  labelledBy,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  labelledBy: string;
}) {
  return (
    <div role="group" aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={selected.includes(option)}
          onClick={() => onToggle(option)}
          className={chipClass}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function EnquiryForm({
  variant = "page",
  titleId,
}: {
  variant?: "page" | "modal";
  titleId?: string;
}) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"next" | "back">("next");
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const fallbackTitleId = useId();
  const headingId = titleId ?? fallbackTitleId;
  const hintId = useId();
  const errorId = useId();
  const subLabelId = useId();
  const subLabel2Id = useId();

  // Move focus into the new step, but never on first render (that would
  // scroll the contact page to the form on load).
  useEffect(() => {
    if (!moved.current) return;
    const field = stepRef.current?.querySelector<HTMLElement>(
      "input, textarea, button"
    );
    field?.focus();
  }, [step]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  };

  const toggleLookingFor = (value: string) => {
    const list = answers.lookingFor.includes(value)
      ? answers.lookingFor.filter((item) => item !== value)
      : [...answers.lookingFor, value];
    set("lookingFor", list);
  };

  const goBack = () => {
    moved.current = true;
    setError(null);
    setDir("back");
    setStep((s) => Math.max(1, s - 1));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const problem = validate(step, answers);
    if (problem) {
      setError(problem);
      return;
    }
    if (step < TOTAL) {
      moved.current = true;
      setDir("next");
      setStep((s) => s + 1);
      return;
    }
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      buildMessage(answers)
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const startOver = () => {
    moved.current = false;
    setAnswers(EMPTY);
    setStep(1);
    setDir("next");
    setError(null);
    setSentUrl(null);
  };

  const headingClass = `font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl ${
    variant === "modal" ? "pr-12" : ""
  }`;

  if (sentUrl) {
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project enquiry: ${answers.brand.trim()}`
    )}&body=${encodeURIComponent(buildMessage(answers))}`;
    return (
      <div className="animate-step-next" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          All done
        </p>
        <h2 id={headingId} className={`mt-4 ${headingClass}`}>
          Almost there, {answers.name.trim().split(" ")[0]}.
        </h2>
        <p className="mt-3 text-muted">
          Your answers are ready in WhatsApp. Press send there and our team
          will get back to you.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-full items-center justify-center rounded-full border-2 border-ink bg-accent px-6 text-lg font-semibold text-ink shadow-[3px_3px_0_var(--color-ink)] transition-colors duration-200 hover:bg-ink hover:text-accent"
          >
            Open WhatsApp again
          </a>
          <a
            href={mailto}
            className="inline-flex h-14 w-full items-center justify-center rounded-full border-2 border-ink px-6 text-lg font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            Send by email instead
          </a>
        </div>
        <button
          type="button"
          onClick={startOver}
          className="mt-6 text-sm font-semibold underline underline-offset-4"
        >
          Start a new enquiry
        </button>
      </div>
    );
  }

  const current = STEPS[step - 1];
  const words = countWords(answers.about);
  const describedBy = error ? `${hintId} ${errorId}` : hintId;
  const fieldA11y = {
    "aria-labelledby": headingId,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* In the dialog, keep clear of the close button. */}
      <div className={variant === "modal" ? "pr-14" : ""}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Step {step} of {TOTAL}
      </p>
      <div aria-hidden="true" className="mt-3 grid grid-cols-7 gap-1.5">
        {STEPS.map((_, index) => (
          <span
            key={index}
            className={`h-1.5 rounded-full transition-colors duration-200 ${
              index + 1 < step
                ? "bg-ink"
                : index + 1 === step
                  ? "bg-accent"
                  : "bg-line"
            }`}
          />
        ))}
      </div>
      </div>

      <div
        key={step}
        ref={stepRef}
        className={`mt-6 ${dir === "next" ? "animate-step-next" : "animate-step-back"}`}
      >
        <h2 id={headingId} className={headingClass}>
          {current.title}
        </h2>
        <p id={hintId} className="mt-2 text-muted">
          {current.hint}
        </p>

        <div className="mt-6">
          {step === 1 && (
            <input
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={answers.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputClass}
              {...fieldA11y}
            />
          )}

          {step === 2 && (
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={answers.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputClass}
              {...fieldA11y}
            />
          )}

          {step === 3 && (
            <Chips
              options={LOOKING_FOR}
              selected={answers.lookingFor}
              onToggle={toggleLookingFor}
              labelledBy={headingId}
            />
          )}

          {step === 4 && (
            <>
              <textarea
                rows={4}
                placeholder="e.g. We run a furniture showroom and want an online catalogue that brings in more enquiries."
                value={answers.about}
                onChange={(e) => set("about", e.target.value)}
                className={`${inputClass} resize-y`}
                {...fieldA11y}
              />
              <p
                className={`mt-2 text-right text-sm ${
                  words > MAX_WORDS ? "font-semibold text-red-700" : "text-muted"
                }`}
              >
                {words} / {MAX_WORDS} words
              </p>
            </>
          )}

          {step === 5 && (
            <input
              type="text"
              autoComplete="organization"
              placeholder="Brand or business name"
              value={answers.brand}
              onChange={(e) => set("brand", e.target.value)}
              className={inputClass}
              {...fieldA11y}
            />
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <label htmlFor={`${headingId}-email`} className="sr-only">
                  Email
                </label>
                <input
                  id={`${headingId}-email`}
                  type="email"
                  autoComplete="email"
                  placeholder="you@yourbrand.com"
                  value={answers.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass}
                  aria-describedby={describedBy}
                  aria-invalid={error ? true : undefined}
                />
              </div>
              <div>
                <p
                  id={subLabelId}
                  className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                >
                  Do you already have a website?
                </p>
                <Chips
                  options={["Yes", "No"]}
                  selected={answers.hasWebsite ? [answers.hasWebsite] : []}
                  onToggle={(v) => set("hasWebsite", v as "Yes" | "No")}
                  labelledBy={subLabelId}
                />
              </div>
              {answers.hasWebsite === "Yes" && (
                <div>
                  <label
                    htmlFor={`${headingId}-site`}
                    className="mb-2 block text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    Website address (optional)
                  </label>
                  <input
                    id={`${headingId}-site`}
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="yourbrand.com"
                    value={answers.website}
                    onChange={(e) => set("website", e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <Chips
                options={STAGES}
                selected={answers.stage ? [answers.stage] : []}
                onToggle={(v) => set("stage", v)}
                labelledBy={headingId}
              />
              <div>
                <p
                  id={subLabel2Id}
                  className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                >
                  Budget for this project{" "}
                  <span className="font-medium normal-case tracking-normal text-muted">
                    optional
                  </span>
                </p>
                <Chips
                  options={BUDGETS}
                  selected={answers.budget ? [answers.budget] : []}
                  onToggle={(v) => set("budget", answers.budget === v ? "" : v)}
                  labelledBy={subLabel2Id}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <p
        id={errorId}
        role="alert"
        className="mt-4 min-h-5 text-sm font-semibold text-red-700"
      >
        {error}
      </p>

      <div className="mt-4 flex items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-6 font-semibold transition-colors duration-200 hover:bg-ink hover:text-paper active:scale-[0.97] motion-reduce:transform-none"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="inline-flex h-14 flex-1 items-center justify-center whitespace-nowrap rounded-full border-2 border-ink bg-accent px-5 text-base font-bold uppercase tracking-wide text-ink sm:text-lg shadow-[3px_3px_0_var(--color-ink)] transition-[transform,background-color,color] duration-200 ease-out hover:bg-ink hover:text-accent active:scale-[0.97] motion-reduce:transform-none"
        >
          {step < TOTAL ? "Next" : "Send on WhatsApp"}
        </button>
      </div>
    </form>
  );
}
