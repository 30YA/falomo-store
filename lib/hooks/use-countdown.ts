"use client";

import { useEffect, useState } from "react";

export interface CountdownParts {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
  isExpired: boolean;
}

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function getRemaining(targetAt: number): CountdownParts {
  const totalSeconds = Math.max(0, Math.floor((targetAt - Date.now()) / 1000));

  return {
    hours: pad(Math.floor(totalSeconds / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
    totalSeconds,
    isExpired: totalSeconds <= 0,
  };
}

/** End of the current offer cycle aligned to local midnight. */
export function getDailyCycleEnd(cycleHours: number): number {
  const cycleMs = cycleHours * 60 * 60 * 1000;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const elapsed = Date.now() - startOfDay.getTime();
  return Date.now() + (cycleMs - (elapsed % cycleMs));
}

export function useCountdown(targetAt: number): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() =>
    getRemaining(targetAt),
  );

  useEffect(() => {
    setParts(getRemaining(targetAt));
    const id = window.setInterval(() => {
      setParts(getRemaining(targetAt));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetAt]);

  return parts;
}
