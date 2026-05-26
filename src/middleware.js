import withAuth from "next-auth/middleware";

// Mengekspor fungsi secara eksplisit agar Next.js 16 tidak error
export default withAuth;

export const config = {
  // Masukkan halaman admin Little Blueming yang ingin dikunci
  matcher: ["/product/:path*", "/upload/:path*", "/dashboard/:path*"],
};
