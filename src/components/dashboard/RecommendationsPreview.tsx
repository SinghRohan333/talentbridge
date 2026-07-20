"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRecommendations } from "@/hooks/useRecommendations";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";

export function RecommendationsPreview() {
  const { data, isPending } = useRecommendations();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-line" />
        ))}
      </div>
    );
  }

  if (!data || data.recommendations.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
          <Sparkles className="h-4 w-4 text-signal" /> Recommended for you
        </h2>
        <Link
          href="/recommendations"
          className="inline-flex items-center gap-1 text-sm font-medium text-signal hover:text-signal-dark"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {data.recommendations.slice(0, 3).map((item) => (
          <RecommendationCard key={item.job._id} item={item} />
        ))}
      </div>
    </section>
  );
}
