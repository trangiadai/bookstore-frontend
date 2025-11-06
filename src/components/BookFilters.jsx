"use client";

import "./BookFilters.css";
import { useState } from "react";

const CATEGORIES = ["all", "Kỹ năng sống", "Văn học", "Lịch sử", "Tâm lý học"];
const RATINGS = [
  { label: "4+ sao", value: 4 },
  { label: "4.5+ sao", value: 4.5 },
];

export default function BookFilters({ onFilter }) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [rating, setRating] = useState(0);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    onFilter({ category: cat, search, priceRange, rating });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilter({ category, search: value, priceRange, rating });
  };

  const handlePriceChange = (e) => {
    const value = Number.parseInt(e.target.value);
    setPriceRange([0, value]);
    onFilter({ category, search, priceRange: [0, value], rating });
  };

  const handleRatingChange = (ratingValue) => {
    const newRating = rating === ratingValue ? 0 : ratingValue;
    setRating(newRating);
    onFilter({ category, search, priceRange, rating: newRating });
  };

  return (
    <div className="filter-container">
      <h3 className="filter-title">Bộ lọc</h3>

      {/* Search */}
      <div className="filter-section">
        <label className="filter-label">Tìm kiếm</label>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Tên sách, tác giả..."
          className="search-input"
        />
      </div>

      {/* Categories */}
      <div className="filter-section">
        <label className="filter-label-section">Danh mục</label>
        <div className="category-list">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="category-item">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => handleCategoryChange(cat)}
                className="category-radio"
              />
              <span className="category-text">
                {cat === "all" ? "Tất cả" : cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="price-section">
        <label className="filter-label-section">Khoảng giá</label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="300000"
            step="10000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="price-range-input"
          />
          <div className="price-display">
            <span className="price-text">0đ</span>
            <span className="price-text">
              {priceRange[1].toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
      </div>

      <div className="rating-section">
        <label className="filter-label-section">Đánh giá</label>
        <div className="rating-list">
          {RATINGS.map((r) => (
            <label key={r.value} className="rating-item">
              <input
                type="checkbox"
                checked={rating === r.value}
                onChange={() => handleRatingChange(r.value)}
                className="rating-checkbox"
              />
              <span className="rating-text">{r.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
