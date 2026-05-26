"use client";

import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function FloatingActions() {
  const pathName = usePathname();
  if (pathName.endsWith("/login")) {
    return null;
  }
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/+6285188083810", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsApp}
        className="group relative w-14 h-14 bg-linear-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Ping Animation */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
        <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse"></span>

        <MessageCircle className="w-6 h-6 text-white relative z-10" />

        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl">
            Chat via WhatsApp
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="group relative w-14 h-14 bg-linear-to-br from-rose-500 to-pink-600 rounded-full shadow-2xl flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <ArrowUp className="w-6 h-6 text-white relative z-10" />

            <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl">
                Kembali ke Atas
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
