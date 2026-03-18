import { z } from "zod";

export const createListingSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(10, "La doit ocntenir au moins 10 characteres"),
  address: z.string().min(3, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  latitude: z.string(),
  longitude: z.string(),
  specialityIds: z.array(z.number()),
});

export type CreateListingValues = z.infer<typeof createListingSchema>;
