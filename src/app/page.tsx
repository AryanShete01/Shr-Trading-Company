import Link from "next/link";
import {
  ArrowRight,
  Paintbrush,
  Hammer,
  Zap,
  Droplets,
  ShieldCheck,
  Clock,
  Users,
  MessageCircle,
  MapPin,
  ChevronRight,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const categories = [
    {
      name: "Paints & Colours",
      icon: <Paintbrush className="w-8 h-8" />,
      href: "/products?cat=paints",
      description: "Premium interior & exterior emulsions, brushes, and specialized coatings.",
      color: "from-blue-500 to-indigo-600",
      lightColor: "bg-blue-50 text-blue-700"
    },
    {
      name: "Hardware Tools",
      icon: <Hammer className="w-8 h-8" />,
      href: "/products?cat=hardware",
      description: "Professional grade hand tools, power tools, and high-tensile fasteners.",
      color: "from-orange-500 to-red-600",
      lightColor: "bg-orange-50 text-orange-700"
    },
    {
      name: "Electrical Items",
      icon: <Zap className="w-8 h-8" />,
      href: "/products?cat=electrical",
      description: "Original wiring, modular switches, MCBs, and lighting solutions.",
      color: "from-yellow-400 to-orange-500",
      lightColor: "bg-yellow-50 text-yellow-700"
    },
    {
      name: "Plumbing Materials",
      icon: <Droplets className="w-8 h-8" />,
      href: "/products?cat=plumbing",
      description: "Durable pipes, precise fittings, and modern bathroom fixtures.",
      color: "from-cyan-400 to-blue-500",
      lightColor: "bg-cyan-50 text-cyan-700"
    },
  ];

  const trustBadges = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Genuine Products",
      desc: "Authorized dealer for leading brands including Asian Paints, Astral & Anchor."
    },
    {
      icon: <Star size={40} />,
      title: "Premium Quality",
      desc: "We stock only ISI marked and industry-certified building materials."
    },
    {
      icon: <Clock size={40} />,
      title: "Since 1995",
      desc: "Over 25 years of delivering trust and quality materials to local contractors."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden bg-slate-950">
        {/* Advanced Background Layers */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/40 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px]"></div>
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
            alt="Hardware Background"
            className="w-full h-full object-cover opacity-30 transform scale-110 motion-safe:animate-[zoom_60s_infinite_alternate]"
          />
        </div>

        <div className="standard-container relative z-20">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-500 mb-10 animate-in">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Trusted Since 1995</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1] tracking-tighter animate-in">
              BUILDING <br />
              <span className="text-gradient">EXCELLENCE.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium animate-in [animation-delay:200ms]">
              Your premier gateway to industrial-grade hardware, professional paints, and innovative building solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-in [animation-delay:400ms]">
              <Link
                href="/products"
                className="group px-10 py-6 rounded-3xl bg-orange-600 text-white font-black text-sm uppercase tracking-widest hover:bg-orange-700 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-orange-600/20 flex items-center justify-center gap-3"
              >
                Browse Inventory <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="px-10 py-6 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest backdrop-blur-md hover:bg-white/10 transition-all text-center flex items-center justify-center gap-3"
              >
                Contact Shop <MapPin size={18} className="text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Badges Section */}
      <section className="relative z-30 -mt-24 mb-32">
        <div className="standard-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, i) => (
              <div
                key={badge.title}
                className="glass rounded-[3rem] p-10 border border-white/10 shadow-2xl hover-lift group animate-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                  {badge.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{badge.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Grid Section */}
      <section className="py-32 bg-slate-50/50">
        <div className="standard-container">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600 mb-4 block">Product Ecosystem</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-8 tracking-tighter leading-none">
                CURATED FOR <br /><span className="text-slate-400">PROFESSIONALS.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                We bridge the gap between world-class manufacturers and local craftsmanship. Explore our specialized divisions.
              </p>
            </div>
            <Link
              href="/products"
              className="group px-8 py-5 rounded-2xl bg-white border border-slate-200 text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all duration-500 shadow-sm flex items-center gap-3"
            >
              Full Catalogue <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all duration-700 overflow-hidden flex flex-col h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}></div>

                <div className={`${cat.lightColor} w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-black/5`}>
                  {cat.icon}
                </div>

                <h4 className="text-3xl font-black text-slate-950 mb-4 tracking-tighter leading-tight">{cat.name}</h4>
                <p className="text-slate-500 font-medium leading-relaxed mb-10 h-12">
                  {cat.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Explore Collection</span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured CTA Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-slate-100/50 -rotate-3 z-0"></div>
        <div className="standard-container relative z-10">
          <div className="relative rounded-[5rem] overflow-hidden p-16 md:p-32 text-center bg-slate-950 shadow-3xl">
            <div className="absolute inset-0 opacity-40">
              <img
                src="https://images.unsplash.com/photo-1513467535987-fd81bc206228?q=80&w=1932"
                alt="Store Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/60 to-slate-950/80"></div>
            </div>

            <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl p-5 rounded-[2rem] mb-12 text-white shadow-2xl animate-bounce">
                <MessageCircle size={40} className="fill-orange-500 text-orange-500" />
              </div>

              <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">
                BUILD YOUR <br /><span className="text-orange-500">LEGACY.</span>
              </h2>

              <p className="text-slate-300 text-xl md:text-2xl mb-16 font-medium leading-relaxed max-w-2xl">
                Ready to elevate your project? Get instant quotes and expert advice via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto">
                <a
                  href="https://wa.me/918306063148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-12 py-7 rounded-3xl bg-white text-slate-950 font-black text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 group"
                >
                  Message Desk <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="px-12 py-7 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-center flex items-center justify-center gap-4"
                >
                  Our Location <MapPin size={20} className="text-orange-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
