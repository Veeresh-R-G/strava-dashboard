import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BEL BULLET",
  description: "Running. Breakfast. Community stuff 🏃‍♂️🍳🌍",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${inter.className}`}>{children}</body>
    </html>
  );
}
