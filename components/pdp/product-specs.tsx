import type { ProductDetail } from "@/types";

interface ProductSpecsProps {
  product: ProductDetail;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const groups = product.specs.reduce<Record<string, typeof product.specs>>(
    (acc, spec) => {
      const group = spec.group ?? "سایر";
      if (!acc[group]) acc[group] = [];
      acc[group].push(spec);
      return acc;
    },
    {},
  );

  return (
    <section
      id="specs"
      className="scroll-mt-40 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-6"
    >
      <h2 className="mb-4 text-lg font-bold">مشخصات فنی</h2>
      <div className="space-y-6">
        {Object.entries(groups).map(([group, specs]) => (
          <div key={group}>
            <h3 className="mb-3 text-sm font-bold text-[var(--color-ink)]">
              {group}
            </h3>
            <div className="overflow-hidden rounded-xl border border-[var(--color-line)]">
              {specs.map((spec, index) => (
                <div
                  key={`${spec.label}-${index}`}
                  className="grid grid-cols-[40%_60%] border-b border-[var(--color-line)] last:border-b-0 sm:grid-cols-[30%_70%]"
                >
                  <div className="bg-[var(--color-surface)] px-3 py-3 text-xs text-[var(--color-ink-muted)] sm:text-sm">
                    {spec.label}
                  </div>
                  <div className="px-3 py-3 text-xs text-[var(--color-ink)] sm:text-sm">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
