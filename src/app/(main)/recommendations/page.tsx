import type { Metadata } from "next";
import { RecommendationsPageContent } from "@/components/recommendations/RecommendationsPageContent";

export const metadata: Metadata = {
  title: "Recommended Jobs — TalentBridge",
  description: "AI-powered job recommendations based on your profile.",
};

export default function RecommendationsPage() {
  return <RecommendationsPageContent />;
}
