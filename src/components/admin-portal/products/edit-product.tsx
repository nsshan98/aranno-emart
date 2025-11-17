"use client";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";

import { Upload, ArrowLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Products,
  productsSchema,
  ProductsSchemaType,
} from "@/zod/product-schema";
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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Alert, AlertTitle } from "@/components/atoms/alert";

const EditProductComponent = ({ product }: { product: Products }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const productCreateForm = useForm<ProductsSchemaType>({
    values: {
      name: "",
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
  const productName = productCreateForm.watch("name");
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
      formData.append("product_image", data.product_image);
    }
    formData.append("name", data.name);
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileUpload(file as File);
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      // store file in react-hook-form
      productCreateForm.setValue("product_image", file);

      // preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    productCreateForm.setValue("product_image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <div className="flex items-center text-2xl gap-2 pb-4">
        <ArrowLeft
          onClick={() => router.push("/admin-portal/products/")}
          className="cursor-pointer"
        />
        <h1>Edit Product</h1>
      </div>
      <Form {...productCreateForm}>
        <form onSubmit={productCreateForm.handleSubmit(onSubmit)}>
          <div className="rounded-lg border p-6 shadow-sm">
            {/* === Product Image & Basic Info === */}
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
              {/* Left: Product Image */}
              <div>
                <h2 className="mb-4 text-lg font-medium">Product Image</h2>

                <div
                  className={cn(
                    "flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-2 text-center transition-colors cursor-pointer",
                    "bg-muted/40 border-muted-foreground/30 hover:border-muted-foreground/50",
                    isDragging && "border-primary bg-primary/10"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative h-full w-full flex items-center justify-center">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="h-full w-auto rounded-md object-contain"
                      />

                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                        className="absolute top-0 right-0 rounded-full bg-black/70 p-1 text-white shadow"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-primary">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG, JPEG (max 2MB)
                      </p>
                    </>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {productCreateForm.formState.errors.product_image && (
                  <Alert
                    variant={"destructive"}
                    className="border-none p-0 mt-2"
                  >
                    <AlertTitle>
                      {productCreateForm.formState.errors.product_image.message}
                    </AlertTitle>
                  </Alert>
                )}
              </div>

              {/* Right: Basic Info */}
              <div>
                <h2 className="mb-6 text-lg font-medium">Basic Info</h2>

                <div className="grid gap-6">
                  {/* Product Name, Category, Brand */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={productCreateForm.control}
                      name="name"
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
                      name="name"
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
              <h2 className="mb-6 text-lg font-medium">Pricing</h2>

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
                Edit Product
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProductComponent;
