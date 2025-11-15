'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Mail, Lock, Gamepad2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { mockAPI } from '@/lib/mock-api';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useStore();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isRTL = language === 'ar';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const user = await mockAPI.login(email, password);
      if (user) {
        setUser(user);
        router.push('/dashboard');
      } else {
        setError(t('auth.loginError'));
      }
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'steam' | 'discord') => {
    setLoading(true);
    setError('');
    
    try {
      const user = await mockAPI.loginWithOAuth(provider);
      if (user) {
        setUser(user);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-20`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#14b8a6] rounded-lg flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-[var(--foreground)]">Favle</span>
          </div>
          <h1 className={`text-3xl font-bold text-[var(--foreground)] mb-2`}>{t('auth.welcomeBack')}</h1>
          <p className="text-[var(--text-light)]">{t('auth.continue')}</p>
        </div>

        <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-2xl p-8 border border-[var(--card-border)] shadow-lg`}>
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            <div>
              <label className={`block text-[var(--text-light)] mb-2 text-sm`}>{t('auth.email')}</label>
              <div className="relative">
                <Mail className={`absolute ${isRTL ? 'right' : 'left'}-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-[var(--hover-bg)] border border-[var(--card-border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]`}
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-[var(--text-light)] mb-2 text-sm`}>{t('auth.password')}</label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? 'right' : 'left'}-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-[var(--hover-bg)] border border-[var(--card-border)] rounded-lg text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[#14b8a6]`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#14b8a6] text-white rounded-lg font-semibold hover:bg-[#0d9488] transition disabled:opacity-50"
            >
              {loading ? t('auth.loggingIn') : t('auth.login')}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--card-border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 bg-[var(--background)] text-[var(--text-light)]`}>{t('auth.or')}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleOAuthLogin('steam')}
              disabled={loading}
              className="w-full py-3 bg-[#1b2838] text-white rounded-lg font-semibold hover:bg-[#2a475e] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Gamepad2 className="w-5 h-5" />
              {t('auth.loginWithSteam')}
            </button>

            <button
              onClick={() => handleOAuthLogin('discord')}
              disabled={loading}
              className="w-full py-3 bg-[#5865F2] text-white rounded-lg font-semibold hover:bg-[#4752C4] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {t('auth.loginWithDiscord')}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className={`text-[var(--text-light)] text-sm`}>
              {t('auth.noAccount')}{' '}
              <Link href="/register" className="text-[#14b8a6] hover:underline">
                {t('auth.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
