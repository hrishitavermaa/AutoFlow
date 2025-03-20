"use client";
import { Todo } from "@prisma/client";
import useSWR from "swr";
import TodoCard from "./todo-card";
import { fetcher } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TodoList() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<{ message: string; data: Todo[] }>("/api/todo", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching todos</p>;
  if (!todos || !todos.data || todos.data.length === 0)
    return <p>No todos found.</p>;

  const allTodos = todos.data;
  const pendingTodos = allTodos.filter((todo) => !todo.completed);
  const completedTodos = allTodos.filter((todo) => todo.completed);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl">All Todos</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {allTodos.length > 0 ? (
            <section className="grid grid-cols-3 gap-5">
              {allTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </section>
          ) : (
            <p>No todos found.</p>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {pendingTodos.length > 0 ? (
            <section className="grid grid-cols-3 gap-5">
              {pendingTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </section>
          ) : (
            <p>No pending todos.</p>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedTodos.length > 0 ? (
            <section className="grid grid-cols-3 gap-5">
              {completedTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </section>
          ) : (
            <p>No completed todos.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
