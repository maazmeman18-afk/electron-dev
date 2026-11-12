export function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-[1em] w-[1em] shrink-0 ${className}`}
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

export function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-[1em] w-[1em] shrink-0 ${className}`}
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v3m0 0v3m0-3h3m-3 0h-3m-5 5l-2 2m0 0l2 2m-2-2l-2-2m-2 2l2-2m0 0l2 2m0 0l2-2m-2 4l2-2"
      />
    </svg>
  );
}
