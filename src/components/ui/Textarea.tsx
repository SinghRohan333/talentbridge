import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex w-full flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20",
            error && "border-red-400 focus:border-red-400 focus:ring-red-100",
            className,
          )}
          {...props}
        />
        {hint && !error && <span className="text-xs text-slate">{hint}</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
