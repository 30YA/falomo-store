import type { ProductDetail } from "@/types";

interface ProductDescriptionProps {
  product: ProductDetail;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <section
      id="intro"
      className="scroll-mt-40 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-6"
    >
      <h2 className="mb-4 text-lg font-bold">نقد و بررسی اجمالی</h2>
      <div className="space-y-4 text-sm leading-7 text-[var(--color-ink-soft)]">
        {product.longDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {product.features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 rounded-xl bg-[var(--color-surface)] px-3 py-2.5 text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
