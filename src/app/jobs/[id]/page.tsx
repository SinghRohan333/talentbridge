import type { Metadata } from "next";
import { JobDetailsView } from "@/components/jobs/JobDetailsView";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

async function fetchJobForMetadata(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.job as {
      title: string;
      company: { name: string };
      shortDescription: string;
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchJobForMetadata(id);
  if (!job) return { title: "Job not found — TalentBridge" };
  return {
    title: `${job.title} at ${job.company.name} — TalentBridge`,
    description: job.shortDescription,
  };
}

export default async function JobDetailsPage({ params }: JobPageProps) {
  const { id } = await params;
  return <JobDetailsView jobId={id} />;
}
