"use client";

import "./ProductDetailPage.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BOOKS } from "../lib/books";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/books";
import ReviewSection from "../components/ReviewSection";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const book = BOOKS.find((b) => b.id === Number.parseInt(id));

  if (!book) {
    return (
      <main className="detail-main">
        <button onClick={() => navigate(-1)} className="back-button-not-found">
          ← Quay lại
        </button>
        <p className="not-found-text">Sách không tìm thấy</p>
      </main>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book.id);
    }
    navigate("/cart");
  };

  return (
    <main className="detail-main">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Quay lại
      </button>

      <div className="detail-grid">
        {/* Left: Product Image and Actions - STICKY */}
        <div className="detail-left">
          <div
            className="product-image-container"
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              className="product-image"
            />
          </div>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="wishlist-btn"
          >
            {isWishlisted ? "✓ Muốn đọc" : "Muốn đọc"}
          </button>

          <button
            onClick={handleAddToCart}
            disabled={!book.inStock}
            className="add-to-cart-btn"
          >
            {book.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
          </button>

          <div className="rating-section">
            <p className="rating-section-title">Đánh giá cuốn sách này</p>
            <div className="rating-stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="rating-star-btn"
                  style={{ color: star <= userRating ? "#fbbf24" : "#e5e7eb" }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Details - SCROLLABLE */}
        <div className="detail-right">
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">bởi {book.author}</p>

          {/* Rating */}
          <div className="detail-rating-container">
            <div className="detail-rating-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(book.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="detail-rating-text">
              {book.rating} · {book.reviews.toLocaleString("vi-VN")} đánh giá ·{" "}
              {book.reviews.toLocaleString("vi-VN")} nhận xét
            </span>
          </div>

          {/* Description */}
          <p className="detail-description">{book.description}</p>

          <div className="genre-section">
            <p className="genre-title">Thể loại</p>
            <div className="genre-tags">
              {book.genres.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="book-details-section">
            <h3 className="book-details-title">Chi tiết sách</h3>
            <div className="book-details-grid">
              <div>
                <p className="detail-item-label">Số trang</p>
                <p className="detail-item-value">{book.pages}</p>
              </div>
              <div>
                <p className="detail-item-label">Nhà xuất bản</p>
                <p className="detail-item-value">{book.publisher}</p>
              </div>
              <div>
                <p className="detail-item-label">Ngày xuất bản</p>
                <p className="detail-item-value">
                  {new Date(book.publishDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div>
                <p className="detail-item-label">Ngôn ngữ</p>
                <p className="detail-item-value">{book.language}</p>
              </div>
              <div className="detail-item-full">
                <p className="detail-item-label">ISBN</p>
                <p className="detail-item-value">{book.isbn}</p>
              </div>
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="price-quantity-section">
            <div className="price-container">
              <span className="current-price">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <span className="original-price">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>

            <div className="quantity-container">
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  −
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <ReviewSection bookId={book.id} bookRating={book.rating} />
        </div>
      </div>
    </main>
  );
}
