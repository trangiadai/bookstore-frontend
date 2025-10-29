"use client"

import { useState } from "react"

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("/placeholder-user.jpg")
  const [user, setUser] = useState({
    name: "Người dùng",
    email: "user@example.com",
    phone: "",
    address: "",
  })

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatar(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Hồ sơ của tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={avatar || "/placeholder.svg"}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-opacity-90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            <h2 className="text-center font-bold text-lg">{user.name}</h2>
            <p className="text-center text-gray-600 text-sm">{user.email}</p>

            <div className="mt-6 space-y-2">
              <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-opacity-90">
                Lịch sử mua hàng
              </button>
              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Thông tin cá nhân
              </button>
              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Sách yêu thích</button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Lịch sử mua hàng</h3>
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10M7 12l8 4m0 0l8-4"
                />
              </svg>
              <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
