"use client";

import logo from "@/app/assets/logo.jpeg";
import {
  contactInfo,
  metodePayments,
  quickLinks,
  socialMedia,
} from "@/app/libs/footers";
import { motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathName = usePathname();
  if (pathName.endsWith("/login")) {
    return null;
  }
  return (
    <footer
      id="tentang-kami"
      className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Image
                  src={logo}
                  alt="ini logo"
                  className="rounded-full"
                ></Image>
              </div>
              <h3 className="text-2xl font-serif bg-linear-to-r text-secondary bg-clip-text">
                Little Blueming
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              "Menghadirkan pesona dalam setiap susunan kelopak. Pilihan
              terpercaya untuk menyampaikan perasaan pada momen berharga Anda
              sejak 2024."
            </p>

            <div className="flex gap-3">
              {socialMedia.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-full ${social.color} border border-white/10`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg text-white mb-3">Hubungi Kami</h4>
            <div className="space-y-4">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="p-2 bg-linear-to-br from-blue-400 to-secondary rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p>{item.content}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg text-white mb-3">Metode Pembayaran</h4>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {metodePayments.map((payment, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white p-3 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <span className={`text-sm ${payment.color}`}>
                    {payment.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <h4 className="text-lg text-white mb-3">Quick Links</h4>
            <div className="space-y-1 grid grid-cols-2">
              {quickLinks.map((i, idx) => (
                <a
                  key={idx}
                  href={i.href}
                  className="block text-gray-400 hover:text-secondary hover:translate-x-2 transition-all"
                >
                  → {i.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2026 Little Blueming. All rights reserved. Made with 💙
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
