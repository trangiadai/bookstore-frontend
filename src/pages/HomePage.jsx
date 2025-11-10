"use client";

import "./HomePage.css";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookFilters from "../components/BookFilters";
import { BOOKS } from "../lib/books";
// import axios from "axios";
import api from "../api/axiosInstance";

export default function HomePage() {
  const [filteredBooks, setFilteredBooks] = useState(BOOKS);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);

  // ✅ Fetch products khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products"); // gọi API đúng cách
        console.log("Response data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  console.log("Products state:", products);

  const handleFilter = (filters) => {
    let filtered = BOOKS;

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((book) => book.category === filters.category);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (book) =>
          book.price >= filters.priceRange[0] &&
          book.price <= filters.priceRange[1]
      );
    }

    if (filters.rating) {
      filtered = filtered.filter((book) => book.rating >= filters.rating);
    }

    if (filters.search) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          book.author.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <main className="home-main">
      <div className="home-container">
        {/* Sidebar Filters */}
        <div
          className={
            showFilters ? "home-sidebar-mobile" : "home-sidebar-hidden"
          }
        >
          <BookFilters onFilter={handleFilter} />
        </div>

        {/* Sidebar visible on desktop */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <BookFilters onFilter={handleFilter} />
        </div>

        {/* Main Content */}
        <div className="home-content">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle-btn"
          >
            {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </button>

          <div className="home-header">
            <h1 className="home-title">Tất cả sách</h1>
            <p className="home-subtitle">{filteredBooks.length} cuốn sách</p>
          </div>

          <div className="home-grid">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
