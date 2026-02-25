import prisma from "@/lib/prisma";
import {
    MessageSquare,
    User,
    Phone,
    Clock,
    ChevronRight,
    ExternalLink,
    CheckCircle2,
    Clock4
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
    const enquiries = await prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
            product: true
        }
    });

    return (
        <div className="p-4 sm:p-8 md:p-10 pb-20">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-950 tracking-tight">Customer Enquiries</h1>
                <p className="text-slate-500 font-medium mt-1">Manage and respond to messages from your website visitors.</p>
            </div>

            {/* Enquiries List */}
            <div className="grid grid-cols-1 gap-6">
                {enquiries.length > 0 ? (
                    enquiries.map((enquiry) => (
                        <div key={enquiry.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:border-orange-200 transition-all duration-300">
                            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
                                {/* Left Content: User Info */}
                                <div className="p-6 sm:p-8 md:w-80 shrink-0 bg-slate-50/30">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-black">
                                            {enquiry.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 leading-tight">{enquiry.name}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                                                <Clock size={10} /> {new Date(enquiry.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                            <Phone size={16} className="text-slate-400" />
                                            {enquiry.phone}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {enquiry.status === "NEW" ? (
                                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
                                                    <Clock4 size={12} /> New Lead
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full">
                                                    <CheckCircle2 size={12} /> Closed
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content: Message & Action */}
                                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        {enquiry.product && (
                                            <div className="mb-4 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-fit">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enquired for:</span>
                                                <span className="text-sm font-bold text-slate-900">{enquiry.product.name}</span>
                                                <Link href={`/products/${enquiry.product.id}`} target="_blank" className="text-orange-700 hover:scale-110 transition-transform">
                                                    <ExternalLink size={14} />
                                                </Link>
                                            </div>
                                        )}
                                        <p className="text-slate-600 leading-relaxed font-medium italic">
                                            "{enquiry.message}"
                                        </p>
                                    </div>

                                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                                        <a
                                            href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            className="bg-slate-950 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
                                        >
                                            Reply on WhatsApp <ChevronRight size={14} />
                                        </a>

                                        <button className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors">
                                            Mark as Responded
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-32 text-center bg-white rounded-[48px] border border-slate-100 shadow-sm">
                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-8">
                            <MessageSquare size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tight">Quiet day today?</h3>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto">No customer enquiries have been received yet. They will appear here once someone fills the contact form.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
