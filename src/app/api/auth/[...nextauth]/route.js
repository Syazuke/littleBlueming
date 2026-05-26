import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; // Ini yang tadi terlewat
import prisma from "@/app/libs/prisma"; // Pastikan path ini sama dengan yang di file setup tadi
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Validasi input form kosong
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        // 2. Cari admin di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Jika admin tidak ditemukan
        if (!user) {
          throw new Error("Email tidak terdaftar");
        }

        // 3. Cocokkan password yang diketik dengan yang di database
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordMatch) {
          throw new Error("Password salah");
        }

        // 4. Jika sukses, kembalikan data untuk disimpan di sesi
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Mengarahkan NextAuth ke desain form login Little Blueming kamu
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
