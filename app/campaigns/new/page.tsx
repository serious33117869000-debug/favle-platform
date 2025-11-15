'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Calendar, Target, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { CampaignTask } from '@/lib/store';

export default function NewCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, circles, games, addCampaign } = useStore();
  const [formData, setFormData] = useState({
    circleId: searchParams.get('circle') || '',
    gameId: '',
    launchDate: '',
  });
  const [tasks, setTasks] = useState<Omit<CampaignTask, 'id' | 'assignedAt' | 'completedAt'>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        memberId: '',
        type: 'share',
        description: '',
        status: 'pending',
      },
    ]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, field: string, value: any) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], [field]: value };
    setTasks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.circleId || !formData.gameId || !formData.launchDate) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      setLoading(false);
      return;
    }

    if (tasks.length === 0) {
      setError('يرجى إضافة مهمة واحدة على الأقل');
      setLoading(false);
      return;
    }

    try {
      const circle = circles.find((c) => c.id === formData.circleId);
      if (!circle) {
        setError('الدائرة غير موجودة');
        setLoading(false);
        return;
      }

      const campaignTasks: CampaignTask[] = tasks.map((task, idx) => ({
        ...task,
        id: `task-${idx}`,
        assignedAt: new Date().toISOString(),
      }));

      const newCampaign = await mockAPI.createCampaign({
        circleId: formData.circleId,
        gameId: formData.gameId,
        launchDate: formData.launchDate,
        tasks: campaignTasks,
        status: 'draft',
      });

      addCampaign(newCampaign);
      router.push(`/campaigns/${newCampaign.id}`);
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحملة');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const circle = circles.find((c) => c.id === formData.circleId);
  const userGames = games.filter((g) => g.developerId === user.id);

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">إنشاء حملة جديدة</h1>
          <p className="text-white/70 mb-8">أنشئ حملة إطلاق لعبة داخل دائرة</p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">الدائرة</label>
                <select
                  value={formData.circleId}
                  onChange={(e) => setFormData({ ...formData, circleId: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  required
                >
                  <option value="">اختر دائرة</option>
                  {circles.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-2">اللعبة</label>
                <select
                  value={formData.gameId}
                  onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  required
                >
                  <option value="">اختر لعبة</option>
                  {userGames.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-2">تاريخ الإطلاق</label>
                <input
                  type="date"
                  value={formData.launchDate}
                  onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  required
                />
              </div>

              {/* Tasks */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-white/80">المهام</label>
                  <button
                    type="button"
                    onClick={addTask}
                    className="px-4 py-2 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة مهمة
                  </button>
                </div>

                {tasks.length === 0 ? (
                  <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/70">لا توجد مهام. أضف مهمة للبدء.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-white font-semibold">مهمة #{index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeTask(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white/70 text-sm mb-2">نوع المهمة</label>
                            <select
                              value={task.type}
                              onChange={(e) => updateTask(index, 'type', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                            >
                              <option value="share">مشاركة</option>
                              <option value="retweet">إعادة نشر</option>
                              <option value="discount">خصم</option>
                              <option value="bundle">حزمة</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-white/70 text-sm mb-2">عضو</label>
                            <select
                              value={task.memberId}
                              onChange={(e) => updateTask(index, 'memberId', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                            >
                              <option value="">اختر عضو</option>
                              {circle?.members.map((memberId) => (
                                <option key={memberId} value={memberId}>
                                  عضو #{memberId}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-white/70 text-sm mb-2">الوصف</label>
                          <textarea
                            value={task.description}
                            onChange={(e) => updateTask(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                            placeholder="وصف المهمة..."
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#14b8a6] text-white rounded-lg font-semibold hover:bg-[#0d9488] transition disabled:opacity-50"
              >
                {loading ? 'جاري الإنشاء...' : 'إنشاء الحملة'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

