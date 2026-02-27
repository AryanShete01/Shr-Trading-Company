"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function SearchInput({ defaultValue }: { defaultValue: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [query, setQuery] = useState(defaultValue);

    useEffect(() => {
        setQuery(defaultValue);
    }, [defaultValue]);

    function handleSearch(term: string) {
        setQuery(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    }

    return (
        <div className="relative group">
            <Search
                className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isPending ? "text-red-500 animate-pulse" : "text-slate-500 group-focus-within:text-red-500"
                    }`}
                size={20}
            />
            <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name or tech..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-12 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
            />
            {query && (
                <button
                    onClick={() => handleSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
