import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import client from "@/config/db";
import { CustomError, ErrorHandler } from "@/lib/error";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    const exist = await client.user.findUnique({
      where: { email: payload.email },
    });
    if (exist) {
      throw new CustomError("User already exists", 400);
    }
    payload.password = bcrypt.hashSync(
      payload.password,
      Number(process.env.SALT_ROUNDS) || 10
    );
    const response = await client.user.create({ data: payload });
    return NextResponse.json(
      { message: "User created successfully", data: response },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorHandler(error);
  }
};