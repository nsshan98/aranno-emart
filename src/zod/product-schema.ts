import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024;

export const productsSchema = z.object({
  name: z.string(),
  product_image: z
    .union([
      z.string().optional(),
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpg", "image/jpeg", "image/png", "image/heic"].includes(
              file.type
            ),
          { message: "Invalid image file type." }
        )
        .refine((file) => file.size <= fileSizeLimit, {
          message: "File size should not exceed 5MB",
        }),
    ])
    .optional(),
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
