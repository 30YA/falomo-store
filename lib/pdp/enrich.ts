import type {
  Product,
  ProductDetail,
  ProductQuestion,
  ProductReview,
  ProductSpec,
} from "@/types";
import { categories } from "@/data/products";

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(items: T[], seed: number, index: number): T {
  return items[(seed + index * 7) % items.length];
}

const AUTHORS = [
  "سارا محمدی",
  "علی رضایی",
  "مریم احمدی",
  "حسین کریمی",
  "نرگس موسوی",
  "امیر حسینی",
  "فاطمه جعفری",
  "مهدی صادقی",
];

const REVIEW_TITLES = [
  "کیفیت خیلی خوب",
  "ارزش خرید داشت",
  "مطابق انتظار بود",
  "بسته‌بندی عالی",
  "برای هدیه عالی است",
  "نرم و راحت",
];

const REVIEW_BODIES = [
  "از خریدم راضی هستم؛ پارچه نرم و دوخت تمیزی دارد. بعد از چند بار شست‌وشو هم فرم خودش را حفظ کرده.",
  "ارسال سریع بود و کالا دقیقاً همان چیزی بود که در تصاویر دیده می‌شد. رنگ‌ها زنده و زیبا هستند.",
  "برای استفاده روزمره گزینه‌ی خیلی مناسبی است. حس خوبی موقع خواب می‌دهد و حساسیت ایجاد نکرد.",
  "نسبت به قیمت، کیفیت قابل قبولی دارد. پیشنهاد می‌کنم اگر دنبال کالای خواب مرتب هستید امتحان کنید.",
  "بسته‌بندی مرتب بود و بوی نامطبوع نداشت. سایز هم دقیق بود و روی تخت خوب می‌نشیند.",
];

function buildSpecs(product: Product): ProductSpec[] {
  const categoryName =
    categories.find((c) => c.slug === product.category)?.name ?? "کالای خواب";

  const base: ProductSpec[] = [
    { group: "کلی", label: "دسته‌بندی", value: categoryName },
    { group: "کلی", label: "برند", value: product.brand },
    {
      group: "کلی",
      label: "مدل",
      value: product.shortTitle,
    },
    {
      group: "کلی",
      label: "کشور سازنده",
      value: product.brand === "میکرونخ" ? "ترکیه" : "ایران",
    },
  ];

  const materialByCategory: Record<string, ProductSpec[]> = {
    sheet: [
      { group: "جنس و ساختار", label: "جنس پارچه", value: "پنبه مخلوط / پلی‌استر" },
      { group: "جنس و ساختار", label: "نوع دوخت", value: "کشدوز" },
      { group: "کاربری", label: "فصل استفاده", value: "چهارفصل" },
      { group: "کاربری", label: "قابل شست‌وشو", value: "بله" },
    ],
    "duvet-cover": [
      { group: "جنس و ساختار", label: "تعداد قطعات", value: product.features.find((f) => f.includes("تکه")) ?? "۶ تکه" },
      { group: "جنس و ساختار", label: "جنس پارچه", value: "نخی نرم" },
      { group: "کاربری", label: "مناسب برای", value: "اتاق خواب بزرگسالان" },
      { group: "کاربری", label: "قابل شست‌وشو", value: "بله" },
    ],
    pillow: [
      { group: "جنس و ساختار", label: "مغزی", value: product.features.includes("مموری فوم") ? "مموری فوم" : "الیاف هالو" },
      { group: "جنس و ساختار", label: "روکش", value: "قابل جداسازی" },
      { group: "کاربری", label: "آنتی‌آلرژی", value: product.features.some((f) => f.includes("آلرژی")) ? "بله" : "خیر" },
      { group: "کاربری", label: "ارتفاع مناسب", value: "متوسط تا بلند" },
    ],
    mattress: [
      { group: "جنس و ساختار", label: "نوع فنر", value: "فنر منفصل" },
      { group: "جنس و ساختار", label: "رویه", value: "آنتی‌باکتریال" },
      { group: "کاربری", label: "درجه سفتی", value: "متوسط" },
      { group: "گارانتی", label: "گارانتی", value: "۲ ساله شرکتی" },
    ],
    blanket: [
      { group: "جنس و ساختار", label: "جنس", value: product.features.includes("وزن‌دار") ? "وزن‌دار" : "پنبه‌ای" },
      { group: "جنس و ساختار", label: "وزن تقریبی", value: product.features.find((f) => f.includes("کیلو")) ?? "سبک" },
      { group: "کاربری", label: "فصل", value: "پاییز و زمستان" },
      { group: "کاربری", label: "قابل شست‌وشو", value: "بله" },
    ],
    pillowcase: [
      { group: "جنس و ساختار", label: "تعداد در بسته", value: "۲ عدد" },
      { group: "جنس و ساختار", label: "جنس پارچه", value: "نخی" },
      { group: "کاربری", label: "طرح", value: "چاپی" },
      { group: "کاربری", label: "قابل شست‌وشو", value: "بله" },
    ],
  };

  const sizeSpec: ProductSpec = {
    group: "ابعاد",
    label: "سایزهای موجود",
    value: product.sizes.join("، "),
  };

  const colorSpec: ProductSpec = {
    group: "ظاهر",
    label: "رنگ‌های موجود",
    value: product.colors.map((c) => c.name).join("، "),
  };

  const featureSpecs: ProductSpec[] = product.features.map((feature) => ({
    group: "ویژگی‌ها",
    label: feature,
    value: "دارد",
  }));

  return [
    ...base,
    ...(materialByCategory[product.category] ?? []),
    sizeSpec,
    colorSpec,
    ...featureSpecs,
  ];
}

