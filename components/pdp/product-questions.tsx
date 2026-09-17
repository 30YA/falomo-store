import { MessageCircleQuestion } from "lucide-react";
import type { ProductDetail } from "@/types";

interface ProductQuestionsProps {
  product: ProductDetail;
}

export function ProductQuestions({ product }: ProductQuestionsProps) {
  return (
    <section
      id="questions"
      className="scroll-mt-40 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">پرسش و پاسخ</h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            سوالات متداول خریداران درباره این کالا
          </p>
        </div>
        <button
          type="button"
          className="rounded-xl border border-[var(--color-brand)] px-3 py-2 text-xs font-medium text-[var(--color-brand)] transition hover:bg-[var(--color-brand-soft)]"
        >
          ثبت پرسش
        </button>
      </div>

      <div className="space-y-3">
        {product.questions.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[var(--color-line)] p-4"
          >
            <div className="mb-2 flex items-start gap-2">
              <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" />
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {item.question}
                </p>
                <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                  {item.author} · {item.date}
                </p>
              </div>
            </div>
            {item.answer ? (
              <div className="mr-6 rounded-xl bg-[var(--color-surface)] px-3 py-2.5 text-sm leading-7 text-[var(--color-ink-soft)]">
                <span className="mb-1 block text-xs font-medium text-[var(--color-brand)]">
                  پاسخ فروشنده
                </span>
                {item.answer}
              </div>
            ) : (
              <p className="mr-6 text-xs text-[var(--color-ink-muted)]">
                هنوز پاسخی ثبت نشده است.
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
