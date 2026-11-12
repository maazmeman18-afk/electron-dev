import Image from "next/image";
import type { ReactNode } from "react";

type BrowserFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  domain?: string;
  children?: ReactNode;
  className?: string;
};

export function BrowserFrame({
  src,
  alt,
  width,
  height,
  domain,
  children,
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`card-outline relative rounded-3xl bg-ink overflow-hidden ${className}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-sand border-b border-line">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-paper/60"
              aria-hidden="true"
            />
          ))}
        </div>
        {domain && (
          <div className="flex-1 px-3 py-1 rounded-md bg-paper/30 border border-line/50">
            <span className="text-[10px] font-medium text-muted tracking-tight uppercase">
              {domain}
            </span>
          </div>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover object-top"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        {children && (
          <div className="absolute inset-0 bg-paper/90 backdrop-blur-sm flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
