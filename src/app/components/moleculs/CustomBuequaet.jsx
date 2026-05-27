"use client";

import {
  MessageCircle,
  Palette,
  Gift,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import buket from "@/app/assets/satin 7.jpg";
import Image from "next/image";

const features = [
  {
    icon: Palette,
    title: "Pilih Warna & Bunga",
    description: "Sesuaikan dengan tema dan preferensimu",
    linear: "from-purple-500 to-pink-500",
  },
  {
    icon: Gift,
    title: "Tambah Aksesoris",
    description: "Boneka, coklat, atau kartu ucapan",
    linear: "from-rose-500 to-orange-500",
  },
  {
    icon: CheckCircle2,
    title: "Konsultasi Gratis",
    description: "Tim kami siap membantu rekomendasimu",
    linear: "from-emerald-500 to-teal-500",
  },
];

export function CustomBouquet() {
  const handleWhatsApp = () => {
    const phoneNumber = "+6285188083810";
    const message = "Halo, saya ingin memesan buket custom";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section id="custom-buket" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-50 via-blue-50 to-blue-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-sky-100 to-blue-100 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span className="text-secondary text-sm">Buat Sendiri</span>
                </div>

                <h2 className="text-3xl md:text-5xl text-gray-800 mb-4 font-serif leading-tight">
                  Custom Your Bouquet
                </h2>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                  Buat buket impianmu sesuai budget dan selera! Kami siap
                  membantu mewujudkan buket yang sempurna untuk moment
                  spesialmu.
                </p>
              </motion.div>

              <div className="space-y-6 mb-10">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${feature.linear} blur-lg opacity-20 group-hover:opacity-40 transition-opacity`}
                        ></div>
                        <div
                          className={`relative p-3 bg-linear-to-br ${feature.linear} rounded-2xl group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-gray-800 mb-1 group-hover:text-secondary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-linear-to-r from-sky-500 to-secondary text-white rounded-full hover:shadow-2xl hover:shadow-blue-500/30 transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-sky-400 to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <MessageCircle className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10 font-medium">
                  Hubungi via WhatsApp
                </span>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-64 md:h-full min-h-100"
            >
              <Image
                src={buket}
                alt="Custom Bouquet"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
