"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { SearchDropdown } from "@/components/search/search-dropdown";
import {
  clearRecentSearches,
  getPopularQueries,
  getRecentSearches,
  getSearchSuggestions,
  saveRecentSearch,
} from "@/lib/search/suggest";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
}

export function SearchBox({
  className,
  inputClassName,
  autoFocus,
}: SearchBoxProps) {
  const router = useRouter();
  const listboxId = useId();
  const rootRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const popularQueries = useMemo(() => getPopularQueries(), []);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQuery(query), 180);
    return () => window.clearTimeout(id);
  }, [query]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery, open]);

  const suggestions = useMemo(
    () => getSearchSuggestions(debouncedQuery, { productLimit: 6 }),
    [debouncedQuery],
  );

  const plpHref = query.trim()
    ? `/products?search=${encodeURIComponent(query.trim())}`
    : "/products";

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const goToPlp = (value: string) => {
    const q = value.trim();
    if (q) {
      saveRecentSearch(q);
      setRecentSearches(getRecentSearches());
    }
    close();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    goToPlp(query);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      inputRef.current?.blur();
      return;
    }

    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }

    const productCount = suggestions.products.length;
    if (productCount === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % productCount);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? productCount - 1 : i - 1));
      return;
    }

    if (e.key === "Enter" && activeIndex >= 0 && suggestions.products[activeIndex]) {
      e.preventDefault();
      const product = suggestions.products[activeIndex];
      if (query.trim()) saveRecentSearch(query.trim());
      close();
      router.push(`/products/${product.slug}`);
    }
  };

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <form
      ref={rootRef}
      onSubmit={onSubmit}
      className={cn("relative", className)}
      role="search"
    >
      <Search className="pointer-events-none absolute right-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-muted)]" />
      <input
        ref={inputRef}
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="جستجو در کالای خواب..."
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listboxId}
        className={cn(
          "h-10 w-full rounded-xl border border-transparent bg-[var(--color-surface)] pr-10 pl-10 text-sm outline-none transition focus:border-[var(--color-brand)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]",
          inputClassName,
        )}
      />
      {query && (
        <button
          type="button"
          aria-label="پاک کردن"
          onClick={() => {
            setQuery("");
            setDebouncedQuery("");
            inputRef.current?.focus();
            setOpen(true);
          }}
          className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--color-ink-muted)] hover:bg-black/5 hover:text-[var(--color-ink)]"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {open && (
        <div id={listboxId}>
          <SearchDropdown
            query={debouncedQuery}
            suggestions={suggestions}
            recentSearches={recentSearches}
            popularQueries={popularQueries}
            activeIndex={activeIndex}
            onHoverIndex={setActiveIndex}
            onSelectQuery={(value) => goToPlp(value)}
            onClearRecent={() => {
              clearRecentSearches();
              setRecentSearches([]);
            }}
            onViewAll={() => {
              if (query.trim()) {
                saveRecentSearch(query.trim());
                setRecentSearches(getRecentSearches());
              }
              close();
            }}
            onClose={close}
            plpHref={plpHref}
          />
        </div>
      )}
    </form>
  );
}
