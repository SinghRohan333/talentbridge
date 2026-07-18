"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaginationMeta } from "@/types/job";

export function Pagination({ pagination }: { pagination: PaginationMeta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, totalPages } = pagination;

  const goToPage = (target: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (target <= 1) params.delete("page");
    else params.set("page", String(target));
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-sm text-slate">…</span>}
            <button
              type="button"
              onClick={() => goToPage(p)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-medium",
                p === page
                  ? "border-signal bg-signal text-paper"
                  : "border-line text-ink hover:bg-line/30",
              )}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
