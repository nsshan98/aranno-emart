import { categories } from "@/lib/test-data";
import React from "react";
import { Card, CardContent } from "../atoms/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/atoms/carousel";
import { ArrowRight, Package } from "lucide-react";
import Image from "next/image";

const CategoriesSection = () => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mx-auto"
      >
        <section id="categories" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Category</h2>
            </div>

            {categories.length > 0 ? (
              <div className="relative">
                <CarouselContent>
                  {categories.map((category) => (
                    <CarouselItem
                      key={category.id}
                      className="md:basis-1/2 lg:basis-1/5"
                    >
                      <div className="p-1">
                        <Card>
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden h-48">
                              <Image
                                src={"https://picsum.photos/200"}
                                alt={category.name}
                                // fill
                                width={200}
                                height={200}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-center">
                                {category.name}
                              </h3>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end mt-4">
                  <button className="transition flex items-center gap-2">
                    View All
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute -top-14 right-10">
                  <CarouselPrevious className="text-amber-950" />
                  <CarouselNext className="text-amber-950" />
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4" />
                <p className="text-gray-500">No categories available yet</p>
              </div>
            )}
          </div>
        </section>
      </Carousel>
    </div>
  );
};

export default CategoriesSection;
