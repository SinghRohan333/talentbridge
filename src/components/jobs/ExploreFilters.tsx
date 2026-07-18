"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJobFilterOptions } from "@/hooks/useJobFilterOptions";
import { useDebounce } from "@/hooks/useDebounce";

const jobTypeOptions = [
  { value: "", label: "All types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const locationTypeOptions = [
  { value: "", label: "All work settings" },
  { value: "on-site", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "salary_high", label: "Salary: High to low" },
  { value: "salary_low", label: "Salary: Low to high" },
];

const selectClass =
  "min-h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink focus:border-signal focus:outline-none";

export function ExploreFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: filterOptions } = useJobFilterOptions();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );
  const debouncedSearch = useDebounce(searchInput, 400);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get("search") ?? "")) {
      updateParam("search", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const filterKeys = [
    "category",
    "type",
    "locationType",
    "location",
    "minSalary",
    "maxSalary",
  ];
  const activeFilterCount = filterKeys.filter((k) =>
    searchParams.get(k),
  ).length;

  const clearAll = () => {
    setSearchInput("");
    router.push(pathname);
  };

  return (
    <div className="mb-8 rounded-2xl border border-line bg-white/60 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search job titles, skills, companies…"
            className="min-h-11 w-full rounded-lg border border-line bg-paper py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsPanelOpen((v) => !v)}
          className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line px-4 text-sm font-medium text-ink sm:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        <select
          value={searchParams.get("sort") ?? "newest"}
          onChange={(e) => updateParam("sort", e.target.value)}
          className={cn(selectClass, "sm:w-52")}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={cn(
          "grid-cols-1 gap-3 sm:mt-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
          isPanelOpen ? "mt-4 grid" : "hidden sm:grid",
        )}
      >
        <select
          value={searchParams.get("category") ?? ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className={selectClass}
        >
          <option value="">All categories</option>
          {filterOptions?.categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("type") ?? ""}
          onChange={(e) => updateParam("type", e.target.value)}
          className={selectClass}
        >
          {jobTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("locationType") ?? ""}
          onChange={(e) => updateParam("locationType", e.target.value)}
          className={selectClass}
        >
          {locationTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("location") ?? ""}
          onChange={(e) => updateParam("location", e.target.value)}
          className={selectClass}
        >
          <option value="">All places</option>
          {filterOptions?.locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min salary"
            value={searchParams.get("minSalary") ?? ""}
            onChange={(e) => updateParam("minSalary", e.target.value)}
            className="min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none"
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max salary"
            value={searchParams.get("maxSalary") ?? ""}
            onChange={(e) => updateParam("maxSalary", e.target.value)}
            className="min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none"
          />
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-signal hover:text-signal-dark"
        >
          <X className="h-3 w-3" /> Clear all filters
        </button>
      )}
    </div>
  );
}
