import type { Metadata } from "next";
import { PostJobPageContent } from "@/components/jobs/PostJobPageContent";

export const metadata: Metadata = {
  title: "Post a Job — TalentBridge",
  description: "Create a new job posting on TalentBridge.",
};

export default function PostJobPage() {
  return <PostJobPageContent />;
}
