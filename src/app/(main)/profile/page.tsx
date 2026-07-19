import type { Metadata } from "next";
import { ProfilePageContent } from "@/components/profile/ProfilePageContent";

export const metadata: Metadata = {
  title: "Your Profile — TalentBridge",
  description: "Manage your TalentBridge profile.",
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
