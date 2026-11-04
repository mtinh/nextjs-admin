import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { findAccountById, toSessionUser } from "@/lib/accounts";
import { accessCookie, signAccessToken, verifyAccessToken, verifyRefreshToken } from "@/lib/jwt";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    // Access token còn hạn thì cho đi tiếp
    const user = await verifyAccessToken(request.cookies.get("access_token")?.value);
    if (user) return NextResponse.next();

    // Access token hết hạn thì dùng refresh token để cấp lại
    const id = await verifyRefreshToken(request.cookies.get("refresh_token")?.value);
    const account = id ? await findAccountById(id) : null;

    if (!account) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
    }

    const accessToken = await signAccessToken(toSessionUser(account));
    const response = NextResponse.next();
    response.cookies.set("access_token", accessToken, accessCookie);
    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};