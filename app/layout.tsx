import { ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PageLoading from "./loading";
import { Suspense } from "react";
import ReactQueryProvider from "./_trpc/Provider";
import "@fortawesome/fontawesome-svg-core/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camavan",
  description: "A van for CUM!",
};

export type Roles = "CLIENT" | "ADMIN" | null;
export var userRole: Roles = null;
export const setUserRole = (value: Roles) => {
  userRole = value;
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
          <Suspense fallback={<PageLoading />}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </Suspense>
          <Footer />
          {/* <Errors /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
