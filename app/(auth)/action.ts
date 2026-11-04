"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findAccountByUsername, toSessionUser } from "@/lib/accounts";
import { accessCookie, refreshCookie, signAccessToken, signRefreshToken } from "@/lib/jwt";

// prevState dùng để hứng state trước đó khi kết hợp với useActionState
export async function loginAction(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        const account = await findAccountByUsername(username);
        const isValid = account && (await bcrypt.compare(password, account.password));

        if (!isValid) {
            return { error: "Tài khoản hoặc mật khẩu không chính xác" };
        }

        const cookieStore = await cookies();
        cookieStore.set("access_token", await signAccessToken(toSessionUser(account)), accessCookie);
        cookieStore.set("refresh_token", await signRefreshToken(account.id), refreshCookie);
    } catch (error: any) {
        return { error: "Không thể kết nối đến máy chủ. Vui lòng thử lại!" };
    }

    // Call redirect() ngoài try-catch
    redirect("/admin/dashboard");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    redirect("/login");
}