"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UploadCloud, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Artificial");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      if (!session || session.user?.email !== "admin@buket.com") {
        router.push("/");
      }
    }
  }, [session, status, router]);
  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50/30">
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
      </div>
    );
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!image) return alert("Pilih foto buket dulu!");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("category", category);

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Buket baru berhasil ditambahkan!");
        router.push("/");
      } else {
        alert(`Gagal: ${data.error}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi saat mengupload.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50/30 py-20 px-4 sm:px-6">
      <Link
        href="/product"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-secondary transition-colors mb-6 font-medium py-6"
      >
        <ArrowLeft className="w-5 h-5" /> Kembali ke Product
      </Link>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-sky-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 font-serif">
            Tambah Buket Baru
          </h1>

          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Buket
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Buket Mawar Merah"
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none px-5 py-3 "
              >
                <option value="Artificial">Artificial</option>
                <option value="Satin">Satin</option>
                <option value="Makanan">Makanan</option>
                <option value="Uang">Uang</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Harga (Rp)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Contoh: 150000"
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto Buket
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-blue-200 border-dashed rounded-2xl cursor-pointer bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 text-secondary mb-3" />
                    <p className="text-sm text-gray-600 font-medium">
                      Klik untuk mencari foto di perangkat
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, WEBP, JPG, atau JPEG
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </label>
              </div>

              {preview && (
                <div className="mt-4 relative w-32 h-40 rounded-xl overflow-hidden border-2 border-sky-100 shadow-md">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <hr className="my-2 border-gray-100" />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-secondary hover:bg-secondary text-white text-lg font-semibold rounded-xl disabled:opacity-70 transition-all shadow-lg shadow-blue-200 flex justify-center items-center"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Upload Buket ke Katalog"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
