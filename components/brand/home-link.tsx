"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HomeLinkProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/** Navigates home and always resets scroll to the very top. */
export function HomeLink({ children, className, ...props }: HomeLinkProps) {
  return (
    <Link
      href="/"
      className={cn(className)}
      scroll
      onClick={() => {
        // Instant reset — avoids landing below top due to scroll-padding/focus quirks
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
