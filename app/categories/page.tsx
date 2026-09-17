import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { catalogRepository } from "@/lib/catalog";
import { toPersianDigits } from "@/lib/utils";

export const metadata = {
  title: "دسته‌بندی‌ها",
};

export default function CategoriesPage() {
  const categories = catalogRepository.getCategories();

  return (
    <Container className="py-6">
      <h1 className="mb-6 text-2xl font-bold">دسته‌بندی کالای خواب</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-[var(--color-surface)]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-bold">{category.name}</p>
              <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                {toPersianDigits(category.productCount)} کالا
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
