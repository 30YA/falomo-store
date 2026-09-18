"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error("لطفاً همه فیلدها را کامل کنید.");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setName("");
      setPhone("");
      setMessage("");
      toast.success("پیام شما ثبت شد. به‌زودی پاسخ می‌دهیم.");
    }, 500);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5"
    >
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium">
          نام و نام خانوادگی
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-3 text-sm outline-none transition focus:border-[var(--color-brand)] focus:bg-white"
          placeholder="مثلاً سارا محمدی"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-phone" className="text-sm font-medium">
          شماره تماس
        </label>
        <input
          id="contact-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="tel"
          className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-3 text-sm outline-none transition focus:border-[var(--color-brand)] focus:bg-white"
          placeholder="۰۹۱۲…"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          پیام شما
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-brand)] focus:bg-white"
          placeholder="موضوع پیام را بنویسید…"
        />
      </div>
      <Button type="submit" disabled={sending} fullWidth>
        {sending ? "در حال ارسال…" : "ارسال پیام"}
      </Button>
    </form>
  );
}
