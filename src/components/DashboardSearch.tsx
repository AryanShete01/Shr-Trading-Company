"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";

export default function DashboardSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search")?.toString() || "";
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set("search", term);
            } else {
                params.delete("search");
            }
            router.push(`${pathname}?${params.toString()}`);
        }, 300);
    };

    return (
        <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-700 transition-colors" size={18} />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search inventory..."
                className="pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-orange-700/10 transition-all w-64 text-sm font-medium text-slate-900"
            />
        </div>
    );
}
