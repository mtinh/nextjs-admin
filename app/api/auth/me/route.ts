import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";

export async function GET() {
    const token = (await cookies()).get("access_token")?.value;
    const user = await verifyAccessToken(token);

    if (!user) {
        return Response.json({ error: "Token không hợp lệ hoặc đã hết hạn" }, { status: 401 });
    }

    return Response.json(user);
}