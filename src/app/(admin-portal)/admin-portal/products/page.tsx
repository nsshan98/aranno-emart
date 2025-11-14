import ProductsTableComponent from "@/components/admin-portal/products/products-table";
import { Button } from "@/components/atoms/button";
import { Plus } from "lucide-react";
import React from "react";

const ProductPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-4xl">Products</p>
        <Button
          variant="default"
          startIcon={<Plus />}
          className="cursor-pointer"
          href="/admin-portal/products/add-product"
        >
          Add Product
        </Button>
      </div>
      <ProductsTableComponent />
    </div>
  );
};

export default ProductPage;
