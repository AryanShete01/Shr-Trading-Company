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
import ProductTableClient from "@/components/ProductTableClient";

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

            {/* Dashboard Content */}
            <ProductTableClient
                initialProducts={JSON.parse(JSON.stringify(recentProducts))}
                totalCount={productsCount}
            />

            {/* Pagination Controls */}
            {productsCount > limit && (
                <div className="mt-8 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex justify-between items-center">
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
    );
}
