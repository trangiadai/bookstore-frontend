import "../admin/AdminPages.css";

export default function AdminDashboard() {
  const stats = [
    { label: "Tổng sản phẩm", value: "1,234", icon: "📦" },
    { label: "Đơn hàng hôm nay", value: "42", icon: "🛒" },
    { label: "Khách hàng", value: "856", icon: "👥" },
    { label: "Doanh thu", value: "45.2M đ", icon: "💰" },
  ];

  return (
    <div>
      <h1 className="admin-page-header">Dashboard</h1>

      <div className="admin-page-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="admin-stat-card">
            <div className="admin-stat-content">
              <div>
                <p className="admin-stat-label">{stat.label}</p>
                <p className="admin-stat-value">{stat.value}</p>
              </div>
              <span className="admin-stat-icon">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-grid-2col">
        <div className="admin-card">
          <h2 className="admin-card-title">Đơn hàng gần đây</h2>
          <div className="admin-space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="admin-item">
                <div>
                  <p className="admin-item-name">Đơn hàng #{1000 + i}</p>
                  <p className="admin-item-date">Ngày: 2024-01-{15 + i}</p>
                </div>
                <span className="admin-item-value">250.000 đ</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-card-title">Sản phẩm bán chạy</h2>
          <div className="admin-space-y-3">
            {["Đắc Nhân Tâm", "Nhà Giả Kim", "Sapiens"].map((book, i) => (
              <div key={i} className="admin-item">
                <p className="admin-item-name">{book}</p>
                <span className="admin-item-value">{45 - i * 10} bản</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
