"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLayout({ children, activeTab, onTabChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabs = [
    { id: "dashboard", label: "Trang chủ", icon: "📊" },
    { id: "products", label: "Quản lý sản phẩm", icon: "📦" },
    { id: "orders", label: "Quản lý đơn hàng", icon: "🛒" },
    { id: "customers", label: "Quản lý khách hàng", icon: "👥" },
    { id: "statistics", label: "Thống kê", icon: "📈" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && <h2 className="font-bold text-lg">Quản trị</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            ☰
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <span>🏠</span>
            {sidebarOpen && <span>Về trang chủ</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
