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
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import CartSidebar from "./cart-sidebar";
import { ShoppingCart } from "lucide-react";

const ProductsTableComponent = () => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<{
    product_id: string | null;
    openState: "delete" | null;
  }>({ product_id: "", openState: null });
  const [openModal, setOpenModal] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addItem } = useCartStore();

  const handleOpenDeleteProductModal = (product: Products) => {
    setSelectedProduct({ product_id: product.id, openState: "delete" });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct({ product_id: null, openState: null });
    setOpenModal(false);
  };

  const totalItems = items.reduce(
    (acc: number, item) => acc + item.quantity,
    0
  );

  return (
    <div className="relative">
      <div
        className={`transition-all duration-300 ease-in-out ${isCartOpen ? "mr-80" : "mr-0"
          }`}
      >
        <Table className="mt-3 border-1 border-gray-300">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-neutral-500 text-sm font-medium">
              <TableHead className="font-semibold">S.L.</TableHead>
              <TableHead className="font-semibold">Product</TableHead>
              <TableHead className="font-semibold">Stock</TableHead>
              <TableHead className="font-semibold">Cost Price</TableHead>
              <TableHead className="font-semibold">Sell Price</TableHead>
              <TableHead className="font-semibold">Discounted Price</TableHead>
              <TableHead className="font-semibold">Cart</TableHead>
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
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => {
                      addItem(product);
                      setIsCartOpen(true);
                    }}
                  >
                    Add to Cart
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        aria-label="Open menu"
                        size="icon"
                      >
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(
                              `/admin-portal/products/edit-product/${product.id}`
                            );
                          }}
                        >
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
              <ProductDeleteComponent
                open={openModal}
                onClose={handleCloseModal}
              />
            )}
          </TableBody>
        </Table>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {!isCartOpen && (
        <Button
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg z-40"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-5 -right-5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </div>
        </Button>
      )}
    </div>
  );
};

export default ProductsTableComponent;
