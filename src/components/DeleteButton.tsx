"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/lib/actions";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DeleteButton({ id, onDeleteConfirm }: { id: string, onDeleteConfirm?: () => void }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            // Optimistic update
            console.log("Deletion confirmed for ID:", id);
            if (onDeleteConfirm) onDeleteConfirm();

            startTransition(async () => {
                try {
                    await deleteProduct(id);
                    toast.success("Product deleted successfully");
                } catch (error) {
                    toast.error("Failed to delete product");
                }
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50"
            title="Delete Product"
        >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={20} />}
        </button>
    );
}
