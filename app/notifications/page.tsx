'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCircle, Users, MessageCircle, Rocket } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';

export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  // Mock notifications
  const notifications = [
    {
      id: '1',
      type: 'circle_invite',
      title: 'دعوة للانضمام إلى دائرة',
      message: 'تمت دعوتك للانضمام إلى دائرة "ألعاب الأكشن"',
      time: 'منذ ساعتين',
      read: false,
      icon: Users,
    },
    {
      id: '2',
      type: 'campaign_update',
      title: 'تحديث حملة',
      message: 'تم إكمال مهمة في حملة إطلاق لعبتك',
      time: 'منذ 5 ساعات',
      read: false,
      icon: Rocket,
    },
    {
      id: '3',
      type: 'message',
      title: 'رسالة جديدة',
      message: 'لديك رسالة جديدة من عضو في دائرة',
      time: 'منذ يوم',
      read: true,
      icon: MessageCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-8 h-8 text-[#14b8a6]" />
            <h1 className="text-4xl font-bold text-white">الإشعارات</h1>
          </div>

          {notifications.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
              <Bell className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">لا توجد إشعارات</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border ${
                    notification.read
                      ? 'border-white/10 opacity-70'
                      : 'border-[#14b8a6]/50'
                  } hover:bg-white/20 transition`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      notification.read ? 'bg-white/10' : 'bg-[#14b8a6]/20'
                    }`}>
                      <notification.icon className={`w-6 h-6 ${
                        notification.read ? 'text-white/50' : 'text-[#14b8a6]'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        notification.read ? 'text-white/70' : 'text-white'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-2">{notification.message}</p>
                      <p className="text-white/50 text-xs">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-3 h-3 bg-[#14b8a6] rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

