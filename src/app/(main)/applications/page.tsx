import type { Metadata } from "next";
import { ApplicationsPageContent } from "@/components/applications/ApplicationsPageContent";

export const metadata: Metadata = {
  title: "My Applications — TalentBridge",
  description: "Track your job applications on TalentBridge.",
};

export default function ApplicationsPage() {
  return <ApplicationsPageContent />;
}
