import prisma from "@/lib/prisma";
import {
    Plus,
    ShoppingBag,
    MessageSquare,
    TrendingUp,
    Package,
    ArrowUpRight,
    Search,
    Globe,
    ImageIcon,
    Settings,
    ChevronRight,
    Users
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    // Sequential DB ops for safety
    const catalogCount = await prisma.product.count();
    const enquiriesCount = await prisma.enquiry.count();
    const newLeads = await prisma.enquiry.count({ where: { status: "NEW" } });

    const stats = [
        {
            label: "Catalog Entities",
            value: catalogCount,
            icon: <ShoppingBag size={24} />,
            color: "text-red-600",
            bg: "bg-red-50",
            description: "Active high-level categories"
        },
        {
            label: "Active Leads",
            value: newLeads,
            icon: <MessageSquare size={24} />,
            color: "text-blue-600",
            bg: "bg-blue-50",
            description: "Leads awaiting response"
        },
        {
            label: "System Health",
            value: "Optimal",
            icon: <TrendingUp size={24} />,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            description: "Dashboard speed is <100ms"
        },
    ];

    const quickLinks = [
        { name: "Manage Categories", href: "/admin/dashboard/categories", icon: Package, color: "bg-slate-900" },
        { name: "Support Content", href: "/admin/dashboard/pages", icon: Globe, color: "bg-blue-600" },
        { name: "Lead Pipeline", href: "/admin/dashboard/enquiries", icon: MessageSquare, color: "bg-red-600" },
        { name: "Media Assets", href: "/admin/dashboard/media", icon: ImageIcon, color: "bg-purple-600" },
    ];

    return (
        <div className="p-4 sm:p-8 md:p-12 space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Control Center</p>
                    <h1 className="text-4xl sm:text-7xl font-black text-slate-950 tracking-tighter leading-none">
                        DASH<span className="text-red-600 underline decoration-red-600/20 underline-offset-[16px]">BOARD.</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="px-6 py-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Last Sync</p>
                        <p className="text-sm font-black text-slate-950 leading-none">Just now</p>
                    </div>
                    <div className="w-px h-10 bg-slate-100" />
                    <Link
                        href="/"
                        target="_blank"
                        className="bg-slate-50 text-slate-900 px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2"
                    >
                        Live Site <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 group hover:border-red-200 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5">
                        <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 leading-none">{stat.label}</p>
                            <h3 className="text-5xl font-black text-slate-950 tracking-tighter leading-none mb-4">{stat.value}</h3>
                            <p className="text-xs font-bold text-slate-400 leading-none">{stat.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Access & Recent Utility */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight flex items-center gap-3">
                        Quick Access <span className="w-8 h-1 bg-red-600 rounded-full" />
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-red-500/20 hover:shadow-xl transition-all"
                            >
                                <div className={`${link.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                                    <link.icon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-slate-900 text-sm tracking-tight">{link.name}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manager</span>
                                </div>
                                <ChevronRight className="ml-auto text-slate-300 group-hover:text-red-500 transition-colors" size={16} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* System Activity Placeholder */}
                <div className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                        <Settings size={180} />
                    </div>
                    <div className="relative z-10 space-y-8">
                        <div>
                            <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Engine Status</span>
                            <h3 className="text-4xl font-black tracking-tighter leading-none mb-6">Scalability <br />Mode Active.</h3>
                            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                                Your catalog is now optimized for speed. Individual SKU management is disabled to ensure lightning-fast performance across thousands of items.
                            </p>
                        </div>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <Users size={16} className="text-slate-500" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Multi-Admin Syncing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
