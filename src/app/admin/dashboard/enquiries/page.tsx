import prisma from "@/lib/prisma";
import {
    MessageSquare,
    Phone,
    Clock,
    ChevronRight,
    ExternalLink,
    CheckCircle2,
    Clock4,
    FolderTree,
    ArrowRight,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
    const rawEnquiries = await prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            phone: true,
            message: true,
            status: true,
            createdAt: true,
            product: {
                select: {
                    id: true,
                    name: true,
                    category: true,
                }
            }
        }
    });

    // Grouping logic
    const grouped = rawEnquiries.reduce((acc, enquiry) => {
        const category = enquiry.product?.category || "General Inquiries";
        if (!acc[category]) acc[category] = [];
        acc[category].push(enquiry);
        return acc;
    }, {} as Record<string, typeof rawEnquiries>);

    const categories = Object.keys(grouped).sort();

    return (
        <div className="p-4 sm:p-8 md:p-12 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
                <div className="space-y-4">
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                        <Link href="/admin/dashboard" className="hover:text-red-500 transition-colors">Admin</Link>
                        <span className="opacity-50">/</span>
                        <span className="text-red-500">Customer Communication</span>
                    </nav>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tighter leading-none">
                        LEAD <span className="text-red-600 underline decoration-red-600/20 underline-offset-[12px]">GEN.</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-4 bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="px-6 py-4 hidden sm:block">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                            <p className="text-sm font-black text-slate-950 leading-none">Online</p>
                        </div>
                        <div className="w-px h-10 bg-slate-100 hidden sm:block" />
                        <Link
                            href="/"
                            target="_blank"
                            className="bg-slate-50 text-slate-900 px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2"
                        >
                            Live Site <ArrowUpRight size={14} />
                        </Link>
                    </div>

                    <div className="bg-white px-8 py-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-950 leading-none">{rawEnquiries.length}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Leads</span>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-emerald-600 leading-none">
                                {rawEnquiries.filter(e => e.status === "NEW").length}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pending</span>
                        </div>
                    </div>
                </div>
            </div>

            {categories.length > 0 ? (
                <div className="space-y-20">
                    {categories.map((catName) => (
                        <div key={catName} className="space-y-8">
                            <div className="flex items-center gap-4 px-2">
                                <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-lg">
                                    <FolderTree size={18} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-950 tracking-tight leading-none uppercase">{catName}</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                        {grouped[catName].length} enquiries in this division
                                    </p>
                                </div>
                                <div className="flex-1 border-b border-dashed border-slate-200 ml-4" />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {grouped[catName].map((enquiry) => (
                                    <div key={enquiry.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:border-red-200 transition-all duration-300">
                                        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
                                            {/* Lead Profile */}
                                            <div className="p-8 md:w-80 shrink-0 bg-slate-50/20">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xl shadow-inner uppercase">
                                                        {enquiry.name.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-slate-950 text-lg leading-tight">{enquiry.name}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5 leading-none">
                                                            <Clock size={12} className="text-slate-300" />
                                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-50">
                                                        <Phone size={16} className="text-red-400" />
                                                        {enquiry.phone}
                                                    </div>
                                                    <div>
                                                        {enquiry.status === "NEW" ? (
                                                            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-4 py-2 rounded-full w-fit shadow-lg shadow-red-600/20">
                                                                <Clock4 size={14} /> Active Lead
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-4 py-2 rounded-full w-fit">
                                                                <CheckCircle2 size={14} /> Responded
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Details & Action */}
                                            <div className="p-8 flex-1 flex flex-col justify-between gap-8">
                                                <div className="space-y-6">
                                                    {enquiry.product && (
                                                        <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 w-fit">
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Interested In:</span>
                                                            <span className="text-sm font-black text-slate-900 leading-none">{enquiry.product.name}</span>
                                                            <Link href={`/products/${enquiry.product.id}`} target="_blank" className="text-red-600 hover:scale-110 transition-transform ml-2">
                                                                <ExternalLink size={14} />
                                                            </Link>
                                                        </div>
                                                    )}
                                                    <div className="relative">
                                                        <span className="absolute -top-4 -left-2 text-6xl text-slate-100 font-serif leading-none opacity-50">“</span>
                                                        <p className="text-lg text-slate-600 leading-relaxed font-medium relative z-10 px-4">
                                                            {enquiry.message}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-50">
                                                    <a
                                                        href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`}
                                                        target="_blank"
                                                        className="w-full sm:w-auto bg-slate-950 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-950/20 flex items-center justify-center gap-3 group/btn active:scale-95"
                                                    >
                                                        Insta-Reply <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                    </a>

                                                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors py-2 px-4">
                                                        Archive Conversation
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm max-w-2xl mx-auto">
                    <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center text-slate-200 mx-auto mb-8 shadow-inner">
                        <MessageSquare size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-950 mb-3 tracking-tighter">Horizon is Clear.</h3>
                    <p className="text-slate-400 font-medium px-12 leading-relaxed">No customer leads grouped in categories yet. New enquiries will populate this industrial pipeline automatically.</p>
                </div>
            )}
        </div>
    );
}
