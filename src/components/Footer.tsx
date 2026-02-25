import Link from "next/link";
import { ShoppingBag, Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#020617] text-slate-400 pt-24 pb-12 overflow-hidden relative border-t border-white/5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>

            <div className="standard-container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand & Mission */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
                                <ShoppingBag className="text-white w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter leading-none text-white">SHREERAJ</span>
                                <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase leading-none mt-1.5">Trading Co.</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                            Direct suppliers of premium hardware, paints, and building materials. Delivering excellence since 1995.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Catalog Explorations */}
                    <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Catalog</h4>
                        <ul className="space-y-4 font-bold text-sm">
                            {[
                                { name: "Paints & Colours", href: "/products?cat=paints" },
                                { name: "Hardware Tools", href: "/products?cat=hardware" },
                                { name: "Electrical Items", href: "/products?cat=electrical" },
                                { name: "Plumbing Materials", href: "/products?cat=plumbing" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary flex items-center gap-2 transition-colors group py-1.5">
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Support */}
                    <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Support</h4>
                        <ul className="space-y-4 font-bold text-sm">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Products", href: "/products" },
                                { name: "About Us", href: "/about" },
                                { name: "Contact", href: "/contact" },
                                { name: "Admin Dashboard", href: "/admin/login" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors block py-1.5">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Official Contact */}
                    <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Headquarters</h4>
                        <ul className="space-y-6 font-bold text-sm">
                            <li className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                                    <MapPin className="text-primary group-hover:text-white" size={18} />
                                </div>
                                <a
                                    href="https://maps.app.goo.gl/KcAirQutM5FjJBUGA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors leading-snug"
                                >
                                    Akole-Sangamner Rd,<br />Akole, MH 422601
                                </a>
                            </li>
                            <li className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                                    <Phone className="text-primary group-hover:text-white" size={18} />
                                </div>
                                <a href="tel:+918306063148" className="text-slate-400 hover:text-white transition-colors self-center">+91 83060 63148</a>
                            </li>
                            <li className="flex gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                                    <Mail className="text-primary group-hover:text-white" size={18} />
                                </div>
                                <a href="mailto:shreeraj.trading@gmail.com" className="text-slate-400 hover:text-white transition-colors self-center break-all md:break-normal py-2">shreeraj.trading@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                        © {new Date().getFullYear()} Shreeraj Trading Company. Crafted with Excellence.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
