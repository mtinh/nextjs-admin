"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "../action"; // Import Server Action

export default function LoginPage() {
    // useActionState nhận vào: (action, initialState)
    // Return: [stateHiệnTại, hàmGửiAction, trạngTháiĐangXửLý]
    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
        <form action={formAction} className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
                Đăng nhập
            </h2>

            {state?.error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg">
                    {state.error}
                </div>
            )}

            {/* Input Username */}
            <div>
                <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                    Tên đăng nhập
                </label>
                <input
                    type="text"
                    name="username"
                    defaultValue="emilys"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-800 dark:border-zinc-700"
                    placeholder="Nhập username (vd: emilys)"
                />
            </div>

            {/* Input Password */}
            <div>
                <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                    Mật khẩu
                </label>
                <input
                    type="password"
                    name="password"
                    defaultValue="emilyspass"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-800 dark:border-zinc-700"
                    placeholder="Nhập password (vd: emilyspass)"
                />
            </div>

            {/* Submit button tự động disable khi isPending = true */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full py-2.5 px-4 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
            >
                {isPending ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-4">
                Chưa có tài khoản?{" "}
                <Link href="/register" className="font-semibold underline hover:text-black dark:hover:text-white">
                    Đăng ký ngay
                </Link>
            </div>
        </form>
    );
}
