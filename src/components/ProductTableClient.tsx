"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Edit, ExternalLink, Package, ShoppingBag, Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import DeleteButton from "@/components/DeleteButton";
import DashboardSearch from "@/components/DashboardSearch";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string | null;
    createdAt: string | Date;
}

export default function ProductTableClient({ initialProducts, totalCount }: { initialProducts: Product[], totalCount: number }) {
    const [products, setProducts] = useState(initialProducts);
    const [isPending, startTransition] = useTransition();

    // This component will eventually handle its own search/filter logic locally for ultra-fast feel
    // But for now, we'll keep the server-side search but handle deletions optimistically.

    const handleDeleteLocally = (id: string) => {
        setProducts(prev => prev.filter(p => id !== p.id));
    };

    return (
        <div className="bg-white rounded-[2rem] sm:rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-3">
                    Inventory <span className="text-sm font-bold bg-slate-50 text-slate-400 px-3 py-1 rounded-full">{totalCount}</span>
                </h2>
                <div className="flex items-center gap-4">
                    <DashboardSearch />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Product Details</th>
                            <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Category</th>
                            <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Price</th>
                            <th className="px-8 py-5 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] text-right">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-5">
                                            <img
                                                src={product.image || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"}
                                                alt={product.name}
                                                width={64}
                                                height={64}
                                                loading="lazy"
                                                className="w-16 h-16 rounded-2xl shrink-0 shadow-sm object-cover"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 text-lg tracking-tight group-hover:text-orange-700 transition-colors">{product.name}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                                                    Added {new Date(product.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.1em] bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100/50">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-950 text-lg tracking-tight">{formatPrice(product.price)}</span>
                                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Active</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end items-center gap-2">
                                            <Link
                                                href={`/products/${product.id}`}
                                                target="_blank"
                                                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-orange-700 transition-all font-bold"
                                            >
                                                <ExternalLink size={20} />
                                            </Link>
                                            <Link
                                                href={`/admin/dashboard/edit/${product.id}`}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-all font-bold"
                                            >
                                                <Edit size={20} />
                                            </Link>
                                            <DeleteButton id={product.id} onDeleteConfirm={() => handleDeleteLocally(product.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-8 py-32 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center text-slate-300 mb-6 font-bold">
                                            <ShoppingBag size={40} />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">No products found</h3>
                                        <p className="text-slate-400 font-medium max-w-xs mx-auto mb-8">Try adjusting your search or add a new product.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
