"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { products } from "@/lib/test-data";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/atoms/button";
import { useState } from "react";
import { Products } from "@/zod/product-schema";
import ProductDeleteComponent from "./delete-product";

const ProductsTableComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState<{
    product_id: string | null;
    openState: "delete" | null;
  }>({ product_id: "", openState: null });
  const [openModal, setOpenModal] = useState(false);

  const handleOpenDeleteProductModal = (product: Products) => {
    setSelectedProduct({ product_id: product.id, openState: "delete" });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct({ product_id: null, openState: null });
    setOpenModal(false);
  };

  return (
    <Table className="mt-3 border-1 border-orange-400">
      <TableHeader>
        <TableRow className="bg-amber-200 text-sm font-medium">
          <TableHead className="font-semibold">S.L.</TableHead>
          <TableHead className="font-semibold">Product</TableHead>
          <TableHead className="font-semibold">Stock</TableHead>
          <TableHead className="font-semibold">Cost Price</TableHead>
          <TableHead className="font-semibold">Sell Price</TableHead>
          <TableHead className="font-semibold">Discounted Price</TableHead>
          <TableHead className="font-semibold">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Image
                  src={"https://picsum.photos/200"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="font-semibold">{product.name}</p>
              </div>
            </TableCell>
            <TableCell>{product.stock_quantity}</TableCell>
            <TableCell>৳{product.cost_price}</TableCell>
            <TableCell>৳{product.sell_price}</TableCell>
            <TableCell>৳{product.discounted_sell_price}</TableCell>
            <TableCell>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" aria-label="Open menu" size="icon">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <SquarePen className="text-inherit" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleOpenDeleteProductModal(product);
                        setOpenModal(true);
                      }}
                    >
                      <Trash2 className="text-red-600" />
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}

        {selectedProduct && selectedProduct.openState == "delete" && (
          <ProductDeleteComponent open={openModal} onClose={handleCloseModal} />
        )}
      </TableBody>
    </Table>
  );
};

export default ProductsTableComponent;
