'use client';

import Link from 'next/link';
import { MessageCircle, Twitter, MessageSquare, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <footer className="bg-[var(--footer-bg)] border-t border-[var(--footer-border)] py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#14b8a6] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--foreground)]">Favle</span>
            </div>
            <p className="text-[var(--text-light)] text-sm max-w-md">
              {language === 'en' 
                ? 'Empowering indie game developers to succeed together through circles of mutual support and collaboration.'
                : 'تمكين مطوري الألعاب المستقلين من النجاح معاً من خلال دوائر الدعم المتبادل والتعاون.'}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <a href="#" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </Link>
              <Link href="/terms" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
              </Link>
              <Link href="/cookies" className="text-[var(--text-light)] hover:text-[var(--foreground)] transition">
                {language === 'en' ? 'Cookie Policy' : 'سياسة ملفات الارتباط'}
              </Link>
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t border-[var(--footer-border)] text-center text-[var(--text-muted)] text-sm`}>
          © 2024 Favle. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
        </div>
      </div>
    </footer>
  );
}
