import type { Metadata } from "next";
import "./globals.css";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  weight: ['300', '400', '500', '700'],
  subsets: ["thai", "latin"],
  variable: '--font-kanit',  // เพิ่ม variable
});

export const metadata: Metadata = {
  title: "Katong_longtang",
  description: "Develop by JayZ&Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.className} antialiased min-h-screen bg-[url('/images/bg_katong/DALL·E-2024-11-14-20.59.png')] bg-cover bg-[center_100%] bg-no-repeat`}
      >
        {children}
      </body>
    </html>
  );
}