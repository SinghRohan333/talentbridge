"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AdminStats } from "@/types/admin";

function formatDateLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function AdminCharts({ data }: { data: AdminStats }) {
  const userGrowthData = data.userGrowth.map((p) => ({
    date: formatDateLabel(p.date),
    users: p.count,
  }));
  const jobsData = data.jobsOverTime.map((p) => ({
    date: formatDateLabel(p.date),
    jobs: p.count,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-line bg-white/60 p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">
          User growth
        </h2>
        {userGrowthData.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate">No data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={userGrowthData}>
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
                dataKey="users"
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
          Jobs posted
        </h2>
        {jobsData.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate">No data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={jobsData}>
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
                dataKey="jobs"
                stroke="#ff8a3d"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
