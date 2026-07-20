import type { Metadata } from "next";
import { AdminJobsPageContent } from "@/components/admin/AdminJobsPageContent";

export const metadata: Metadata = {
  title: "Job Moderation — TalentBridge Admin",
  description: "Moderate job postings on TalentBridge.",
};

export default function AdminJobsPage() {
  return <AdminJobsPageContent />;
}
