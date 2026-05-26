export { default } from "next-auth/middleware";

export const config = {
  // Masukkan semua rute yang ingin kamu kunci di sini
  matcher: [
    "/dashboard/:path*", // Mengunci halaman dashboard dan semua sub-halamannya
    // "/admin/:path*",  <-- kamu bisa tambah rute lain di sini nanti jika ada
  ],
};
