import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  shortlisted: "bg-purple-100 text-purple-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabel: Record<string, string> = {
  pending: "Pending",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  accepted: "Accepted",
  rejected: "Rejected",
};

export function ApplicationStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
        statusStyles[status] ?? "bg-slate/10 text-slate",
      )}
    >
      {statusLabel[status] ?? status}
    </span>
  );
}
