"use client";

import {
  GraduationCap,
  Cake,
  Heart,
  Banknote,
  Gift,
  Cookie,
  Flower,
  Flower2,
  DollarSign,
} from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    icon: Flower,
    name: "Satin",
    linear: "from-blue-400 to-indigo-500",
    bglinear: "from-blue-50 to-indigo-50",
  },
  {
    icon: Flower2,
    name: "Artificial",
    linear: "from-pink-400 to-rose-500",
    bglinear: "from-pink-50 to-rose-50",
  },
  {
    icon: Cookie,
    name: "Makanan",
    linear: "from-red-400 to-pink-500",
    bglinear: "from-red-50 to-pink-50",
  },
  {
    icon: DollarSign,
    name: "Buket Uang",
    linear: "from-emerald-400 to-teal-500",
    bglinear: "from-emerald-50 to-teal-50",
  },
];

export function CategorySection() {
  return (
    <section className="py-20 relative overflow-hidden" id="katalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-sky-100 to-blue-100 text-secondary rounded-full mb-4">
            <span className="text-sm">Jelajahi Koleksi</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-3 font-serif">
            Kategori Produk
          </h2>
          <p className="text-gray-600 text-lg">
            Temukan buket sempurna untuk setiap momen spesialmu
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.08,
                  y: -12,
                  rotateY: 8,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="group relative flex flex-col items-center p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.bglinear} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className="relative mb-4">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${category.linear} blur-xl opacity-30 group-hover:opacity-60 transition-opacity`}
                  ></div>
                  <div
                    className={`relative w-20 h-20 rounded-2xl bg-linear-to-br ${category.linear} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                <span className="relative text-gray-800 text-center group-hover:text-gray-900 transition-colors">
                  {category.name}
                </span>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-linear-to-br from-rose-200 to-pink-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-2xl"></div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
