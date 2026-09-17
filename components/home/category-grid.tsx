import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";
import { Container } from "@/components/ui/container";
import { toPersianDigits } from "@/lib/utils";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-2 sm:py-4">
      <Container>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-6 sm:gap-6 sm:overflow-visible sm:pb-0">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group flex w-[72px] shrink-0 flex-col items-center gap-2 sm:w-auto animate-fade-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border border-[var(--color-line)] bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md sm:h-24 sm:w-24">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-[var(--color-ink)] sm:text-sm">
                  {category.name}
                </p>
                <p className="hidden text-[10px] text-[var(--color-ink-muted)] sm:block">
                  {toPersianDigits(category.productCount)} کالا
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
