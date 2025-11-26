"use client";

import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../lib/books";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const { addToCartAPI } = useCart(); // ← dùng API mới

  const handleAddQuick = async (e) => {
    e.stopPropagation();

    const success = await addToCartAPI(book.id, 1);

    if (success) {
      // bạn muốn popup hay toast thì nói thêm nhé
      console.log("Thêm vào giỏ nhanh thành công");
    }
  };

  return (
    <div className="book-card">
      <div
        className="book-image-container"
        onClick={() => navigate(`/product/${book.id}`)}
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
        style={{ width: "282px", height: "423px" }}
      >
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="book-image"
        />

        {showCart && (
          <button className="cart-button" onClick={handleAddQuick}>
            <svg
              className="cart-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 
                 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 
                 1.707.707 1.707H17m0 0a2 2 0 100 
                 4 2 2 0 000-4zm-8 2a2 2 0 11-4 
                 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="book-info">
        <h3
          className="book-title"
          onClick={() => navigate(`/product/${book.id}`)}
        >
          {book.title}
        </h3>

        <p className="book-author">{book.author}</p>

        <div className="book-rating-container">
          <div className="book-rating-stars">
            {"★".repeat(Math.floor(book.rating))}
          </div>
          <span className="book-review-count">({book.reviews})</span>
        </div>

        <div className="book-price-container">
          <span className="book-price">{formatPrice(book.price)}</span>
        </div>
      </div>
    </div>
  );
}
