import { z } from "zod";

export const ReviewValidationSchema = z.object({
  category: z.string().optional(),
  courseprice: z.string().optional(),
  courseprovider: z.string().optional(),
});

export type ReviewType = z.infer<typeof ReviewValidationSchema>;
