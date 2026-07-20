"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import {
  useRecommendations,
  useRefreshRecommendations,
} from "@/hooks/useRecommendations";
import { getErrorMessage } from "@/lib/utils";
import { RecommendationCard } from "./RecommendationCard";
import { Button } from "@/components/ui/Button";

export function RecommendationsGrid() {
  const { data, isPending, isError } = useRecommendations();
  const refresh = useRefreshRecommendations();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refresh();
      toast.success("Recommendations refreshed");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not refresh recommendations"));
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-line" />
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <p className="py-16 text-center text-sm text-slate">
        Couldn&apos;t load recommendations right now.
      </p>
    );

  if (data.recommendations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white/50 px-6 py-16 text-center">
        <p className="text-slate">
          No recommendations yet — check back once more jobs are posted.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-end">
        <Button
          variant="outline"
          className="h-9 px-3 text-xs"
          isLoading={isRefreshing}
          onClick={handleRefresh}
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.recommendations.map((item) => (
          <RecommendationCard key={item.job._id} item={item} />
        ))}
      </div>
    </div>
  );
}
