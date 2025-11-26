import "../admin/AdminPages.css";

export default function AdminStatistics() {
  return (
    <div>
      <h1 className="admin-page-header">Thống kê</h1>

      <div className="admin-grid-2col mb-8">
        <div className="admin-card">
          <h2 className="admin-card-title">Doanh thu theo tháng</h2>
          <div className="admin-chart-container">
            {[45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85].map(
              (value, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="admin-chart-bar"
                    style={{
                      width: "20px",
                      height: `${(value / 100) * 200}px`,
                    }}
                  />
                  <span className="admin-chart-label">{i + 1}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-card-title">Phân loại sản phẩm</h2>
          <div className="admin-progress-item">
            {[
              { name: "Kỹ năng sống", count: 245, percent: 35 },
              { name: "Văn học", count: 180, percent: 26 },
              { name: "Lịch sử", count: 156, percent: 22 },
              { name: "Tâm lý học", count: 119, percent: 17 },
            ].map((cat, i) => (
              <div key={i}>
                <div className="admin-progress-header">
                  <span className="font-semibold">{cat.name}</span>
                  <span className="text-gray-600">{cat.count}</span>
                </div>
                <div className="admin-progress-bar">
                  <div
                    className="admin-progress-fill"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
