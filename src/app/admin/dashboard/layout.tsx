import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 ml-72">
                {children}
            </main>
        </div>
    );
}
