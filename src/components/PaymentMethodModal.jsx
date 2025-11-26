"use client";

export default function PaymentMethodModal({ onClose, onSelect, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-10 animate-fadeIn">
        <h2 className="text-2xl font-bold text-center mb-4">Chọn phương thức thanh toán</h2>

        <p className="text-gray-600 text-sm text-center mb-6">
          Vui lòng chọn cách bạn muốn thanh toán đơn hàng.
        </p>

        {/* BUTTONS */}
        <div className="space-y-4">
          {/* CREDIT CARD / STRIPE */}
          <button
            disabled={loading}
            onClick={() => onSelect("credit")}
            className={`w-full py-3 px-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Thanh toán bằng thẻ (Stripe)
          </button>

          {/* SHIP COD */}
          <button
            disabled={loading}
            onClick={() => onSelect("cod")}
            className={`w-full py-3 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Ship COD
          </button>
        </div>

        {/* LOADING TEXT */}
        {loading && (
          <p className="text-center mt-4 text-sm text-gray-500">
            Đang xử lý thanh toán, vui lòng chờ...
          </p>
        )}

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
