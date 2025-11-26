"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { httpClient } from "../lib/httpClient";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);     // danh sách CartItem từ backend
  const [cartCount, setCartCount] = useState(0);      // số sản phẩm trong giỏ
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ============================
  // 1. Fetch cart size
  // ============================
  const fetchCartSize = async () => {
    try {
      const res = await httpClient.get("/carts/size");
      setCartCount(res.data?.result || 0);
    } catch (err) {
      console.error("Lỗi fetch cart size:", err);
    }
  };

  // ============================
  // 2. Fetch full cart
  // ============================
  const fetchMyCart = async () => {
    if (!token) return;
    try {
      const res = await httpClient.get("/carts/my-cart");
      setCartItems(res.data?.result?.cartItems || []);
    } catch (err) {
      console.error("Lỗi tải giỏ hàng:", err);
    }
  };

  // ============================
  // 3. Thêm sản phẩm vào giỏ
  // ============================
  const addToCartAPI = async (productId, quantity = 1) => {
    if (!token) {
      alert("Bạn cần đăng nhập trước!");
      return;
    }

    try {
      await httpClient.post("/carts/item", {
        productId,
        quantity: quantity.toString(),
      });

      await fetchMyCart();
      await fetchCartSize();
      
      alert("Đã thêm vào giỏ hàng!");

    } catch (err) {
      console.error("Lỗi thêm giỏ hàng:", err);
      alert("Không thể thêm vào giỏ hàng.");
    }
  };

  // ============================
  // 4. Tăng số lượng SP
  // ============================
  const increaseItemAPI = async (productId) => {
    try {
      await httpClient.put(`/carts/increase-item/${productId}`);

      await fetchMyCart();
      await fetchCartSize();

    } catch (err) {
      console.error("Lỗi tăng số lượng:", err);
    }
  };

  // ============================
  // 5. Giảm số lượng SP
  // ============================
  const decreaseItemAPI = async (productId) => {
    try {
      await httpClient.put(`/carts/decrease-item/${productId}`);

      await fetchMyCart();
      await fetchCartSize();

    } catch (err) {
      console.error("Lỗi giảm số lượng:", err);
    }
  };

  // ============================
  // 6. Xóa item khỏi giỏ
  // ============================
  const deleteCartItemAPI = async (cartItemId) => {
    try {
      await httpClient.delete(`/carts/delete-item/${cartItemId}`);

      await fetchMyCart();
      await fetchCartSize();

    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  // ============================
  // 7. Tải giỏ hàng khi login
  // ============================
  useEffect(() => {
    if (!token) return;
    const init = async () => {
      await fetchMyCart();
      await fetchCartSize();
      setLoading(false);
    };
    init();
  }, [token]);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,

        fetchMyCart,
        addToCartAPI,
        increaseItemAPI,
        decreaseItemAPI,
        deleteCartItemAPI
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
