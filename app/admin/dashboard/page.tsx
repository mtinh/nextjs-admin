export default function DashboardPage() {
    const stats = [
        { title: "Tổng doanh thu", value: "$45,231.89", change: "+20.1%", isPositive: true },
        { title: "Đơn hàng mới", value: "+2,350", change: "+180.1%", isPositive: true },
        { title: "Người dùng mới", value: "+12,234", change: "+19%", isPositive: true },
        { title: "Tỷ lệ thoát", value: "24.5%", change: "-4.5%", isPositive: false },
    ];

    const recentOrders = [
        { id: "ORD-001", customer: "Nguyễn Văn A", product: "iPhone 15 Pro", amount: "$1,099", status: "Hoàn thành" },
        { id: "ORD-002", customer: "Trần Thị B", product: "MacBook Air M3", amount: "$1,299", status: "Đang xử lý" },
        { id: "ORD-003", customer: "Lê Văn C", product: "AirPods Pro 2", amount: "$249", status: "Hoàn thành" },
        { id: "ORD-004", customer: "Phạm Minh D", product: "iPad Pro", amount: "$799", status: "Đã hủy" },
    ];

    return (
        <div className="space-y-6">
            {/* Tiêu đề trang */}
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Bảng Điều Khiển</h2>
                <p className="text-sm text-zinc-500">
                    Chào mừng quay trở lại, dưới đây là tổng quan hoạt động hôm nay.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                    >
                        <span className="text-xs font-medium text-zinc-500">{stat.title}</span>
                        <div className="text-2xl font-bold mt-1">{stat.value}</div>
                        <div className="text-xs mt-2 flex items-center gap-1">
                            <span className={stat.isPositive ? "text-emerald-600 font-semibold" : "text-rose-600 font-semibold"}>
                                {stat.change}
                            </span>
                            <span className="text-zinc-400">so với tháng trước</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Đơn hàng gần đây</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-xs uppercase">
                            <tr>
                                <th className="pb-3 font-semibold">Mã Đơn</th>
                                <th className="pb-3 font-semibold">Khách hàng</th>
                                <th className="pb-3 font-semibold">Sản phẩm</th>
                                <th className="pb-3 font-semibold">Số tiền</th>
                                <th className="pb-3 font-semibold">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50">
                                    <td className="py-3.5 font-medium">{order.id}</td>
                                    <td className="py-3.5">{order.customer}</td>
                                    <td className="py-3.5 text-zinc-500">{order.product}</td>
                                    <td className="py-3.5 font-semibold">{order.amount}</td>
                                    <td className="py-3.5">
                                        <span
                                            className={`px-2.5 py-1 text-xs rounded-full font-medium ${order.status === "Hoàn thành"
                                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                    : order.status === "Đang xử lý"
                                                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                                                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
