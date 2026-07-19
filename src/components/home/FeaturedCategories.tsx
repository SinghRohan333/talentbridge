"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { useCategoryCounts } from "@/hooks/useCategoryCounts";

export function FeaturedCategories() {
  const { data, isLoading } = useCategoryCounts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Browse by category
        </h2>
        <p className="mt-2 text-slate">
          Explore open roles across the fields hiring right now.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-line" />
            ))
          : data?.map((cat) => (
              <Link
                key={cat._id}
                href={`/jobs?category=${encodeURIComponent(cat._id)}`}
                className="flex flex-col gap-2 rounded-2xl border border-line bg-white/60 p-5 transition-shadow hover:shadow-md"
              >
                <Layers className="h-5 w-5 text-signal" />
                <span className="font-medium text-ink">{cat._id}</span>
                <span className="text-xs text-slate">
                  {cat.count} open role{cat.count === 1 ? "" : "s"}
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
}
