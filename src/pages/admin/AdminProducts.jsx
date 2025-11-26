"use client";

import "../admin/AdminPages.css";
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
      <h1 className="admin-page-header">Quản lý sản phẩm</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="admin-form-col">
          <h2 className="admin-form-title">Thêm sản phẩm</h2>

          <form onSubmit={handleSubmit} className="admin-form-group">
            <div className="admin-form-field">
              <label className="admin-form-label">Tên Sản Phẩm</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Tác Giả</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Năm Xuất Bản</label>
              <input
                type="text"
                name="publishYear"
                value={formData.publishYear}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Giá Nhập</label>
              <input
                type="number"
                name="importPrice"
                value={formData.importPrice}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Giá Gốc</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Giá Giảm</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Số Lượng</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Thể Loại</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="admin-form-select"
              >
                <option value="">-- Chọn Thể Loại --</option>
                <option value="kynang">Kỹ năng sống</option>
                <option value="vanhoc">Văn học</option>
                <option value="lichsu">Lịch sử</option>
                <option value="tamly">Tâm lý học</option>
              </select>
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Ngôn Ngữ</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="admin-form-input"
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-form-label">Hình Ảnh</label>
              <label className="admin-image-upload">
                <span className="text-gray-600 text-sm">Chọn tệp</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {formData.imagePreview && (
                <div className="admin-image-preview">
                  <img
                    src={formData.imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="admin-image-preview-img"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="admin-image-preview-btn"
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

            <div className="admin-form-field">
              <label className="admin-form-label">Mô Tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="admin-form-textarea"
              />
            </div>

            <div className="admin-form-buttons">
              <button type="submit" className="admin-btn-submit">
                Thêm
              </button>
              <button type="reset" className="admin-btn-reset">
                Hủy
              </button>
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="admin-products-col">
          <h2 className="admin-card-title">Danh sách sản phẩm</h2>

          <div className="admin-table-overflow">
            <table className="admin-table">
              <thead className="admin-table-head">
                <tr>
                  <th className="admin-table-header">Tên sản phẩm</th>
                  <th className="admin-table-header">Tác giả</th>
                  <th className="admin-table-header">Giá</th>
                  <th className="admin-table-header">Số lượng</th>
                  <th className="admin-table-header">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="admin-table-row">
                    <td className="admin-table-cell">{product.name}</td>
                    <td className="admin-table-cell">{product.author}</td>
                    <td className="admin-table-cell">{product.price}</td>
                    <td className="admin-table-cell">{product.quantity}</td>
                    <td className="admin-table-cell">
                      <button className="text-blue-600 admin-btn-link">
                        Sửa
                      </button>
                      <button className="admin-btn-delete">Xóa</button>
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
