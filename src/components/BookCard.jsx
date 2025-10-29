"use client";

import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/books";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div
        className="aspect-square overflow-hidden bg-gray-100 cursor-pointer h-64"
        onClick={() => navigate(`/product/${book.id}`)}
      >
        <img
          src={book.image || "/placeholder.svg"}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h3
          className="font-bold text-sm sm:text-base line-clamp-2 cursor-pointer hover:text-primary"
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
