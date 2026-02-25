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
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary selection:text-white">
            <Navbar />

            {/* Premium Header / Breadcrumbs */}
            <section className="pt-32 pb-12 bg-black border-b border-white/5">
                <div className="standard-container">
                    <nav className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={12} className="text-slate-600" />
                        <Link href="/products" className="hover:text-primary transition-colors">Catalogue</Link>
                        <ChevronRight size={12} className="text-slate-600" />
                        <span className="text-primary truncate max-w-[150px] md:max-w-none">{product.name}</span>
                    </nav>
                </div>
            </section>

            <main className="py-20">
                <div className="standard-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Image Showcase */}
                        <div className="space-y-8 animate-in">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl shadow-primary/20 group">
                                <img
                                    src={product.image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute top-8 left-8">
                                    <span className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10 shadow-xl">
                                        Primary Visual
                                    </span>
                                </div>
                            </div>

                            {/* Trust Features */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { icon: ShieldCheck, text: "Genuine Brand", color: "text-primary" },
                                    { icon: Truck, text: "Site Delivery", color: "text-secondary" },
                                    { icon: Award, text: "Premium Grade", color: "text-accent" },
                                ].map((item, i) => (
                                    <div key={i} className="glass-dark p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-3">
                                        <item.icon className={item.color} size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-tight">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details Content */}
                        <div className="flex flex-col animate-in [animation-delay:200ms]">
                            <div className="mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                    <Package size={14} /> {product.category}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
                                    {product.name}
                                </h1>
                                <div className="flex items-baseline gap-3 mb-10">
                                    <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
                                    <span className="text-slate-500 font-bold">Inc. Taxes</span>
                                </div>
                                <div className="w-20 h-1.5 bg-primary rounded-full mb-10"></div>
                            </div>

                            <div className="space-y-12 mb-16">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6 flex items-center gap-2">
                                        <Info size={14} /> Description & Utility
                                    </h3>
                                    <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2rem] glass-dark border border-white/5 space-y-4">
                                        <h4 className="font-black text-xs uppercase tracking-widest text-white">Availability Status</h4>
                                        <div className="flex items-center gap-3 text-red-500">
                                            <CheckCircle2 size={20} />
                                            <span className="font-bold font-black text-xs uppercase tracking-widest">In-Stock at Akole Shop</span>
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-[2rem] glass-dark border border-white/5 space-y-4">
                                        <h4 className="font-black text-xs uppercase tracking-widest text-white">Technical Support</h4>
                                        <p className="text-sm font-medium text-slate-400">Expert guidance available for application & usage.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col sm:flex-row gap-6">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-primary text-white px-10 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-primary-hover transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
                                >
                                    <MessageCircle size={20} fill="currentColor" />
                                    Order via WhatsApp
                                </a>
                                <Link
                                    href="/contact"
                                    className="px-10 py-6 rounded-3xl bg-white text-black font-black text-sm uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all text-center flex items-center justify-center gap-3 shadow-xl"
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
