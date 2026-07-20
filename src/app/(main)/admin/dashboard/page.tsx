import type { Metadata } from "next";
import { AdminDashboardPageContent } from "@/components/admin/AdminDashboardPageContent";

export const metadata: Metadata = {
  title: "Admin Dashboard — TalentBridge",
  description: "Platform metrics and moderation tools.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardPageContent />;
}
