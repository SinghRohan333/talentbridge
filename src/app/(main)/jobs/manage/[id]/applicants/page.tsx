import type { Metadata } from "next";
import { JobApplicantsPageContent } from "@/components/applications/JobApplicantsPageContent";

export const metadata: Metadata = {
  title: "Applicants — TalentBridge",
  description: "Review applicants for your job posting.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobApplicantsPage({ params }: PageProps) {
  const { id } = await params;
  return <JobApplicantsPageContent jobId={id} />;
}
