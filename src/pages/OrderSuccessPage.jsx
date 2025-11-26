"use client";

import { useLocation, Link } from "react-router-dom";

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order || null; // Ship COD sẽ có order thật – Stripe thì null

  return (
    <main className="max-w-2xl mx-auto py-16 px-4 text-center">
      {/* ICON CHECK */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Thanh toán thành công!
      </h1>

      <p className="text-gray-600 mb-8">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận.
      </p>

      {/* ======================== */}
      {/* HIỂN THỊ THÔNG TIN ĐƠN HÀNG */}
      {/* ======================== */}
      <div className="bg-white border rounded-xl shadow-md p-6 text-left mb-10">
        <h2 className="text-xl font-semibold mb-3">Thông tin đơn hàng</h2>

        {order ? (
          <>
            {/* TRƯỜNG HỢP SHIP COD */}
            <p><strong>Mã đơn hàng:</strong> {order?.id || "N/A"}</p>
            <p><strong>Ngày tạo:</strong> {order?.orderDate}</p>
            <p><strong>Phương thức:</strong> {order?.paymentMethod}</p>
            <p><strong>Tổng tiền:</strong> {order?.totalAmount}đ</p>

            <hr className="my-4" />

            <h3 className="font-semibold mb-2">Sản phẩm đã đặt:</h3>
            <ul className="space-y-2">
              {order.orderItems?.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{item.product.nameProduct}</span>
                  <span>x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            {/* TRƯỜNG HỢP STRIPE (Vì Stripe redirect không trả dữ liệu về FE) */}
            <p><strong>Mã đơn hàng:</strong> đang xử lý...</p>
            <p><strong>Phương thức:</strong> Credit Card (Stripe)</p>
            <p><strong>Trạng thái:</strong> Thanh toán thành công</p>

            <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              Dữ liệu đơn hàng thật sẽ hiển thị khi backend cung cấp API
              <br /> <strong>GET /orders/my-orders</strong> trong tương lai.
            </div>
          </>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-3 items-center">
        <Link
          to="/"
          className="w-full max-w-sm py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Về trang chủ
        </Link>

        <Link
          to="/cart"
          className="w-full max-w-sm py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition"
        >
          Xem giỏ hàng
        </Link>
      </div>
    </main>
  );
}
