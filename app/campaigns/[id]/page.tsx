'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle, Circle, TrendingUp, Eye, MousePointerClick, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { Campaign, CampaignMetrics } from '@/lib/store';

export default function CampaignDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, campaigns, updateTaskStatus } = useStore();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadCampaign = async () => {
      const found = campaigns.find((c) => c.id === params.id);
      if (found) {
        setCampaign(found);
        const campaignMetrics = await mockAPI.getCampaignMetrics(found.id);
        setMetrics(campaignMetrics);
      }
    };

    loadCampaign();
  }, [params.id, campaigns, user, router]);

  const handleTaskToggle = async (taskId: string, currentStatus: 'pending' | 'done') => {
    if (!campaign) return;
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    await mockAPI.updateTaskStatus(campaign.id, taskId, newStatus);
    updateTaskStatus(campaign.id, taskId, newStatus);
    setCampaign({
      ...campaign,
      tasks: campaign.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    });
  };

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#0a1929] flex items-center justify-center">
        <p className="text-white">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Campaign Header */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">حملة إطلاق</h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
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
            <p className="text-white/70">
              تاريخ الإطلاق: {new Date(campaign.launchDate).toLocaleDateString('ar-SA')}
            </p>
          </div>

          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-[#14b8a6]" />
                  <span className="text-white/70 text-sm">المشاهدات</span>
                </div>
                <p className="text-2xl font-bold text-white">{metrics.views.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointerClick className="w-5 h-5 text-purple-400" />
                  <span className="text-white/70 text-sm">النقرات</span>
                </div>
                <p className="text-2xl font-bold text-white">{metrics.clicks.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-white/70 text-sm">التحويلات</span>
                </div>
                <p className="text-2xl font-bold text-white">{metrics.conversions.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-orange-400" />
                  <span className="text-white/70 text-sm">الإيرادات</span>
                </div>
                <p className="text-2xl font-bold text-white">${metrics.revenue.toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* Tasks */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">المهام</h2>
            
            {campaign.tasks.length === 0 ? (
              <p className="text-white/70 text-center py-8">لا توجد مهام</p>
            ) : (
              <div className="space-y-4">
                {campaign.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white/5 rounded-lg p-6 border border-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => handleTaskToggle(task.id, task.status)}
                            className="flex-shrink-0"
                          >
                            {task.status === 'done' ? (
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            ) : (
                              <Circle className="w-6 h-6 text-white/50" />
                            )}
                          </button>
                          <div>
                            <h3 className="text-white font-semibold">{task.description}</h3>
                            <p className="text-white/60 text-sm mt-1">
                              نوع: {task.type === 'share' ? 'مشاركة' : task.type === 'retweet' ? 'إعادة نشر' : task.type === 'discount' ? 'خصم' : 'حزمة'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          task.status === 'done'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {task.status === 'done' ? 'مكتملة' : 'قيد الانتظار'}
                      </span>
                    </div>
                    {task.completedAt && (
                      <p className="text-white/50 text-xs mt-2 mr-9">
                        اكتملت في: {new Date(task.completedAt).toLocaleString('ar-SA')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

