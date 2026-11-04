export const instant = false; // Tắt yêu cầu static prerender riêng cho route này

export default async function Page({
    params,
}: {
    params: Promise<{ idProduct: string }>
}) {
    const { idProduct } = await params;
    return <div>My Post: {idProduct}</div>;
}
