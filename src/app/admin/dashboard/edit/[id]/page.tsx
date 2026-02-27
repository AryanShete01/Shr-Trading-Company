"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateProduct, uploadProductImage } from "@/lib/actions";
import { toast } from "react-hot-toast";
import {
    ArrowLeft,
    Save,
    Upload,
    ChevronLeft,
    Info,
    Type,
    MessageCircle,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number | null;
    image: string;
    image2: string | null;
    image3: string | null;
    category: string;
    longDescription: string | null;
    variants: string | null;
    applications: string | null;
    whatsappMessage: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    priceType: string;
}

export default function EditCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [priceType, setPriceType] = useState("FIXED");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setPreview(data.image);
                setPriceType(data.priceType || "FIXED");
            } catch (error) {
                toast.error("Failed to load catalog entry");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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
                    const maxDim = 1200;

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
        }
    };

    const action = async (formData: FormData) => {
        setSubmitting(true);
        try {
            const metadataForm = new FormData();
            formData.forEach((value, key) => {
                if (key !== "image") metadataForm.append(key, value);
            });

            const res = await updateProduct(id, metadataForm);

            if (res?.success) {
                toast.success("Catalog entry updated! Syncing assets...", { icon: '⚡' });
                router.push("/admin/dashboard/categories");
                router.refresh();

                if (compressedFile) {
                    const imageForm = new FormData();
                    imageForm.append("image", compressedFile);
                    imageForm.append("slot", "image");

                    uploadProductImage(id, imageForm).then((imgRes) => {
                        if (imgRes.success) {
                            toast.success("Primary image updated!");
                            router.refresh();
                        } else {
                            toast.error("Metadata updated, but image failed to sync.");
                        }
                    });
                }
            }
        } catch (error) {
            toast.error("Failed to commit changes");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-red-600" size={48} />
                    <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Loading Technical Data...</p>
                </div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="p-4 sm:p-8 md:p-12 max-w-5xl mx-auto space-y-12">
            <div className="space-y-4">
                <Link
                    href="/admin/dashboard/categories"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors"
                >
                    <ChevronLeft size={14} /> Back to Catalog
                </Link>
                <div className="flex items-center gap-6">
                    <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tighter leading-none">
                        EDIT <span className="text-red-600 underline decoration-red-600/20 underline-offset-[12px]">ENTITY.</span>
                    </h1>
                </div>
            </div>

            <form action={action} className="space-y-12 pb-24">
                {/* Basic Information */}
                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4 border-b border-slate-50">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Catalog Title</label>
                            <input
                                name="name"
                                defaultValue={product.name}
                                required
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Division</label>
                            <select
                                name="category"
                                defaultValue={product.category}
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
                                    defaultValue={product.price || ""}
                                    required
                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Short Description</label>
                        <textarea
                            name="description"
                            defaultValue={product.description}
                            required
                            rows={2}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all resize-none shadow-inner"
                        />
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <Type className="text-blue-500" size={20} />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Advanced Specification</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Detailed Technical Specs</label>
                        <textarea
                            name="longDescription"
                            defaultValue={product.longDescription || ""}
                            rows={6}
                            className="w-full bg-slate-50 border-none rounded-3xl px-6 py-4 text-slate-900 font-medium focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Available Variants</label>
                            <input
                                name="variants"
                                defaultValue={product.variants || ""}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Applications</label>
                            <input
                                name="applications"
                                defaultValue={product.applications || ""}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                            />
                        </div>
                    </div>
                </div>

                {/* Discovery & Tools */}
                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <MessageCircle className="text-emerald-500" size={20} />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Discovery Optimization</h2>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">WhatsApp Template Message</label>
                        <input
                            name="whatsappMessage"
                            defaultValue={product.whatsappMessage || ""}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">SEO Title</label>
                            <input
                                name="seoTitle"
                                defaultValue={product.seoTitle || ""}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">SEO Meta Desc</label>
                            <input
                                name="seoDescription"
                                defaultValue={product.seoDescription || ""}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                            />
                        </div>
                    </div>
                </div>

                {/* Imagery */}
                <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <ImageIcon className="text-purple-500" size={20} />
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Visual Integrity</h2>
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
                                <p className="font-black text-slate-900 uppercase text-xs tracking-widest">Swap Visual</p>
                            </div>
                        </div>

                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                            <img src={preview || ""} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            {compressedFile && (
                                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                    New Asset Ready
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest text-slate-400 hover:text-slate-900"
                    >
                        Revert
                    </button>
                    <button
                        disabled={submitting}
                        className="bg-slate-950 text-white px-12 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl flex items-center gap-3 disabled:opacity-50"
                    >
                        {submitting ? "Syncing..." : "Commit Technical Update"}
                    </button>
                </div>
            </form>
        </div>
    );
}
