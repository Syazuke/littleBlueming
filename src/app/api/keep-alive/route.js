import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`Select 1`;
    return NextResponse.json(
      {
        sucess: true,
        message: "Database status: Awake",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Kep-alive error", error);
    return NextResponse(
      {
        sucess: false,
        message: "Gagal membangunkan databse",
      },
      { status: 500 },
    );
  }
}
