import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prisma";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.email !== "admin@buket.com") {
      return NextResponse.json(
        { error: "Tidak diizinkan! Anda bukan admin." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const { name, price, category } = await request.json();

    const updateProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name: name,
        price: parseInt(price),
        category: category,
      },
    });

    return NextResponse.json({
      message: "Product berhasil diperbarui",
      product: updateProduct,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Gagal memperbarui product",
        detail: error.message,
      },
      { status: 500 },
    );
  }
}
