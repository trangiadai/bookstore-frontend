"use client";

import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

export default function Header() {
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="bg-[#f8f5ee] border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline">
              bookstore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#222222] transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-[#222222] transition-colors"
            >
              Sách của tôi
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-[#222222] transition-colors"
            >
              Duyệt
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-[#222222] transition-colors"
            >
              Cộng đồng
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-[#222222] transition-colors"
            >
              Quản trị
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-xs mx-4 relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
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
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
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
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="text-gray-700 hover:text-[#222222] transition-colors"
            >
              <svg
                className="w-6 h-6"
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
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-[#222222] transition-colors"
            >
              <svg
                className="w-6 h-6"
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
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="hidden sm:inline text-gray-700 hover:text-[#222222] transition-colors"
            >
              Đăng nhập
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              <svg
                className="w-6 h-6"
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
          <nav className="md:hidden pb-4 border-t border-gray-200">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-[#222222] transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-[#222222] transition-colors"
            >
              Sách của tôi
            </Link>
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-[#222222] transition-colors"
            >
              Duyệt
            </Link>
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-[#222222] transition-colors"
            >
              Cộng đồng
            </Link>
            <Link
              to="/admin"
              className="block py-2 text-gray-700 hover:text-[#222222] transition-colors"
            >
              Quản trị
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
