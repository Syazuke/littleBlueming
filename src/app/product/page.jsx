"use client";

import { ArrowRight, Gift, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditProductModal from "../components/atoms/EditProductModal";
import ProductCard from "../components/atoms/ProductCard";
const Categoryes = ["Semua", "Artificial", "Satin", "Makanan", "Uang"];

export default function ProductGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "admin@buket.com";
  const [activeCategory, setActiveCategory] = useState("Semua");

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

  const handleEditClick = (item) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "Semua") return true;
    return product.category === activeCategory;
  });

  return (
    <>
      <section
        id="product"
        className="py-30 bg-linear-to-b from-white to-rose-50/30 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className=""
            >
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-sky-100 to-blue-100 rounded-full shadow-lg mb-3">
                  <Gift className="w-4 h-4 text-secondary" />
                  <span className="text-secondary text-sm font-semibold">
                    Spesial
                  </span>
                </div>
              </div>
              <h2 className="text-center md:text-left text-4xl md:text-5xl text-gray-800 mb-3 font-serif">
                The Perfect Gift
              </h2>
              <p className="text-gray-600 text-lg max-w-lg">
                Temukan cara terbaik untuk merayakan momen spesialmu bersama
                orang tersayang.
              </p>
            </motion.div>
            {!isLoading && products.length && isAdmin > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col md:items-end gap-2 z-10"
              >
                <Link
                  href="/upload"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-blue-200 text-secondary hover:bg-sky-50 rounded-full font-medium transition-all shadow-lg hover:shadow-lg active:scale-95 w-fit"
                >
                  Upload <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex overflow-x-auto md:flex-wrap md:justify-center gap-3 mb-6 pb-2 snap-x &::-webkit-scrollbar:hidden -ms-overflow-style:none scrollbar-none"
          >
            {Categoryes.map((i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`rounded-2xl px-6 py-2 text-sm font-medium
                ${activeCategory === i ? "bg-secondary text-white shadow-md shadow-sky-300 scale-105" : "border border-gray-200 text-black hover:border-blue-300 hover:text-secondary"}`}
              >
                {i === "Semua" ? "Semua" : `${i}`}
              </button>
            ))}
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 w-full">
              <Loader2 className="w-10 h-10 text-secondary animate-spin mb-4" />
              <p className="text-gray-500 font-medium">
                Memuat katalog buket cantikmu...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-400"
            >
              <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Belum ada produk untuk kategori ini
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-full relative group"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 gap-x-1.5">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="h-fit">
                    <ProductCard
                      item={item}
                      isAdmin={isAdmin}
                      handleEditClick={handleEditClick}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </>
  );
}
