"use client";

import "./CartPage.css";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getBookById, formatPrice } from "../lib/books";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const cartItems = items
    .map((item) => ({
      ...item,
      book: getBookById(item.productId),
    }))
    .filter((item) => item.book);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );
  const shipping = 30000;
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-container">
        <h1 className="cart-header">Giỏ hàng</h1>
        <div className="cart-empty">
          <p className="cart-empty-text">Giỏ hàng của bạn trống</p>
          <Link to="/" className="text-primary hover:underline">
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-container">
      <h1 className="cart-header">Giỏ hàng</h1>

      <div className="cart-grid">
        {/* Cart Items */}
        <div className="cart-items-section">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <img
                  src={item.book.image || "/placeholder.svg"}
                  alt={item.book.title}
                  className="cart-item-image"
                />
                <div className="flex-1">
                  <h3 className="cart-item-title">{item.book.title}</h3>
                  <p className="cart-item-author">{item.book.author}</p>
                  <p className="cart-item-price">
                    {formatPrice(item.book.price)}
                  </p>

                  <div className="cart-qty-control">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="cart-qty-btn"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="cart-remove-btn"
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
        <div className="cart-summary">
          <div className="cart-summary-box">
            <h2 className="cart-summary-title">Đơn Hàng</h2>

            <div className="cart-summary-items">
              {cartItems.map((item) => (
                <div key={item.productId} className="cart-summary-item">
                  <p className="cart-summary-item-name">
                    {item.book.title} × {item.quantity}
                  </p>
                  <p className="cart-summary-item-price">
                    {formatPrice(item.book.price)} × {item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="cart-summary-details">
              <div className="cart-summary-detail">
                <span>Tổng sản phẩm ({cartItems.length})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-summary-detail">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="cart-summary-detail">
                <span>Thuế (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="cart-summary-total">
              <div className="cart-summary-total-text">
                <span>Tổng cộng</span>
                <span className="cart-summary-total-amount">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button onClick={handleCheckout} className="cart-checkout-btn">
              Đặt hàng
            </button>

            {showSuccess && (
              <div className="cart-success-msg">Đặt hàng thành công!</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
