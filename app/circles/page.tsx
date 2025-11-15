'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Users, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { Circle } from '@/lib/store';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function CirclesPage() {
  const router = useRouter();
  const { user, circles } = useStore();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isRTL = language === 'ar';
  const [allCircles, setAllCircles] = useState<Circle[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadCircles = async () => {
      const data = await mockAPI.getCircles();
      setAllCircles(data);
    };

    loadCircles();
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--background)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold text-[var(--foreground)] mb-2`}>{t('circles.title')}</h1>
            <p className="text-[var(--text-light)]">{t('circles.subtitle')}</p>
          </div>
          <Link
            href="/circles/new"
            className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {t('circles.createNew')}
          </Link>
        </div>

        {allCircles.length === 0 ? (
          <div className="text-center py-20">
            <Users className={`w-24 h-24 text-[var(--text-muted)] mx-auto mb-6`} />
            <h2 className={`text-2xl font-bold text-[var(--foreground)] mb-4`}>{t('circles.noCircles')}</h2>
            <p className="text-[var(--text-light)] mb-8">{t('circles.noCirclesDesc')}</p>
            <Link
              href="/circles/new"
              className="inline-block px-8 py-4 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition text-lg font-semibold"
            >
              {t('circles.createNew')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCircles.map((circle) => (
              <Link
                key={circle.id}
                href={`/circles/${circle.id}`}
                className={`${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-50'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] transition group shadow-md`}
              >
                <div className={`flex items-center justify-between mb-4`}>
                  <h3 className={`text-xl font-bold text-[var(--foreground)]`}>{circle.name}</h3>
                  <ArrowRight className={`w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition ${isRTL ? 'group-hover:translate-x-[4px]' : 'group-hover:-translate-x-1'}`} />
                </div>
                <p className="text-[var(--text-light)] text-sm mb-4 line-clamp-2">{circle.description}</p>
                <div className={`flex items-center gap-4 text-sm text-[var(--text-muted)]`}>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {circle.members.length}/5
                  </div>
                  <div>{circle.games.length} {t('circles.gamesCount')}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
