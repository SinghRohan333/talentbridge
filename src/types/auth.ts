export type UserRole = "seeker" | "employer" | "admin";

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string | null;
}
