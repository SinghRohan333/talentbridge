import type { Metadata } from "next";
import { CompanyProfilePageContent } from "@/components/profile/CompanyProfilePageContent";

export const metadata: Metadata = {
  title: "Company Profile — TalentBridge",
  description: "Manage your company profile on TalentBridge.",
};

export default function CompanyProfilePage() {
  return <CompanyProfilePageContent />;
}
