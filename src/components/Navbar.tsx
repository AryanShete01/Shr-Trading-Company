"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Phone, ChevronRight } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}>
            <div className="standard-container">
                <div className={`glass rounded-[2rem] border border-white/20 shadow-xl overflow-hidden px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? "shadow-orange-950/5" : "shadow-transparent"}`}>
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform duration-300">
                            <ShoppingBag className="text-white w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter leading-none text-slate-900">SHREERAJ</span>
                            <span className="text-[10px] font-black tracking-[0.2em] text-orange-600 uppercase leading-none mt-1">Trading Co.</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="w-px h-6 bg-slate-200 mx-4" />
                        <Link
                            href="/contact"
                            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300 active:scale-95"
                        >
                            Get Quote
                            <ChevronRight size={16} />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-600 hover:text-orange-600 transition-colors"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden absolute top-full left-6 right-6 mt-4 transition-all duration-500 ease-spring ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                    <div className="glass rounded-[2.5rem] p-8 border border-white/20 shadow-2xl space-y-6">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-4 rounded-2xl text-lg font-black text-slate-950 hover:bg-orange-50 hover:text-orange-600 transition-all flex items-center justify-between group"
                                >
                                    {link.name}
                                    <ChevronRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                            <Link
                                href="tel:+918306063148"
                                className="flex items-center gap-4 px-6 text-slate-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Phone size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Call Us Now</span>
                                    <span className="font-bold">+91 83060 63148</span>
                                </div>
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-center text-sm uppercase tracking-widest shadow-xl shadow-orange-600/20"
                                onClick={() => setIsOpen(false)}
                            >
                                Inquire Today
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
