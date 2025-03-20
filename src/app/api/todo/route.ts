import { ErrorHandler } from "@/lib/error";
import client from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/auth";

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();
    const session = await getServerSession(AUTH_OPTIONS);
    const response = await client.todo.create({
      data: { ...payload, userId: session?.user.id },
    });
    return NextResponse.json(
      { message: "Todo created successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ErrorHandler(error);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AUTH_OPTIONS);
    const response = await client.todo.findMany({
      where: { userId: session?.user.id },
    });
    return NextResponse.json(
      { messge: "Todos fetched successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    return ErrorHandler(error);
  }
};