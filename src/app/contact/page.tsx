"use client";

import { MapPin, Phone, Mail, Clock, Send, Loader2, MessageCircle, ChevronRight, CheckCircle2, Globe } from "lucide-react";
import { createEnquiry } from "@/lib/actions";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const contactInfo = [
        {
            icon: <MapPin size={24} />,
            title: "Visit Headquarters",
            detail: "Akole-Sangamner Rd, Akole",
            sub: "MH 422601, India",
            link: "https://maps.app.goo.gl/KcAirQutM5FjJBUGA",
            color: "text-red-500 bg-red-500/10"
        },
        {
            icon: <Phone size={24} />,
            title: "Direct Support",
            detail: "+91 99222 34646",
            sub: "Mon-Sat • 9AM - 8PM",
            link: "tel:+919922234646",
            color: "text-blue-500 bg-blue-500/10"
        },
        {
            icon: <MessageCircle size={24} />,
            title: "Digital Desk",
            detail: "WhatsApp Enquiry",
            sub: "Instant Stock Checks",
            link: "https://wa.me/919767287755",
            color: "text-emerald-500 bg-emerald-500/10"
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
        <div className="bg-[#020617] min-h-screen selection:bg-primary selection:text-white">
            <Navbar />

            {/* Minimalist Header */}
            <section className="bg-[#020617] pt-32 pb-24 md:pt-48 md:pb-40 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 w-full h-full bg-primary/5 blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="standard-container relative z-10">
                    <FadeIn delay={0.1} direction="up" className="max-w-4xl">
                        <nav className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                            <Link href="/" prefetch={true} className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={12} />
                            <span className="text-primary">Contact Protocol</span>
                        </nav>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter leading-[1.1] md:leading-none break-words">
                            LET'S <span className="text-gradient">COMMUNICATE.</span>
                        </h1>
                        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl leading-relaxed px-4 sm:px-0">
                            Have technical specifications to discuss? Our engineering and sales team is standing by to assist with your project requirements.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="relative z-20 -mt-16 mb-40">
                <div className="standard-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Information Cards */}
                        <FadeIn delay={0.2} direction="right" className="lg:col-span-1 space-y-8">
                            <StaggerContainer staggerDelay={0.1}>
                                {contactInfo.map((info, idx) => (
                                    <StaggerItem key={idx} className="mb-8">
                                        <a
                                            href={info.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="glass-dark p-10 rounded-[3rem] shadow-2xl shadow-primary/20 border border-white/5 flex flex-col group hover-lift transition-all"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                                {info.icon}
                                            </div>
                                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">{info.title}</h3>
                                            <p className="text-2xl font-black text-white tracking-tight leading-none mb-2">{info.detail}</p>
                                            <p className="text-sm font-bold text-slate-400">{info.sub}</p>
                                        </a>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>

                            <div className="glass-dark p-12 rounded-[3.5rem] text-white overflow-hidden relative group border border-white/5">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                    <div className="animate-float-slow">
                                        <Globe size={120} />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-black mb-6 tracking-tight relative z-10">Global Sourcing</h4>
                                <p className="text-slate-400 font-medium leading-relaxed relative z-10 mb-8 text-sm">
                                    We facilitate large-scale procurement for infrastructure projects across the MH region.
                                </p>
                                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest relative z-10">
                                    <CheckCircle2 size={14} /> Ready for Deployment
                                </div>
                            </div>
                        </FadeIn>

                        {/* Interactive Form Side */}
                        <div className="lg:col-span-2 glass-dark rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl shadow-primary/20 border border-white/5 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                                <div className="md:col-span-12 p-8 sm:p-12 md:p-20">
                                    <div className="mb-12 sm:mb-16">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block mt-4 sm:mt-0">Official Inquiry Form</span>
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-tight break-words">SPECIFICATION DESK</h2>
                                        <p className="text-slate-400 text-base sm:text-lg font-medium max-w-xl pr-4 sm:pr-0">
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
                                                    className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-primary/50 outline-none transition-all font-black text-sm text-white placeholder:text-slate-600"
                                                    placeholder="Johnathan Doe"
                                                />
                                            </div>
                                            <div className="space-y-3 sm:space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Terminal / Phone</label>
                                                <input
                                                    name="phone"
                                                    type="text"
                                                    required
                                                    className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-primary/50 outline-none transition-all font-black text-sm text-white placeholder:text-slate-600"
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
                                                    className="w-full px-8 py-6 rounded-3xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-primary/50 outline-none transition-all font-black text-sm text-white appearance-none cursor-pointer"
                                                >
                                                    <option className="bg-black text-white">General Material Query</option>
                                                    <option className="bg-black text-white">Industrial Paints</option>
                                                    <option className="bg-black text-white">Hardware & Fasteners</option>
                                                    <option className="bg-black text-white">Electrical Systems</option>
                                                    <option className="bg-black text-white">Plumbing Solutions</option>
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
                                                className="w-full px-8 py-6 rounded-3xl bg-white/5 border border-white/10 focus:bg-white/10 focus:border-primary/50 outline-none transition-all font-black text-sm text-white placeholder:text-slate-600 resize-none"
                                                placeholder="Outline your project requirements or specific brand names..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95"
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
                    <FadeIn delay={0.4} direction="up" className="bg-slate-100 rounded-[2rem] md:rounded-[5rem] overflow-hidden relative aspect-[4/3] sm:aspect-[21/9] min-h-[400px] sm:min-h-[500px] shadow-3xl group">
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000">
                            {/* Map Overlay Image or Placeholder Background */}
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066')] bg-cover bg-center opacity-40"></div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-center justify-center p-4 sm:p-12 md:p-20">
                            <div className="glass-dark w-full rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 max-w-2xl text-center border border-white/10 shadow-2xl backdrop-blur-2xl hover:scale-105 transition-transform duration-700">
                                <h4 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tighter leading-tight">LOCAL HUB LOGISTICS</h4>
                                <p className="text-slate-400 font-medium mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">
                                    Located strategically on the Akole-Sangamner highway for rapid distribution & logistics. Visit our showroom for physical inspection.
                                </p>
                                <a
                                    href="https://maps.app.goo.gl/KcAirQutM5FjJBUGA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-red-600 text-white px-8 sm:px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-700 hover:text-white transition-all shadow-xl hover:-translate-y-1"
                                >
                                    NAVIGATE TO STORE <MapPin size={16} />
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SEO Local Authority Section */}
            <section className="py-24 bg-[#020617] border-t border-white/5 relative">
                <div className="standard-container">
                    <FadeIn direction="up">
                        <div className="max-w-4xl mx-auto glass-dark p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
                                Connecting You to the Best Hardware Shop in Akole
                            </h2>
                            <div className="prose prose-invert prose-lg text-slate-400 font-medium leading-relaxed max-w-none space-y-6">
                                <p>
                                    At Shreeraj Trading Company, our doors are always open to discuss your next big project. Strategically located on the Akole-Sangamner Road in Akole, Maharashtra (422601), our hardware store near Akole is positioned precisely where our community needs us most. Whether you need immediate delivery to a site in Ahilyanagar or you wish to view our materials in person, you'll find everything you need.
                                </p>

                                <h3 className="text-2xl font-black text-white mt-12 mb-4">Dedicated Supply Lines for Local Construction</h3>
                                <p>
                                    Trying to find a dependable building materials supplier in Akole? We pride ourselves on maintaining an always-stocked inventory. Since we act as an authorized Berger Paints dealer in Akole, you won't experience back-order delays for essential emulsions, primers, or custom-mixed palettes from our colour shop in Akole.
                                </p>

                                <h3 className="text-2xl font-black text-white mt-12 mb-4">Immediate Access to Plumbing and Electrical Essentials</h3>
                                <p>
                                    We know that mechanical systems can fail unexpectedly. If you urgently need plumbing and electrical items in Akole, simply drop a WhatsApp message to our digital desk (+91 97672 87755). Our inventory specialists will confirm stock instantly, so contractors can retrieve their vital PVC fittings and high-gauge MCBs right away from the best hardware shop in Akole.
                                </p>

                                <h3 className="text-2xl font-black text-white mt-12 mb-4">Authentic Local Presence</h3>
                                <p>
                                    We are dedicated exclusively to providing premium support to our area. Operating as an established hardware shop in Akole allows us to know the precise climatic and structural demands of Maharashtra's architecture. Contact us today via phone or visit the store to speak with our trained technical team, and experience the standard of service that has made Shreeraj Trading Company the most trusted name in regional construction supply since 1995.
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
}
