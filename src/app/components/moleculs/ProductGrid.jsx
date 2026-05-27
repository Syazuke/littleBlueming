"use client";

import {
  Gift,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "../atoms/ProductCard";

export function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section
        id="product"
        className="py-20 bg-linear-to-b from-white to-rose-50/30 relative overflow-hidden"
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-10 w-40 h-40 bg-linear-to-br from-sky-300 to-blue-300 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-56 h-56 bg-linear-to-br from-sky-300 to-blue-300 rounded-full blur-3xl opacity-20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-1 px-4 py-2 bg-linear-to-r from-sky-100 to-blue-100 rounded-full mb-4 shadow-lg">
                <Gift className="w-4 h-4 text-secondary" />
                <span className="text-secondary text-sm font-semibold">
                  Spesial
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl text-gray-800 mb-3 font-serif">
                The Perfect Gift
              </h2>
              <p className="text-gray-600 text-lg max-w-lg">
                Temukan cara terbaik untuk merayakan momen spesialmu bersama
                orang tersayang.
              </p>
            </motion.div>
            {!isLoading && products.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col md:items-end gap-2 z-10"
              >
                <span className="text-sm text-gray-400 italic md:text-right">
                  Geser untuk melihat {products.length} koleksi pilihan...
                </span>
                <Link
                  href="/product"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-sky-200 text-secondary hover:bg-blue-50 rounded-full font-medium transition-all shadow-sm hover:shadow-md active:scale-95 w-fit"
                >
                  Lihat Semuanya <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 w-full">
              <Loader2 className="w-10 h-10 text-secondary animate-spin mb-4" />
              <p className="text-gray-500 font-medium">
                Memuat katalog buket cantikmu...
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-full relative group"
            >
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={24}
                slidesPerView={3}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={{
                  prevEl: ".custom-prev-btn",
                  nextEl: ".custom-next-btn",
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                className=""
              >
                {products.slice(0, 6).map((item) => (
                  <SwiperSlide key={item.id} className="h-fit">
                    <ProductCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="custom-prev-btn absolute -left-4 top-[40%] -translate-y-1/2 z-10 p-3 lg:p-4 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md hover:shadow-xl opacity-0 group-hover:opacity-100 disabled:opacity-0">
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-secondary" />
              </button>
              <button className="custom-next-btn absolute -right-4 top-[40%] -translate-y-1/2 z-10 p-3 lg:p-4 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md hover:shadow-xl opacity-0 group-hover:opacity-100 disabled:opacity-0">
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-secondary" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
