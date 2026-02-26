import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Shreeraj Trading Company | Akole's Top Hardware Shop",
    description: "Get in touch with Shreeraj Trading Company. Located in Akole, Maharashtra. We supply Berger Paints, hardware, plumbing, and electrical items near you.",
};

export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
