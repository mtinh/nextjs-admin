"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdOutlineSettings, MdSpaceDashboard } from "react-icons/md";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
            {/* 1. SIDEBAR BÊN TRÁI */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-4">
                <div>
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                            A
                        </div>
                        <div>
                            <h1 className="font-bold text-base leading-tight">Admin Portal</h1>
                            <span className="text-xs text-zinc-500">Quản trị hệ thống</span>
                        </div>
                    </div>

                    {/* Menu Điều Hướng */}
                    <nav className="space-y-1">
                        <Link
                            key="/admin/dashboard"
                            href="/admin/dashboard"
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors bg-black text-white dark:bg-white dark:text-black"
                        >
                            <span className="text-lg"><MdSpaceDashboard size={20} /></span>
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            key="/admin/list-product"
                            href="/admin/list-product"
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <span className="text-lg"><AiFillProduct size={20} /></span>
                            <span>Products</span>
                        </Link>
                        <Link
                            key="/admin/users"
                            href="/admin/users"
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <span className="text-lg"><FaUser size={20} /></span>
                            <span>Users</span>
                        </Link>
                        <Link
                            key="/admin/settings"
                            href="/admin/settings"
                            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            <span className="text-lg"><MdOutlineSettings size={20} /></span>
                            <span>Settings</span>
                        </Link>
                    </nav>
                </div>

                {/* Nút Đăng xuất ở góc dưới Sidebar */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                        <span>🚪</span>
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* 2. KHU VỰC CHÍNH BÊN PHẢI */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8">
                    <div className="font-semibold text-lg">Trang Quản Trị</div>

                    {/* User Profile tóm tắt */}
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-sm font-medium">Emily Johnson</div>
                            <div className="text-xs text-zinc-500">emilys@dummyjson.com</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 border flex items-center justify-center font-bold">
                            EJ
                        </div>
                    </div>
                </header>

                {/* Nội dung trang con (page.tsx) */}
                <main className="flex-1 p-8 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
