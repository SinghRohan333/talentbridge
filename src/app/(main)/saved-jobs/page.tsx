import type { Metadata } from "next";
import { SavedJobsPageContent } from "@/components/jobs/SavedJobsPageContent";

export const metadata: Metadata = {
  title: "Saved Jobs — TalentBridge",
  description: "Jobs you've saved on TalentBridge.",
};

export default function SavedJobsPage() {
  return <SavedJobsPageContent />;
}
