"use client";

import { Eye, EyeOff } from "lucide-react"; // Tambahkan EyeOff jika ingin ikonnya berubah saat ditekan
import { signIn } from "next-auth/react"; // Import fungsi signIn dari NextAuth
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FormLogin = () => {
  const router = useRouter();

  // State untuk menyimpan ketikan user dan status form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk fitur toggle password

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Panggil NextAuth untuk login
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Tahan redirect otomatis agar kita bisa menangkap pesan error
    });

    if (res?.error) {
      // Jika gagal, tampilkan pesan error
      setError("Email atau password yang kamu masukkan salah.");
      setIsLoading(false);
    } else {
      // Jika berhasil, arahkan ke halaman utama (atau dashboard admin)
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-screen bg-primary w-full overflow-hidden flex justify-center items-center p-8">
      {/* Background Ornaments */}
      <div
        className="absolute top-0 right-0 z-1 w-160 h-160 rounded-full 
                      bg-[radial-gradient(circle,rgba(45,85,251,0.5)_0%,transparent_60%)] 
                      blur-3xl -translate-y-1/2 translate-x-1/2"
      ></div>
      <div
        className="absolute bottom-0 left-0 z-1 w-200 h-200 rounded-full 
                      bg-[radial-gradient(circle,rgba(45,85,251,0.4)_0%,transparent_60%)] 
                      blur-3xl translate-y-1/2 -translate-x-1/3"
      ></div>

      <h1 className="absolute top-8 left-8 text-white font-bold text-2xl z-10">
        Little Blueming
      </h1>

      <form
        onSubmit={handleLogin}
        className="relative z-10 flex flex-col gap-5 bg-white h-fit w-full max-w-lg rounded-3xl px-12 py-10 shadow-2xl"
      >
        <h1 className="text-center font-bold text-xl md:text-3xl text-gray-950 mb-2">
          Login to your account
        </h1>

        {/* Notifikasi Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Input Email */}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-gray-700">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition"
            placeholder="admin@buket.com"
          />
        </div>

        {/* Input Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">Password</p>
          </div>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-xl px-4 py-3 pr-12 text-sm w-full focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition"
              placeholder="Enter your password"
            />
            {/* Tombol Toggle Mata */}
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          className="bg-secondary hover:bg-secondary/90 transition rounded-xl py-3.5 mt-3 shadow-lg shadow-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          <p className="text-white text-sm font-semibold tracking-wide">
            {isLoading ? "Menghubungkan..." : "Login now"}
          </p>
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
