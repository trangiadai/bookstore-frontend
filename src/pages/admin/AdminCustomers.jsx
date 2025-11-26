import "../admin/AdminPages.css";

export default function AdminCustomers() {
  const customers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0912345678",
      orders: 5,
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      orders: 3,
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0901234567",
      orders: 8,
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0923456789",
      orders: 2,
    },
  ];

  return (
    <div>
      <h1 className="admin-page-header">Quản lý khách hàng</h1>

      <div className="admin-card">
        <div className="admin-table-overflow">
          <table className="admin-table">
            <thead className="admin-table-head">
              <tr>
                <th className="admin-table-header">Tên khách hàng</th>
                <th className="admin-table-header">Email</th>
                <th className="admin-table-header">Số điện thoại</th>
                <th className="admin-table-header">Số đơn hàng</th>
                <th className="admin-table-header">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="admin-table-row">
                  <td className="admin-table-cell-bold">{customer.name}</td>
                  <td className="admin-table-cell">{customer.email}</td>
                  <td className="admin-table-cell">{customer.phone}</td>
                  <td className="admin-table-cell">{customer.orders}</td>
                  <td className="admin-table-cell">
                    <button className="text-blue-600 admin-btn-link">
                      Xem
                    </button>
                    <button className="admin-btn-delete">Xóa</button>
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
