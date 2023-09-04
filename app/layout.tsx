import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PageLoading from "./loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camavan",
  description: "A van for CUM!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <Suspense fallback={<PageLoading />}>{children}</Suspense>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
