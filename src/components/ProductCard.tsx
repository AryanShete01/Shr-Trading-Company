import { ShoppingCart, ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        category: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const whatsappNumber = "918306063148";
    const message = encodeURIComponent(`Hello Shreeraj Trading! I'm interested in: ${product.name} (Price: ${formatPrice(product.price)}). Can you share more details?`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <div className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover-lift shadow-sm hover:shadow-2xl hover:shadow-orange-950/5 transition-all duration-500 flex flex-col h-full">
            {/* Image Container with Overlay */}
            <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img
                    src={product.image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <Link
                        href={`/products/${product.id}`}
                        className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
                    >
                        Detailed Specs
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Category Tag */}
                <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20 shadow-lg capitalize">
                        {product.category}
                    </span>
                </div>

                {/* Quick Help Icon */}
                <div className="absolute top-6 right-6 transform translate-x-16 group-hover:translate-x-0 transition-transform duration-500 delay-75">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-600/30 hover:bg-orange-700 transition-all hover:scale-110"
                    >
                        <ShoppingCart size={20} />
                    </a>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl font-black tracking-tight text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {product.name}
                    </h3>
                    <div className="text-right">
                        <p className="text-xs font-black uppercase tracking-tighter text-slate-400 leading-none mb-1">Price</p>
                        <p className="text-lg font-black text-slate-950 leading-none">
                            {formatPrice(product.price)}
                        </p>
                    </div>
                </div>

                <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed mb-6 h-10">
                    {product.description}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none text-slate-400">Available</span>
                    </div>
                    <Link
                        href={`/products/${product.id}`}
                        className="text-xs font-black uppercase tracking-widest text-orange-600 flex items-center gap-1.5 hover:gap-3 transition-all"
                    >
                        View Details
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
