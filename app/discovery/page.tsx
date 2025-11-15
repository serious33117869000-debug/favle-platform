'use client';

import { useEffect, useState } from 'react';
import { Filter, Search, Gamepad2, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { Game, Circle } from '@/lib/store';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function DiscoveryPage() {
  const { user } = useStore();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isRTL = language === 'ar';
  const [games, setGames] = useState<Game[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [activeTab, setActiveTab] = useState<'games' | 'circles'>('games');
  const [filters, setFilters] = useState({
    genre: '',
    platform: '',
    search: '',
    sort: 'popular',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const gamesData = await mockAPI.getGames(filters);
      setGames(gamesData);
      
      const circlesData = await mockAPI.getCircles();
      setCircles(circlesData);
    };

    loadData();
  }, [filters]);

  return (
    <div className="min-h-screen bg-[var(--background)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold text-[var(--foreground)] mb-2`}>{t('discovery.title')}</h1>
          <p className="text-[var(--text-light)]">{t('discovery.subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('games')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'games'
                ? 'bg-[#14b8a6] text-white'
                : theme === 'dark' 
                  ? 'bg-white/10 text-[var(--text-light)] hover:bg-white/20'
                  : 'bg-gray-100 text-[var(--text-light)] hover:bg-gray-200'
            }`}
          >
            <Gamepad2 className={`w-5 h-5 inline-block ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('discovery.games')}
          </button>
          <button
            onClick={() => setActiveTab('circles')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'circles'
                ? 'bg-[#14b8a6] text-white'
                : theme === 'dark' 
                  ? 'bg-white/10 text-[var(--text-light)] hover:bg-white/20'
                  : 'bg-gray-100 text-[var(--text-light)] hover:bg-gray-200'
            }`}
          >
            <Users className={`w-5 h-5 inline-block ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('discovery.circles')}
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute ${isRTL ? 'right' : 'left'}-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]`} />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder={t('discovery.searchPlaceholder')}
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-[var(--hover-bg)] border border-[var(--card-border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]`}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} border border-[var(--card-border)] rounded-lg text-[var(--foreground)] transition flex items-center gap-2`}
            >
              <Filter className="w-5 h-5" />
              {t('common.filter')}
            </button>
          </div>

          {showFilters && (
            <div className={`mt-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] shadow-lg`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-[var(--text-light)] mb-2 text-sm`}>{t('discovery.genre')}</label>
                  <select
                    value={filters.genre}
                    onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                    className={`w-full px-4 py-2 bg-[var(--hover-bg)] border border-[var(--card-border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]`}
                  >
                    <option value="">{t('discovery.allGenres')}</option>
                    <option value="Platformer">{language === 'en' ? 'Platformer' : 'منصات'}</option>
                    <option value="Action">{language === 'en' ? 'Action' : 'أكشن'}</option>
                    <option value="RPG">{language === 'en' ? 'RPG' : 'ألعاب تقمص أدوار'}</option>
                    <option value="Puzzle">{language === 'en' ? 'Puzzle' : 'ألغاز'}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[var(--text-light)] mb-2 text-sm`}>{t('discovery.platform')}</label>
                  <select
                    value={filters.platform}
                    onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                    className={`w-full px-4 py-2 bg-[var(--hover-bg)] border border-[var(--card-border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]`}
                  >
                    <option value="">{t('discovery.allPlatforms')}</option>
                    <option value="PC">PC</option>
                    <option value="Steam">Steam</option>
                    <option value="Mobile">{language === 'en' ? 'Mobile' : 'موبايل'}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[var(--text-light)] mb-2 text-sm`}>{t('discovery.sort')}</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    className={`w-full px-4 py-2 bg-[var(--hover-bg)] border border-[var(--card-border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]`}
                  >
                    <option value="popular">{t('discovery.popular')}</option>
                    <option value="recent">{t('discovery.recent')}</option>
                    <option value="name">{t('discovery.name')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'games' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <Gamepad2 className={`w-24 h-24 text-[var(--text-muted)] mx-auto mb-4`} />
                <p className="text-[var(--text-light)]">{t('discovery.noGames')}</p>
              </div>
            ) : (
              games.map((game) => (
                <div
                  key={game.id}
                  className={`${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-50'} backdrop-blur-sm rounded-xl overflow-hidden border border-[var(--card-border)] transition shadow-md`}
                >
                  {game.images && game.images.length > 0 && (
                    <img
                      src={game.images[0]}
                      alt={game.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{game.title}</h3>
                    <p className="text-[var(--text-light)] text-sm mb-4 line-clamp-2">{game.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-[#14b8a6]/20 text-[#14b8a6] rounded-full text-sm">
                        {game.genre}
                      </span>
                      {game.platform.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 bg-purple-500/20 text-purple-600 rounded-full text-sm"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {circles.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <Users className={`w-24 h-24 text-[var(--text-muted)] mx-auto mb-4`} />
                <p className="text-[var(--text-light)]">{t('discovery.noCircles')}</p>
              </div>
            ) : (
              circles.map((circle) => (
                <Link
                  key={circle.id}
                  href={`/circles/${circle.id}`}
                  className={`${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-gray-50'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)] transition shadow-md`}
                >
                  <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{circle.name}</h3>
                  <p className="text-[var(--text-light)] text-sm mb-4 line-clamp-2">{circle.description}</p>
                  <div className={`flex items-center gap-4 text-sm text-[var(--text-muted)]`}>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {circle.members.length}/5
                    </div>
                    <div>{circle.games.length} {t('discovery.gamesCount')}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
