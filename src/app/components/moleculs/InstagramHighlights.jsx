"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { highlights } from "@/app/libs/producs";
import Image from "next/image";

export function InstagramHighlights() {
  return (
    <section className="py-20 bg-linear-to-br from-white-50 via-sky-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-lg">
            <FaInstagram className="w-4 h-4 text-secondary" />
            <span className="text-secondary text-sm font-semibold">
              @bloombouquet
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-800 mb-3 font-serif">
            Instagram Stories
          </h2>
          <p className="text-gray-600 text-lg">Lihat kreasi terbaru kami</p>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {highlights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="relative shrink-0 w-48 h-72 rounded-3xl overflow-hidden shadow-2xl cursor-pointer snap-center group"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white-500 via-sky-500 to-secondary p-1 rounded-3xl">
                <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <div className="text-white font-semibold mb-2">
                        {item.title}
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                        <Play className="w-4 h-4 text-white fill-white" />
                        <span className="text-white text-sm">Lihat</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </div>
              </div>

              <div className="absolute -inset-1 bg-linear-to-br from-white-500 via-sky-500 to-secondary rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.a
            href="https://www.instagram.com/little_blueming/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full shadow-2xl hover:shadow-blue-500/50"
          >
            <FaInstagram className="w-5 h-5" />
            <span className="font-semibold">Follow di Instagram</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
