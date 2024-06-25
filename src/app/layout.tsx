import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/componentes/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Komode CMS",
  description: "Este é um CMS para Komode Móveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
