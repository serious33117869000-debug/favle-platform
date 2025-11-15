'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';

export default function NewCirclePage() {
  const router = useRouter();
  const { user, addCircle } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rules: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!user) {
        router.push('/login');
        return;
      }

      const newCircle = await mockAPI.createCircle({
        name: formData.name,
        description: formData.description,
        rules: formData.rules,
        members: [user.id],
        games: [],
        campaigns: [],
        createdBy: user.id,
      });

      addCircle(newCircle);
      router.push(`/circles/${newCircle.id}`);
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الدائرة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">إنشاء دائرة جديدة</h1>
          <p className="text-white/70 mb-8">شكل دائرة مع مطورين آخرين وابدأ التعاون</p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">اسم الدائرة</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  placeholder="مثال: دائرة ألعاب الأكشن"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  placeholder="وصف الدائرة وأهدافها..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">القواعد</label>
                <textarea
                  value={formData.rules}
                  onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  placeholder="قواعد الدائرة والتوقعات من الأعضاء..."
                  rows={4}
                  required
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  <strong>ملاحظة:</strong> يمكن أن تحتوي كل دائرة على حد أقصى 5 أعضاء. يمكنك دعوة أعضاء جدد بعد إنشاء الدائرة.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#14b8a6] text-white rounded-lg font-semibold hover:bg-[#0d9488] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'جاري الإنشاء...' : 'إنشاء الدائرة'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

