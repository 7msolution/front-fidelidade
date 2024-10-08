import NextAuthSessionProvider from "@/providers/sessionProviders";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={inter.className}>

      <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        
        </body>
    </html>
  );
}
