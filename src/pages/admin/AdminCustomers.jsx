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
      <h1 className="text-3xl font-bold mb-8">Quản lý khách hàng</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">
                  Tên khách hàng
                </th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">
                  Số điện thoại
                </th>
                <th className="text-left py-3 px-4 font-semibold">
                  Số đơn hàng
                </th>
                <th className="text-left py-3 px-4 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-semibold">{customer.name}</td>
                  <td className="py-3 px-4">{customer.email}</td>
                  <td className="py-3 px-4">{customer.phone}</td>
                  <td className="py-3 px-4">{customer.orders}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Xem
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Xóa
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
