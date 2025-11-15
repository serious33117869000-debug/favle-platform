'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';

export default function NewGamePage() {
  const router = useRouter();
  const { user, addGame } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    platform: [] as string[],
    images: [] as string[],
    storeLinks: {
      steam: '',
      itch: '',
      epic: '',
    },
  });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const newGame = await mockAPI.createGame({
        ...formData,
        developerId: user.id,
      });
      addGame(newGame);
      router.push('/profile');
    } catch (err) {
      setError('حدث خطأ أثناء إضافة اللعبة');
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    if (imageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl],
      });
      setImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const togglePlatform = (platform: string) => {
    setFormData({
      ...formData,
      platform: formData.platform.includes(platform)
        ? formData.platform.filter((p) => p !== platform)
        : [...formData.platform, platform],
    });
  };

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">إضافة لعبة جديدة</h1>
          <p className="text-white/70 mb-8">شارك لعبتك مع المجتمع</p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2">اسم اللعبة</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  placeholder="اسم اللعبة"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  placeholder="وصف اللعبة..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2">النوع</label>
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  required
                >
                  <option value="">اختر النوع</option>
                  <option value="Platformer">منصات</option>
                  <option value="Action">أكشن</option>
                  <option value="RPG">ألعاب تقمص أدوار</option>
                  <option value="Puzzle">ألغاز</option>
                  <option value="Strategy">استراتيجية</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 mb-2">المنصة</label>
                <div className="flex flex-wrap gap-2">
                  {['PC', 'Steam', 'Mobile', 'Epic'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlatform(p)}
                      className={`px-4 py-2 rounded-lg transition ${
                        formData.platform.includes(p)
                          ? 'bg-[#14b8a6] text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">الصور</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    placeholder="رابط الصورة"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-2 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Game ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2">روابط المتاجر</label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={formData.storeLinks.steam}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        storeLinks: { ...formData.storeLinks, steam: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    placeholder="رابط Steam (اختياري)"
                  />
                  <input
                    type="url"
                    value={formData.storeLinks.itch}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        storeLinks: { ...formData.storeLinks, itch: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    placeholder="رابط Itch.io (اختياري)"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#14b8a6] text-white rounded-lg font-semibold hover:bg-[#0d9488] transition disabled:opacity-50"
              >
                {loading ? 'جاري الإضافة...' : 'إضافة اللعبة'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

