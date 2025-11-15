'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Edit, Plus, ExternalLink, Gamepad2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useStore();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 bg-[#14b8a6] rounded-full flex items-center justify-center text-4xl font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    تعديل
                  </button>
                </div>
                <div className="flex items-center gap-4 text-white/70 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                </div>
                {editing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    placeholder="اكتب نبذة عنك..."
                    rows={4}
                  />
                ) : (
                  <p className="text-white/80">{bio || 'لا توجد نبذة شخصية'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Games Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">معرض الألعاب</h2>
              <Link
                href="/games/new"
                className="px-4 py-2 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة لعبة
              </Link>
            </div>

            {user.games.length === 0 ? (
              <div className="text-center py-12">
                <Gamepad2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 mb-4">لا توجد ألعاب حتى الآن</p>
                <Link
                  href="/games/new"
                  className="inline-block px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
                >
                  أضف لعبتك الأولى
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.games.map((game) => (
                  <div
                    key={game.id}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition"
                  >
                    {game.images && game.images.length > 0 && (
                      <img
                        src={game.images[0]}
                        alt={game.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{game.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-[#14b8a6]/20 text-[#14b8a6] rounded-full text-sm">
                        {game.genre}
                      </span>
                      {game.storeLinks.steam && (
                        <a
                          href={game.storeLinks.steam}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm hover:bg-blue-500/30 transition flex items-center gap-1"
                        >
                          Steam
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Circles Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">دوائري</h2>
            {user.circles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/70 mb-4">لم تنضم إلى أي دائرة بعد</p>
                <Link
                  href="/circles/new"
                  className="inline-block px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
                >
                  إنشاء دائرة جديدة
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {user.circles.map((circleId) => (
                  <Link
                    key={circleId}
                    href={`/circles/${circleId}`}
                    className="block bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition"
                  >
                    <h3 className="text-white font-semibold">دائرة #{circleId}</h3>
                    <p className="text-white/70 text-sm mt-1">انقر للعرض</p>
                  </Link>
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

