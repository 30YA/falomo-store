"use client";

import { useEffect, useState } from "react";

/** Avoid hydration mismatch for persisted Zustand stores. */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
