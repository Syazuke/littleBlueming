"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Pencil } from "lucide-react";

const ProductCard = ({ item, isAdmin, handleEditClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWa = () => {
    const pesan = encodeURIComponent(
      `Halo Admin Little Blueming, saya tertarik untuk memesan buket ${item.name} ini. Apakah masih tersedia?`,
    );
    window.open(`https://wa.me/+6285188083810?text=${pesan}`);
  };

  const formattedPrice = item.price
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(item.price)
    : "Harga belum disetel";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        rotateY: 2,
        transition: { duration: 0.3 },
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group/card relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all flex flex-col h-full mx-1 my-2"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-linear-to-br from-sky-50 to-blue-50">
        {isAdmin && (
          <button
            onClick={() => handleEditClick(item)}
            className="absolute top-3 right-3 z-30 bg-white/90 p-2.5 rounded-full shadow-lg hover:bg-blue-100 text-gray-700 hover:text-secondary transition-all border border-gray-100"
            title="Edit Produk (Admin)"
          >
            <Pencil className="w-5 h-5" />
          </button>
        )}

        <Image
          src={item.image}
          alt={item.name || "Gambar Buket Little Blueming"}
          width={400}
          height={500}
          priority
          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
        />

        <div
          className={`absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>

      <div className="p-4 flex flex-col grow justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 truncate font-semibold font-sans text-xl group-hover/card:text-secondary transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-800 font-sans opacity-80 group-hover/card:text-secondary font-medium text-md">
            {formattedPrice}
          </p>
        </div>

        <button
          onClick={handleWa}
          className="bg-blue-400 text-white rounded-xl font-medium px-4 py-2.5 w-full group-hover/card:bg-secondary transition-colors shadow-md shadow-sky-200"
        >
          Lanjut ke WA
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
