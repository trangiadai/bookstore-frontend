"use client";

import "./ProfilePage.css";
import { useState } from "react";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("/placeholder-user.jpg");
  const [user, setUser] = useState({
    name: "Người dùng",
    email: "user@example.com",
    phone: "",
    address: "",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="profile-container">
      <h1 className="profile-header">Hồ sơ của tôi</h1>

      <div className="profile-grid">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-sidebar-box">
            <div className="profile-avatar-container">
              <img
                src={avatar || "/placeholder.svg"}
                alt="Avatar"
                className="profile-avatar"
              />
              <label className="profile-avatar-btn">
                <svg
                  className="profile-avatar-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>

            <div className="profile-button-group">
              <button className="profile-btn-primary">Lịch sử mua hàng</button>
              <button className="profile-btn-secondary">
                Thông tin cá nhân
              </button>
              <button className="profile-btn-secondary">Sách yêu thích</button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="profile-content-box">
            <h3 className="profile-content-title">Lịch sử mua hàng</h3>
            <div className="profile-empty">
              <svg
                className="profile-empty-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10M7 12l8 4m0 0l8-4"
                />
              </svg>
              <p className="profile-empty-text">Bạn chưa có đơn hàng nào</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
