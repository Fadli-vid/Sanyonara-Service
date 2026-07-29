import type { ReactNode } from "react";
import { SectionReveal } from "../shared/SectionReveal";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

interface HeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({ eyebrow, title, description, centered = true }: HeadingProps) {
  return (
    <SectionReveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground sm:text-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-2xl font-bold text-foreground sm:mt-4 sm:text-4xl">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted-foreground sm:mt-4 sm:text-base">{description}</p>}
    </SectionReveal>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-10 sm:py-20 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}
