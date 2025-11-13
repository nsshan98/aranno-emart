import { z } from "zod";

export const productsSchema = z.object({
  product_name: z.string(),
  product_image: z.string(),
  weight: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  cost_price: z.number().optional(),
  sell_price: z.number().optional(),
  discounted_sell_price: z.number().optional(),
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;

export type Products = {
  product_name: string;
  product_image: string;
  weight: string;
  slug: string;
  description?: string;
  cost_price?: number;
  sell_price?: number;
  discounted_sell_price?: number;
};
