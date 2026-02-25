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
                <div className={`glass rounded-[2rem] border border-white/10 shadow-xl overflow-hidden px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? "shadow-primary/20" : "shadow-transparent"}`}>
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                            <ShoppingBag className="text-white w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter leading-none text-white">SHREERAJ</span>
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase leading-none mt-1">Trading Co.</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2.5 rounded-full text-sm font-bold text-slate-400 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="w-px h-6 bg-white/10 mx-4" />
                        <Link
                            href="/contact"
                            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95"
                        >
                            Get Quote
                            <ChevronRight size={16} />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden absolute top-full left-6 right-6 mt-4 transition-all duration-500 ease-spring ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
                    <div className="glass-dark rounded-[2.5rem] p-8 border border-white/10 shadow-2xl space-y-6">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-4 rounded-2xl text-lg font-black text-white hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-between group"
                                >
                                    {link.name}
                                    <ChevronRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                            <Link
                                href="tel:+919922234646"
                                className="flex items-center gap-4 px-6 text-slate-400"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Phone size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Call Us Now</span>
                                    <span className="font-bold">+91 99222 34646</span>
                                </div>
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-center text-sm uppercase tracking-widest shadow-xl shadow-primary/20"
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
