import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "Hardware Shop in Akole | Berger Paints Dealer | Shreeraj Trading Company",
  description: "Looking for the best hardware shop in Akole? Shreeraj Trading Company is your trusted building materials supplier in Akole for hardware, plumbing and electrical items, and Berger paints.",
};

export default function Home() {
  const categories = [
    {
      name: "Paints & Colours",
      icon: <Paintbrush className="w-8 h-8" />,
      href: "/products?cat=paints",
      description: "Premium interior & exterior emulsions, brushes, and specialized coatings.",
      color: "from-primary to-secondary",
      lightColor: "bg-primary/10 text-primary"
    },
    {
      name: "Hardware Tools",
      icon: <Hammer className="w-8 h-8" />,
      href: "/products?cat=hardware",
      description: "Professional grade hand tools, power tools, and high-tensile fasteners.",
      color: "from-secondary to-accent",
      lightColor: "bg-secondary/10 text-secondary"
    },
    {
      name: "Electrical Items",
      icon: <Zap className="w-8 h-8" />,
      href: "/products?cat=electrical",
      description: "Original wiring, modular switches, MCBs, and lighting solutions.",
      color: "from-accent to-primary",
      lightColor: "bg-accent/10 text-accent"
    },
    {
      name: "Plumbing Materials",
      icon: <Droplets className="w-8 h-8" />,
      href: "/products?cat=plumbing",
      description: "Durable pipes, precise fittings, and modern bathroom fixtures.",
      color: "from-primary to-accent",
      lightColor: "bg-primary/10 text-primary"
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
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden bg-[#020617]">
        {/* Advanced Background Layers */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020617]/40 via-[#020617] to-[#020617]"></div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <Image
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
            alt="Hardware Background"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-30 transform scale-110 motion-safe:animate-[zoom_60s_infinite_alternate]"
          />
        </div>

        <div className="standard-container relative z-20">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <FadeIn delay={0.1} direction="up" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 mb-10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Trusted Since 1995</span>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1] md:leading-[1] tracking-tighter break-words">
                BUILDING <br />
                <span className="text-gradient">EXCELLENCE.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                Your premier gateway to industrial-grade hardware, professional paints, and innovative building solutions.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} direction="up" className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link
                href="/products"
                prefetch={true}
                className="group w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 rounded-3xl bg-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-red-600/20 flex items-center justify-center gap-3 text-center"
              >
                Browse Inventory <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                prefetch={true}
                className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 rounded-3xl bg-white/5 border border-white/10 text-white font-black text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-center"
              >
                Contact Shop <MapPin size={18} className="text-slate-400" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats / Trust Badges Section */}
      <section className="relative z-30 -mt-24 mb-32">
        <div className="standard-container">
          <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, i) => (
              <StaggerItem key={badge.title}>
                <div
                  className="h-full glass-dark rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 border border-white/5 shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-red-500 mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                    {badge.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 tracking-tight relative z-10">{badge.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed relative z-10">
                    {badge.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Industrial Grid Section */}
      <section className="py-32 bg-black relative">
        <div className="standard-container">
          <FadeIn direction="up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
              <div className="max-w-3xl">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 mb-4 block">Product Ecosystem</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-8 tracking-tighter leading-[1.1] md:leading-none">
                  CURATED FOR <br /><span className="text-slate-400">PROFESSIONALS.</span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 font-medium leading-relaxed">
                  We bridge the gap between world-class manufacturers and local craftsmanship. Explore our specialized divisions.
                </p>
              </div>
              <Link
                href="/products"
                prefetch={true}
                className="group w-full sm:w-auto justify-center sm:justify-start px-8 py-5 rounded-2xl bg-white border border-white/10 text-black font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-500 shadow-sm flex items-center gap-3"
              >
                Full Catalogue <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <StaggerItem key={cat.name} className="h-full">
                <Link
                  href={cat.href}
                  prefetch={true}
                  className="group relative glass-dark p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/5 shadow-sm hover:shadow-2xl hover:border-red-500/20 transition-all duration-700 overflow-hidden flex flex-col h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}></div>

                  <div className={`${cat.lightColor} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-8 sm:mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-black/5`}>
                    {cat.icon}
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4 tracking-tighter leading-tight">{cat.name}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed mb-10 h-12">
                    {cat.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Explore Collection</span>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SEO Local Content Section */}
      <section className="py-24 bg-[#020617] relative border-t border-white/5">
        <div className="standard-container">
          <FadeIn direction="up">
            <div className="max-w-4xl mx-auto glass-dark p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
                Welcome to the Best Hardware Shop in Akole
              </h1>

              <div className="prose prose-invert prose-lg text-slate-400 font-medium leading-relaxed max-w-none space-y-6">
                <p>
                  Since 1995, <strong>Shreeraj Trading Company</strong> has stood as the premier hardware shop in Akole, delivering excellence to local contractors, builders, and homeowners. We understand that finding reliable building materials is crucial for any construction or renovation project. That is why our hardware store near Akole is fully stocked with everything you need, from foundational tools to premium finishing touches.
                </p>

                <h2 className="text-2xl font-black text-white mt-12 mb-4">Your Authorized Berger Paints Dealer in Akole</h2>
                <p>
                  When it comes to bringing your spaces to life, we are proud to be the leading paint shop in Akole. As an authorized Berger Paints dealer in Akole, we offer an extensive portfolio of interior and exterior emulsions, enamels, and protective coatings. Whether you are searching for a specialized color shade or simply browsing a reliable colour shop in Akole, our expert staff provides professional technical support to ensure you get the perfect finish for your walls.
                </p>

                <h2 className="text-2xl font-black text-white mt-12 mb-4">Complete Building Materials Supplier in Akole</h2>
                <p>
                  Beyond paints, we are widely recognized as a comprehensive building materials supplier in Akole. Finding high-quality plumbing and electrical items in Akole can be challenging, but our curated inventory guarantees that you receive genuine, ISI-marked products. From durable PVC pipes and modern bathroom fixtures to advanced MCBs and modular switchboards, we house the best brands in the industry to ensure the safety and longevity of your structures.
                </p>

                <h2 className="text-2xl font-black text-white mt-12 mb-4">Why We Are the Top Hardware Store Near Akole</h2>
                <p>
                  Our commitment to authentic products, fair pricing, and decades of experience makes us the best hardware shop in Akole. We do not just sell products; we partner with you to build your legacy. Our strategic location on Akole-Sangamner Road allows us to serve the entire Ahilyanagar district seamlessly. Whether you are undertaking a minor home repair or managing a large-scale industrial project, visit Shreeraj Trading Company for unmatched quality and trustworthy advice.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured CTA Section */}
      <section className="py-24 sm:py-32 md:py-40 relative overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="standard-container relative z-10">
          <div className="relative rounded-[3rem] sm:rounded-[5rem] overflow-hidden p-8 sm:p-16 md:p-32 text-center bg-black shadow-3xl">
            <div className="absolute inset-0 opacity-40">
              <Image
                src="https://images.unsplash.com/photo-1513467535987-fd81bc206228?q=80&w=1932"
                alt="Store Interior"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 to-black/80"></div>
            </div>

            <FadeIn direction="up" delay={0.2} className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] mb-8 sm:mb-12 text-white shadow-2xl animate-float">
                <MessageCircle size={32} className="fill-red-500 text-red-500 sm:w-10 sm:h-10 w-8 h-8" />
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-6 sm:mb-10 tracking-tighter leading-none">
                BUILD YOUR <br /><span className="text-red-500">LEGACY.</span>
              </h2>

              <p className="text-slate-300 text-lg sm:text-xl md:text-2xl mb-10 sm:mb-16 font-medium leading-relaxed max-w-2xl px-4 text-center">
                Ready to elevate your project? Get instant quotes and expert advice via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto px-4 sm:px-0">
                <a
                  href="https://wa.me/919767287755"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-7 rounded-2xl sm:rounded-3xl bg-white text-black font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 sm:gap-4 group hover-lift"
                >
                  Message Desk <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-7 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-center flex items-center justify-center gap-3 sm:gap-4 hover-lift"
                >
                  Our Location <MapPin size={18} className="text-red-500" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
