import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/auth";
import { ErrorHandler } from "@/lib/error";

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AUTH_OPTIONS);
    await client.todo.deleteMany({
      where: { userId: session?.user.id },
    });
    await client.user.delete({ where: { id: session?.user.id } });
    return NextResponse.json({ message: "User deleted succesfully" });
  } catch (error) {
    return ErrorHandler(error);
  }
};
