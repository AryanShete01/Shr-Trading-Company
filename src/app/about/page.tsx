import { ShieldCheck, Users, TrendingUp, Handshake, MapPin, Phone, MessageCircle, Star, Search, BadgeCheck, Briefcase } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default function AboutPage() {
    return (
        <div className="bg-[#020617] min-h-screen selection:bg-fuchsia-500 selection:text-white">
            <Navbar />

            {/* Immersive Header */}
            <section className="py-24 sm:py-32 relative overflow-hidden bg-[#020617]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full animate-pulse-slow"></div>

                <div className="standard-container relative z-10 text-center">
                    <FadeIn delay={0.1} direction="up" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 mb-10 font-black text-[10px] uppercase tracking-[0.3em]">
                        Establishment 1995
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up">
                        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-6 sm:mb-10 tracking-tighter leading-[1.1] md:leading-none break-words">
                            FOUNDED ON <br /><span className="text-gradient">EXCELLENCE.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.3} direction="up">
                        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                            Supplying the backbone of local construction for over two decades. We are the preferred partner for contractors, painters, and artisans.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Core Pillars - Overlapping Section */}
            <section className="relative z-20 -mt-12 md:-mt-24 mb-20 md:mb-40">
                <div className="standard-container">
                    <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Genuine Sourcing",
                                desc: "Every product is direct from the manufacturer, guaranteeing authenticity and warranty support.",
                                icon: <BadgeCheck size={40} />,
                                color: "bg-red-500/10 text-red-500"
                            },
                            {
                                title: "Community First",
                                desc: "We prioritize local projects and contractors, fostering growth in our regional economy.",
                                icon: <Users size={40} />,
                                color: "bg-blue-500/10 text-blue-500"
                            },
                            {
                                title: "Technical Expertise",
                                desc: "Our staff holds deep technical knowledge across paints, plumbing, and electrical codes.",
                                icon: <Search size={40} />,
                                color: "bg-emerald-500/10 text-emerald-500"
                            }
                        ].map((pillar, i) => (
                            <StaggerItem key={i} className="h-full">
                                <div
                                    className="h-full glass-dark p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-red-950/20 border border-white/5 hover-lift group"
                                >
                                    <div className={`w-16 h-16 md:w-20 md:h-20 ${pillar.color} rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 transition-transform duration-500`}>
                                        {pillar.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">{pillar.title}</h3>
                                    <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Legacy Section */}
            <section className="py-20 md:py-40 bg-slate-50/50">
                <div className="standard-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <FadeIn direction="up">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-red-600 rounded-[2rem] md:rounded-[4rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700"></div>
                                <div className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-3xl bg-[#020617] p-2 border border-white/5">
                                    <img
                                        src="/images/about/shop.jpg"
                                        alt="Shreeraj Trading Company Storefront"
                                        className="w-full h-auto max-h-[80vh] object-contain rounded-[1.5rem] md:rounded-[3.5rem] group-hover:scale-[1.02] transition-transform duration-1000"
                                    />
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.2}>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 mb-6 block">Our Legacy Story</span>
                                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 sm:mb-10 tracking-tighter leading-[1.1] md:leading-[0.9] break-words">
                                    MORE THAN A <br /><span className="text-slate-400">SUPPLIER.</span>
                                </h2>
                                <div className="space-y-6 sm:space-y-8 text-lg sm:text-xl text-slate-400 font-medium leading-relaxed mb-10">
                                    <p>
                                        Shreeraj Trading Company began with a singular mission: to eliminate the friction in high-end construction by providing immediate access to premium materials.
                                    </p>
                                    <p>
                                        Over the decades, we have evolved from a local hardware shop into a regional authority on paints, plumbing components, and industrial-grade fasteners. Our growth is mirrored by the skylines of the communities we serve.
                                    </p>
                                </div>

                                <div className="mb-12 p-6 rounded-[2rem] bg-white/5 border border-white/10 border-l-4 border-l-red-500">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Founded By</p>
                                    <p className="text-xl sm:text-2xl font-black text-white tracking-tight">Vikasrao Shete <span className="text-red-500 mx-2">&</span> Vijay Shete</p>
                                </div>

                                <div className="flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-6 mt-12 sm:mt-16">
                                    <div className="flex items-center gap-4 glass-dark px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border border-white/5 shadow-sm w-full sm:w-auto">
                                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                            <Briefcase size={20} />
                                        </div>
                                        <span className="font-black text-xs uppercase tracking-widest text-white">Trade Certified</span>
                                    </div>
                                    <div className="flex items-center gap-4 glass-dark px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border border-white/5 shadow-sm w-full sm:w-auto">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Star size={20} />
                                        </div>
                                        <span className="font-black text-xs uppercase tracking-widest text-white">Premium Dealer</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-20 md:py-32 bg-[#020617] border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full"></div>

                <div className="standard-container relative z-10">
                    <div className="text-center mb-16 sm:mb-24">
                        <FadeIn direction="up">
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-6 block">Authorised Network</span>
                            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
                                CERTIFIED <span className="text-slate-500">PARTNERSHIPS.</span>
                            </h2>
                            <p className="text-slate-400 font-medium max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed px-4">
                                We are officially recognized and authorized direct dealers for the most trusted brands in the construction and home improvement industry.
                            </p>
                        </FadeIn>
                    </div>

                    <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 sm:px-0">
                        {[
                            { img: "/images/about/cert_asian.png", title: "Asian Paints" },
                            { img: "/images/about/cert_finolex.png", title: "Finolex Pipes" },
                            { img: "/images/about/cert_nerolac.png", title: "Kansai Nerolac" },
                        ].map((cert, i) => (
                            <StaggerItem key={i}>
                                <div className="group relative aspect-[4/3] rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 shadow-3xl hover:-translate-y-4 transition-all duration-500 flex items-center justify-center p-4 sm:p-6">
                                    <img
                                        src={cert.img}
                                        alt={`${cert.title} Certificate`}
                                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 relative z-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent pointer-events-none z-10"></div>
                                    <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-20 pointer-events-none">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 flex items-center justify-center mb-4 sm:mb-6">
                                            <BadgeCheck size={20} className="text-blue-400" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-widest">{cert.title}</h3>
                                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Authorised Dealership</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Powerful Call to Action */}
            <section className="py-16 sm:py-24 md:py-40 bg-black">
                <div className="standard-container">
                    <div className="relative rounded-[2.5rem] sm:rounded-[5rem] overflow-hidden p-6 sm:p-12 md:p-32 text-center bg-black">
                        <div className="absolute inset-0 z-0 scale-125 opacity-20 bg-[url('https://images.unsplash.com/photo-1513467535987-fd81bc206228?q=80&w=1932')] bg-cover"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-transparent z-10"></div>

                        <FadeIn direction="up" delay={0.2} className="relative z-20 max-w-4xl mx-auto">
                            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 sm:mb-10 tracking-tighter leading-[1.1] md:leading-none break-words">
                                JOIN THE <span className="text-red-600 underline decoration-white/10 underline-offset-8">COMMUNITY.</span>
                            </h2>
                            <p className="text-slate-400 text-lg sm:text-xl md:text-2xl mb-12 sm:mb-16 font-medium leading-relaxed px-4 sm:px-0">
                                Whether you're a first-time homeowner or a seasoned civil engineer, we have the tools for your success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center px-4 sm:px-0">
                                <Link
                                    href="/products"
                                    className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-7 rounded-2xl sm:rounded-3xl bg-white text-black font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-3xl flex items-center justify-center gap-4"
                                >
                                    Browse Materials <TrendingUp size={18} className="text-red-600" />
                                </Link>
                                <a
                                    href="tel:+919922234646"
                                    className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-7 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] backdrop-blur-xl hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                                >
                                    Quick Call <Phone size={18} className="text-red-500" />
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
