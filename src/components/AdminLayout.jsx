"use client";

import "./AdminLayout.css";
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
    <div className="admin-container">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="admin-sidebar-header">
          {sidebarOpen && <h2 className="admin-sidebar-title">Quản trị</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="admin-sidebar-toggle-btn"
          >
            ☰
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`admin-sidebar-btn ${
                activeTab === tab.id
                  ? "admin-sidebar-btn-active"
                  : "admin-sidebar-btn-inactive"
              }`}
            >
              <span className="admin-sidebar-icon">{tab.icon}</span>
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-sidebar-footer-link">
            <span className="admin-sidebar-footer-icon">🏠</span>
            {sidebarOpen && <span>Về trang chủ</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
