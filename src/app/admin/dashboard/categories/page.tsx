import prisma from "@/lib/prisma";
import ProductTableClient from "@/components/ProductTableClient";
import Link from "next/link";
import { Plus, LayoutDashboard, ShoppingBag, FolderTree, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoriesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const search = resolvedSearchParams?.search as string | undefined;

    const categories = await prisma.product.findMany({
        where: search ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
            ]
        } : undefined,
        orderBy: { category: 'asc' }
    });

    return (
        <div className="p-4 sm:p-8 md:p-12 space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
                <div className="space-y-4">
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                        <Link href="/admin/dashboard" className="hover:text-red-500 transition-colors">Admin</Link>
                        <span className="opacity-50">/</span>
                        <span className="text-red-500">Catalog Categories</span>
                    </nav>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tighter leading-none">
                        MANAGE <span className="text-red-600 underline decoration-red-600/20 underline-offset-[12px]">CATALOG.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm self-start md:self-auto">
                    <div className="px-6 py-4 hidden sm:block">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Last Sync</p>
                        <p className="text-sm font-black text-slate-950 leading-none">Just now</p>
                    </div>
                    <div className="w-px h-10 bg-slate-100 hidden sm:block" />
                    <Link
                        href="/"
                        target="_blank"
                        className="bg-slate-50 text-slate-900 px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2"
                    >
                        Live Site <ArrowUpRight size={14} />
                    </Link>
                    <div className="w-px h-10 bg-slate-100" />
                    <Link
                        href="/admin/dashboard/new"
                        className="bg-slate-950 text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
                    >
                        <Plus size={14} /> New Entry
                    </Link>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                        <ShoppingBag size={24} />
                    </div>
                    <p className="text-4xl font-black text-slate-950 tracking-tighter">{categories.length}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Catalog Entities</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                        <FolderTree size={24} />
                    </div>
                    <p className="text-4xl font-black text-slate-950 tracking-tighter">
                        {new Set(categories.map(c => c.category)).size}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Parent Categories</p>
                </div>
            </div>

            {/* Main Listing (Repurposing ProductTableClient for now as it handles the logic) */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl font-black text-slate-950 tracking-tight">Catalog Management</h2>
                </div>
                <ProductTableClient
                    initialProducts={JSON.parse(JSON.stringify(categories))}
                    totalCount={categories.length}
                />
            </div>

            {/* Warning / Context Note */}
            <div className="bg-red-50 border border-red-100 p-8 rounded-[2.5rem]">
                <h3 className="text-red-900 font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Plus size={16} /> Scalability Mode Active
                </h3>
                <p className="text-red-700/80 text-sm font-medium leading-relaxed">
                    You are currently managing high-level catalog entities rather than individual SKUs.
                    This keeps the admin panel extremely fast and allows the website to handle thousands of items through structured category pages.
                </p>
            </div>
        </div>
    );
}
