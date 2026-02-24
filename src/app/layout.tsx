import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Shreeraj Trading Company | Your Trusted Hardware & Colour Partner",
  description: "Quality hardware, paints, electrical, and plumbing materials since 1995. Your one-stop shop for all building needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-slate-900 bg-white`}>
        {children}
      </body>
    </html>
  );
}
