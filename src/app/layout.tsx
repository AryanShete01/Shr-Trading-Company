import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/animations/Preloader";
import SeedanceBackground from "@/components/animations/SeedanceBackground";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Shreeraj Trading Company | Your Trusted Hardware & Colour Partner",
  description: "Quality hardware, paints, electrical, and plumbing materials since 1995. Your one-stop shop for all building needs.",
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
