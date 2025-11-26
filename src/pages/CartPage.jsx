"use client";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/books";
import PaymentMethodModal from "../components/PaymentMethodModal";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, increaseItemAPI, decreaseItemAPI, deleteCartItemAPI } = useCart();

  // -----------------------------
  // STATE CHỌN SẢN PHẨM
  // -----------------------------
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  // Modal thanh toán
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // Reset selected state khi cart tải lại
  useEffect(() => {
    const newState = {};
    cartItems.forEach(item => {
      newState[item.id] = true; // MẶC ĐỊNH CHỌN TẤT CẢ
    });
    setSelectedItems(newState);
    setSelectAll(true);
  }, [cartItems]);

  // Toggle chọn từng item
  const toggleSelect = (cartItemId) => {
    setSelectedItems(prev => {
      const updated = { ...prev, [cartItemId]: !prev[cartItemId] };
      const allSelected = Object.values(updated).every(x => x === true);
      setSelectAll(allSelected);
      return updated;
    });
  };

  // Toggle chọn tất cả
  const toggleSelectAll = () => {
    const newVal = !selectAll;
    const updated = {};
    cartItems.forEach(item => updated[item.id] = newVal);
    setSelectedItems(updated);
    setSelectAll(newVal);
  };

  // -----------------------------
  // TÍNH TỔNG TIỀN
  // -----------------------------
  const selectedProducts = cartItems.filter(item => selectedItems[item.id]);

  const subtotal = selectedProducts.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0
  );
  const shipping = selectedProducts.length > 0 ? 30000 : 0;
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  // -----------------------------
  // EMPTY CART UI
  // -----------------------------
  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
          <Link to="/" className="text-primary hover:underline">
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  // -----------------------------
  // HANDLE CHECKOUT (API CALL)
  // -----------------------------
  const handleCheckout = async (method) => {
    try {
      setLoadingCheckout(true);

      // ==============================
      // 1) THANH TOÁN CREDIT CARD
      // ==============================
      if (method === "credit") {
        const res = await fetch("http://localhost:8080/bookstore/checkout/create-session", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();

        if (data.code === 1000) {
          const url = data.result.stripeCheckoutUrl;
          window.location.href = url;
        } else {
          navigate("/payment/failed");
        }
      }

      // ==============================
      // 2) THANH TOÁN SHIP COD
      // ==============================
      if (method === "cod") {
        const res = await fetch("http://localhost:8080/bookstore/checkout/create-shipCOD", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });

        const data = await res.json();

        if (data.code === 1000) {
          // Gửi thông tin đơn hàng qua state
          navigate("/payment/success", {
            state: { order: data.result }
          });
        } else {
          navigate("/payment/failed");
        }
      }
    } catch (err) {
      console.error("Lỗi thanh toán:", err);
      navigate("/payment/failed");
    } finally {
      setLoadingCheckout(false);
      setShowPaymentModal(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

      {/* CHỌN TẤT CẢ */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">
          Chọn tất cả ({cartItems.length})
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LIST CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="bg-white border border-gray-300 rounded-lg p-4 flex gap-4 items-start"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedItems[item.id] || false}
                onChange={() => toggleSelect(item.id)}
                className="w-5 h-5 mt-2"
              />

              {/* Image */}
              <img
                src={item.product.imagesUrl?.[0]?.url || "/placeholder.svg"}
                alt={item.product.nameProduct}
                className="w-20 h-28 rounded object-cover"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.product.nameProduct}</h3>

                <p className="text-primary font-semibold mt-1">
                  {formatPrice(item.product.sellingPrice)}
                </p>

                {/* QUANTITY CONTROL */}
                <div className="flex items-center gap-2 mt-3">

                  {/* BUTTON - */}
                  <button
                    onClick={() => decreaseItemAPI(item.product.id)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  {/* BUTTON + */}
                  <button
                    onClick={() => increaseItemAPI(item.product.id)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteCartItemAPI(item.id)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-1 bg-white border border-gray-300 rounded-lg p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold mb-4">Thanh toán</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
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

          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Tổng cộng</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>

          <button
            disabled={selectedProducts.length === 0}
            onClick={() => setShowPaymentModal(true)}
            className={`w-full py-3 mt-5 rounded-lg text-white font-bold ${
              selectedProducts.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-opacity-90"
            }`}
          >
            Thanh toán ({selectedProducts.length} sản phẩm)
          </button>
        </div>
      </div>

      {/* MODAL CHỌN PHƯƠNG THỨC THANH TOÁN */}
      {showPaymentModal && (
        <PaymentMethodModal
          onClose={() => setShowPaymentModal(false)}
          onSelect={handleCheckout}
          loading={loadingCheckout}
        />
      )}
    </main>
  );
}
