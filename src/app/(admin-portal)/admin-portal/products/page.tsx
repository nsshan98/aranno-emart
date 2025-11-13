import { Button } from "@/components/atoms/button";
import { Plus } from "lucide-react";
import React from "react";

const ProductPage = () => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-4xl py-2">Products</p>
      <Button
        variant="default"
        startIcon={<Plus />}
        className="cursor-pointer"
        href="/admin-portal/products/add-product"
      >
        Add Product
      </Button>
    </div>
  );
};

export default ProductPage;
