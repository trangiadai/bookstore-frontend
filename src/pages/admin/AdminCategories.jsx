import React, { useState, useMemo, useEffect } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronRight, X } from "lucide-react";
import { httpClient } from "../../lib/httpClient";

/* ===========================
   CATEGORY FORM MODAL
=========================== */
const CategoryFormModal = ({
  isOpen,
  onClose,
  category,
  onSubmit,
  categories,
}) => {
  const [nameCategory, setNameCategory] = useState(
    category ? category.nameCategory : ""
  );
  const [parentId, setParentId] = useState(
    category ? category.parentId || "" : ""
  );

  // Danh mục cha (only level 1)
  const parentCategories = useMemo(() => {
    return categories.filter((cat) => cat.parentId === null);
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameCategory) return;

    const payload = {
      nameCategory,
      parentId: parentId || null,
    };

    onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            {category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tên danh mục */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên danh mục
            </label>
            <input
              type="text"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Chọn danh mục cha */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục cha
            </label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Không có (danh mục cha) --</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameCategory}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Hủy
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              {category ? "Lưu thay đổi" : "Thêm danh mục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ===========================
   ADMIN CATEGORY PAGE
=========================== */
const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedParents, setExpandedParents] = useState({});

  /* Load danh mục */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await httpClient.get("/category");
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi tải danh mục:", err);
      }
    };

    fetchCategories();
  }, []);

  /* Build tree: parent + children */
  const { parentCategories, childCategoriesMap } = useMemo(() => {
    const parents = categories.filter((cat) => cat.parentId === null);

    const childrenMap = categories.reduce((acc, cat) => {
      if (cat.parentId) {
        if (!acc[cat.parentId]) acc[cat.parentId] = [];
        acc[cat.parentId].push(cat);
      }
      return acc;
    }, {});

    return { parentCategories: parents, childCategoriesMap: childrenMap };
  }, [categories]);

  /* SAVE (CREATE + UPDATE) */
  const handleSaveCategory = async (payload) => {
    try {
      if (editingCategory) {
        // UPDATE
        const res = await httpClient.put(
          `/category/${editingCategory.id}`,
          payload
        );
        const updated = res.data;

        setCategories((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      } else {
        // CREATE
        const res = await httpClient.post("/category", payload);
        setCategories((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Lỗi xử lý danh mục:", err);
      alert("Không thể lưu danh mục.");
    }
  };

  /* DELETE CATEGORY */
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    try {
      await httpClient.delete(`/category/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Lỗi xóa danh mục:", err);
      alert("Không thể xóa danh mục.");
    }
  };

  /* Expand / Collapse */
  const toggleExpand = (parentId) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  /* ROW COMPONENT */
  const CategoryRow = ({ category, isParent, isChild }) => {
    const hasChildren = childCategoriesMap[category.id]?.length > 0;
    const isExpanded = expandedParents[category.id];

    return (
      <>
        <tr
          className={`border-b ${
            isChild
              ? "bg-gray-50 border-l-4 border-indigo-300"
              : "bg-white font-medium"
          }`}
        >
          {/* NAME */}
          <td className="px-6 py-3">
            <div className={`flex items-center ${isChild ? "pl-12" : "pl-6"}`}>
              {isParent && hasChildren ? (
                <button
                  onClick={() => toggleExpand(category.id)}
                  className="mr-2 text-indigo-600"
                >
                  {isExpanded ? <ChevronDown /> : <ChevronRight />}
                </button>
              ) : (
                <div className="w-6 h-6 mr-2" />
              )}
              <span>{category.nameCategory}</span>
            </div>
          </td>

          {/* PARENT NAME */}
          <td className="px-6 py-3 text-gray-500">
            {isParent
              ? "Danh mục cha"
              : parentCategories.find((p) => p.id === category.parentId)
                  ?.nameCategory || "Lỗi"}
          </td>

          {/* ID */}
          <td className="px-6 py-3 text-gray-500">{category.id}</td>

          {/* ACTIONS */}
          <td className="px-6 py-3 text-right">
            <button
              onClick={() => {
                setEditingCategory(category);
                setIsModalOpen(true);
              }}
              className="text-blue-600 mr-2"
            >
              <Edit size={18} />
            </button>

            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </td>
        </tr>

        {/* CHILDREN */}
        {isParent &&
          isExpanded &&
          childCategoriesMap[category.id]?.map((child) => (
            <CategoryRow key={child.id} category={child} isChild={true} />
          ))}
      </>
    );
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản Lý Danh Mục Sản Phẩm</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          <Plus size={20} className="mr-2" />
          Thêm Danh Mục Mới
        </button>
      </header>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Tên danh mục</th>
              <th className="px-6 py-3 text-left">Danh mục cha</th>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {parentCategories.map((cat) => (
              <CategoryRow key={cat.id} category={cat} isParent={true} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        onSubmit={handleSaveCategory}
        categories={categories}
      />
    </div>
  );
};

export default AdminCategories;
