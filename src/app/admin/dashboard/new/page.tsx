"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, uploadProductImage } from "@/lib/actions";
import { toast } from "react-hot-toast";
import {
    ArrowLeft,
    Plus,
    Upload,
    ChevronLeft,
    Info,
    Layout,
    Type,
    MessageCircle,
    Search,
    Image as ImageIcon,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function NewCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [priceType, setPriceType] = useState("FIXED");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new window.Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;
                    const maxDim = 1200; // Better res for categories

                    if (width > height) {
                        if (width > maxDim) {
                            height *= maxDim / width;
                            width = maxDim;
                        }
                    } else {
                        if (height > maxDim) {
                            width *= maxDim / height;
                            height = maxDim;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                                type: "image/webp",
                            });
                            setCompressedFile(newFile);
                            setPreview(URL.createObjectURL(blob));
                        }
                    }, "image/webp", 0.75);
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            setCompressedFile(null);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            // Prepare the metadata form
            const metadataForm = new FormData();
            formData.forEach((value, key) => {
                if (key !== "image") metadataForm.append(key, value);
            });

            const res = await createProduct(metadataForm);

            if (res?.success && res.product) {
                const newId = res.product.id;
                toast.success("Catalog entry created! Updating assets...", { icon: '🚀' });

                router.push("/admin/dashboard/categories");
                router.refresh();

                if (compressedFile) {
                    const imageForm = new FormData();
                    imageForm.append("image", compressedFile);
                    imageForm.append("slot", "image");

                    uploadProductImage(newId, imageForm).then((imgRes) => {
                        if (imgRes.success) {
                            toast.success("Primary image synced!");
                            router.refresh();
                        } else {
                            toast.error("Metadata saved, but image failed.");
                        }
                    });
                }
            }
        } catch (error) {
            toast.error("Failed to commit entry");
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-8 md:p-12 max-w-5xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4 text-left">
                    <Link
                        href="/admin/dashboard/categories"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <ChevronLeft size={14} /> Back to Catalog
                    </Link>
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tighter leading-none">
                        NEW <span className="text-red-600 underline decoration-red-600/20 underline-offset-[12px]">ENTITY.</span>
                    </h1>
                </div>

                <Link
                    href="/"
                    target="_blank"
                    className="bg-white text-slate-900 px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest border border-slate-100 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                    Live Site <ArrowUpRight size={14} />
                </Link>
            </div>

            <form action={handleSubmit} className="space-y-12 pb-24">
                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4 border-b border-slate-50">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Entry Name (e.g. Berger Bison Emulsion)</label>
                            <input
                                name="name"
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                placeholder="Enter catalog title..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Category Division</label>
                            <select
                                name="category"
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all appearance-none shadow-inner"
                            >
                                <option value="Paints & Colours">Paints & Colours</option>
                                <option value="Hardware Tools">Hardware Tools</option>
                                <option value="Electrical Items">Electrical Items</option>
                                <option value="Plumbing Materials">Plumbing Materials</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Price Mode</label>
                            <select
                                name="priceType"
                                value={priceType}
                                onChange={(e) => setPriceType(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all appearance-none shadow-inner"
                            >
                                <option value="FIXED">Fixed Price</option>
                                <option value="STARTING">Starting From</option>
                                <option value="CONTACT">Contact for Price</option>
                            </select>
                        </div>
                        {priceType !== "CONTACT" && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                                    {priceType === "STARTING" ? "Starting Price (₹)" : "Numeric Price (₹)"}
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                    placeholder="e.g. 1250"
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Short Description (Cards & Previews)</label>
                        <textarea
                            name="description"
                            required
                            rows={2}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all resize-none shadow-inner"
                            placeholder="Brief catchy summary..."
                        />
                    </div>
                </div>

                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <Type className="text-blue-500" size={20} />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Technical & Variants</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Detailed Specification (Full Page)</label>
                        <textarea
                            name="longDescription"
                            rows={6}
                            className="w-full bg-slate-50 border-none rounded-3xl px-6 py-4 text-slate-900 font-medium focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                            placeholder="Detailed technical information, features, and benefits..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Available Variants (e.g. 1L, 4L, 10L)</label>
                            <input
                                name="variants"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                placeholder="e.g. 1L, 4L, 10L, 20L"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Applications / Use Cases</label>
                            <input
                                name="applications"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                placeholder="Interior walls, wood, metal..."
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <MessageCircle className="text-emerald-500" size={20} />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Marketing & Discovery</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">WhatsApp Enquiry Message (Template)</label>
                        <input
                            name="whatsappMessage"
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                            placeholder="Interested in Berger Bison Emulsion..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">SEO Title Overwrite</label>
                            <input
                                name="seoTitle"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                placeholder="Google search title..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">SEO Meta Description</label>
                            <input
                                name="seoDescription"
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                placeholder="Search engine results snippet..."
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <ImageIcon className="text-purple-500" size={20} />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Visual Identity</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-12 border-4 border-dashed border-slate-100 rounded-[3rem] text-center hover:border-red-500/20 transition-all group relative overflow-hidden bg-slate-50/50 shadow-inner">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                                    <Upload className="text-slate-400 group-hover:text-red-500" size={32} />
                                </div>
                                <p className="font-black text-slate-900 uppercase text-xs tracking-widest">Upload Image</p>
                            </div>
                        </div>

                        {preview ? (
                            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        ) : (
                            <div className="aspect-video bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center shadow-inner">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Preview Area</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-slate-900"
                    >
                        Discard Changes
                    </button>
                    <button
                        disabled={loading}
                        className="bg-slate-950 text-white px-12 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl flex items-center gap-3 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Publish to Catalog"}
                    </button>
                </div>
            </form>
        </div>
    );
}
