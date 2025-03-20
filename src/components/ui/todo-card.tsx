import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Todo } from "@prisma/client";
import { Button } from "./button";
import { completeTodo, deleteTodo } from "@/actions/todo";
import { toast } from "sonner";
import { mutate } from "swr";

export default function TodoCard({ todo }: { todo: Todo }) {
  const handleDelete = async () => {
    const response = await deleteTodo(todo.id);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    if (response.data) {
      toast.success(response.data);
      mutate("/api/todo");
    }
  };

  const handleUpdate = async () => {
    const response = await completeTodo(todo.id);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    if (response.data) {
      toast.success(response.data);
      mutate("/api/todo");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        {!todo.completed ? (
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleUpdate}
          >
            Mark as completed
          </Button>
        ) : (
          <Button variant="outline" className="outline-purple-600">Completed</Button>
        )}
      </CardFooter>
    </Card>
  );
}
