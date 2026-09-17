"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import type { ExternalToast } from "sonner";
import {
  CheckCircle2,
  Info,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import type { ReactNode } from "react";

type ToastTone = "default" | "success" | "error" | "info";

const toneIcon: Record<ToastTone, ReactNode> = {
  default: <Info className="h-4 w-4 shrink-0 text-[var(--color-brand)]" />,
  success: <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />,
  error: <XCircle className="h-4 w-4 shrink-0 text-red-500" />,
  info: <Info className="h-4 w-4 shrink-0 text-sky-600" />,
};

function ToastShell({
  id,
  tone,
  title,
  description,
  icon,
}: {
  id: string | number;
  tone: ToastTone;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div
      className="flex w-[min(92vw,380px)] items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white/95 px-4 py-3 shadow-[0_18px_44px_-22px_rgba(15,23,42,0.45)] backdrop-blur-md"
      dir="rtl"
    >
      {icon ?? toneIcon[tone]}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-6 text-[var(--color-ink)]">
          {title}
        </p>
        {description && (
          <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-ink-muted)]">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => sonnerToast.dismiss(id)}
        className="shrink-0 text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
        aria-label="بستن"
      >
        بستن
      </button>
    </div>
  );
}

function show(
  title: string,
  tone: ToastTone = "default",
  options?: ExternalToast & { description?: string },
) {
  const { description, ...rest } = options ?? {};
  return sonnerToast.custom(
    (id) => (
      <ToastShell id={id} tone={tone} title={title} description={description} />
    ),
    { duration: 2800, ...rest },
  );
}

export const toast = {
  message: (title: string, options?: ExternalToast & { description?: string }) =>
    show(title, "default", options),
  success: (title: string, options?: ExternalToast & { description?: string }) =>
    show(title, "success", options),
  error: (title: string, options?: ExternalToast & { description?: string }) =>
    show(title, "error", options),
  info: (title: string, options?: ExternalToast & { description?: string }) =>
    show(title, "info", options),
  addedToCart: (productTitle?: string) =>
    sonnerToast.custom(
      (id) => (
        <ToastShell
          id={id}
          tone="success"
          title="به سبد خرید اضافه شد"
          description={productTitle}
          icon={
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
              <ShoppingBag className="h-4 w-4" />
            </span>
          }
        />
      ),
      { duration: 2600 },
    ),
  wishlistAdded: () => show("به علاقه‌مندی‌ها اضافه شد", "success"),
  wishlistRemoved: () => show("از علاقه‌مندی‌ها حذف شد", "info"),
};

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      dir="rtl"
      gap={10}
      offset={16}
      mobileOffset={12}
      visibleToasts={3}
      toastOptions={{
        unstyled: true,
        className: "font-sans",
      }}
    />
  );
}
