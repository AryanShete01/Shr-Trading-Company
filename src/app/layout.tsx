import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/animations/Preloader";
import SeedanceBackground from "@/components/animations/SeedanceBackground";
import Chatbot from "@/components/Chatbot";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Best Hardware Shop in Akole | Shreeraj Trading Company",
  description: "Your trusted hardware store near Akole, Maharashtra. We fix, build & supply plumbing, electrical, and Berger Paints. Contact Shreeraj Trading Company for building materials.",
  keywords: ["hardware shop in Akole", "hardware store near Akole", "paint shop in Akole", "Berger Paints dealer in Akole", "colour shop in Akole", "building materials supplier in Akole", "plumbing and electrical items in Akole", "best hardware shop in Akole", "Shreeraj Trading Company", "Ahilyanagar"],
  authors: [{ name: "Shreeraj Trading Company" }],
  creator: "Shreeraj Trading Company",
  publisher: "Shreeraj Trading Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '96x96', type: 'image/png' },
    ],
  },
  verification: {
    google: "Y-VpZkqTvMXPj-xwobC-2LyZ_xBjR_OCNpwgyrkp9Rw",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents zoom on input focus for iOS
  userScalable: false,
  themeColor: '#ffffff',
  viewportFit: 'cover', // Safe area support for notched devices
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={`${outfit.variable} font-sans antialiased text-white bg-black`}>
        <Preloader />
        <SeedanceBackground />
        <CustomCursor />
        {children}
        <Chatbot />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
