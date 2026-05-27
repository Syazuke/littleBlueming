import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export const contactInfo = [
  { icon: MapPin, content: ["Singaparna, leuwisari, kp citerewes"] },
  { icon: Phone, content: ["+62 851-8808-3810"] },
  { icon: Clock, content: ["Every days: 09.00 - 17.00"] },
];

export const metodePayments = [
  { name: "Cash", color: "text-green-600" },
  { name: "SeaBank", color: "text-orange-600" },
  { name: "BNI", color: "text-sky-600" },
  { name: "DANA", color: "text-blue-500" },
];

export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Katalog", href: "#katalog" },
  { label: "Product", href: "#product" },
  { label: "Custom Buket", href: "#custom-buket" },
  { label: "Tentang Kami", href: "#tentang-kami" },
];

export const socialMedia = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/little_blueming/",
    color: "hover:bg-pink-500",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/+6285188083810",
    color: "hover:bg-green-500",
  },
];
