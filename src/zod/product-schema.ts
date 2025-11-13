import { z } from "zod";

export const productsSchema = z.object({
  product_name: z.string(),
  product_image: z.string(),
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;

export type Products = {
  product_name: string;
  product_image: string;
};
