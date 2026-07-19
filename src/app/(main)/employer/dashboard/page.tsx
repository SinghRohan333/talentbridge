import type { Metadata } from "next";
import { EmployerDashboardPageContent } from "@/components/dashboard/EmployerDashboardPageContent";

export const metadata: Metadata = {
  title: "Employer Dashboard — TalentBridge",
  description: "Track your job postings and applicant activity.",
};

export default function EmployerDashboardPage() {
  return <EmployerDashboardPageContent />;
}
