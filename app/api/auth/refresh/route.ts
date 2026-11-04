import { cookies } from "next/headers";
import { findAccountById, toSessionUser } from "@/lib/accounts";
import { accessCookie, signAccessToken, verifyRefreshToken } from "@/lib/jwt";

export async function POST() {
    const cookieStore = await cookies();
    const id = await verifyRefreshToken(cookieStore.get("refresh_token")?.value);
    const account = id ? await findAccountById(id) : null;

    if (!account) {
        return Response.json({ error: "Refresh token không hợp lệ" }, { status: 401 });
    }

    const user = toSessionUser(account);
    cookieStore.set("access_token", await signAccessToken(user), accessCookie);
    return Response.json(user);
}