"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemData {
  question: string;
  answer: string;
}

export function Accordion({
  items,
  defaultOpenIndex = null,
}: {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white/60">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="text-sm font-medium text-ink sm:text-base">
              {item.question}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-slate transition-transform",
                openIndex === i && "rotate-180",
              )}
            />
          </button>
          {openIndex === i && (
            <p className="px-5 pb-4 text-sm leading-relaxed text-slate">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
