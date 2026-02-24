import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, Filter, Box, ArrowRight, ChevronRight, Paintbrush, Hammer, Zap, Droplets } from "lucide-react";

export const dynamic = "force-dynamic";

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
                        { name: { contains: q } },
                        { description: { contains: q } }
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

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-orange-100 selection:text-orange-900">
            <Navbar />

            {/* Premium Header */}
            <section className="pt-40 pb-20 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/10 blur-[120px] -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-600/5 blur-[100px]"></div>

                <div className="standard-container relative z-10">
                    <nav className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-orange-500">Products Catalogue</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none break-words">
                                INDUSTRIAL <br /><span className="text-gradient">CATALOGUE.</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                                Professional-grade materials for plumbing, electrical, hardware, and paints. Currently stocking {products.length} essential items.
                            </p>
                        </div>

                        <div className="w-full lg:w-96">
                            <form className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="q"
                                    defaultValue={q}
                                    placeholder="Search by name or tech..."
                                    className="w-full bg-white/5 border border-white/10 text-white pl-14 pr-6 py-5 rounded-[2rem] focus:bg-white focus:text-slate-950 outline-none transition-all placeholder:text-slate-600"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtering & Listing */}
            <section className="py-24">
                <div className="standard-container">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Filters */}
                        <aside className="lg:w-80 shrink-0 space-y-12">
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-2 px-1">
                                    <Filter size={14} /> Divisions
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={category.id ? `/products?cat=${category.id}` : '/products'}
                                            className={`px-8 py-5 rounded-3xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-4 ${((!cat && category.id === "") || cat === category.id)
                                                ? "bg-slate-950 text-white shadow-2xl shadow-slate-950/20 translate-x-1"
                                                : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-100"
                                                }`}
                                        >
                                            <span className={`${((!cat && category.id === "") || cat === category.id) ? "text-orange-500" : "text-slate-300"}`}>{category.icon}</span>
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 rounded-[3rem] bg-orange-600 text-white shadow-3xl shadow-orange-600/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                    <Box size={100} />
                                </div>
                                <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Bulk Order Specialists</h4>
                                <p className="text-sm font-medium text-orange-50 mb-10 opacity-90 leading-relaxed">
                                    For large projects or contractor accounts, connect with our support team.
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full bg-white text-orange-600 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors shadow-xl"
                                >
                                    Contact Desk <ArrowRight size={14} />
                                </Link>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-12 pb-8 border-b border-slate-200/60">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-[1.25rem] bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                                        <Box size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">Collection</p>
                                        <p className="text-sm font-black text-slate-950 uppercase tracking-widest leading-none">
                                            {products.length} Materials Available
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-[4rem] p-24 text-center border border-slate-100 shadow-2xl shadow-slate-950/[0.02] flex flex-col items-center">
                                    <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-10 text-slate-200 shadow-inner">
                                        <Search size={56} />
                                    </div>
                                    <h3 className="text-4xl font-black text-slate-950 mb-4 tracking-tighter">Inventory Mismatch.</h3>
                                    <p className="text-slate-500 font-medium max-w-sm mb-12 leading-relaxed text-lg">
                                        We couldn't find any materials matching your selection. Try adjusting your filters.
                                    </p>
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.2em] bg-slate-950 px-10 py-5 rounded-2xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-950/20"
                                    >
                                        Show Full Inventory
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
