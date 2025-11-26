import React, { useEffect, useState } from 'react';
import AdminChatSidebar from './AdminChatSidebar';
import AdminChatWindow from './AdminChatWindow';
import { httpClient } from '../../../lib/httpClient';


export default function AdminChatPage(){
const [conversations, setConversations] = useState([]);
const [selectedConv, setSelectedConv] = useState(null);
const [loading, setLoading] = useState(false);


const loadConversations = async ()=>{
setLoading(true);
try{
const res = await httpClient.get('/conversations/my-conversations');
const data = res.data?.result || [];
setConversations(data);
if(!selectedConv && data.length) setSelectedConv(data[0]);
}catch(err){
console.error('load conversations', err);
}finally{setLoading(false)}
}


useEffect(()=>{
loadConversations();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);


return (
<div className="flex h-full min-h-[600px] bg-gray-50">
<div className="w-80 border-r bg-white">
<AdminChatSidebar
conversations={conversations}
loading={loading}
onSelect={(c)=>setSelectedConv(c)}
selectedConv={selectedConv}
/>
</div>


<div className="flex-1">
<AdminChatWindow
key={selectedConv?.id}
conversation={selectedConv}
onConversationUpdated={loadConversations}
/>
</div>
</div>
)
}