"use client"

import { useEffect, useState } from "react"
import { httpClient } from "../lib/httpClient"
import { useNavigate } from "react-router-dom"
import { formatPrice } from "../lib/books"
import { Pencil } from "lucide-react"

export default function CheckoutPage() {
  const [user, setUser] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [tempValue, setTempValue] = useState("")
  const [discountCode, setDiscountCode] = useState("")
  const [note, setNote] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("COD")
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // ==============================
  //  TẢI USER PROFILE
  // ==============================
  const loadUser = async () => {
    try {
      const res = await httpClient.get("/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setUser(res.data?.result || null)
    } catch (err) {
      console.error("Lỗi tải thông tin user:", err)
      if (err.response?.status === 401) navigate("/login")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const handleEdit = (field) => {
    setEditingField(field)
    setTempValue(user[field] || "")
  }

  const handleSave = async () => {
    try {
      const body = { [editingField]: tempValue }

      await httpClient.put("/users/update", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })

      setUser((prev) => ({ ...prev, [editingField]: tempValue }))
      setEditingField(null)
    } catch (err) {
      console.error("Lỗi cập nhật user:", err)
    }
  }

  const handleSubmitOrder = () => {
    // Sau này bạn tích hợp API tạo đơn
    console.log({
      discountCode,
      note,
      paymentMethod,
      user,
    })

    navigate("/order-success")
  }

  if (loading) {
    return <div className="p-8">Đang tải...</div>
  }

  if (!user) {
    return <div className="p-8 text-center">Không tìm thấy thông tin người dùng.</div>
  }

  // ==============================
  // UI FIELD ROW
  // ==============================
  const FieldRow = ({ label, value, field }) => (
    <div className="flex justify-between items-center bg-white border rounded-lg p-4">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "Chưa có"}</p>
      </div>

      <button onClick={() => handleEdit(field)} className="text-primary hover:opacity-70">
        <Pencil size={20} />
      </button>
    </div>
  )

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

      {/* USER INFO */}
      <section className="space-y-4 mb-10">
        <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>

        <FieldRow label="Tên tài khoản" value={user.username} field="username" />
        <FieldRow label="Email" value={user.email} field="email" />
        <FieldRow label="Số điện thoại" value={user.phone} field="phone" />
        <FieldRow label="Địa chỉ nhận hàng" value={user.address} field="address" />
      </section>

      {/* DISCOUNT */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Mã giảm giá</h2>

        <input
          type="text"
          className="w-full border rounded-lg p-3"
          placeholder="Nhập mã giảm giá (nếu có)"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
      </section>

      {/* NOTE */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Lời nhắn</h2>

        <textarea
          rows="4"
          className="w-full border rounded-lg p-3"
          placeholder="Lời nhắn cho cửa hàng..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </section>

      {/* PAYMENT METHOD */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Hình thức thanh toán</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border rounded-lg bg-white cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Ship COD (Thanh toán khi nhận hàng)
          </label>

          <label className="flex items-center gap-3 p-4 border rounded-lg bg-white cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "CARD"}
              onChange={() => setPaymentMethod("CARD")}
            />
            Thẻ tín dụng (Credit Card)
          </label>
        </div>
      </section>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmitOrder}
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 font-bold text-lg"
      >
        Xác nhận thanh toán
      </button>

      {/* EDIT MODAL */}
      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-3">Chỉnh sửa thông tin</h3>

            <input
              className="w-full border rounded-lg p-3 mb-4"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
