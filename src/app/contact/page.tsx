"use client";

import { MapPin, Phone, Mail, Clock, Send, Loader2, MessageCircle, ChevronRight, CheckCircle2, Globe } from "lucide-react";
import { createEnquiry } from "@/lib/actions";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const contactInfo = [
        {
            icon: <MapPin size={24} />,
            title: "Visit Headquarters",
            detail: "Akole-Sangamner Rd, Akole",
            sub: "MH 422601, India",
            link: "https://maps.app.goo.gl/KcAirQutM5FjJBUGA",
            color: "text-orange-600 bg-orange-50"
        },
        {
            icon: <Phone size={24} />,
            title: "Direct Support",
            detail: "+91 83060 63148",
            sub: "Mon-Sat • 9AM - 8PM",
            link: "tel:+918306063148",
            color: "text-blue-600 bg-blue-50"
        },
        {
            icon: <MessageCircle size={24} />,
            title: "Digital Desk",
            detail: "WhatsApp Enquiry",
            sub: "Instant Stock Checks",
            link: "https://wa.me/918306063148",
            color: "text-emerald-600 bg-emerald-50"
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            await createEnquiry(formData);
            toast.success("Enquiry forwarded successfully!");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen selection:bg-orange-100 selection:text-orange-900">
            <Navbar />

            {/* Minimalist Header */}
            <section className="bg-slate-950 pt-48 pb-32 overflow-hidden relative">
                <div className="absolute top-0 right-1/4 w-[60%] h-full bg-orange-600/10 rounded-full blur-[150px] -translate-y-1/2 animate-blob"></div>
                <div className="standard-container relative z-10">
                    <div className="max-w-4xl">
                        <nav className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={12} />
                            <span className="text-orange-500">Contact Protocol</span>
                        </nav>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter leading-[1.1] md:leading-none break-words">
                            LET'S <span className="text-gradient">COMMUNICATE.</span>
                        </h1>
                        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl leading-relaxed px-4 sm:px-0">
                            Have technical specifications to discuss? Our engineering and sales team is standing by to assist with your project requirements.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-20 -mt-16 mb-40">
                <div className="standard-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Information Cards */}
                        <div className="lg:col-span-1 space-y-8">
                            {contactInfo.map((info, idx) => (
                                <a
                                    key={idx}
                                    href={info.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-950/5 border border-slate-100 flex flex-col group hover-lift transition-all"
                                >
                                    <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                        {info.icon}
                                    </div>
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{info.title}</h3>
                                    <p className="text-2xl font-black text-slate-950 tracking-tight leading-none mb-2">{info.detail}</p>
                                    <p className="text-sm font-bold text-slate-500">{info.sub}</p>
                                </a>
                            ))}

                            <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                    <div className="animate-float-slow">
                                        <Globe size={120} />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-black mb-6 tracking-tight relative z-10">Global Sourcing</h4>
                                <p className="text-slate-400 font-medium leading-relaxed relative z-10 mb-8 text-sm">
                                    We facilitate large-scale procurement for infrastructure projects across the MH region.
                                </p>
                                <div className="flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest relative z-10">
                                    <CheckCircle2 size={14} /> Ready for Deployment
                                </div>
                            </div>
                        </div>

                        {/* Interactive Form Side */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl shadow-slate-950/5 border border-slate-100 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                                <div className="md:col-span-12 p-8 sm:p-12 md:p-20">
                                    <div className="mb-12 sm:mb-16">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 mb-4 block mt-4 sm:mt-0">Official Inquiry Form</span>
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-4 sm:mb-6 tracking-tighter leading-tight break-words">SPECIFICATION DESK</h2>
                                        <p className="text-slate-500 text-base sm:text-lg font-medium max-w-xl pr-4 sm:pr-0">
                                            Provide your project details below. Our technical desk will prepare a comprehensive quote including availability status.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                                            <div className="space-y-3 sm:space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Signature / Name</label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    required
                                                    className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-slate-50 border border-transparent focus:bg-white focus:border-slate-200 outline-none transition-all font-black text-sm text-slate-900 placeholder:text-slate-300"
                                                    placeholder="Johnathan Doe"
                                                />
                                            </div>
                                            <div className="space-y-3 sm:space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Terminal / Phone</label>
                                                <input
                                                    name="phone"
                                                    type="text"
                                                    required
                                                    className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-slate-50 border border-transparent focus:bg-white focus:border-slate-200 outline-none transition-all font-black text-sm text-slate-900 placeholder:text-slate-300"
                                                    placeholder="+91 00000 00000"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Division Select</label>
                                            <div className="relative">
                                                <select
                                                    name="category"
                                                    required
                                                    className="w-full px-8 py-6 rounded-3xl bg-slate-50 border border-transparent focus:bg-white focus:border-slate-200 outline-none transition-all font-black text-sm text-slate-900 appearance-none cursor-pointer"
                                                >
                                                    <option>General Material Query</option>
                                                    <option>Industrial Paints</option>
                                                    <option>Hardware & Fasteners</option>
                                                    <option>Electrical Systems</option>
                                                    <option>Plumbing Solutions</option>
                                                </select>
                                                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <ChevronRight className="rotate-90 text-slate-300" size={20} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Requirement Details</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows={5}
                                                className="w-full px-8 py-6 rounded-3xl bg-slate-50 border border-transparent focus:bg-white focus:border-slate-200 outline-none transition-all font-black text-sm text-slate-900 placeholder:text-slate-300 resize-none"
                                                placeholder="Outline your project requirements or specific brand names..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-600 transition-all shadow-3xl flex items-center justify-center gap-4 disabled:opacity-50 group"
                                        >
                                            {loading ? <Loader2 size={24} className="animate-spin" /> : <>TRANSMIT INQUIRY <Send size={18} className="group-hover:translate-l-2 group-hover:-translate-y-1 transition-transform" /></>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industrial Map Section */}
            <section className="mb-40">
                <div className="standard-container">
                    <div className="bg-slate-100 rounded-[2rem] md:rounded-[5rem] overflow-hidden relative aspect-[4/3] sm:aspect-[21/9] min-h-[400px] sm:min-h-[500px] shadow-3xl group">
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000">
                            {/* Map Overlay Image or Placeholder Background */}
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066')] bg-cover bg-center opacity-40"></div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent flex items-center justify-center p-4 sm:p-12 md:p-20">
                            <div className="bg-white/95 w-full rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 max-w-2xl text-center border border-slate-200 shadow-2xl backdrop-blur-2xl hover:scale-105 transition-transform duration-700">
                                <h4 className="text-2xl sm:text-3xl font-black text-slate-950 mb-3 sm:mb-4 tracking-tighter leading-tight">LOCAL HUB LOGISTICS</h4>
                                <p className="text-slate-600 font-medium mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">
                                    Located strategically on the Akole-Sangamner highway for rapid distribution & logistics. Visit our showroom for physical inspection.
                                </p>
                                <a
                                    href="https://maps.app.goo.gl/KcAirQutM5FjJBUGA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-slate-950 text-white px-8 sm:px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all shadow-xl hover:-translate-y-1"
                                >
                                    NAVIGATE TO STORE <MapPin size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
