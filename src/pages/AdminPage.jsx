"use client";

import { useState } from "react";
// Sửa đường dẫn: Giả sử AdminLayout nằm trong thư mục components
import AdminLayout from "../components/AdminLayout"; 
import AdminChatPage from "./admin/chat/AdminChatPage";


// Sửa đường dẫn: Giả sử các component admin nằm cùng cấp với AdminPage
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminCustomers from "./admin/AdminCustomers";
import AdminStatistics from "./admin/AdminStatistics";
import AdminCategories from "./admin/AdminCategories"; 

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProducts />;
      case "orders":
        return <AdminOrders />;
      case "customers":
        return <AdminCustomers />;
      case "statistics":
        return <AdminStatistics />;
      // Thêm case mới cho Danh mục
      case "categories": 
        return <AdminCategories />;
    case "chat":
  return <AdminChatPage />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
}