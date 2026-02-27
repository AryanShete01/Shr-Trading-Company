import { ShoppingCart, ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number | null;
        priceType?: string;
        image: string;
        category: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const whatsappNumber = "918306063148";
    const isContact = product.priceType === "CONTACT";
    const isStarting = product.priceType === "STARTING";

    const priceDisplay = isContact
        ? "Contact for Price"
        : isStarting
            ? `Starting from ${formatPrice(product.price)}`
            : formatPrice(product.price);

    const whatsappMsg = isContact || isStarting
        ? `Hello, I’m interested in ${product.name} from Shreeraj Trading Company. Please share price and availability.`
        : `Hello Shreeraj Trading! I'm interested in: ${product.name} (Price: ${formatPrice(product.price)}). Can you share more details?`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

    return (
        <div className="group relative glass rounded-[2.5rem] border border-white/5 overflow-hidden hover-lift shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 flex flex-col h-full">
            {/* Image Container with Overlay */}
            <div className="relative aspect-square overflow-hidden bg-white/5">
                <Image
                    src={product.image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <Link
                        href={`/products/${product.id}`}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                    >
                        Detailed Specs
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Quick Help Icon */}
                <div className="absolute top-6 right-6 transform translate-x-16 group-hover:translate-x-0 transition-transform duration-500 delay-75 flex items-center gap-2">
                    <span className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">
                        {isContact ? "Contact" : formatPrice(product.price)}
                    </span>
                    <Link
                        href={`/products/${product.id}`}
                        className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    >
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-8 flex flex-col">
                <div className="flex flex-col gap-5 mb-6">
                    <span className="bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full border border-primary/20 w-fit">
                        {product.category}
                    </span>
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Unit Price</p>
                        <p className="text-2xl font-black text-white leading-none tracking-tight">
                            {priceDisplay}
                        </p>
                    </div>
                </div>

                <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed mb-6 h-10">
                    {product.description}
                </p>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-fit">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none text-slate-400">Available</span>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 hover:gap-4 transition-all group/btn"
                        >
                            {isContact || isStarting ? "Enquire Now" : "Buy Now"}
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