function buildLongDescription(product: Product): string[] {
  const categoryName =
    categories.find((c) => c.slug === product.category)?.name ?? "کالای خواب";

  return [
    product.description,
    `${product.shortTitle} از برند ${product.brand} برای کسانی طراحی شده که به کیفیت خواب و زیبایی اتاق اهمیت می‌دهند. این محصول در دسته ${categoryName} قرار می‌گیرد و با جزئیات دقیق دوخت، تجربه‌ای لطیف و بادوام ارائه می‌کند.`,
    `ویژگی‌های برجسته این کالا شامل ${product.features.join("، ")} است. می‌توانید متناسب با دکوراسیون اتاق، از میان رنگ‌ها و سایزهای موجود انتخاب کنید.`,
    "برای نگهداری بهتر، شست‌وشو با آب ولرم و خشک‌کردن در هوای آزاد توصیه می‌شود. از سفیدکننده‌های قوی استفاده نکنید تا بافت پارچه آسیب نبیند.",
  ];
}

function buildRatingBreakdown(product: Product): ProductDetail["ratingBreakdown"] {
  const total = Math.max(product.reviewCount, 10);
  const seed = hashSeed(product.id);
  const five = Math.round(total * (0.35 + (seed % 20) / 100));
  const four = Math.round(total * (0.28 + (seed % 10) / 100));
  const three = Math.round(total * 0.2);
  const two = Math.round(total * 0.1);
  const one = Math.max(total - five - four - three - two, 0);
  return { 5: five, 4: four, 3: three, 2: two, 1: one };
}

function buildReviews(product: Product): ProductReview[] {
  const seed = hashSeed(product.id + product.slug);
  const count = Math.min(8, Math.max(4, Math.round(product.reviewCount / 30)));

  return Array.from({ length: count }, (_, i) => {
    const rating = Math.min(5, Math.max(3, Math.round(product.rating + ((seed + i) % 3) - 1)));
    return {
      id: `${product.id}-r${i}`,
      author: pick(AUTHORS, seed, i),
      rating,
      title: pick(REVIEW_TITLES, seed, i),
      body: pick(REVIEW_BODIES, seed, i + 3),
      date: `${toFaDay(seed + i)} ${pick(["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"], seed, i)} ۱۴۰۴`,
      likes: 2 + ((seed + i * 3) % 40),
      isBuyer: (seed + i) % 4 !== 0,
      pros: product.features.slice(0, 2),
      cons: (seed + i) % 3 === 0 ? ["قیمت کمی بالا"] : undefined,
    };
  });
}

function toFaDay(seed: number) {
  return String(1 + (seed % 28));
}

function buildQuestions(product: Product): ProductQuestion[] {
  const seed = hashSeed(product.id + "q");
  return [
    {
      id: `${product.id}-q1`,
      author: pick(AUTHORS, seed, 1),
      question: `آیا ${product.shortTitle} قابل شست‌وشو در ماشین لباسشویی است؟`,
      answer:
        "بله، شست‌وشو با دور ملایم و آب حداکثر ۳۰ درجه توصیه می‌شود. از خشک‌کن با حرارت بالا خودداری کنید.",
      date: "۱۲ مرداد ۱۴۰۴",
    },
    {
      id: `${product.id}-q2`,
      author: pick(AUTHORS, seed, 2),
      question: "ابعاد دقیق کالا چقدر است و روی تخت استاندارد جا می‌شود؟",
      answer: `سایزهای موجود برای این مدل: ${product.sizes.join("، ")}. در صورت نیاز می‌توانید از راهنمای سایز در مشخصات استفاده کنید.`,
      date: "۳ شهریور ۱۴۰۴",
    },
    {
      id: `${product.id}-q3`,
      author: pick(AUTHORS, seed, 3),
      question: "رنگ کالا با تصویر سایت یکی است؟",
      date: "۲۰ شهریور ۱۴۰۴",
    },
  ];
}

export function enrichProduct(product: Product): ProductDetail {
  return {
    ...product,
    longDescription: buildLongDescription(product),
    specs: buildSpecs(product),
    reviews: buildReviews(product),
    questions: buildQuestions(product),
    ratingBreakdown: buildRatingBreakdown(product),
    seller: {
      name: "رویان",
      rating: 4.8,
      performanceLabel: "تنها فروشنده و تأمین‌کننده",
      shippingLabel: product.inStock ? "موجود در انبار رویان" : "ناموجود",
      warranty: product.category === "mattress" ? "گارانتی ۲۴ ماهه" : "ضمانت اصالت و سلامت فیزیکی",
    },
  };
}
