"use client";

import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/actions";
import { ChevronLeft, Save, Loader2, Package, Image as ImageIcon, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function NewProductPage() {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const router = useRouter();

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
                    const maxDim = 800; // compress dimension

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
                    }, "image/webp", 0.7);
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
            if (compressedFile) {
                formData.set("image", compressedFile);
            }
            const res = await createProduct(formData);
            if (res?.success) {
                toast.success("Product created successfully!");
                router.push("/admin/dashboard");
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to create product");
            setLoading(false);
        }
    };

    return (
        <div className="p-10 max-w-5xl mx-auto pb-32 font-sans">
            <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-700 font-black text-[10px] uppercase tracking-widest mb-10 transition-colors"
            >
                <ChevronLeft size={16} />
                Back to Dashboard
            </Link>

            <div className="bg-white rounded-[48px] shadow-2xl shadow-slate-900/5 border border-slate-100 overflow-hidden">
                <div className="bg-slate-950 p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-orange-700 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-orange-700/20">
                            <Plus className="text-white" size={32} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Create Product</h1>
                        <p className="text-slate-400 font-medium">Populate your catalogue with high-quality hardware materials.</p>
                    </div>
                </div>

                <form action={handleSubmit} className="p-12 md:p-16 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Identity</label>
                                <div className="relative">
                                    <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-700 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                        placeholder="e.g. Premium Interior Emulsion"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Category</label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        required
                                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-700 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                    >
                                        <option value="Paints & Colours">Paints & Colours</option>
                                        <option value="Hardware Tools">Hardware Tools</option>
                                        <option value="Electrical Items">Electrical Items</option>
                                        <option value="Plumbing Materials">Plumbing Materials</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronLeft className="-rotate-90 text-slate-400" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Market Price (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-lg">₹</span>
                                    <input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        required
                                        className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-700 outline-none transition-all font-black text-xl text-slate-900"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Imagery & Details */}
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visual Representation</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={handleImageChange}
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-700 outline-none transition-all font-bold text-slate-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-orange-700 file:text-white hover:file:bg-orange-800"
                                    />
                                </div>
                                {preview && (
                                    <div className="mt-4 w-full aspect-video rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center relative shadow-inner">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">Image Preview</span>
                                        </div>
                                    </div>
                                )}
                                <p className="text-[10px] text-slate-400 font-medium italic ml-1">* Upload a high-quality photo of the product.</p>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Technical Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={preview ? 4 : 8}
                                    className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-700 outline-none transition-all font-medium text-slate-600 placeholder:text-slate-300 resize-none"
                                    placeholder="Enter detailed specifications and usage info..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row gap-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-orange-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-orange-700/20 disabled:opacity-70 active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} /> Finalizing...
                                </>
                            ) : (
                                <>
                                    <Save size={20} /> Publish Product
                                </>
                            )}
                        </button>
                        <Link
                            href="/admin/dashboard"
                            className="px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest text-slate-400 border border-slate-100 hover:bg-slate-50 hover:text-slate-950 transition-all text-center flex items-center justify-center"
                        >
                            Dismiss
                        </Link>
                    </div>
                </form>
            </div>

            <div className="mt-12 bg-blue-50/50 p-6 rounded-[32px] border border-blue-100/50 flex gap-4 items-start max-w-2xl mx-auto">
                <Info className="text-blue-500 shrink-0 mt-1" size={20} />
                <p className="text-sm font-medium text-blue-600 leading-relaxed">
                    Products will be automatically categorized and optimized for the public catalogue upon saving. Ensure all details are accurate for the best customer experience.
                </p>
            </div>
        </div>
    );
}

function Plus({ className, size }: { className?: string, size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" /><path d="M12 5v14" />
        </svg>
    )
}
