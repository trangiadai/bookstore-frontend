import React from 'react';


export default function AdminChatSidebar({ conversations = [], loading, onSelect, selectedConv }){
return (
<div className="h-full flex flex-col">
<div className="px-4 py-3 border-b">
<h2 className="text-lg font-semibold">Conversations</h2>
</div>


<div className="overflow-auto flex-1">
{loading && <div className="p-4 text-sm text-gray-500">Đang tải...</div>}
{!loading && conversations.length === 0 && (
<div className="p-4 text-sm text-gray-500">Chưa có cuộc trò chuyện</div>
)}


<ul>
{conversations.map(conv => {
const other = conv.participants?.find(p => p.username !== 'admin') || conv.participants?.[0];
const preview = conv.modifiedDate ? new Date(conv.modifiedDate).toLocaleString() : '';
const selected = selectedConv?.id === conv.id;
return (
<li key={conv.id} onClick={()=>onSelect(conv)} className={`cursor-pointer px-3 py-3 hover:bg-gray-50 ${selected ? 'bg-gray-100' : ''}`}>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">{(other?.username||'?').charAt(0).toUpperCase()}</div>
<div className="flex-1">
<div className="flex justify-between items-center">
<div className="text-sm font-medium">{other?.username || 'Người dùng'}</div>
<div className="text-xs text-gray-400">{preview}</div>
</div>
<div className="text-xs text-gray-500 mt-1">{conv.conversationName || ''}</div>
</div>
</div>
</li>
)
})}
</ul>
</div>
</div>
)
}