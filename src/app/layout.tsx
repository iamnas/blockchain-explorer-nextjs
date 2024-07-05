import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "bootstrap-icons/font/bootstrap-icons.css"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blockchain explorer Next App",
  description: "Explore the etherium blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
