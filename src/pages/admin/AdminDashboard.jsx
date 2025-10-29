export default function AdminDashboard() {
  const stats = [
    { label: "Tổng sản phẩm", value: "1,234", icon: "📦" },
    { label: "Đơn hàng hôm nay", value: "42", icon: "🛒" },
    { label: "Khách hàng", value: "856", icon: "👥" },
    { label: "Doanh thu", value: "45.2M đ", icon: "💰" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Đơn hàng gần đây</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center pb-3 border-b"
              >
                <div>
                  <p className="font-semibold">Đơn hàng #{1000 + i}</p>
                  <p className="text-sm text-gray-600">
                    Ngày: 2024-01-{15 + i}
                  </p>
                </div>
                <span className="text-green-600 font-semibold">250.000 đ</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Sản phẩm bán chạy</h2>
          <div className="space-y-3">
            {["Đắc Nhân Tâm", "Nhà Giả Kim", "Sapiens"].map((book, i) => (
              <div
                key={i}
                className="flex justify-between items-center pb-3 border-b"
              >
                <p className="font-semibold">{book}</p>
                <span className="text-blue-600 font-semibold">
                  {45 - i * 10} bản
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
