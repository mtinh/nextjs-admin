import { db } from "@/lib/mongodb";
import { getProducts } from "@/lib/products";

export async function GET() {
    return Response.json(await getProducts());
}

export async function POST(request: Request) {
    const { title_prod, code, price, qty } = await request.json();

    if (!title_prod || !code) {
        return Response.json({ error: "Thiếu title_prod hoặc code" }, { status: 400 });
    }

    await db.collection("products").insertOne({ title_prod, code, price, qty });
    return Response.json({ code }, { status: 201 });
}