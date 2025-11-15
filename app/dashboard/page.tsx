'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Users, TrendingUp, Bell, ArrowRight, Gamepad2, Calendar, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, circles, campaigns } = useStore();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isRTL = language === 'ar';
  const [stats, setStats] = useState({
    totalCircles: 0,
    activeCampaigns: 0,
    totalGames: 0,
    totalViews: 0,
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Load user data
    const loadData = async () => {
      const userCircles = await mockAPI.getCircles();
      const userCampaigns = await mockAPI.getCampaigns();
      setStats({
        totalCircles: userCircles.length,
        activeCampaigns: userCampaigns.filter((c) => c.status === 'active').length,
        totalGames: user?.games.length || 0,
        totalViews: 0,
      });
    };

    loadData();
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--background)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold text-[var(--foreground)] mb-2`}>
            {t('dashboard.welcome')} {user.name}
          </h1>
          <p className="text-[var(--text-light)]">{t('dashboard.subtitle')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#14b8a6]" />
              <span className={`text-2xl font-bold text-[var(--foreground)]`}>{stats.totalCircles}</span>
            </div>
            <p className="text-[var(--text-light)]">{t('dashboard.circles')}</p>
          </div>

          <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-purple-400" />
              <span className={`text-2xl font-bold text-[var(--foreground)]`}>{stats.activeCampaigns}</span>
            </div>
            <p className="text-[var(--text-light)]">{t('dashboard.activeCampaigns')}</p>
          </div>

          <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <Gamepad2 className="w-8 h-8 text-orange-400" />
              <span className={`text-2xl font-bold text-[var(--foreground)]`}>{stats.totalGames}</span>
            </div>
            <p className="text-[var(--text-light)]">{t('dashboard.games')}</p>
          </div>

          <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className={`text-2xl font-bold text-[var(--foreground)]`}>{stats.totalViews.toLocaleString()}</span>
            </div>
            <p className="text-[var(--text-light)]">{t('dashboard.views')}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/circles/new"
            className={`${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-50'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] transition group shadow-md`}
          >
            <div className={`flex items-center justify-between mb-4`}>
              <div className="w-12 h-12 bg-[#14b8a6] rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className={`w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition ${isRTL ? 'group-hover:translate-x-[4px]' : 'group-hover:-translate-x-1'}`} />
            </div>
            <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('dashboard.createCircle')}</h3>
            <p className="text-[var(--text-light)]">{t('dashboard.createCircleDesc')}</p>
          </Link>

          <Link
            href="/discovery"
            className={`${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-50'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] transition group shadow-md`}
          >
            <div className={`flex items-center justify-between mb-4`}>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className={`w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition ${isRTL ? 'group-hover:translate-x-[4px]' : 'group-hover:-translate-x-1'}`} />
            </div>
            <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('dashboard.discoverGames')}</h3>
            <p className="text-[var(--text-light)]">{t('dashboard.discoverGamesDesc')}</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] shadow-md`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold text-[var(--foreground)]`}>{t('dashboard.recentActivity')}</h2>
            <Link href="/notifications" className="text-[#14b8a6] hover:underline flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {t('dashboard.allNotifications')}
            </Link>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className={`w-16 h-16 text-[var(--text-muted)] mx-auto mb-4`} />
              <p className="text-[var(--text-light)]">{t('dashboard.noActivity')}</p>
              <Link
                href="/circles/new"
                className="inline-block mt-4 px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
              >
                {t('dashboard.startCreating')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.slice(0, 5).map((campaign) => (
                <div
                  key={campaign.id}
                  className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg p-4 border border-[var(--card-border)] transition`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-[var(--foreground)] font-semibold`}>
                        {t('dashboard.newCampaign')} {new Date(campaign.launchDate).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                      </h3>
                      <p className="text-[var(--text-light)] text-sm mt-1">
                        {campaign.tasks.length} {t('dashboard.tasks')} • {campaign.tasks.filter((t) => t.status === 'done').length} {t('dashboard.completed')}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        campaign.status === 'active'
                          ? 'bg-green-500/20 text-green-600'
                          : campaign.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-600'
                          : 'bg-gray-500/20 text-gray-600'
                      }`}
                    >
                      {campaign.status === 'active' ? t('dashboard.active') : campaign.status === 'completed' ? t('dashboard.completedStatus') : t('dashboard.draft')}
                    </span>
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
