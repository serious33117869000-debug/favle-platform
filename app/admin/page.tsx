'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, Eye, BarChart3, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { Circle, Campaign } from '@/lib/store';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useStore();
  const [circles, setCircles] = useState<Circle[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState({
    totalCircles: 0,
    totalUsers: 0,
    activeCampaigns: 0,
    totalGames: 0,
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    const loadData = async () => {
      const circlesData = await mockAPI.getCircles();
      const campaignsData = await mockAPI.getCampaigns();
      setCircles(circlesData);
      setCampaigns(campaignsData);
      setStats({
        totalCircles: circlesData.length,
        totalUsers: 0, // Would come from API
        activeCampaigns: campaignsData.filter((c) => c.status === 'active').length,
        totalGames: 0, // Would come from API
      });
    };

    loadData();
  }, [user, router]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#14b8a6]" />
            <h1 className="text-4xl font-bold text-white">لوحة الإدارة</h1>
          </div>
          <p className="text-white/70">إدارة المنصة والمحتوى</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#14b8a6]" />
              <span className="text-2xl font-bold text-white">{stats.totalUsers}</span>
            </div>
            <p className="text-white/70">المستخدمون</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">{stats.totalCircles}</span>
            </div>
            <p className="text-white/70">الدوائر</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-white">{stats.activeCampaigns}</span>
            </div>
            <p className="text-white/70">حملات نشطة</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{stats.totalGames}</span>
            </div>
            <p className="text-white/70">الألعاب</p>
          </div>
        </div>

        {/* Circles Management */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">إدارة الدوائر</h2>
          {circles.length === 0 ? (
            <p className="text-white/70 text-center py-8">لا توجد دوائر</p>
          ) : (
            <div className="space-y-4">
              {circles.map((circle) => (
                <div
                  key={circle.id}
                  className="bg-white/5 rounded-lg p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold mb-2">{circle.name}</h3>
                      <p className="text-white/70 text-sm mb-2">{circle.description}</p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{circle.members.length} عضو</span>
                        <span>{circle.games.length} لعبة</span>
                        <span>{circle.campaigns.length} حملة</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition text-sm">
                        عرض
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition text-sm">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Review */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">مراجعة المحتوى</h2>
          </div>
          <div className="text-center py-12">
            <p className="text-white/70">لا توجد محتويات تحتاج للمراجعة</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

