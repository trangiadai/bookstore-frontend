"use client";

import "./ReviewSection.css";
import { useState } from "react";
import { getReviewsByBookId, calculateRatingStats } from "../lib/books";

export default function ReviewSection({ bookId, bookRating }) {
  const [reviews, setReviews] = useState(getReviewsByBookId(bookId));
  const [searchText, setSearchText] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    title: "",
    content: "",
    rating: 0,
  });
  const ratingStats = calculateRatingStats(reviews);

  const handleSubmitReview = () => {
    if (!reviewForm.title || !reviewForm.content || reviewForm.rating === 0) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newReview = {
      id: Date.now(),
      bookId: bookId,
      author: "Bạn",
      avatar: "/placeholder.svg",
      rating: reviewForm.rating,
      title: reviewForm.title,
      content: reviewForm.content,
      date: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setReviewForm({ title: "", content: "", rating: 0 });
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.content
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesRating = filterRating === 0 || review.rating === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <section className="review-section">
      <h2 className="review-title">Đánh giá từ cộng đồng</h2>

      {/* Rating Stats */}
      <div className="rating-stats-container">
        <div className="rating-stats-flex">
          {/* Average Rating */}
          <div className="rating-average-container">
            <div className="rating-average-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(bookRating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="rating-average-score">{bookRating}</span>
            <p className="rating-average-text">
              {ratingStats.totalReviews} đánh giá
            </p>
          </div>

          {/* Rating Bars */}
          <div className="rating-bars-container">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingStats.stats[stars] || 0;
              const percentage =
                ratingStats.totalReviews > 0
                  ? (count / ratingStats.totalReviews) * 100
                  : 0;
              return (
                <div key={stars} className="rating-bar-row">
                  <button
                    onClick={() =>
                      setFilterRating(filterRating === stars ? 0 : stars)
                    }
                    className="rating-bar-button"
                  >
                    {stars} sao
                  </button>
                  <div className="rating-bar-background">
                    <div
                      className="rating-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="rating-bar-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="review-form-container">
        <div className="review-form-space">
          {/* Rating Selection */}
          <div className="form-section">
            <p className="form-section-label">Cho số sao</p>
            <div className="rating-input-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  className="rating-input-star"
                  style={{
                    color: star <= reviewForm.rating ? "#fbbf24" : "#e5e7eb",
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="form-section-label-block">Tiêu đề đánh giá</label>
            <input
              type="text"
              placeholder="Nhập tiêu đề đánh giá..."
              value={reviewForm.title}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, title: e.target.value })
              }
              className="form-input"
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="form-section-label-block">
              Nội dung đánh giá
            </label>
            <textarea
              placeholder="Chia sẻ suy nghĩ của bạn về cuốn sách này..."
              value={reviewForm.content}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, content: e.target.value })
              }
              className="form-textarea"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button onClick={handleSubmitReview} className="submit-btn">
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <div className="search-input-wrapper">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5"
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
            placeholder="Tìm kiếm bình luận..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="search-clear-btn"
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
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-item-flex">
                {/* Avatar */}
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.author}
                  className="review-avatar"
                />

                {/* Review Content */}
                <div className="review-content-container">
                  <div className="review-header">
                    <div>
                      <p className="review-author-name">{review.author}</p>
                      <p className="review-date">
                        {new Date(review.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>

                  {/* Review Title and Content */}
                  <p className="review-title-text">{review.title}</p>
                  <p className="review-text">{review.content}</p>

                  <button className="review-action-btn">
                    Hữu ích · Phản hồi
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="reviews-empty">Chưa có đánh giá nào</p>
        )}
      </div>
    </section>
  );
}
