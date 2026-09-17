"use client";

import { useEffect, useState } from "react";
import { cn, toPersianDigits } from "@/lib/utils";

interface CountdownTimerProps {
  /** Length of each offer cycle in hours (resets automatically). */
  cycleHours?: number;
  className?: string;
  digitClassName?: string;
  separatorClassName?: string;
}

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function getCycleEnd(cycleHours: number) {
  const cycleMs = cycleHours * 60 * 60 * 1000;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const elapsed = Date.now() - startOfDay.getTime();
  return Date.now() + (cycleMs - (elapsed % cycleMs));
}

function split(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: pad(Math.floor(totalSeconds / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

export function CountdownTimer({
  cycleHours = 6,
  className,
  digitClassName,
  separatorClassName,
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [targetAt, setTargetAt] = useState(0);
  const [parts, setParts] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setMounted(true);
    const initialTarget = getCycleEnd(cycleHours);
    setTargetAt(initialTarget);
    setParts(split(initialTarget - Date.now()));
  }, [cycleHours]);

  useEffect(() => {
    if (!mounted || !targetAt) return;

    const tick = () => {
      const remaining = targetAt - Date.now();
      if (remaining <= 0) {
        const next = getCycleEnd(cycleHours);
        setTargetAt(next);
        setParts(split(next - Date.now()));
        return;
      }
      setParts(split(remaining));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [mounted, targetAt, cycleHours]);

  const units = [parts.hours, parts.minutes, parts.seconds];

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-sans tabular-nums",
        !mounted && "opacity-0",
        className,
      )}
      dir="ltr"
      aria-live="polite"
      aria-label="زمان باقی‌مانده پیشنهاد"
    >
      {units.map((part, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && (
            <span
              className={cn(
                "text-sm font-bold opacity-80",
                separatorClassName,
              )}
            >
              :
            </span>
          )}
          <span
            className={cn(
              "inline-flex min-w-[2.25rem] items-center justify-center rounded-lg bg-white/20 px-1.5 py-1 text-sm font-bold leading-none backdrop-blur-sm",
              digitClassName,
            )}
          >
            {toPersianDigits(part)}
          </span>
        </span>
      ))}
    </div>
  );
}
