

import Script from "next/script";
import { Inter } from "next/font/google";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: any = {
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
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-B6G3HC58XW"
        ></Script>
        <Script id="google-analytics">

          {

            `
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-B6G3HC58XW');
  `
          }
        </Script>
      </head>
      <body className={`${inter.className}`} suppressHydrationWarning={true} suppressContentEditableWarning={true}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
        <Toaster />
      </body>
    </html>
  );
}
