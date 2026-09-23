"use client";

import { MainNav } from "@/components/layout/main-nav";

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-line)] bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <MainNav variant="bar" />
    </nav>
  );
}
