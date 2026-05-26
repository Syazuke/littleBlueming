import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/moleculs/Navbar";
import { Footer } from "./components/moleculs/Footer";
import { FloatingActions } from "./components/moleculs/FloatingActions";

// 1. Import AuthProvider yang sudah kamu buat
import AuthProvider from "./components/moleculs/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bonus: Menyesuaikan judul website Little Blueming kamu
export const metadata = {
  title: "Little Blueming",
  description: "The Perfect Gift",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. Bungkus semua komponen UI dengan AuthProvider */}
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingActions />
        </AuthProvider>
      </body>
    </html>
  );
}
