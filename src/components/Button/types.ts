import type { ReactNode } from "react";

export interface ButtonTypes {
  variant: string | "ghost" | "primary" | "secondary";
  className?: string | undefined;
  type: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
}
