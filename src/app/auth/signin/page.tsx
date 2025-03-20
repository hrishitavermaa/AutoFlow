"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { UserAuthType, UserAuthValidator } from "@/lib/types";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserAuthType>({
    resolver: zodResolver(UserAuthValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: UserAuthType) {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Signed in successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="font-semibold">
            <h1 className="text-4xl">
              SignIn to Auto<span className="text-purple-600">Flow</span>
            </h1>
            <p className="text-neutral-500">
              Join our community now and automate your tasks!
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-purple-600 font-semibold text-white"
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="w-full text-center">
        Don&apos;t have an accountt?{" "}
        <Link href="/auth/signup" className="text-blue-500 font-semibold">
          Signup
        </Link>
      </div>
    </div>
  );
}
