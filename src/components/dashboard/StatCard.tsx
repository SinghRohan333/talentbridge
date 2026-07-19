import { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/60 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal/10">
        <Icon className="h-5 w-5 text-signal" />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold text-ink">{value}</p>
        <p className="text-xs text-slate">{label}</p>
      </div>
    </div>
  );
}
