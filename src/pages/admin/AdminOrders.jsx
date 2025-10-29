export default function AdminOrders() {
  const orders = [
    {
      id: 1001,
      customer: "Nguyễn Văn A",
      date: "2024-01-15",
      total: "250.000 đ",
      status: "Đã giao",
    },
    {
      id: 1002,
      customer: "Trần Thị B",
      date: "2024-01-16",
      total: "180.000 đ",
      status: "Đang giao",
    },
    {
      id: 1003,
      customer: "Lê Văn C",
      date: "2024-01-17",
      total: "320.000 đ",
      status: "Chờ xác nhận",
    },
    {
      id: 1004,
      customer: "Phạm Thị D",
      date: "2024-01-18",
      total: "150.000 đ",
      status: "Đã giao",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã giao":
        return "bg-green-100 text-green-800";
      case "Đang giao":
        return "bg-blue-100 text-blue-800";
      case "Chờ xác nhận":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quản lý đơn hàng</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Mã đơn</th>
                <th className="text-left py-3 px-4 font-semibold">
                  Khách hàng
                </th>
                <th className="text-left py-3 px-4 font-semibold">Ngày đặt</th>
                <th className="text-left py-3 px-4 font-semibold">Tổng tiền</th>
                <th className="text-left py-3 px-4 font-semibold">
                  Trạng thái
                </th>
                <th className="text-left py-3 px-4 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-semibold">#{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4 font-semibold">{order.total}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      Chi tiết
                    </button>
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
