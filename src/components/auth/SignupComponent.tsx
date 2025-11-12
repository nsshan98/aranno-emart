"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";
import { useForm } from "react-hook-form";
import { signupSchema, SignupSchemaType } from "@/zod/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../atoms/spinner";
import { useCreateUser } from "@/hooks/reactQuery/authQuery";
import { isAxiosError } from "axios";
import Image from "next/image";

const SignupComponent = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { createUserMutation } = useCreateUser();
  const signupForm = useForm<SignupSchemaType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchemaType) => {
    await createUserMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("User created successfully!");
        router.push("/dashboard");
        // You can redirect the user or show a success message here
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ||
              "Error creating user. Please try again."
          );
        }
      },
    });
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section - Welcome/Hero */}
      <div className="relative w-full lg:w-1/2 bg-[#454F5F] flex items-center justify-center p-8 lg:p-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8AB83] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C8AB83] rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg text-white">
          {/* Logo/Brand */}

          {/* Heading */}
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-6 leading-tight">
            Welcome to Aranno E-mart
          </h1>

          {/* Subheading */}
          <p className="text-base lg:text-lg text-white/90 lg:mb-12 leading-relaxed">
            Shop all types of groceries, food items, kitchen accessories,
            everything under one roof and make big savings on each item
          </p>

          {/* Illustration */}
          <div className="relative hidden lg:block">
            <div className="bg-white rounded-[100px] p-8 lg:p-12">
              <Image
                src="https://plus.unsplash.com/premium_vector-1682305842206-a24d1f9acf74?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000"
                alt="People shopping"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto my-auto flex flex-col gap-10 justify-center">
        <p className="text-center text-4xl sm:text-5xl">Create an account</p>
        <div>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={signupForm.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        endIcon={
                          showPassword ? (
                            <GoEyeClosed
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          ) : (
                            <GoEye
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          )
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {signupForm.formState.isSubmitting ? (
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={signupForm.formState.isSubmitting}
                >
                  Creating Account <Spinner />
                </Button>
              ) : (
                <Button type="submit" variant={"default"}>
                  Signup
                </Button>
              )}
            </form>
          </Form>
          <p className="mt-4">
            Already have an account?{" "}
            <Button
              type="button"
              disabled={signupForm.formState.isSubmitting}
              variant="link"
              onClick={() => router.push("/auth/login")}
              className="text-emerald-400 hover:text-emerald-300 p-0 text-md cursor-pointer"
            >
              Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
