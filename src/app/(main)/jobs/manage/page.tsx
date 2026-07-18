import type { Metadata } from "next";
import { ManageJobsPageContent } from "@/components/jobs/ManageJobsPageContent";

export const metadata: Metadata = {
  title: "Manage Jobs — TalentBridge",
  description: "View and manage your job postings on TalentBridge.",
};

export default function ManageJobsPage() {
  return <ManageJobsPageContent />;
}
