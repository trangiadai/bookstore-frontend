"use client";

import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

// Import ShoppingCart icon
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { cartCount } = useCart();        // cartCount từ CartContext
  const { username, logout, isAuthenticated } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            <Link to="/" className="nav-link">Trang chủ</Link>
            <Link to="/" className="nav-link">Sách của tôi</Link>
            <Link to="/" className="nav-link">Duyệt</Link>
            <Link to="/" className="nav-link">Cộng đồng</Link>
            <Link to="/admin" className="nav-link">Quản trị</Link>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm sách..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-input"
            />
            {searchValue && (
              <button onClick={() => setSearchValue("")} className="search-clear-btn">
                <svg className="search-clear-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Right Icons */}
          <div className="right-icons">
            
            {/* User Profile Icon */}
            <Link to="/profile" className="icon-link">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Cart Icon (new) */}
            <div
              className="relative cursor-pointer cart-link"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={26} className="icon" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Login / Username */}
            {!isAuthenticated ? (
              <Link to="/login" className="login-link">Đăng nhập</Link>
            ) : (
              <div className="user-menu">
                <span
                  className="login-link"
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{ cursor: "pointer" }}
                >
                  {username}
                </span>

                {menuOpen && (
                  <div className="dropdown-menu">
                    <button
                      onClick={handleLogout}
                      className="dropdown-item"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
            >
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link">Trang chủ</Link>
            <Link to="/" className="mobile-nav-link">Sách của tôi</Link>
            <Link to="/" className="mobile-nav-link">Duyệt</Link>
            <Link to="/" className="mobile-nav-link">Cộng đồng</Link>
            <Link to="/admin" className="mobile-nav-link">Quản trị</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
