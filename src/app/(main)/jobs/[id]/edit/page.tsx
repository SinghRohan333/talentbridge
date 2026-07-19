import type { Metadata } from "next";
import { EditJobPageContent } from "@/components/jobs/EditJobPageContent";

export const metadata: Metadata = {
  title: "Edit Job — TalentBridge",
  description: "Edit your job posting on TalentBridge.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params;
  return <EditJobPageContent jobId={id} />;
}
