"use client";

import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { EmployerDashboardData } from "@/types/employer-dashboard";

const statusColors: Record<string, string> = {
  pending: "#f59e0b",
  reviewed: "#3b82f6",
  shortlisted: "#a855f7",
  accepted: "#22c55e",
  rejected: "#ef4444",
};

function formatDateLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function EmployerCharts({ data }: { data: EmployerDashboardData }) {
  const applicationsChartData = data.applicationsOverTime.map((point) => ({
    date: formatDateLabel(point.date),
    applications: point.count,
  }));
  const statusChartData = data.statusBreakdown.map((s) => ({
    status: s.status,
    count: s.count,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-line bg-white/60 p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">
          Applications over time
        </h2>
        {applicationsChartData.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate">
            No application data yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={applicationsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e2dc" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#e4e2dc",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#3346ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">
          Applicants by status
        </h2>
        {statusChartData.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate">
            No applicants yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e2dc" />
              <XAxis
                dataKey="status"
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#e4e2dc",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {statusChartData.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={statusColors[entry.status] ?? "#6b7280"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
