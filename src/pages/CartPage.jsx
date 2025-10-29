"use client"

import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { getBookById, formatPrice } from "../lib/books"
import { useState } from "react"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)

  const cartItems = items
    .map((item) => ({
      ...item,
      book: getBookById(item.productId),
    }))
    .filter((item) => item.book)

  const subtotal = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  const shipping = 30000
  const tax = Math.floor(subtotal * 0.1)
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  if (cartItems.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Giỏ hàng của bạn trống</p>
          <Link to="/" className="text-primary hover:underline">
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                <img
                  src={item.book.image || "/placeholder.svg"}
                  alt={item.book.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{item.book.title}</h3>
                  <p className="text-gray-600 text-sm">{item.book.author}</p>
                  <p className="text-primary font-bold mt-2">{formatPrice(item.book.price)}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-auto text-red-500 hover:text-red-700 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Đơn Hàng</h2>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              {cartItems.map((item) => (
                <div key={item.productId} className="text-sm">
                  <p className="text-gray-700">
                    {item.book.title} × {item.quantity}
                  </p>
                  <p className="text-gray-600">
                    {formatPrice(item.book.price)} × {item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span>Tổng sản phẩm ({cartItems.length})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Thuế (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 font-bold"
            >
              Đặt hàng
            </button>

            {showSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">Đặt hàng thành công!</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
