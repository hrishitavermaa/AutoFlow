"use client";

import TodoList from "@/components/ui/todo-list";
import TodoUpload from "@/components/ui/todo-upload";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="space-y-8">
      <h1 className="text-2xl">Welcome, {session?.user.name}...</h1>
      <TodoUpload />
      <TodoList />
    </div>
  );
}
