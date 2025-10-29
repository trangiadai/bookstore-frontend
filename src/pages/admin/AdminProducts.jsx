"use client";

import { useState } from "react";

export default function AdminProducts() {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    publishYear: "",
    importPrice: "",
    originalPrice: "",
    discountPrice: "",
    quantity: "",
    category: "",
    language: "",
    image: null,
    imagePreview: null,
    description: "",
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      price: "86.000 đ",
      quantity: 50,
    },
    {
      id: 2,
      name: "Nhà Giả Kim",
      author: "Paulo Coelho",
      price: "79.000 đ",
      quantity: 35,
    },
    {
      id: 3,
      name: "Sapiens",
      author: "Yuval Noah Harari",
      price: "95.000 đ",
      quantity: 28,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      author: "",
      publishYear: "",
      importPrice: "",
      originalPrice: "",
      discountPrice: "",
      quantity: "",
      category: "",
      language: "",
      image: null,
      imagePreview: null,
      description: "",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Quản lý sản phẩm</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Thêm sản phẩm</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Tên Sản Phẩm
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Tác Giả
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Năm Xuất Bản
              </label>
              <input
                type="text"
                name="publishYear"
                value={formData.publishYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Giá Nhập
              </label>
              <input
                type="number"
                name="importPrice"
                value={formData.importPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Giá Gốc
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Giá Giảm
              </label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Số Lượng
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Thể Loại
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              >
                <option value="">-- Chọn Thể Loại --</option>
                <option value="kynang">Kỹ năng sống</option>
                <option value="vanhoc">Văn học</option>
                <option value="lichsu">Lịch sử</option>
                <option value="tamly">Tâm lý học</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Ngôn Ngữ
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Hình Ảnh
              </label>
              <label className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                <span className="text-gray-600 text-sm">Chọn tệp</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {formData.imagePreview && (
                <div className="mt-2 relative">
                  <img
                    src={formData.imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
              {!formData.imagePreview && (
                <p className="text-xs text-gray-500 mt-1">
                  Không có tệp nào được chọn
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mô Tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 font-semibold text-sm"
              >
                Thêm
              </button>
              <button
                type="reset"
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 font-semibold text-sm"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Danh sách sản phẩm</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">
                    Tên sản phẩm
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Tác giả</th>
                  <th className="text-left py-3 px-4 font-semibold">Giá</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Số lượng
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.author}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">{product.quantity}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        Sửa
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
