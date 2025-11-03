"use client";

import { useState } from "react";
import { getReviewsByBookId, calculateRatingStats } from "../lib/books";
import { Search, X } from "lucide-react";

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
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Đánh giá từ cộng đồng</h2>

      {/* Rating Stats */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center">
            <div className="flex text-yellow-400 text-3xl mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(bookRating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-2xl font-bold">{bookRating}</span>
            <p className="text-sm text-gray-600 mt-1">
              {ratingStats.totalReviews} đánh giá
            </p>
          </div>

          {/* Rating Bars */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingStats.stats[stars] || 0;
              const percentage =
                ratingStats.totalReviews > 0
                  ? (count / ratingStats.totalReviews) * 100
                  : 0;
              return (
                <div key={stars} className="flex items-center gap-3 mb-3">
                  <button
                    onClick={() =>
                      setFilterRating(filterRating === stars ? 0 : stars)
                    }
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 w-12"
                  >
                    {stars} sao
                  </button>
                  <div className="flex-1 bg-gray-300 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-8 p-6 border border-gray-300 rounded-lg bg-white">
        <div className="space-y-4">
          {/* Rating Selection */}
          <div>
            <p className="text-sm font-semibold mb-2">Cho số sao</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  className="text-3xl transition-colors"
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
            <label className="text-sm font-semibold block mb-2">
              Tiêu đề đánh giá
            </label>
            <input
              type="text"
              placeholder="Nhập tiêu đề đánh giá..."
              value={reviewForm.title}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="text-sm font-semibold block mb-2">
              Nội dung đánh giá
            </label>
            <textarea
              placeholder="Chia sẻ suy nghĩ của bạn về cuốn sách này..."
              value={reviewForm.content}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, content: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmitReview}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm bình luận..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="pb-6 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-yellow-400 text-lg mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>

                  {/* Review Title and Content */}
                  <p className="font-semibold text-gray-900 mb-2">
                    {review.title}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {review.content}
                  </p>

                  <button className="mt-3 text-sm font-semibold text-gray-600 hover:text-gray-900">
                    Hữu ích · Phản hồi
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">Chưa có đánh giá nào</p>
        )}
      </div>
    </section>
  );
}
