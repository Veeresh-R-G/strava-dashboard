

import { Inter } from "next/font/google";
import "./global.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: any = {
  title: "BEL BULLET",
  description: "Display the leader board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
        <Toaster />
      </body>
    </html>
  );
}
