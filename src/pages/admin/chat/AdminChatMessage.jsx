import React from 'react';


export default function AdminChatMessage({m, isMe}){
return (
<div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
<div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${isMe ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-tl-none'}`}>
<div>{m.message || m.text}</div>
<div className="text-[10px] text-gray-400 mt-1 text-right">{isMe ? 'Bạn' : m.sender?.username || 'Khách'}</div>
</div>
</div>
)
}