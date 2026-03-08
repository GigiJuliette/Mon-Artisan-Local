import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string(),
});

export type LoginValues = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.email("Email invalide"),
  password: z.string(),
});

export type RegisterValues = z.infer<typeof registerFormSchema>;
