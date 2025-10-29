"use client";

import { useState } from "react";
import BookCard from "../components/BookCard";
import BookFilters from "../components/BookFilters";
import { BOOKS } from "../lib/books";

export default function HomePage() {
  const [filteredBooks, setFilteredBooks] = useState(BOOKS);
  const [showFilters, setShowFilters] = useState(false);

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
    <main className="px-2 sm:px-4 lg:px-6 py-8">
      <div className="flex gap-4">
        {/* Sidebar Filters */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-64 flex-shrink-0`}
        >
          <BookFilters onFilter={handleFilter} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden mb-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold">Tất cả sách</h1>
            <p className="text-gray-600">{filteredBooks.length} cuốn sách</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
