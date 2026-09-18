import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface ContentPageProps {
  title: string;
  description?: string;
  children: ReactNode;
  /** Use denser two-column friendly layout */
  wide?: boolean;
}

export function ContentPage({
  title,
  description,
  children,
  wide = false,
}: ContentPageProps) {
  return (
    <div className="border-b border-[var(--color-line)] bg-[var(--color-surface)]/40">
      <Container className="py-6 sm:py-8 lg:py-12">
        <div
          className={cn(
            "rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.03)] sm:rounded-3xl sm:p-8 lg:p-10",
            wide ? "w-full" : "mx-auto w-full max-w-5xl",
          )}
        >
          <header className="mb-6 border-b border-[var(--color-line)] pb-5 sm:mb-8 sm:pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-3xl lg:text-[2rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--color-ink-muted)] sm:text-base sm:leading-8">
                {description}
              </p>
            ) : null}
          </header>
          <div className="w-full">{children}</div>
        </div>
      </Container>
    </div>
  );
}
