import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/moleculs/Navbar";
import { Footer } from "./components/moleculs/Footer";
import { FloatingActions } from "./components/moleculs/FloatingActions";

import AuthProvider from "./components/moleculs/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
