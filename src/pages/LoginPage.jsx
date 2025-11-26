"use client";

import "./AuthPages.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { httpClient } from "../lib/httpClient";
import { useAuth } from "../contexts/AuthContext";   // <-- thêm

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();   // <-- thêm

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  try {
    const response = await httpClient.post("/auth/token", {
      username,
      password,
    });

    const { token, authenticated } = response.data?.result || {};

    if (!authenticated) {
      setErrorMsg("Sai tên đăng nhập hoặc mật khẩu.");
      return;
    }

    if (token) {
      login(token); 
      navigate("/");
      return;
    }

    setErrorMsg("Đăng nhập thất bại. Vui lòng thử lại.");
  } catch (error) {
    console.error("Login error:", error);
    setErrorMsg("Có lỗi xảy ra. Vui lòng thử lại.");
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          {errorMsg && <p className="error-text">{errorMsg}</p>}

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
