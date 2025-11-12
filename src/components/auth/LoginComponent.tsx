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
import { loginSchema, LoginSchemaType } from "@/zod/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { doUserSignIn } from "@/action/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../atoms/spinner";
import Image from "next/image";

const LoginComponent = () => {
  const router = useRouter();
  const loginForm = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await doUserSignIn(formData);
      if (!response?.error) {
        router.push("/dashboard");
        toast("Login Successful");
      }
    } catch (error) {
      if (error) {
        toast("Login Failed. Please check your credentials and try again.");
      }
    }
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
        <p className="text-center text-4xl sm:text-5xl">
          Login to your account
        </p>
        <div>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={loginForm.control}
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
                control={loginForm.control}
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
              {loginForm.formState.isSubmitting ? (
                <Button
                  type="submit"
                  variant={"default"}
                  disabled={loginForm.formState.isSubmitting}
                >
                  Authenticating <Spinner />
                </Button>
              ) : (
                <Button type="submit" variant={"default"}>
                  Submit
                </Button>
              )}
            </form>
          </Form>
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <Button
              type="button"
              disabled={loginForm.formState.isSubmitting}
              variant="link"
              onClick={() => router.push("/auth/signup")}
              className="text-emerald-400 hover:text-emerald-300 p-0 text-md cursor-pointer"
            >
              Register
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
