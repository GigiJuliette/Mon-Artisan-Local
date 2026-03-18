export type UserRole = "admin" | "artisan" | null;

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Exclude<UserRole, null>;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
