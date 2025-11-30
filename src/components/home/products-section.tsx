import { products } from "@/lib/test-data";
import React from "react";
import { Card, CardContent } from "../atoms/card";
import { Package } from "lucide-react";
import Image from "next/image";
import ProductDetails from "../admin-portal/products/product-details";

const ProductsSection = () => {
  return (
    <div>
      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg">
              Fresh and organic products delivered to your doorstep
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => {
                return (
                  <Card
                    key={product.id}
                    className="border-none shadow-md hover:shadow-xl transition group relative overflow-hidden rounded-2xl"
                  >
                    <CardContent className="p-0">
                      <div
                        className="relative overflow-hidden flex items-center justify-center"
                        style={{ height: "200px" }}
                      >
                        {product.discount && (
                          <div className="absolute top-0 left-1 px-3 py-1 rounded-lg text-sm font-bold shadow-md bg-amber-200 text-orange-400">
                            {product.discount}% OFF
                          </div>
                        )}
                        <Image
                          src={"https://picsum.photos/200"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain group-hover:scale-110 transition duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm mb-3">
                          {product.weight || "1000gm"}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold">
                              ৳{product.sell_price}
                            </span>
                            {product.discounted_sell_price && (
                              <span className="text-sm line-through ml-2">
                                ৳{product.discounted_sell_price}
                              </span>
                            )}
                          </div>
                          {/* <button className="w-12 h-12 rounded-full bg-[#ff8903] hover:bg-[#ff6900] text-white flex items-center justify-center shadow-lg transition">
                            <span className="text-2xl font-light">+</span>
                          </button> */}
                        </div>
                      </div>
                      <ProductDetails />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products available yet</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsSection;
