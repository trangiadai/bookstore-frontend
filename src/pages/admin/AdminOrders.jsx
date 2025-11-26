import "../admin/AdminPages.css";

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
      <h1 className="admin-page-header">Quản lý đơn hàng</h1>

      <div className="admin-card">
        <div className="admin-table-overflow">
          <table className="admin-table">
            <thead className="admin-table-head">
              <tr>
                <th className="admin-table-header">Mã đơn</th>
                <th className="admin-table-header">Khách hàng</th>
                <th className="admin-table-header">Ngày đặt</th>
                <th className="admin-table-header">Tổng tiền</th>
                <th className="admin-table-header">Trạng thái</th>
                <th className="admin-table-header">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="admin-table-row">
                  <td className="admin-table-cell-bold">#{order.id}</td>
                  <td className="admin-table-cell">{order.customer}</td>
                  <td className="admin-table-cell">{order.date}</td>
                  <td className="admin-table-cell-bold">{order.total}</td>
                  <td className="admin-table-cell">
                    <span
                      className={`admin-status-badge ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="admin-table-cell">
                    <button className="text-blue-600 admin-btn-link">
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
