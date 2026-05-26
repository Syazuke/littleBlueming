"use client";

import { SessionProvider } from "next-auth/react";

// WAJIB pakai kurung kurawal {} di sekeliling children
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
