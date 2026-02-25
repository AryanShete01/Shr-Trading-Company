import { ShieldCheck, Users, TrendingUp, Handshake, MapPin, Phone, MessageCircle, Star, Search, BadgeCheck, Briefcase } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen selection:bg-orange-100 selection:text-orange-900">
            <Navbar />

            {/* Immersive Header */}
            <section className="bg-slate-950 pt-48 pb-40 overflow-hidden relative">
                <div className="absolute top-0 left-1/4 w-[50%] h-full bg-orange-600/10 rounded-full blur-[150px] -translate-y-1/2 animate-blob"></div>

                <div className="standard-container relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 mb-10 font-black text-[10px] uppercase tracking-[0.3em]">
                        Establishment 1995
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 sm:mb-10 tracking-tighter leading-[1.1] md:leading-none break-words">
                        FOUNDED ON <br /><span className="text-gradient">EXCELLENCE.</span>
                    </h1>
                    <p className="text-slate-400 text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                        Supplying the backbone of local construction for over two decades. We are the preferred partner for contractors, painters, and artisans.
                    </p>
                </div>
            </section>

            {/* Core Pillars - Overlapping Section */}
            <section className="relative z-20 -mt-24 mb-40">
                <div className="standard-container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Genuine Sourcing",
                                desc: "Every product is direct from the manufacturer, guaranteeing authenticity and warranty support.",
                                icon: <BadgeCheck size={40} />,
                                color: "bg-orange-50 text-orange-600"
                            },
                            {
                                title: "Community First",
                                desc: "We prioritize local projects and contractors, fostering growth in our regional economy.",
                                icon: <Users size={40} />,
                                color: "bg-blue-50 text-blue-600"
                            },
                            {
                                title: "Technical Expertise",
                                desc: "Our staff holds deep technical knowledge across paints, plumbing, and electrical codes.",
                                icon: <Search size={40} />,
                                color: "bg-emerald-50 text-emerald-600"
                            }
                        ].map((pillar, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-slate-950/5 border border-slate-100 hover-lift group animate-in"
                                style={{ animationDelay: `${i * 150}ms` }}
                            >
                                <div className={`w-16 h-16 md:w-20 md:h-20 ${pillar.color} rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 transition-transform duration-500`}>
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-950 mb-4 tracking-tight">{pillar.title}</h3>
                                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Legacy Section */}
            <section className="py-40 bg-slate-50/50">
                <div className="standard-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-orange-600 rounded-[4rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700"></div>
                            <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-3xl bg-slate-100">
                                <img
                                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                                    alt="Legacy Workspace"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                                <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 glass rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col sm:flex-row justify-between items-center text-white border-white/20 gap-6 sm:gap-0">
                                    <div className="text-center">
                                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1 md:mb-2">Established</p>
                                        <p className="text-xl md:text-3xl font-black">1995</p>
                                    </div>
                                    <div className="hidden sm:block w-px h-12 bg-white/20"></div>
                                    <div className="text-center">
                                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1 md:mb-2">Inventory Items</p>
                                        <p className="text-xl md:text-3xl font-black">5000+</p>
                                    </div>
                                    <div className="hidden sm:block w-px h-12 bg-white/20"></div>
                                    <div className="text-center">
                                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-orange-400 mb-1 md:mb-2">Projects Served</p>
                                        <p className="text-xl md:text-3xl font-black">2.5k+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600 mb-6 block">Our Legacy Story</span>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-950 mb-8 sm:mb-10 tracking-tighter leading-[1.1] md:leading-[0.9] break-words">
                                MORE THAN A <br /><span className="text-slate-400">SUPPLIER.</span>
                            </h2>
                            <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-12">
                                <p>
                                    Shreeraj Trading Company began with a singular mission: to eliminate the friction in high-end construction by providing immediate access to premium materials.
                                </p>
                                <p>
                                    Over the decades, we have evolved from a local hardware shop into a regional authority on paints, plumbing components, and industrial-grade fasteners. Our growth is mirrored by the skylines of the communities we serve.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6 mt-16">
                                <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <Briefcase size={20} />
                                    </div>
                                    <span className="font-black text-xs uppercase tracking-widest text-slate-900">Trade Certified</span>
                                </div>
                                <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Star size={20} />
                                    </div>
                                    <span className="font-black text-xs uppercase tracking-widest text-slate-900">Premium Dealer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Powerful Call to Action */}
            <section className="py-24 sm:py-32 md:py-40">
                <div className="standard-container">
                    <div className="relative rounded-[3rem] sm:rounded-[5rem] overflow-hidden p-8 sm:p-16 md:p-32 text-center bg-slate-950">
                        <div className="absolute inset-0 z-0 scale-125 opacity-20 bg-[url('https://images.unsplash.com/photo-1513467535987-fd81bc206228?q=80&w=1932')] bg-cover"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-transparent z-10"></div>

                        <div className="relative z-20 max-w-4xl mx-auto">
                            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 sm:mb-10 tracking-tighter leading-[1.1] md:leading-none break-words">
                                JOIN THE <span className="text-orange-500 underline decoration-white/10 underline-offset-8">COMMUNITY.</span>
                            </h2>
                            <p className="text-slate-400 text-lg sm:text-xl md:text-2xl mb-12 sm:mb-16 font-medium leading-relaxed px-4 sm:px-0">
                                Whether you're a first-time homeowner or a seasoned civil engineer, we have the tools for your success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center px-4 sm:px-0">
                                <Link
                                    href="/products"
                                    className="w-full sm:w-auto px-12 py-7 rounded-3xl bg-white text-slate-950 font-black text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-3xl flex items-center justify-center gap-4"
                                >
                                    Browse Materials <TrendingUp size={18} className="text-orange-600" />
                                </Link>
                                <a
                                    href="tel:+918306063148"
                                    className="w-full sm:w-auto px-12 py-7 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-[0.2em] backdrop-blur-xl hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                                >
                                    Quick Call <Phone size={18} className="text-orange-500" />
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
