import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/libs/authOptions";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error detail di api product", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dari database", detail: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.email !== "admin@buket.com") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const file = formData.get("image");
    const category = formData.get("category");

    if (!name || !price || !file) {
      return NextResponse.json(
        { error: "Data atau gambar tidak lengkap!" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "littleblueming_products",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(buffer);
    });

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: parseInt(price),
        image: uploadResult.secure_url,
        category: category,
      },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambah produk", detail: error.message },
      { status: 500 },
    );
  }
}
