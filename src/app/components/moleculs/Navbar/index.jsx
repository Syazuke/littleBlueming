"use client";

import logo from "@/app/assets/logo.jpeg";
import { quickLinks } from "@/app/libs/footers";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathName = usePathname();
  if (pathName.endsWith("/login")) {
    return null;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayedLinks =
    pathName === "/"
      ? quickLinks
      : quickLinks.filter((item) =>
          ["Home", "Product", "Tentang Kami"].includes(item.label),
        );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-500/5"
          : "bg-white/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl nmx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0 group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-700 blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Image
                  src={logo}
                  alt="logo"
                  className="w-10 h-10 relative rounded-full"
                />
              </div>
              <h1 className="text-2xl font-serif bg-linear-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Little Blueming
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {displayedLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="relative px-4 py-2 text-gray-700 hover:text-secondary transition-colors group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-sky-50 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sky-100">
            <div className="flex flex-col space-y-2">
              {displayedLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="text-gray-700 hover:text-secondary hover:bg-sky-50 px-4 py-3 rounded-xl transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
