"use client";

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
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 font-semibold"
          >
            Đăng Nhập
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Chưa có tài khoản?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}
