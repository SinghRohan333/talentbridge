import type { Metadata } from "next";
import { AdminUsersPageContent } from "@/components/admin/AdminUsersPageContent";

export const metadata: Metadata = {
  title: "User Management — TalentBridge Admin",
  description: "Manage all users on TalentBridge.",
};

export default function AdminUsersPage() {
  return <AdminUsersPageContent />;
}
