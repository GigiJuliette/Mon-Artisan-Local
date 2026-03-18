import { z } from "zod";

export const registerFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email("Email invalide"),
  password: z.string(),
});

export type RegisterValues = z.infer<typeof registerFormSchema>;
