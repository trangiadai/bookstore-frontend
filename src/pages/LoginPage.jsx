"use client";

import "./AuthPages.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // trường này đang là "email"
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // để điều hướng sau khi đăng nhập thành công

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Gửi POST request tới backend
      const response = await axios.post(
        "http://localhost:8080/bookstore/auth/token",
        {
          username: email, // Backend của bạn dùng "username" chứ không phải "email"
          password: password,
        }
      );

      // Lấy token từ kết quả trả về
      const token = response.data.result.token;

      // Lưu token vào localStorage để dùng cho các API khác
      localStorage.setItem("token", token);

      alert("Đăng nhập thành công!");
      navigate("/"); // chuyển về trang chủ hoặc trang products
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <h1 className="auth-title">Đăng Nhập</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Tên đăng nhập</label>
            <input
              type="text"
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

          {error && <p className="error-text">{error}</p>}

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
