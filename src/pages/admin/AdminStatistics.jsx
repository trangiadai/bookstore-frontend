export default function AdminStatistics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Thống kê</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Doanh thu theo tháng</h2>
          <div className="h-64 flex items-end justify-around gap-2">
            {[45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85].map(
              (value, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="bg-primary rounded-t"
                    style={{
                      width: "20px",
                      height: `${(value / 100) * 200}px`,
                    }}
                  />
                  <span className="text-xs mt-2">{i + 1}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Phân loại sản phẩm</h2>
          <div className="space-y-4">
            {[
              { name: "Kỹ năng sống", count: 245, percent: 35 },
              { name: "Văn học", count: 180, percent: 26 },
              { name: "Lịch sử", count: 156, percent: 22 },
              { name: "Tâm lý học", count: 119, percent: 17 },
            ].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{cat.name}</span>
                  <span className="text-gray-600">{cat.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
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
