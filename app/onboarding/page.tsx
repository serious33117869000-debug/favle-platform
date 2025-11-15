'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, Users, Gamepad2, Rocket } from 'lucide-react';
import Header from '@/components/Header';
import { useStore } from '@/lib/store';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useStore();
  const [step, setStep] = useState(1);

  const steps = [
    {
      icon: Users,
      title: 'مرحباً في Favle!',
      description: 'منصة تجمع مطوري الألعاب المستقلين في دوائر تعاونية',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            Favle يساعدك على بناء شبكة من المطورين الذين يدعمون بعضهم البعض.
          </p>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
              انضم إلى دوائر من 2-5 مطورين
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
              اروّج لألعابك معاً
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
              ارفع نسبة اكتشاف ألعابك
            </li>
          </ul>
        </div>
      ),
    },
    {
      icon: Gamepad2,
      title: 'أضف ألعابك',
      description: 'شارك ألعابك مع المجتمع',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            ابدأ بإضافة ألعابك إلى ملفك الشخصي. يمكنك إضافة صور، فيديوهات، وروابط المتاجر.
          </p>
          <button
            onClick={() => router.push('/games/new')}
            className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
          >
            إضافة لعبة
          </button>
        </div>
      ),
    },
    {
      icon: Users,
      title: 'شكل دائرة',
      description: 'انضم أو أنشئ دائرة',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            الدوائر هي مجموعات صغيرة من المطورين الذين يتعاونون معاً. يمكنك إنشاء دائرة جديدة أو الانضمام إلى دائرة موجودة.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/circles/new')}
              className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
            >
              إنشاء دائرة
            </button>
            <button
              onClick={() => router.push('/discovery')}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              اكتشف الدوائر
            </button>
          </div>
        </div>
      ),
    },
    {
      icon: Rocket,
      title: 'أطلق حملاتك',
      description: 'ابدأ الترويج لألعابك',
      content: (
        <div className="space-y-4">
          <p className="text-white/80">
            عند إطلاق لعبة جديدة، أنشئ حملة داخل دائرة. سيقوم الأعضاء بدعم إطلاقك بجماهيرهم.
          </p>
          <button
            onClick={() => {
              router.push('/dashboard');
            }}
            className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition"
          >
            ابدأ الآن
          </button>
        </div>
      ),
    },
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((_, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index + 1 <= step
                        ? 'bg-[#14b8a6] text-white'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {index + 1 < step ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        index + 1 < step ? 'bg-[#14b8a6]' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
            <div className="w-20 h-20 bg-[#14b8a6]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <currentStep.icon className="w-10 h-10 text-[#14b8a6]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{currentStep.title}</h2>
            <p className="text-white/70 mb-8">{currentStep.description}</p>
            <div className="text-right">{currentStep.content}</div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              السابق
            </button>
            {step < steps.length ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition flex items-center gap-2"
              >
                التالي
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0d9488] transition flex items-center gap-2"
              >
                اكتمل
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

