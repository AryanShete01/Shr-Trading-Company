import prisma from "@/lib/prisma";
import {
    Plus,
    Edit,
    ShoppingBag,
    ExternalLink,
    MessageSquare,
    TrendingUp,
    Package,
    ArrowUpRight,
    Search,
    Filter
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import DeleteButton from "@/components/DeleteButton";
import DashboardSearch from "@/components/DashboardSearch";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Determine page configuration
    const resolvedSearchParams = await searchParams;
    const search = resolvedSearchParams?.search as string | undefined;
    const page = Math.max(1, parseInt((resolvedSearchParams?.page as string) || "1"));
    const limit = 15;
    const skip = (page - 1) * limit;

    // Run DB operations sequentially to prevent MaxClientsInSessionMode connection pool exhaustion
    const productsCount = await prisma.product.count({
        where: search ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
            ]
        } : undefined,
    });

    const enquiriesCount = await prisma.enquiry.count();

    const recentProducts = await prisma.product.findMany({
        where: search ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
            ]
        } : undefined,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        // Optimized: only select essential fields
        select: {
            id: true,
            name: true,
            price: true,
            category: true,
            image: true,
            createdAt: true
        }
    });

    const totalPages = Math.ceil(productsCount / limit);

    const stats = [
        { label: "Total Products", value: productsCount, icon: <Package size={24} />, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "New Enquiries", value: enquiriesCount, icon: <MessageSquare size={24} />, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Store Status", value: "Online", icon: <TrendingUp size={24} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    return (
        <div className="p-4 sm:p-8 md:p-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-950 tracking-tight">Overview</h1>
                    <p className="text-slate-500 font-medium mt-1">Global summary of your shop statistics and inventory.</p>
                </div>
                <Link
                    href="/admin/dashboard/new"
                    className="bg-orange-700 text-white px-8 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-orange-800 transition-colors shadow-xl shadow-orange-700/20 active:scale-95"
                >
                    <Plus size={20} /> Add New Product
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-orange-200 transition-colors duration-200">
                        <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-950">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Inventory Section */}
            <div className="bg-white rounded-[2rem] sm:rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-3">
                        {search ? "Search Results" : "Inventory"} <span className="text-sm font-bold bg-slate-50 text-slate-400 px-3 py-1 rounded-full">{productsCount}</span>
                    </h2>
                    <div className="flex items-center gap-4">
                        <DashboardSearch />
                        <button className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
                            <Filter size={20} />
                        </button>
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
                            {recentProducts.length > 0 ? (
                                recentProducts.map((product) => (
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
                                                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Stock Active</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    target="_blank"
                                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-orange-700 transition-all"
                                                >
                                                    <ExternalLink size={20} />
                                                </Link>
                                                <Link
                                                    href={`/admin/dashboard/edit/${product.id}`}
                                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-all"
                                                >
                                                    <Edit size={20} />
                                                </Link>
                                                <DeleteButton id={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                                <ShoppingBag size={40} />
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 mb-2">Inventory is empty</h3>
                                            <p className="text-slate-400 font-medium max-w-xs mx-auto mb-8">Ready to grow? Add your first product to the catalogue.</p>
                                            <Link
                                                href="/admin/dashboard/new"
                                                className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-950/20"
                                            >
                                                Add First Product
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {productsCount > limit && (
                    <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Showing {Math.min(productsCount, (page - 1) * limit + 1)} - {Math.min(productsCount, page * limit)} of {productsCount}
                        </span>
                        <div className="flex items-center gap-2">
                            {page > 1 && (
                                <Link
                                    href={`/admin/dashboard?page=${page - 1}${search ? `&search=${search}` : ''}`}
                                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                    Previous
                                </Link>
                            )}
                            {page < totalPages && (
                                <Link
                                    href={`/admin/dashboard?page=${page + 1}${search ? `&search=${search}` : ''}`}
                                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
