import type { Metadata } from "next";
import { DashboardPageContent } from "@/components/dashboard/DashboardPageContent";

export const metadata: Metadata = {
  title: "Dashboard — TalentBridge",
  description: "Your job search activity at a glance.",
};

export default function DashboardPage() {
  return <DashboardPageContent />;
}
