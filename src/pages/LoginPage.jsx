"use client";

import "./AuthPages.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <h1 className="auth-title">Đăng Nhập</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Đăng Nhập
          </button>
        </form>

        <p className="auth-footer">
          Chưa có tài khoản?{" "}
          <Link to="/signup" className="auth-link">
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}
