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
import { Axis3D, Eye, EyeOff } from "lucide-react";
import { TodoValidator, TodoValidatorType } from "@/lib/types";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { mutate } from "swr";

export default function TodoUpload() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TodoValidatorType>({
    resolver: zodResolver(TodoValidator),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: TodoValidatorType) {
    try {
      const response = await axios.post("/api/todo", values);
      toast.success(response.data.message);
      form.reset();
      mutate("/api/todo");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h1 className="text-2xl">
            Create a <span className="text-purple-600">Todo</span>
          </h1>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a description" {...field} />
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
  );
}
