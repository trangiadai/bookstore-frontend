import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'; // v1.x
import AdminChatMessage from './AdminChatMessage';
import { httpClient } from '../../../lib/httpClient';
import { Send } from 'lucide-react';

export default function AdminChatWindow({ conversation, onConversationUpdated }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!conversation) return;
    fetchMessages(conversation.id);
  }, [conversation]);

  useEffect(() => {
    // 🔥 KHÔNG DÙNG io.connect() — SAI
    const s = io("http://localhost:8099", {
      transports: ["websocket", "polling"],
      query: "token=" + localStorage.getItem("token"),
    });

    setSocket(s);

    s.on("connect", () => console.log("ADMIN CONNECTED:", s.id));

    s.on("message", async () => {
      if (conversation) await fetchMessages(conversation.id);
      onConversationUpdated && onConversationUpdated();
    });

    return () => {
      s.off("message");
      s.disconnect();
    };
  }, []);

  const fetchMessages = async (convId) => {
    const res = await httpClient.get("/messages", {
      params: { conversationId: convId },
    });

    setMessages([...res.data?.result || []].reverse());

    setTimeout(() => {
      if (bodyRef.current)
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 50);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !conversation) return;

    await httpClient.post("/messages/create", {
      conversationId: conversation.id,
      message: input.trim(),
    });

    setInput("");
    await fetchMessages(conversation.id);
    onConversationUpdated && onConversationUpdated();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
          {(conversation?.participants?.find(p => p.username !== 'admin')?.username || '?').charAt(0)}
        </div>
        <div>
          <div className="font-medium">
            {conversation?.participants?.find(p => p.username !== 'admin')?.username || 'Người dùng'}
          </div>
        </div>
      </div>

      <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map(m => (
          <AdminChatMessage key={m.id} m={m} isMe={m.me} />
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t bg-white">
        <div className="flex gap-2 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full py-2 px-4"
            placeholder="Nhập tin nhắn..."
          />
          <button
            type="submit"
            className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
