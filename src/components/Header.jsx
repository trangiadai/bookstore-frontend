"use client";

import "./Header.css";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

export default function Header() {
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="logo-text">bookstore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/" className="nav-link">
              Trang chủ
            </Link>
            <Link to="/" className="nav-link">
              Sách của tôi
            </Link>
            <Link to="/" className="nav-link">
              Duyệt
            </Link>
            <Link to="/" className="nav-link">
              Cộng đồng
            </Link>
            <Link to="/admin" className="nav-link">
              Quản trị
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <svg
              className="search-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm sách..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-input"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="search-clear-btn"
              >
                <svg
                  className="search-clear-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Right Icons */}
          <div className="right-icons">
            <Link to="/profile" className="icon-link">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
            <Link to="/cart" className="cart-link">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getItemCount() > 0 && (
                <span className="cart-badge">{getItemCount()}</span>
              )}
            </Link>
            <Link to="/login" className="login-link">
              Đăng nhập
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
            >
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link">
              Trang chủ
            </Link>
            <Link to="/" className="mobile-nav-link">
              Sách của tôi
            </Link>
            <Link to="/" className="mobile-nav-link">
              Duyệt
            </Link>
            <Link to="/" className="mobile-nav-link">
              Cộng đồng
            </Link>
            <Link to="/admin" className="mobile-nav-link">
              Quản trị
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
