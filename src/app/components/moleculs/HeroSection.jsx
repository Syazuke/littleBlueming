"use client";

import { Sparkles, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; // Pastikan menggunakan "framer-motion" (bukan "motion/react" jika error)
import { slides } from "@/app/libs/producs"; // Pastikan file data slides ini sudah ada

// --- IMPORT SWIPER ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";

// --- IMPORT CSS SWIPER WAJIB ---
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  const handleOpenWa = () => {
    window.open("https://wa.me/+6285188083810");
  };

  const handleOpenProduct = () => {
    router.push("/product");
  };

  return (
    <section
      id="home"
      className="relative h-[80vh] md:h-screen overflow-hidden mt-16 md:mt-20 group"
    >
      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".custom-next-btn",
          prevEl: ".custom-prev-btn",
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* BACKGROUND GAMBAR */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }} // Pastikan di data 'slides' ada property 'image'
            >
              {/* Overlay gelap agar teks terbaca */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-900/60 to-black/40" />
            </div>

            {/* KONTEN TEKS & TOMBOL */}
            <div className="relative h-full flex items-center justify-center text-center px-4 z-10">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white text-sm tracking-wide">
                    Little Blueming
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 font-serif leading-tight drop-shadow-lg"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto drop-shadow-md"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex gap-4 justify-center flex-wrap"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenWa}
                    className="group relative px-8 md:px-10 py-4 bg-white text-secondary rounded-full shadow-xl hover:shadow-rose-500/40 transition-all flex items-center gap-2 overflow-hidden"
                  >
                    <span className="relative z-10 font-bold">
                      Pesan Sekarang
                    </span>
                    <Heart className="w-5 h-5 relative z-10 group-hover:fill-current transition-all group-hover:scale-110" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenProduct}
                    className="px-8 md:px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/50 hover:bg-white/20 transition-all font-semibold shadow-xl"
                  >
                    Lihat Koleksi
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-prev-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-md opacity-0 group-hover:opacity-100 disabled:opacity-0 cursor-pointer">
        <ChevronLeft className="w-6 h-6 text-secondary" />
      </button>
      <button className="custom-next-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-md opacity-0 group-hover:opacity-100 disabled:opacity-0 cursor-pointer">
        <ChevronRight className="w-6 h-6 text-secondary" />
      </button>
    </section>
  );
}
