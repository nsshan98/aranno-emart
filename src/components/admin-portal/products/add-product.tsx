"use client";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";

import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { productsSchema, ProductsSchemaType } from "@/zod/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { MultiSelect } from "@/components/molecules/multi-select";
import { Textarea } from "@/components/atoms/textarea";

const AddProductComponent = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const productCreateForm = useForm<ProductsSchemaType>({
    defaultValues: {
      product_name: "",
      product_image: "",
      weight: "",
      slug: "",
      description: "",
      cost_price: 0,
      sell_price: 0,
      discounted_sell_price: 0,
    },
    resolver: zodResolver(productsSchema),
  });
  const productName = productCreateForm.watch("product_name");
  const productSlug = productCreateForm.watch("slug");

  useEffect(() => {
    if (productName) {
      const slug = productName.toLowerCase().replace(/\s+/g, "-");
      productCreateForm.setValue("slug", slug);
    }
  }, [productName]);

  const getFormData = (data: ProductsSchemaType) => {
    const formData = new FormData();
    if (data.product_image) {
      formData.append(".product_image", data.product_image);
    }
    formData.append("product_name", data.product_name);
    formData.append("weight", data.weight);
    formData.append("slug", data.slug);
    formData.append("description", data.description || "");
    formData.append("description", data.description || "");
    formData.append("description", data.description || "");
    formData.append("cost_price", Number(data.cost_price ?? 0).toString());
    formData.append("sell_price", Number(data.sell_price ?? 0).toString());
    formData.append(
      "discounted_sell_price",
      Number(data.discounted_sell_price ?? 0).toString()
    );

    return formData;
  };

  const onSubmit = async (data: ProductsSchemaType) => {
    const formData = getFormData(data);

    // await employeeCreateMutation.mutateAsync(formData, {
    //   onSuccess: () => {
    //     toast("Employee Created Successfully");
    //   },
    //   onError: (error: Error) => {
    //     if (isAxiosError(error)) {
    //       console.log(error);
    //     }
    //   },
    // });
    console.log(data);
  };

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //   };

  //   const handleCategoryChange = (value) => {
  //     setFormData(prev => ({ ...prev, category: value }));
  //   };

  //   const handleBrandChange = (value) => {
  //     setFormData(prev => ({ ...prev, brand: value }));
  //   };

  //   const handleStatusChange = (checked) => {
  //     setFormData(prev => ({ ...prev, status: checked }));
  //   };

  //   const handleDragOver = (e) => {
  //     e.preventDefault();
  //     setIsDragging(true);
  //   };

  //   const handleDragLeave = (e) => {
  //     e.preventDefault();
  //     setIsDragging(false);
  //   };

  //   const handleDrop = (e) => {
  //     e.preventDefault();
  //     setIsDragging(false);
  //     const file = e.dataTransfer.files[0];
  //     handleFileUpload(file);
  //   };

  //   const handleFileSelect = (e) => {
  //     const file = e.target.files[0];
  //     handleFileUpload(file);
  //   };

  //   const handleFileUpload = (file) => {
  //     if (file && file.type.startsWith('image/')) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImagePreview(reader.result);
  //         setFormData(prev => ({ ...prev, image_url: reader.result }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  //   const removeImage = () => {
  //     setImagePreview(null);
  //     setFormData(prev => ({ ...prev, image_url: "" }));
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = "";
  //     }
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (onSubmit) {
  //       onSubmit(formData);
  //     }
  //   };

  return (
    <Form {...productCreateForm}>
      <form onSubmit={productCreateForm.handleSubmit(onSubmit)}>
        <div className="rounded-lg border p-6 shadow-sm">
          {/* === Product Image & Basic Info === */}
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            {/* Left: Product Image */}
            <div>
              <h2 className="mb-4 text-sm font-medium text-gray-900">
                Product Image
              </h2>
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-gray-400">
                <Upload className="mb-4 h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-red-500">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
            </div>

            {/* Right: Basic Info */}
            <div>
              <h2 className="mb-6 text-sm font-medium text-gray-900">
                Basic Info
              </h2>

              <div className="grid gap-6">
                {/* Product Name, Category, Brand */}
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={productCreateForm.control}
                    name="product_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-amber-50 border-amber-950"
                            placeholder="Product Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={productCreateForm.control}
                    name="product_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <FormControl>
                          <MultiSelect />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={productCreateForm.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Weight</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-amber-50 border-amber-950"
                            placeholder="Product Weight"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={productCreateForm.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Slug</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-amber-50 border-amber-950"
                            placeholder="Product Slug"
                            type="text"
                            value={productSlug || ""}
                            onChange={(e) => {
                              productCreateForm.setValue(
                                "slug",
                                e.target.value
                              );
                            }}
                            // {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={productCreateForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="bg-amber-50 border-amber-950"
                          placeholder="Product Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* === Pricing Section === */}
          <div className="mt-8 border-t pt-8">
            <h2 className="mb-6 text-sm font-medium text-gray-900">Pricing</h2>

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={productCreateForm.control}
                name="cost_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Price</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-amber-50 border-amber-950"
                        placeholder="Cost Price"
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min={0}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productCreateForm.control}
                name="sell_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sell Price</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-amber-50 border-amber-950"
                        placeholder="Sell Price"
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min={0}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productCreateForm.control}
                name="discounted_sell_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Sell Price</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-amber-50 border-amber-950"
                        placeholder="Discounted Sell Price"
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min={0}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* === Submit Button === */}
          <div className="mt-8 flex justify-end gap-3">
            <Button size="lg" className="px-8">
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddProductComponent;
