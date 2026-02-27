"use client";

import { ImageIcon, ChevronLeft, Cog, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MediaLibraryPlaceholder() {
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
                        ASSET <span className="text-red-600 underline decoration-red-600/20 underline-offset-[12px]">LIBRARY.</span>
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
                <div className="w-24 h-24 bg-purple-50 text-purple-600 rounded-[2rem] flex items-center justify-center shadow-inner">
                    <ImageIcon size={48} />
                </div>
                <div className="max-w-md space-y-4">
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight">Cloud Migration In-Progress</h2>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        We are centralizing all Supabase assets here. Currently, images are managed directly within the Catalog Category editor for maximum speed.
                    </p>
                </div>
                <div className="animate-spin text-slate-200">
                    <Cog size={48} />
                </div>
            </div>
        </div>
    );
}
