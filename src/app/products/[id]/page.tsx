import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    MessageCircle,
    ArrowLeft,
    ShieldCheck,
    Truck,
    Award,
    CheckCircle2,
    ChevronRight,
    Package,
    Info
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    const whatsappNumber = "918306063148";
    const message = encodeURIComponent(`Hello Shreeraj Trading! I'm interested in the product: ${product.name} (Price: ${formatPrice(product.price)}). Is this currently available?`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Premium Header / Breadcrumbs */}
            <section className="pt-32 pb-12 bg-slate-50 border-b border-slate-100">
                <div className="standard-container">
                    <nav className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                        <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                        <ChevronRight size={12} className="text-slate-300" />
                        <Link href="/products" className="hover:text-orange-600 transition-colors">Catalogue</Link>
                        <ChevronRight size={12} className="text-slate-300" />
                        <span className="text-orange-600 truncate max-w-[150px] md:max-w-none">{product.name}</span>
                    </nav>
                </div>
            </section>

            <main className="py-20">
                <div className="standard-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Image Showcase */}
                        <div className="space-y-8 animate-in">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl shadow-slate-950/5 group">
                                <img
                                    src={product.image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute top-8 left-8">
                                    <span className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20 shadow-xl">
                                        Primary Visual
                                    </span>
                                </div>
                            </div>

                            {/* Trust Features */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { icon: ShieldCheck, text: "Genuine Brand", color: "text-blue-500" },
                                    { icon: Truck, text: "Site Delivery", color: "text-orange-500" },
                                    { icon: Award, text: "Premium Grade", color: "text-green-500" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center gap-3">
                                        <item.icon className={item.color} size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 leading-tight">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details Content */}
                        <div className="flex flex-col animate-in [animation-delay:200ms]">
                            <div className="mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                    <Package size={14} /> {product.category}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-tighter leading-tight">
                                    {product.name}
                                </h1>
                                <div className="flex items-baseline gap-3 mb-10">
                                    <span className="text-4xl font-black text-slate-950">{formatPrice(product.price)}</span>
                                    <span className="text-slate-400 font-bold">Inc. Taxes</span>
                                </div>
                                <div className="w-20 h-1.5 bg-orange-600 rounded-full mb-10"></div>
                            </div>

                            <div className="space-y-12 mb-16">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-2">
                                        <Info size={14} /> Description & Utility
                                    </h3>
                                    <p className="text-xl text-slate-600 font-medium leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4">
                                        <h4 className="font-black text-xs uppercase tracking-widest text-slate-950">Availability Status</h4>
                                        <div className="flex items-center gap-3 text-green-600">
                                            <CheckCircle2 size={20} />
                                            <span className="font-bold">In-Stock at Akole Shop</span>
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4">
                                        <h4 className="font-black text-xs uppercase tracking-widest text-slate-950">Technical Support</h4>
                                        <p className="text-sm font-medium text-slate-500">Expert guidance available for application & usage.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col sm:flex-row gap-6">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-orange-600 text-white px-10 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-orange-700 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-orange-600/20 flex items-center justify-center gap-3"
                                >
                                    <MessageCircle size={20} fill="currentColor" />
                                    Order via WhatsApp
                                </a>
                                <Link
                                    href="/contact"
                                    className="px-10 py-6 rounded-3xl bg-slate-950 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all text-center flex items-center justify-center gap-3 shadow-xl"
                                >
                                    Visit Store
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
