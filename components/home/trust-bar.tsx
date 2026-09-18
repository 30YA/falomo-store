import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Container } from "@/components/ui/container";

const features = [
  {
    title: "ارسال سریع",
    desc: "تحویل به‌موقع در سراسر کشور",
  },
  {
    title: "ضمانت اصالت",
    desc: "کالای خواب اصل با گارانتی کیفیت",
  },
  {
    title: "پرداخت امن",
    desc: "خرید مطمئن با درگاه‌های معتبر",
  },
  {
    title: "پشتیبانی ۷ روزه",
    desc: "همراه شما قبل و بعد از خرید",
  },
];

export function TrustBar() {
  return (
    <section className="py-4 sm:py-8">
      <Container>
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:grid-cols-4 sm:gap-4 sm:rounded-3xl sm:p-6">
          {features.map((item) => (
            <div key={item.title} className="text-center sm:text-right">
              <p className="font-bold text-[var(--color-ink)]">{item.title}</p>
              <p className="mt-1 text-xs text-[var(--color-ink-muted)] sm:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl bg-[var(--color-ink)] p-6 text-white sm:mt-6 sm:rounded-3xl sm:p-10">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="rounded-2xl bg-white px-3 py-2 shadow-sm">
                <BrandLogo variant="full" className="h-auto w-36 sm:w-40" />
              </div>
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  خواب بهتر، زندگی بهتر
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/75">
                  در فالومو مجموعه‌ای از روتختی، ملحفه، بالش و تشک را با الهام از
                  تجربه خرید فروشگاه‌های بزرگ ایرانی طراحی کرده‌ایم.
                </p>
              </div>
            </div>
            <Link
              href="/products"
              className="rounded-xl bg-[var(--color-brand)] px-5 py-3 text-sm font-medium transition hover:bg-[var(--color-brand-dark)]"
            >
              شروع خرید
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
