import AdminSidebar from "@/components/AdminSidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 md:ml-72 w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
