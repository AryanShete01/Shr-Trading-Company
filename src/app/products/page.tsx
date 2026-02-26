import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Filter, Box, ArrowRight, ChevronRight, Paintbrush, Hammer, Zap, Droplets } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
    title: "Hardware & Paints Catalogue | Shreeraj Trading Company Akole",
    description: "Browse the largest inventory of hardware tools, plumbing accessories, electrical items, and Berger Paints in Akole.",
};

export const revalidate = 60; // Revalidate every 60 seconds
export default async function ProductsPage({
    searchParams: searchParamsPromise,
}: {
    searchParams: Promise<{ cat?: string; q?: string }>;
}) {
    const searchParams = await searchParamsPromise;
    const { cat, q } = searchParams;

    const categoryMap: Record<string, string> = {
        paints: "Paints & Colours",
        hardware: "Hardware Tools",
        electrical: "Electrical Items",
        plumbing: "Plumbing Materials",
    };

    const products = await prisma.product.findMany({
        where: {
            AND: [
                cat ? { category: { equals: categoryMap[cat] || cat } } : {},
                q ? {
                    OR: [
                        { name: { contains: q, mode: "insensitive" } },
                        { description: { contains: q, mode: "insensitive" } }
                    ]
                } : {}
            ]
        },
        orderBy: { createdAt: 'desc' }
    });

    const categories = [
        { name: "Full Inventory", id: "", icon: <Filter size={14} /> },
        { name: "Paints & Colours", id: "paints", icon: <Paintbrush size={14} /> },
        { name: "Hardware Tools", id: "hardware", icon: <Hammer size={14} /> },
        { name: "Electrical Items", id: "electrical", icon: <Zap size={14} /> },
        { name: "Plumbing Materials", id: "plumbing", icon: <Droplets size={14} /> },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": products.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.description || `Buy ${product.name} at Shreeraj Trading Company in Akole.`,
                "image": product.image || "https://www.shreerajtradingcompany.com/images/logo.png",
                "url": `https://www.shreerajtradingcompany.com/products/${product.id}`,
            }
        }))
    };

    return (
        <div className="min-h-screen bg-[#020617] selection:bg-primary selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            {/* Premium Header */}
            <section className="pt-40 pb-20 bg-[#020617] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -translate-y-1/2 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-600/5 blur-[100px] animate-blob-slow"></div>

                <div className="standard-container relative z-10">
                    <FadeIn delay={0.1}>
                        <nav className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <Link href="/" prefetch={true} className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={12} />
                            <span className="text-red-500">Products Catalogue</span>
                        </nav>
                    </FadeIn>

                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <FadeIn delay={0.2} className="max-w-2xl text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none break-words">
                                INDUSTRIAL <br /><span className="text-gradient">CATALOGUE.</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                                Professional-grade materials for plumbing, electrical, hardware, and paints. Currently stocking {products.length} essential items.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3} className="w-full lg:w-96">
                            <form className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="q"
                                    defaultValue={q}
                                    placeholder="Search by name or tech..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                                />
                            </form>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Filtering & Listing */}
            <section className="py-24">
                <div className="standard-container">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Filters */}
                        <FadeIn direction="right" delay={0.2} className="lg:w-80 shrink-0 space-y-12">
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-2 px-1">
                                    <Filter size={14} /> Divisions
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={category.id ? `/products?cat=${category.id}` : '/products'}
                                            prefetch={true}
                                            className={`px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-between group ${((!cat && category.id === "") || cat === category.id)
                                                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                                : "glass-dark text-slate-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <span className={`${((!cat && category.id === "") || cat === category.id) ? "text-white" : "text-blue-500 group-hover:text-white"}`}>{category.icon}</span>
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 rounded-[3rem] bg-blue-600 text-white shadow-3xl shadow-blue-600/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                    <div className="animate-float">
                                        <Box size={100} />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Bulk Order Specialists</h4>
                                <p className="text-sm font-medium text-blue-50 mb-10 opacity-90 leading-relaxed">
                                    For large projects or contractor accounts, connect with our support team.
                                </p>
                                <Link
                                    href="/contact"
                                    prefetch={true}
                                    className="w-full bg-white text-blue-600 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-xl"
                                >
                                    Contact Desk <ArrowRight size={14} />
                                </Link>
                            </div>
                        </FadeIn>

                        {/* Product Grid */}
                        <FadeIn delay={0.3} className="flex-1">
                            <div className="flex justify-between items-center mb-12 pb-8 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 shadow-sm">
                                        <Box size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-1.5">Collection</p>
                                        <p className="text-sm font-black text-white uppercase tracking-widest leading-none">
                                            {products.length} Materials Available
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {products.length > 0 ? (
                                <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                                    {products.map((product) => (
                                        <StaggerItem key={product.id}>
                                            <ProductCard product={product} />
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            ) : (
                                <div className="glass-dark rounded-[4rem] p-24 text-center border border-white/5 shadow-2xl flex flex-col items-center">
                                    <div className="w-28 h-28 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-10 text-slate-700 shadow-inner">
                                        <Search size={56} />
                                    </div>
                                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Inventory Mismatch.</h3>
                                    <p className="text-slate-400 font-medium max-w-sm mb-12 leading-relaxed text-lg">
                                        We couldn't find any materials matching your selection. Try adjusting your filters.
                                    </p>
                                    <Link
                                        href="/products"
                                        prefetch={true}
                                        className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20"
                                    >
                                        Show Full Inventory
                                    </Link>
                                </div>
                            )}
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SEO Catalogue Content Section */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative">
                <div className="standard-container">
                    <FadeIn direction="up">
                        <div className="max-w-4xl mx-auto glass-dark p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
                                Complete Inventory at Our Hardware Shop in Akole
                            </h2>
                            <div className="prose prose-invert prose-lg text-slate-400 font-medium leading-relaxed max-w-none space-y-6">
                                <p>
                                    As the premier <strong className="text-white">building materials supplier in Akole</strong>, Shreeraj Trading Company maintains a vast, meticulously curated catalogue. We categorize our inventory into specific professional divisions to ensure you locate the exact <strong className="text-white">hardware store near Akole</strong> products you need instantly.
                                </p>

                                <h3 className="text-2xl font-black text-white mt-12 mb-4">Official Berger Paints Dealer in Akole</h3>
                                <p>
                                    Our paint and coatings division holds everything necessary for professional decorators and DIY enthusiasts alike. Looking for a specialized <strong className="text-white">colour shop in Akole</strong>? As an authorized <strong className="text-white">Berger Paints dealer in Akole</strong>, our inventory features all grades of Berger exterior and interior paints, waterproofing solutions, wood finishes, and industrial protective coatings.
                                </p>

                                <h3 className="text-2xl font-black text-white mt-12 mb-4">Premier Source for Plumbing and Electrical Items</h3>
                                <p>
                                    Structural integrity starts from the inside. That is why civil contractors rely on us for their <strong className="text-white">plumbing and electrical items in Akole</strong>. Our catalogue contains heavy-duty structural PVC pipes, highly durable CPVC fittings, industrial-grade copper wiring, robust MCBs, and modular switches. Everything stocked in our <strong className="text-white">hardware shop in Akole</strong> is sourced directly from certified national manufacturers.
                                </p>

                                <h3 className="text-2xl font-black text-white mt-12 mb-4">Heavy-Duty Hardware and Fasteners</h3>
                                <p>
                                    Whether you need high-tensile fasteners, professional power tools, or precision hand tools, we supply equipment that stands up to punishing daily use. We take our reputation as the <strong className="text-white">best hardware shop in Akole</strong> seriously, ensuring that every screw, bolt, and drill we provide brings unparalleled strength to your construction projects across Ahilyanagar and Maharashtra.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
}
