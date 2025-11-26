"use client";

import "./HomePage.css";
import { useState, useCallback, useEffect, useRef } from "react";
import BookCard from "../components/BookCard";
import BookFilters from "../components/BookFilters";
import { Bot, X, Loader2, Send, MessageSquare } from "lucide-react";
import { httpClient } from "../lib/httpClient";
import io from "socket.io-client"; 
import { useNavigate } from "react-router-dom";     // ✅ Import ở đúng chỗ

/* ============================================================
   1. CHAT SUPPORT (REALTIME USER ↔ ADMIN)
   ============================================================ */
const ChatSupportModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);

  const socketRef = useRef(null);
  const bodyRef = useRef(null);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    let s;

    const init = async () => {
      const convRes = await httpClient.get("/conversations/my-conversations");
      const convs = convRes.data?.result || [];
      let convId = convs[0]?.id;

      if (!convId) {
        const createRes = await httpClient.post("/conversations/create-default");
        convId = createRes.data?.result?.id;
      }

      setConversationId(convId);
      await fetchMessages(convId);

      s = io("http://localhost:8099", {
        transports: ["websocket", "polling"],
        query: "token=" + localStorage.getItem("token"),
      });

      socketRef.current = s;

      s.on("connect", () => console.log("USER CONNECTED:", s.id));
      s.on("message", async () => {
        await fetchMessages(convId);
        scrollToBottom();
      });
      s.on("disconnect", () => console.log("USER DISCONNECTED"));
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
        socketRef.current.disconnect();
      }
    };
  }, []);

  const fetchMessages = async (convId) => {
    const res = await httpClient.get("/messages", { params: { conversationId: convId } });
    setMessages([...res.data?.result || []].reverse());
    setTimeout(scrollToBottom, 80);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await httpClient.post("/messages/create-default?message=" + encodeURIComponent(input.trim()));

    setInput("");
    await fetchMessages(conversationId);
  };

  return (
    <div className="absolute right-0 bottom-0 w-[350px] h-[450px] bg-white rounded-xl shadow-2xl flex flex-col translate-y-[-16px] translate-x-[-16px] z-50 border border-gray-300">
      <div className="flex justify-between items-center p-4 bg-green-600 text-white">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <MessageSquare size={20} /> Chat với nhân viên hỗ trợ
        </h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-green-700">
          <X size={20} />
        </button>
      </div>

      <div ref={bodyRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-4 py-2 rounded-xl text-sm shadow-sm ${
                m.me
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
              }`}
            >
              {m.message}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border border-gray-300 rounded-full py-2 px-4 text-sm focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

/* ============================================================
   2. CHATBOT AI — BACKEND /api/chat
   ============================================================ */
const ChatbotModal = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([
    { role: "model", type: "chat", text: "Xin chào! Tôi là AI trợ lý ảo của cửa hàng. Bạn cần hỗ trợ gì ạ?" },
  ]);

  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatBodyRef = useRef(null);
  const navigate = useNavigate();

  const pushMessage = (m) => setChatHistory((prev) => [...prev, m]);

  const scrollToBottom = () => {
    if (chatBodyRef.current)
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  useEffect(() => {
    const id = setTimeout(scrollToBottom, 60);
    return () => clearTimeout(id);
  }, [chatHistory]);

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const text = chatInput.trim();

    pushMessage({ role: "user", type: "chat", text });
    setChatInput("");
    setIsLoading(true);

    try {
      const res = await httpClient.post("/api/chat", { message: text });
      const data = res?.data;

      if (data?.type === "chat" || data?.answer) {
        pushMessage({ role: "model", type: "chat", text: data.answer });
      }
      else if (data?.result?.cartItems) {
        pushMessage({
          role: "model",
          type: "cart_header",
          text: "🛍️ Các sản phẩm trong giỏ hàng của bạn:",
        });

        pushMessage({ role: "model", type: "cart", data: data.result });
      }
      else {
        pushMessage({
          role: "model",
          type: "chat",
          text: "Tôi chưa hiểu yêu cầu của bạn.",
        });
      }
    } catch (e) {
      pushMessage({
        role: "model",
        type: "chat",
        text: "Không thể kết nối tới chatbot.",
      });
    }

    setIsLoading(false);
  }, [chatInput, isLoading]);

  /* ---------- Render từng loại message ---------- */
  const renderMessage = (m, i) => {
    if (m.type === "cart_header") {
      return (
        <div key={i} className="flex justify-start">
          <div className="px-4 py-2 bg-white border rounded-xl font-semibold text-gray-900">
            {m.text}
          </div>
        </div>
      );
    }

    if (m.type === "cart") {
      const { cartItems, totalAmount } = m.data;

      return (
        <div key={i} className="flex justify-start">
          <div className="max-w-[85%] bg-white border rounded-xl p-3 text-sm space-y-4">

            {cartItems.map((it) => {
              const img = it.product.imagesUrl?.[0]?.url || "/placeholder.svg";
              const name = it.product.nameProduct;
              const price = it.product.sellingPrice;
              const qty = it.quatity ?? 1;
              const id = it.product.id;

              return (
                <div
                  key={it.id}
                  className="flex items-center gap-3 border-b pb-3 last:border-0 cursor-pointer hover:bg-gray-100 rounded-md p-2 transition"
                  onClick={() => navigate(`/product/${id}`)}     // 👉 Đi đến trang chi tiết
                >
                  <img src={img} className="w-14 h-14 rounded object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900">{name}</div>
                    <div className="text-gray-500 text-sm">Số lượng: {qty}</div>
                    <div className="font-bold text-gray-900">{price}₫</div>
                  </div>
                </div>
              );
            })}

            <div className="text-right font-semibold text-gray-900">
              Tổng: {totalAmount}₫
            </div>

            {/* Nút đi đến giỏ hàng */}
            <button
              onClick={() => navigate("/cart")}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              🛒 Đi đến giỏ hàng
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
        <div
          className={`max-w-[85%] px-4 py-2 rounded-xl text-sm shadow-sm ${
            m.role === "user"
              ? "bg-indigo-500 text-white rounded-br-none"
              : "bg-white text-gray-900 border rounded-tl-none"
          }`}
        >
          {m.text}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute right-0 bottom-0 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col translate-y-[-16px] translate-x-[-16px] z-50 border border-gray-300">

      <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Bot size={20} /> Chatbot AI
        </h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-indigo-700">
          <X size={20} />
        </button>
      </div>

      <div ref={chatBodyRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {chatHistory.map((m, i) => renderMessage(m, i))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-white border rounded-xl flex items-center gap-2">
              <Loader2 className="animate-spin text-indigo-500" size={16} />
              Đang soạn phản hồi...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2 bg-white">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Nhập tin nhắn..."
        />
        <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
          <Send size={18} />
        </button>
      </form>

    </div>
  );
};

/* ============================================================
   3. HOMEPAGE  —  CÓ PHÂN TRANG
   ============================================================ */
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import BookFilters from "../components/BookFilters";
import ChatSupportModal from "../components/ChatSupportModal";
import ChatbotModal from "../components/ChatbotModal";
import { MessageSquare, Bot } from "lucide-react";
import { httpClient } from "../lib/httpClient";

export default function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // ----------------------------
  // Load product list
  // ----------------------------
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await httpClient.get("/products");
        const data = res.data?.result || [];

        const formatted = data.map((p) => ({
          id: p.id,
          title: p.nameProduct,
          author: p.author,
          price: p.sellingPrice,
          salePrice: p.salePrice,
          rating: p.rating,
          reviews: p.reviews,
          image: p.imagesUrl?.[0]?.url || "/placeholder.svg",
          category: p.category,
        }));

        setAllProducts(formatted);
        setFilteredBooks(formatted);
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      }
    };

    loadProducts();
  }, []);

  // ----------------------------
  // Handle filters
  // ----------------------------
  const handleFilter = (filters) => {
    let filtered = [...allProducts];

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((b) => b.category === filters.category);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (b) =>
          b.price >= filters.priceRange[0] &&
          b.price <= filters.priceRange[1]
      );
    }

    if (filters.rating) {
      filtered = filtered.filter((b) => b.rating >= filters.rating);
    }

    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(keyword) ||
          b.author.toLowerCase().includes(keyword)
      );
    }

    setFilteredBooks(filtered);
  };

  return (
    <main className="home-main">
      <div className="home-container">
        {/* Mobile filter */}
        <div className={showFilters ? "home-sidebar-mobile" : "home-sidebar-hidden"}>
          <BookFilters onFilter={handleFilter} />
        </div>

        {/* Desktop filter */}
        <div className="hidden md:block md:w-64">
          <BookFilters onFilter={handleFilter} />
        </div>

        {/* Content */}
        <div className="home-content">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-toggle-btn"
          >
            {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </button>

          <h1 className="home-title">Tất cả sách</h1>
          <p className="home-subtitle">{filteredBooks.length} cuốn sách</p>

          <div className="home-grid">
            {filteredBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-4 z-50">
        {isMessageOpen && (
          <ChatSupportModal onClose={() => setIsMessageOpen(false)} />
        )}
        {isChatbotOpen && (
          <ChatbotModal onClose={() => setIsChatbotOpen(false)} />
        )}

        {/* Support chat */}
        <button
          onClick={() => {
            setIsMessageOpen((prev) => !prev);
            setIsChatbotOpen(false);
          }}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-green-500 text-white shadow-xl"
        >
          <MessageSquare size={26} />
        </button>

        {/* AI chatbot */}
        <button
          onClick={() => {
            setIsChatbotOpen((prev) => !prev);
            setIsMessageOpen(false);
          }}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-indigo-600 text-white shadow-xl"
        >
          <Bot size={26} />
        </button>
      </div>
    </main>
  );

}


