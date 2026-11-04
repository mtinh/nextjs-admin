import { Suspense } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/products";

async function ProductRows() {
    const products = await getProducts();

    return products.map((p) => (
        <tr key={p.code}>
            <td className="py-3.5 font-medium">{p.code}</td>
            <td className="py-3.5 text-zinc-500">{p.title_prod}</td>
            <td className="py-3.5 font-semibold">{p.price.toLocaleString("vi-VN")} đ</td>
            <td className="py-3.5">{p.qty}</td>
            <td className="py-3.5">
                <Link href={`/admin/detail-product/${p.code}`}>Edit</Link>
            </td>
        </tr>
    ));
}

export default function ListProductPage() {
    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr>
                    <th>Mã</th><th>Tên</th><th>Giá</th><th>Số lượng</th><th>Action</th>
                </tr>
            </thead>
            <tbody>
                <Suspense fallback={<tr><td colSpan={5}>Đang tải...</td></tr>}>
                    <ProductRows />
                </Suspense>
            </tbody>
        </table>
    );
}