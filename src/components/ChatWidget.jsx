import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client"; // v1.x
import { Send, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { httpClient } from "../lib/httpClient";

export default function ChatWidget() {
  const { isHydrated } = useAuth();
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, messages]);

  useEffect(() => {
    let s;

    const init = async () => {
      if (!open || !isHydrated) return;

      const convRes = await httpClient.get("/conversations/my-conversations");
      const convs = convRes.data?.result || [];
      let convId = convs[0]?.id;

      if (!convId) {
        const createRes = await httpClient.post("/conversations/create-default");
        convId = createRes.data?.result?.id;
      }

      setConversationId(convId);
      await fetchMessages(convId);

      // 🔥 CÁCH KẾT NỐI ĐÚNG CHO CLIENT V1.x
    //   s = io("http://localhost:8099", {
    //     transports: ["websocket", "polling"],
    //     query: "token=" + localStorage.getItem("token"),
    //   });
      s = new io("http://localhost:8099");

      setSocket(s);

      s.on("connect", () => {
        console.log("CLIENT CONNECTED:", s.id);
      });

      s.on("message", async () => {
        await fetchMessages(convId);
      });

      s.on("disconnect", () => {
        console.log("CLIENT DISCONNECTED");
      });
    };

    init();

    return () => {
      if (s) {
        s.off("message");
        s.disconnect();
      }
    };
  }, [open, isHydrated]);

  const fetchMessages = async (convId) => {
    const res = await httpClient.get("/messages", {
      params: { conversationId: convId },
    });

    setMessages([...res.data?.result || []].reverse());
    setTimeout(scrollToBottom, 80);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await httpClient.post("/messages/create", {
      conversationId,
      message: input.trim(),
    });
    setInput("");

    await fetchMessages(conversationId);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end">
      {open && (
        <div className="w-[320px] h-[440px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-indigo-600 text-white">
            <div className="font-semibold">Nhân viên hỗ trợ</div>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div ref={bodyRef} className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.me ? "justify-end" : ""}`}>
                <div
                  className={`px-3 py-2 rounded-xl max-w-[80%] text-sm ${
                    m.me
                      ? "bg-indigo-500 text-white rounded-br-none"
                      : "bg-white border rounded-tl-none"
                  }`}
                >
                  {m.message}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-full px-4 py-2"
              placeholder="Nhập tin nhắn..."
            />
            <button className="bg-indigo-600 text-white rounded-full p-2">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((x) => !x)}
        className="w-14 h-14 bg-green-500 text-white rounded-full shadow-xl"
      >
        💬
      </button>
    </div>
  );
}
