'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Send, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';

export default function MessagesPage() {
  const router = useRouter();
  const { user } = useStore();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  // Mock conversations
  const conversations = [
    {
      id: '1',
      name: 'أحمد المطور',
      lastMessage: 'شكراً لك على الدعم!',
      time: 'منذ ساعتين',
      unread: 2,
    },
    {
      id: '2',
      name: 'دائرة ألعاب الأكشن',
      lastMessage: 'تم إطلاق الحملة بنجاح',
      time: 'منذ يوم',
      unread: 0,
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Mock send message
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="w-8 h-8 text-[#14b8a6]" />
            <h1 className="text-4xl font-bold text-white">الرسائل</h1>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="flex h-[600px]">
              {/* Conversations List */}
              <div className="w-1/3 border-l border-white/20 bg-white/5">
                <div className="p-4 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      placeholder="ابحث في المحادثات..."
                      className="w-full pr-10 pl-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedChat(conv.id)}
                      className={`w-full p-4 text-right border-b border-white/10 hover:bg-white/10 transition ${
                        selectedChat === conv.id ? 'bg-white/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold">{conv.name}</h3>
                        {conv.unread > 0 && (
                          <span className="w-5 h-5 bg-[#14b8a6] rounded-full flex items-center justify-center text-xs text-white">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 text-sm truncate">{conv.lastMessage}</p>
                      <p className="text-white/50 text-xs mt-1">{conv.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    <div className="p-4 border-b border-white/10 bg-white/5">
                      <h3 className="text-white font-semibold">
                        {conversations.find((c) => c.id === selectedChat)?.name}
                      </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {/* Mock messages */}
                      <div className="flex justify-end">
                        <div className="bg-[#14b8a6] text-white rounded-lg p-3 max-w-xs">
                          <p>مرحباً! كيف يمكنني المساعدة؟</p>
                          <p className="text-xs mt-1 opacity-70">منذ ساعة</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white/10 text-white rounded-lg p-3 max-w-xs">
                          <p>شكراً لك على الدعم في حملة الإطلاق!</p>
                          <p className="text-xs mt-1 opacity-70">منذ ساعتين</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-white/10">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="اكتب رسالة..."
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                        />
                        <button
                          onClick={handleSend}
                          className="px-6 py-2 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/70">اختر محادثة للبدء</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

