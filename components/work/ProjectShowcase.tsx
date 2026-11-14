"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project, ProjectPart } from "@/lib/projects";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Deliverables, domainOf } from "./ProjectCards";

/** How long each step stays on screen while the showcase plays itself. */
const STEP_MS = 6000;

const desktopQuery = "(min-width: 1024px)";
const motionQuery = "(prefers-reduced-motion: no-preference)";

const gridCols: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
};

/**
 * A project shown as numbered steps (website, app, CRM...). Each step has a
 * headline in the stack above and a card with an animated mock-up below.
 *
 * - Desktop: every card is visible and the active one advances on a timer
 *   with a progress bar. Hover, keyboard focus or scrolling away pauses it;
 *   choosing a step stops it.
 * - Phone and tablet: cards sit in a swipeable row and never advance on
 *   their own. The headlines scroll the row to their card.
 * - Without JavaScript or with reduced motion: everything is visible and
 *   nothing plays by itself.
 */
export function ProjectShowcase({
  project,
  eyebrow,
  titleAs: Title = "h3",
}: {
  project: Project;
  eyebrow?: string;
  /** Heading level of the project title; its steps use the next level. */
  titleAs?: "h2" | "h3";
}) {
  const parts = project.parts;
  const StepTitle = Title === "h2" ? "h3" : "h4";
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [held, setHeld] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Autoplay only on desktop, and only when motion is welcome.
  useEffect(() => {
    const desktop = window.matchMedia(desktopQuery);
    const motion = window.matchMedia(motionQuery);
    const update = () => {
      setIsDesktop(desktop.matches);
      setCanAutoplay(desktop.matches && motion.matches);
    };
    update();
    desktop.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  // Pause while the showcase is off screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playing = autoplay && canAutoplay;
  const paused = held || !onScreen;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % parts.length);
  }, [parts.length]);

  const select = (index: number) => {
    setAutoplay(false);
    setActive(index);
    if (!isDesktop) {
      const card = cardRefs.current[index];
      const row = rowRef.current;
      if (card && row) {
        const smooth = window.matchMedia(motionQuery).matches;
        row.scrollTo({
          left: card.offsetLeft - row.offsetLeft - (row.clientWidth - card.clientWidth) / 2,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    }
  };

  // On phones the swipe position decides the active step.
  const frame = useRef(0);
  const onRowScroll = () => {
    if (isDesktop) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const row = rowRef.current;
      if (!row) return;
      const center = row.scrollLeft + row.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft - row.offsetLeft + card.clientWidth / 2 - center);
        if (distance < best) {
          best = distance;
          nearest = i;
        }
      });
      setActive(nearest);
    });
  };

  return (
    <div ref={rootRef}>
      {/* Project intro */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {eyebrow && (
            <p className="inline-flex rounded-full border-2 border-ink bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide">
              {eyebrow}
            </p>
          )}
          <Title className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">
            {project.title}
          </Title>
          <p className="mt-3 font-semibold text-primary">
            {project.client} · {project.industry}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
          <Deliverables items={project.deliverables} />
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href={`/work/${project.slug}`}
              className="group inline-flex items-center gap-2 font-bold uppercase tracking-wide underline-offset-4 hover:underline"
            >
              Read the case study
              <ArrowRightIcon className="text-[1.1rem] transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {domainOf(project.url)}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Phones and tablets: compact chips plus the active headline. */}
      <div className="mt-10 lg:hidden">
        <div
          role="group"
          aria-label={`${project.title}: what we built`}
          // Equal tiles that always fit, same pattern as the Why Us stages.
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${parts.length}, minmax(0, 1fr))` }}
        >
          {parts.map((part, i) => (
            <button
              key={part.title}
              type="button"
              aria-pressed={i === active}
              aria-controls={`${project.slug}-step-${i}`}
              onClick={() => select(i)}
              className={`flex min-w-0 flex-col items-center gap-0.5 rounded-2xl border-2 border-ink px-1 py-2 text-center text-[0.72rem] font-bold uppercase leading-tight tracking-wide transition-colors duration-150 sm:flex-row sm:justify-center sm:gap-1.5 sm:text-[0.8rem] ${
                i === active ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              <span className={`tabular-nums ${i === active ? "text-accent" : "text-muted"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {part.title}
            </button>
          ))}
        </div>
        <p
          aria-live="polite"
          className="mt-5 font-display text-[1.65rem] font-extrabold leading-[1.1] tracking-[-0.02em] [text-wrap:balance] sm:text-3xl"
        >
          {parts[active].headline}
        </p>
      </div>

      {/* Desktop: headline stack, also the step picker */}
      <ol
        aria-label={`${project.title}: what we built`}
        className="mt-14 hidden space-y-1 lg:block"
      >
        {parts.map((part, i) => (
          <li key={part.title}>
            <button
              type="button"
              aria-pressed={i === active}
              aria-controls={`${project.slug}-step-${i}`}
              onClick={() => select(i)}
              className={`group text-left font-display text-[clamp(1.6rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] [text-wrap:balance] transition-colors duration-200 ease-out ${
                i === active ? "text-ink" : "text-ink/25 hover:text-ink/50"
              }`}
            >
              {part.headline}
              <sup className="ml-1 align-super font-sans text-xs font-bold tracking-normal text-primary sm:text-sm">
                {String(i + 1).padStart(2, "0")}
              </sup>
            </button>
          </li>
        ))}
      </ol>

      {/* Step cards */}
      <div
        ref={rowRef}
        onScroll={onRowScroll}
        onPointerEnter={() => isDesktop && setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
        }}
        className={`-mx-5 mt-6 flex snap-x lg:mt-10 snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 ${gridCols[parts.length] ?? "lg:grid-cols-3"}`}
      >
        {parts.map((part, i) => {
          const isActive = i === active;
          return (
            <article
              key={part.title}
              id={`${project.slug}-step-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => i !== active && select(i)}
              className="flex w-[85%] shrink-0 snap-center flex-col sm:w-[60%] lg:w-auto"
            >
              <Visual part={part} project={project} active={isActive} />

              <div className="mt-6 flex items-center gap-3">
                <span
                  className={`text-sm font-bold tabular-nums transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
                  {isActive && (
                    <span
                      // A new key restarts the bar each time the step changes.
                      key={`${active}-${playing}`}
                      onAnimationEnd={playing ? next : undefined}
                      className={`absolute inset-0 origin-left rounded-full bg-accent ${
                        playing ? "showcase-progress" : ""
                      }`}
                      style={
                        playing
                          ? ({
                              animationDuration: `${STEP_MS}ms`,
                              animationPlayState: paused ? "paused" : "running",
                            } as CSSProperties)
                          : undefined
                      }
                    />
                  )}
                </span>
              </div>
              <StepTitle className="mt-4 text-lg font-bold">{part.title}</StepTitle>
              <p className="mt-2 leading-relaxed text-muted">{part.text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Mock-ups. Decorative: the step title and text carry the meaning, so these
 * are hidden from screen readers. Their motion lives in globals.css
 * (.showcase-visual) and replays whenever a card becomes active.
 * ------------------------------------------------------------------------- */

function Visual({
  part,
  project,
  active,
}: {
  part: ProjectPart;
  project: Project;
  active: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      data-active={active}
      data-cursor={active ? `${part.title}!` : `See ${part.title}`}
      className={`showcase-visual relative h-72 overflow-hidden rounded-3xl border-2 bg-sand transition-[border-color] duration-200 sm:h-80 ${
        active ? "card-outline border-ink" : "cursor-pointer border-line"
      }`}
    >
      <div className="dot-grid absolute inset-0" />
      {part.visual === "store" && <StoreVisual project={project} />}
      {part.visual === "app" && <AppVisual project={project} items={part.highlights} />}
      {part.visual === "crm" && <CrmVisual project={project} items={part.highlights} />}
      {part.visual === "site" && <SiteVisual project={project} items={part.highlights} />}
      {part.visual === "admin" &&
        (project.gallery?.some((shot) => shot.group === "Admin panel") ? (
          <CrmVisual project={project} items={part.highlights.slice(0, 3)} group="Admin panel" label="Updated by the team" />
        ) : (
          <AdminVisual items={part.highlights} />
        ))}
    </div>
  );
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Real website screens: the home page, crossfading to a collection page. */
function StoreVisual({ project }: { project: Project }) {
  const screens = (project.gallery ?? []).filter((shot) => shot.group === "Website");
  const [first, second] = screens.length ? screens : [project.image];
  return (
    <div className="absolute inset-x-5 top-5 overflow-hidden rounded-2xl border-2 border-ink bg-paper sm:inset-x-6 sm:top-6">
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-sand px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink/25" />
        <span className="h-2 w-2 rounded-full bg-ink/25" />
        <span className="h-2 w-2 rounded-full bg-ink/25" />
        <span className="ml-2 truncate text-[10px] font-semibold text-muted">{domainOf(project.url)}</span>
      </div>
      <div className="relative">
        <Image
          src={first.src}
          alt=""
          width={first.width}
          height={first.height}
          sizes="(min-width: 1024px) 30vw, 85vw"
          className="h-auto w-full"
        />
        {second && (
          <Image
            src={second.src}
            alt=""
            width={second.width}
            height={second.height}
            sizes="(min-width: 1024px) 30vw, 85vw"
            className="sc-swap absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

/** Real app screens in two phones, with one order update landing on top. */
function AppVisual({ project, items }: { project: Project; items: string[] }) {
  const screens = (project.gallery ?? []).filter((shot) => shot.group === "Android app");
  const [front, back] = screens;
  if (!front) return null;
  const phone = "overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-ink shadow-[4px_4px_0_var(--color-ink)]";
  return (
    <>
      {back && (
        <div className={`absolute left-[54%] top-10 w-32 rotate-6 sm:w-36 ${phone}`}>
          <Image src={back.src} alt="" width={back.width} height={back.height} sizes="150px" className="h-auto w-full" />
        </div>
      )}
      <div className={`absolute left-[18%] top-5 w-36 -rotate-3 sm:w-40 ${phone}`}>
        <Image src={front.src} alt="" width={front.width} height={front.height} sizes="170px" className="h-auto w-full" />
      </div>
      {items[1] && (
        <div
          className="sc-in absolute bottom-5 left-1/2 flex w-max max-w-[85%] -translate-x-1/2 items-center gap-2 rounded-2xl border-2 border-ink bg-paper px-3 py-2 shadow-[4px_4px_0_var(--color-ink)]"
          style={delay(600)}
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent text-[10px] font-extrabold text-ink">
            GB
          </span>
          <span className="text-xs font-bold">{items[1]}</span>
        </div>
      )}
    </>
  );
}

/**
 * A real back-office screen panning slowly, with a small activity panel.
 * Used for the CRM (GUJJUBAZAR) and the admin panel (Lakshraj Enterprise).
 */
function CrmVisual({
  project,
  items,
  group = "CRM",
  label = "Live across branches",
}: {
  project: Project;
  items: string[];
  group?: "CRM" | "Admin panel";
  label?: string;
}) {
  const screen = project.gallery?.find((shot) => shot.group === group) ?? project.image;
  return (
    <>
      <div className="sc-pan-x absolute left-5 top-5 w-[150%] overflow-hidden rounded-2xl border-2 border-ink bg-paper sm:left-6 sm:top-6">
        <Image
          src={screen.src}
          alt=""
          width={screen.width}
          height={screen.height}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="h-auto w-full"
        />
      </div>
      <div className="absolute bottom-4 right-4 w-56 rounded-2xl border-2 border-ink bg-paper p-3 shadow-[4px_4px_0_var(--color-ink)]">
        <p className="flex items-center gap-2 text-xs font-bold text-ink">
          <span className="sc-pulse h-2 w-2 rounded-full bg-accent" />
          {label}
        </p>
        <ul className="mt-2 space-y-1.5">
          {items.map((item, i) => (
            <li
              key={item}
              className="sc-in rounded-lg bg-sand px-2.5 py-1.5 text-[11px] font-semibold text-muted"
              style={delay([300, 650, 1100][i] ?? 300 + i * 400)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function SiteVisual({ project, items }: { project: Project; items: string[] }) {
  return (
    <>
      <div className="absolute inset-x-5 top-5 overflow-hidden rounded-2xl border-2 border-ink bg-paper sm:inset-x-6 sm:top-6">
        <div className="flex items-center gap-1.5 border-b-2 border-ink bg-sand px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink/25" />
          <span className="h-2 w-2 rounded-full bg-ink/25" />
          <span className="h-2 w-2 rounded-full bg-ink/25" />
          <span className="ml-2 truncate text-[10px] font-semibold text-muted">{domainOf(project.url)}</span>
        </div>
        <Image
          src={project.image.src}
          alt=""
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="sc-pan-y h-auto w-full"
        />
      </div>
      {items[0] && (
        <div
          className="sc-in absolute bottom-5 right-5 flex items-center gap-2 rounded-2xl border-2 border-ink bg-paper px-3 py-2 shadow-[4px_4px_0_var(--color-ink)]"
          style={delay(700)}
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-sm font-extrabold">+</span>
          <span className="text-xs font-bold">{items[0]}</span>
        </div>
      )}
    </>
  );
}

function AdminVisual({ items }: { items: string[] }) {
  const sections = ["Enquiries", "Services", "Portfolio", "Testimonials"];
  return (
    <div className="absolute inset-x-5 top-5 grid grid-cols-[6.5rem_1fr] overflow-hidden rounded-2xl border-2 border-ink bg-paper sm:inset-x-6 sm:top-6">
      <ul className="space-y-1 border-r-2 border-ink bg-ink p-2.5 text-[11px] font-semibold text-paper/70">
        <li className="mb-2 font-display text-xs font-extrabold uppercase text-paper">Admin</li>
        {sections.map((s, i) => (
          <li key={s} className={`rounded-md px-2 py-1 ${i === 0 ? "bg-accent text-ink" : ""}`}>
            {s}
          </li>
        ))}
      </ul>
      <ul className="space-y-2 p-3">
        {items.map((item, i) => (
          <li
            key={item}
            className="sc-in flex items-center gap-2 rounded-lg border border-line bg-sand px-2.5 py-2 text-[11px] font-semibold"
            style={delay([250, 500, 850, 1150][i] ?? 250 + i * 300)}
          >
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary text-[9px] text-paper">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
