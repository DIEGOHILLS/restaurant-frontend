import AuthButton from "@/components/auth-button";
import { AppAuthProvider } from "@/providers/app-auth-provider";
import { AppContextProvider } from "@/providers/app-context-provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MunchMap",
  description: "Discover and review local restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppAuthProvider>
          <AppContextProvider>
            <header className="border-b">
              <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                  MunchMap
                </Link>
                <AuthButton />
              </div>
            </header>
            {children}
          </AppContextProvider>
        </AppAuthProvider>
      </body>
    </html>
  );
}