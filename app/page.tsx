'use client';

import Link from 'next/link';
import { ArrowRight, Users, TrendingUp, Infinity, Lock, DollarSign, Zap, Heart, BarChart3, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-[var(--background)]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-[#0a1929] to-[#1e3a5f] opacity-50' : 'bg-gradient-to-b from-blue-50 to-teal-50 opacity-30'}`}></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920')] bg-cover bg-center opacity-10 blur-sm"></div>
        
        <div className="container mx-auto relative z-10">
          <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-4`}>
            <span className={`px-4 py-1 ${theme === 'dark' ? 'bg-green-400/20 text-green-300' : 'bg-green-100 text-green-700'} rounded-full text-sm`}>
              {t('home.forIndieDevs')}
            </span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold text-[var(--foreground)] mb-6 max-w-3xl`}>
            {t('home.heroTitle')}
          </h1>
          
          <p className={`text-xl text-[var(--text-light)] mb-8 max-w-2xl`}>
            {t('home.heroSubtitle')}
          </p>
          
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#14b8a6] text-white rounded-lg text-lg font-semibold hover:bg-[#0d9488] transition transform hover:scale-105"
          >
            {t('home.cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className={`text-4xl font-bold text-[var(--foreground)] mb-2`}>5</div>
              <div className="text-[var(--text-light)]">{t('home.developersPerCircle')}</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold text-[var(--foreground)] mb-2`}>100%</div>
              <div className="text-[var(--text-light)]">{t('home.sharedSuccess')}</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold text-[var(--foreground)] mb-2`}>∞</div>
              <div className="text-[var(--text-light)]">{t('home.growthPotential')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Indie Developer's Reality */}
      <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-[var(--section-bg)]' : 'bg-white'}`}>
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-[var(--foreground)] mb-4 text-center`}>
            {t('home.realityTitle')}
          </h2>
          <p className={`text-xl text-[var(--text-light)] text-center mb-12 max-w-2xl mx-auto`}>
            {t('home.realitySubtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('home.gamesDisappear')}</h3>
                  <p className="text-[var(--text-light)]">
                    {t('home.gamesDisappearDesc')}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('home.marketingExpensive')}</h3>
                  <p className="text-[var(--text-light)]">
                    {t('home.marketingExpensiveDesc')}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('home.soloStruggle')}</h3>
                  <p className="text-[var(--text-light)]">
                    {t('home.soloStruggleDesc')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-gray-900'} rounded-2xl p-8 text-white`}>
              <div className="text-6xl font-bold mb-4">87%</div>
              <p className="text-xl">
                {t('home.indieStats')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rise Together Section */}
      <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-[var(--section-bg)]' : 'bg-gray-50'}`}>
        <div className="container mx-auto">
          <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-4`}>
            <span className={`px-4 py-1 ${theme === 'dark' ? 'bg-green-400/20 text-green-300' : 'bg-green-100 text-green-700'} rounded-full text-sm`}>
              {t('home.solutionTag')}
            </span>
          </div>
          
          <h2 className={`text-4xl font-bold text-[var(--foreground)] mb-4`}>
            {t('home.riseTogether')}
          </h2>
          <p className={`text-xl text-[var(--text-light)] mb-12 max-w-2xl`}>
            {t('home.riseTogetherDesc')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} rounded-2xl p-8 shadow-lg border border-[var(--card-border)]`}>
              <div className="w-16 h-16 bg-[#14b8a6]/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-[#14b8a6] font-bold text-sm">5x</span>
              </div>
              <h3 className={`text-2xl font-bold text-[var(--foreground)] mb-2`}>{t('home.moreVisibility')}</h3>
              <p className="text-[var(--text-light)]">
                {theme === 'dark' ? 'Get 5 times more visibility by collaborating with a circle of developers.' : 'Get 5x more visibility through collaboration with a circle of developers.'}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} rounded-xl p-6 shadow-md border border-[var(--card-border)]`}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#14b8a6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-[#14b8a6]" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('home.formCircle')}</h3>
                    <p className="text-[var(--text-light)]">
                      {t('home.formCircleDesc')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} rounded-xl p-6 shadow-md border border-[var(--card-border)]`}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('home.shareSuccess')}</h3>
                    <p className="text-[var(--text-light)]">
                      {t('home.shareSuccessDesc')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} rounded-xl p-6 shadow-md border border-[var(--card-border)]`}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{t('home.growTogether')}</h3>
                    <p className="text-[var(--text-light)]">
                      {t('home.growTogetherDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Favle Works */}
      <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-[#0a1929]' : 'bg-[var(--section-bg)]'}`}>
        <div className="container mx-auto">
          <h2 className={`text-4xl font-bold text-[var(--foreground)] mb-4 text-center`}>
            {t('home.howItWorks')}
          </h2>
          <p className={`text-xl text-[var(--text-light)] text-center mb-12 max-w-2xl mx-auto`}>
            {t('home.howItWorksDesc')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: t('home.joinFavle'), desc: t('home.joinFavleDesc') },
              { icon: Heart, title: t('home.formYourCircle'), desc: t('home.formYourCircleDesc') },
              { icon: TrendingUp, title: t('home.launchGame'), desc: t('home.launchGameDesc') },
              { icon: BarChart3, title: t('home.shareSuccessStep'), desc: t('home.shareSuccessStepDesc') },
            ].map((step, idx) => (
              <div key={idx} className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border border-[var(--card-border)]`}>
                <div className="w-12 h-12 bg-[#14b8a6] rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-2xl font-bold text-[var(--foreground)] mb-2`}>{idx + 1}</div>
                <h3 className={`text-xl font-bold text-[var(--foreground)] mb-2`}>{step.title}</h3>
                <p className="text-[var(--text-light)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-[#0a1929]' : 'bg-gradient-to-b from-blue-50 to-teal-50'} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920')] bg-cover bg-center opacity-10 blur-sm"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4`}>
            {t('home.readyTitle')}
          </h2>
          <p className={`text-xl text-[var(--text-light)] mb-8 max-w-2xl mx-auto`}>
            {t('home.readySubtitle')}
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#14b8a6] text-white rounded-lg text-lg font-semibold hover:bg-[#0d9488] transition transform hover:scale-105"
          >
            {t('home.startBuilding')}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className={`mt-8 flex flex-wrap justify-center gap-6 text-[var(--text-light)]`}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>{t('home.freeToJoin')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>{t('home.noCreditCard')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>{t('home.findInMinutes')}</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
