"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BOOKS } from "../lib/books"
import { useCart } from "../contexts/CartContext"
import { formatPrice } from "../lib/books"

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [userRating, setUserRating] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const book = BOOKS.find((b) => b.id === Number.parseInt(id))

  if (!book) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-4">
          ← Quay lại
        </button>
        <p className="text-center text-gray-600">Sách không tìm thấy</p>
      </main>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book.id.toString())
    }
    navigate("/cart")
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-8 flex items-center gap-1">
        ← Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Product Image and Actions */}
        <div className="md:col-span-1">
          <div
            className="bg-gray-100 rounded-lg overflow-hidden mb-4 flex items-center justify-center w-full md:w-80"
            style={{ aspectRatio: "3/4" }}
          >
            <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
          </div>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-full py-3 mb-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            {isWishlisted ? "✓ Muốn đọc" : "Muốn đọc"}
          </button>

          <button
            onClick={handleAddToCart}
            disabled={!book.inStock}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-400 disabled:text-white disabled:border-gray-400 font-semibold"
          >
            {book.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
          </button>

          <div className="mt-6 p-4 border border-gray-200 rounded-lg">
            <p className="text-sm font-semibold mb-3">Đánh giá cuốn sách này</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="text-2xl transition-colors"
                  style={{ color: star <= userRating ? "#fbbf24" : "#e5e7eb" }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 text-lg mb-4">bởi {book.author}</p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-yellow-400 text-xl">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(book.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-gray-600">
              {book.rating} · {book.reviews.toLocaleString("vi-VN")} đánh giá · {book.reviews.toLocaleString("vi-VN")}{" "}
              nhận xét
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">{book.description}</p>

          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Thể loại</p>
            <div className="flex flex-wrap gap-2">
              {book.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h3 className="font-bold text-lg mb-4">Chi tiết sách</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Số trang</p>
                <p className="font-semibold">{book.pages}</p>
              </div>
              <div>
                <p className="text-gray-600">Nhà xuất bản</p>
                <p className="font-semibold">{book.publisher}</p>
              </div>
              <div>
                <p className="text-gray-600">Ngày xuất bản</p>
                <p className="font-semibold">{new Date(book.publishDate).toLocaleDateString("vi-VN")}</p>
              </div>
              <div>
                <p className="text-gray-600">Ngôn ngữ</p>
                <p className="font-semibold">{book.language}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">ISBN</p>
                <p className="font-semibold">{book.isbn}</p>
              </div>
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <span className="text-lg text-gray-500 line-through">{formatPrice(book.originalPrice)}</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r border-gray-300">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
