'use client';

import Link from 'next/link';
import { MessageCircle, Globe, Sun, Moon } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { user } = useStore();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-sm border-b border-[var(--header-border)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#14b8a6] rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-[var(--foreground)]">Favle</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/discovery" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
            {t('nav.discovery')}
          </Link>
          {user && (
            <>
              <Link href="/dashboard" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                {t('nav.dashboard')}
              </Link>
              <Link href="/circles" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                {t('nav.circles')}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--text-light)] hover:text-[var(--foreground)] transition rounded-lg hover:bg-[var(--hover-bg)]"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-[var(--text-light)] hover:text-[var(--foreground)] transition flex items-center gap-2 rounded-lg hover:bg-[var(--hover-bg)]"
            title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
            >
              <span>{user.name}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-[var(--text-light)] hover:text-[var(--foreground)] transition"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
