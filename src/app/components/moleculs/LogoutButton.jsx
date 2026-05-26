"use client"; // Wajib karena ada interaksi onClick

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    // Memanggil fungsi signOut bawaan NextAuth
    await signOut({
      redirect: true,
      callbackUrl: "/login", // Arahkan kembali ke halaman login Little Blueming setelah keluar
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-xl transition shadow-md"
    >
      Logout
    </button>
  );
}
