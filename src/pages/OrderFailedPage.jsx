"use client";

import { Link } from "react-router-dom";

export default function OrderFailedPage() {
  return (
    <main className="max-w-xl mx-auto py-20 px-4 text-center">

      {/* ICON ERROR */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-red-700 mb-4">
        Thanh toán không thành công
      </h1>

      <p className="text-gray-600 mb-6">
        Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc chọn phương thức khác.
      </p>

      {/* BOX INFO */}
      <div className="bg-white border rounded-xl shadow-md p-6 mb-10 text-left">
        <h2 className="text-lg font-semibold mb-2">Nguyên nhân phổ biến:</h2>

        <ul className="list-disc ml-5 space-y-1 text-gray-600 text-sm">
          <li>Thẻ thanh toán bị từ chối</li>
          <li>Kết nối mạng không ổn định</li>
          <li>Phiên thanh toán Stripe bị hủy</li>
          <li>Token xác thực hết hạn</li>
        </ul>

        <div className="mt-4 text-blue-600 text-sm">
          Nếu bạn thanh toán bằng thẻ, hãy thử lại trong vài phút.
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-3 items-center">

        <Link
          to="/cart"
          className="w-full max-w-sm py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Thử lại thanh toán
        </Link>

        <Link
          to="/"
          className="w-full max-w-sm py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition"
        >
          Về trang chủ
        </Link>

      </div>
    </main>
  );
}
