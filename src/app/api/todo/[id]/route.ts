import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";
import { CustomError, ErrorHandler } from "@/lib/error";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    if (!id) {
      throw new CustomError("Todo ID not found", 404);
    }

    await client.todo.delete({ where: { id } });

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ErrorHandler(error);
  }
};
