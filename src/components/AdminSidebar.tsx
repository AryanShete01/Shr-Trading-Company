"use client";

import Link from "next/link";
import { LayoutDashboard, ShoppingBag, MessageSquare, Globe, LogOut, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            active: pathname === "/admin/dashboard",
        },
        {
            name: "Products Management",
            href: "/admin/dashboard", // Assuming this is the same for now, or could be a specific route
            icon: ShoppingBag,
            active: false, // Placeholder for specific routes
        },
        {
            name: "Customer Enquiries",
            href: "/admin/dashboard/enquiries",
            icon: MessageSquare,
            active: pathname === "/admin/dashboard/enquiries",
        },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-[60] bg-slate-950 text-white p-3 rounded-xl shadow-xl"
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[55]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`w-72 bg-slate-950 text-white flex flex-col fixed h-full z-[60] transition-transform duration-300 font-sans ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div className="p-8">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-orange-700 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:scale-110 transition-transform shadow-lg shadow-orange-700/20">S</div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black tracking-tighter leading-none">ADMIN <span className="text-orange-500">PANEL</span></span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Shreeraj Trading Co.</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden text-slate-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-sm transition-all group ${item.active
                                    ? "bg-white/10 text-white shadow-lg"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon size={20} className={`${item.active ? "text-orange-500" : "group-hover:text-orange-400 transition-colors"}`} />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-8 space-y-4">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-400 font-bold text-sm transition-all hover:bg-white/5 hover:text-white border border-white/5 group"
                    >
                        <Globe size={20} className="group-hover:text-blue-400 transition-colors" />
                        View Website
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500/80 font-bold text-sm transition-all hover:bg-red-500/10 hover:text-red-400 group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
