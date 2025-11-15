'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Users, Plus, Rocket, Gift, Calendar, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { Circle, Campaign } from '@/lib/store';

export default function CircleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, campaigns } = useStore();
  const [circle, setCircle] = useState<Circle | null>(null);
  const [circleCampaigns, setCircleCampaigns] = useState<Campaign[]>([]);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadCircle = async () => {
      const circles = await mockAPI.getCircles();
      const found = circles.find((c) => c.id === params.id);
      if (found) {
        setCircle(found);
        setInviteLink(`${window.location.origin}/circles/${found.id}/join?token=invite-${found.id}`);
        
        const circleCamps = await mockAPI.getCampaigns(found.id);
        setCircleCampaigns(circleCamps);
      }
    };

    loadCircle();
  }, [params.id, user, router]);

  const handleInvite = async () => {
    if (circle && inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      alert('تم نسخ رابط الدعوة!');
    }
  };

  if (!circle) {
    return (
      <div className="min-h-screen bg-[#0a1929] flex items-center justify-center">
        <p className="text-white">جاري التحميل...</p>
      </div>
    );
  }

  const canInvite = circle.members.length < 5;

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        {/* Circle Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{circle.name}</h1>
              <p className="text-white/70">{circle.description}</p>
            </div>
            {canInvite && (
              <button
                onClick={handleInvite}
                className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                دعوة عضو
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-[#14b8a6]" />
                <span className="text-white font-semibold">الأعضاء</span>
              </div>
              <p className="text-2xl font-bold text-white">{circle.members.length}/5</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">الحملات</span>
              </div>
              <p className="text-2xl font-bold text-white">{circleCampaigns.length}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                <span className="text-white font-semibold">الألعاب</span>
              </div>
              <p className="text-2xl font-bold text-white">{circle.games.length}</p>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">قواعد الدائرة</h2>
          <p className="text-white/70 whitespace-pre-line">{circle.rules}</p>
        </div>

        {/* Campaigns */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">الحملات</h2>
            <Link
              href={`/campaigns/new?circle=${circle.id}`}
              className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              حملة جديدة
            </Link>
          </div>

          {circleCampaigns.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/20 text-center">
              <Rocket className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-4">لا توجد حملات حتى الآن</p>
              <Link
                href={`/campaigns/new?circle=${circle.id}`}
                className="inline-block px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
              >
                إنشاء حملة جديدة
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {circleCampaigns.map((campaign) => (
                <Link
                  key={campaign.id}
                  href={`/campaigns/${campaign.id}`}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">حملة إطلاق</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        campaign.status === 'active'
                          ? 'bg-green-500/20 text-green-300'
                          : campaign.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {campaign.status === 'active' ? 'نشطة' : campaign.status === 'completed' ? 'مكتملة' : 'مسودة'}
                    </span>
                  </div>
                  <p className="text-white/70 mb-4">
                    تاريخ الإطلاق: {new Date(campaign.launchDate).toLocaleDateString('ar-SA')}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>{campaign.tasks.length} مهمة</span>
                    <span>
                      {campaign.tasks.filter((t) => t.status === 'done').length} مكتملة
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Launch Bundle Button */}
        {circleCampaigns.some((c) => c.status === 'completed') && (
          <div className="bg-gradient-to-r from-[#14b8a6] to-[#0d9488] rounded-xl p-8 text-center">
            <Gift className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">جاهز لإطلاق حزمة؟</h3>
            <p className="text-white/90 mb-6">ارفع جميع ألعاب الدائرة معاً كحزمة واحدة</p>
            <button className="px-8 py-4 bg-white text-[#14b8a6] rounded-lg font-semibold hover:bg-white/90 transition">
              إطلاق حزمة الدائرة
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

