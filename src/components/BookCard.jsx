"use client";

import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/books";
import { useState } from "react";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="bg-white">
      <div
        className="relative overflow-hidden bg-gray-100 cursor-pointer rounded-lg border border-gray-200"
        onClick={() => navigate(`/product/${book.id}`)}
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
        style={{ width: "282px", height: "423px" }}
      >
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
        {showCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(book);
            }}
            className="absolute bottom-4 right-4 bg-black text-white p-1.5 rounded-lg transition-colors"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="pt-3">
        <h3
          className="font-bold text-sm sm:text-base line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/product/${book.id}`)}
        >
          {book.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">{book.author}</p>

        <div className="flex items-center gap-2 my-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(book.rating))}
          </div>
          <span className="text-xs text-gray-600">({book.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-primary">
            {formatPrice(book.price)}
          </span>
          {book.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(book.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
