"use client";

import { FileText, ChevronLeft, Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PagesManagementPlaceholder() {
    return (
        <div className="p-4 sm:p-8 md:p-12 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4">
                    <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <ChevronLeft size={14} /> Back to Overview
                    </Link>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tighter leading-none">
                        STATIC <span className="text-red-600 underline decoration-red-600/20 underline-offset-[12px]">PAGES.</span>
                    </h1>
                </div>

                <Link
                    href="/"
                    target="_blank"
                    className="bg-white text-slate-900 px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest border border-slate-100 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                    Live Site <ArrowUpRight size={14} />
                </Link>
            </div>

            <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-8">
                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center shadow-inner">
                    <FileText size={48} />
                </div>
                <div className="max-w-md space-y-4">
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight">Content Management System</h2>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        The ability to edit About Us, Contact, and Privacy pages is being integrated into this section for a seamless brand experience.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 bg-slate-50 px-6 py-3 rounded-2xl">
                    <Lock size={14} /> Maintenance Lock Active
                </div>
            </div>
        </div>
    );
}
