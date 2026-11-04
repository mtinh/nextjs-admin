import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Hệ Thống Xác Thực</h1>
                </div>

                {children}
            </div>
        </div>
    );
}
