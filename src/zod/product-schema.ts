import { z } from "zod";

export const productsSchema = z.object({
  name: z.string(),
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
  id: string;
  name: string;
  // product_image: string;
  weight: string;
  slug: string;
  description?: string;
  discount?: number;
  stock_quantity: number;
  is_active: boolean;
  cost_price?: number;
  sell_price?: number;
  discounted_sell_price?: number;
  created_at: string;
  updated_at: string;
};
