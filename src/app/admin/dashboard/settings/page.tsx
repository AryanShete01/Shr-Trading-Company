"use client";

import { Settings, ChevronLeft, ShieldCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SettingsPlaceholder() {
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
                        GLOBAL <span className="text-red-600 underline decoration-red-600/20 underline-offset-[12px]">CONFIG.</span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10 group">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <Settings size={32} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-950 tracking-tight leading-tight">Admin Profile <br />& Security</h2>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Password resets and two-factor authentication management.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10 group">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <ShieldCheck size={32} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-950 tracking-tight leading-tight">Shop Metadata <br />& Contact Details</h2>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Central control for WhatsApp number, business email, and address.
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center py-12">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Configuration Module V1.0</p>
            </div>
        </div>
    );
}
