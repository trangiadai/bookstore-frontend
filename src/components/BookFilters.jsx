"use client";

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
    <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
      <h3 className="font-bold text-lg mb-6">Bộ lọc</h3>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Tìm kiếm</label>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Tên sách, tác giả..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3">Danh mục</label>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4"
              />
              <span className="text-sm">{cat === "all" ? "Tất cả" : cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3">Khoảng giá</label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="300000"
            step="10000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>0đ</span>
            <span>{priceRange[1].toLocaleString("vi-VN")}đ</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">Đánh giá</label>
        <div className="space-y-2">
          {RATINGS.map((r) => (
            <label
              key={r.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={rating === r.value}
                onChange={() => handleRatingChange(r.value)}
                className="w-4 h-4"
              />
              <span className="text-sm">{r.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
