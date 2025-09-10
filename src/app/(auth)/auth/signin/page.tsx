"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AnimateLoading } from "@/components/ui/animate-loading";

interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);
    try {
      const authenticated = await signIn("credentials", {
        ...val,
        redirect: false,
      });

      // Check if email or password is wrong
      if (authenticated?.error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
        });
        return;
      }

      // Navigate to dashboard
      router.push("/");
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border border-border p-5">
          <div className="mb-2 text-center text-2xl font-semibold">
            Login to your account
          </div>
          <div className="text-sm text-gray-500">
            Enter your email to access dashboard
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <AnimateLoading /> Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-sm">
                Don`t have an account{" "}
                <Link href="/auth/signup" className="text-blue-500">
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
