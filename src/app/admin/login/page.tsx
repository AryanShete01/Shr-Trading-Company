"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Lock, User, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid username or password");
            } else {
                toast.success("Welcome back, Admin!");
                router.push("/admin/dashboard");
            }
        } catch (error) {
            toast.error("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="bg-orange-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-700/20">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
                    <p className="text-slate-500 mt-2">Sign in to manage your inventory</p>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-700 transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-orange-700 focus:ring-1 focus:ring-orange-700 outline-none transition-all text-slate-900 bg-transparent placeholder:text-slate-400"
                                    placeholder="Enter admin username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-700 transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-orange-700 focus:ring-1 focus:ring-orange-700 outline-none transition-all text-slate-900 bg-transparent placeholder:text-slate-400"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-700/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center">
                        <Link href="/" className="text-slate-400 hover:text-orange-700 text-sm font-medium transition-colors">
                            Return to Website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
