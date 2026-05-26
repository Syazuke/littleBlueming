// src/app/components/EditProductModal.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditProductModal({ isOpen, onClose, product }) {
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("Artificial");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setEditName(product.name || "");
      setEditPrice(product.price || "");
      setEditCategory(product.category || "Artificial");
    }
  }, [product]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          price: editPrice,
          category: editCategory,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sukses! Data buket berhasil diperbarui di database.");
        onClose();
        router.refresh();
      } else {
        alert(`Gagal: ${data.error}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi saat menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Buket</h3>

          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Buket
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (Rp)
              </label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none bg-white"
              >
                <option value="Artificial">Artificial</option>
                <option value="Satin">Satin</option>
                <option value="Makanan">Makanan</option>
                <option value="Uang">Uang</option>
              </select>
            </div>

            {product && (
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Image
                  src={product.image}
                  alt="Preview"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="text-sm text-gray-500">
                  ID Produk: {product.id}
                </span>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl disabled:opacity-70"
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
