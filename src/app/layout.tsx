import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "DevRoast",
  description: "DevRoast project",
};

import { Navbar } from "@/components/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={jetbrainsMono.variable}>
      <body className="antialiased text-zinc-50 bg-bg min-h-screen">
        <TRPCReactProvider>
          <Navbar />
          <main className="pt-14">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
