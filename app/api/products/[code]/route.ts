import { getProductByCode } from "@/lib/products";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;
    const product = await getProductByCode(code);

    if (!product) {
        return Response.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    return Response.json(product);
}