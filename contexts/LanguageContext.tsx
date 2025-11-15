'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.discovery': 'Discovery',
    'nav.dashboard': 'Dashboard',
    'nav.circles': 'My Circles',
    'nav.login': 'Login',
    'nav.register': 'Sign Up',
    
    // Home
    'home.forIndieDevs': 'For Independent Game Developers',
    'home.heroTitle': 'Your Game Deserves To Be Discovered',
    'home.heroSubtitle': 'Join a circle of indie developers who lift each other up. When one succeeds, everyone grows together.',
    'home.cta': 'Start Building Your Circle',
    'home.developersPerCircle': 'Developers per Circle',
    'home.sharedSuccess': 'Shared Success',
    'home.growthPotential': 'Growth Potential',
    'home.realityTitle': 'The Indie Developer\'s Reality',
    'home.realitySubtitle': 'Creating an amazing game is only half the battle. Getting it discovered? That\'s the real challenge.',
    'home.gamesDisappear': 'Games Disappear in Days',
    'home.gamesDisappearDesc': 'Over 50 new games are released daily on major platforms. Without visibility, even great games vanish into obscurity.',
    'home.marketingExpensive': 'Marketing is Expensive',
    'home.marketingExpensiveDesc': 'Traditional marketing costs thousands. For indie devs with limited budgets, it\'s often impossible to compete.',
    'home.soloStruggle': 'Solo Developers Struggle',
    'home.soloStruggleDesc': 'Working alone means limited reach. No network, no cross-promotion, no support system to amplify your success.',
    'home.indieStats': 'of indie games never recoup their development costs.',
    'home.solutionTag': 'The Favle Solution',
    'home.riseTogether': 'Rise Together, Not Alone',
    'home.riseTogetherDesc': 'Favle creates small, powerful circles of indie developers who share success and amplify each other\'s reach.',
    'home.moreVisibility': '5x More Visibility',
    'home.formCircle': 'Form Your Circle',
    'home.formCircleDesc': 'Connect with up to 4 other indie developers who share your values and vision. Build genuine relationships based on mutual support.',
    'home.shareSuccess': 'Share Success',
    'home.shareSuccessDesc': 'When your game becomes a hit, promote your circle\'s games as a bundle. Your success becomes their success, creating a powerful multiplier effect.',
    'home.growTogether': 'Grow Together',
    'home.growTogetherDesc': 'Every member\'s win lifts the entire circle. Cross-promotion, shared audiences, and collective momentum create sustainable growth for everyone.',
    'home.howItWorks': 'How Favle Works',
    'home.howItWorksDesc': 'Simple, powerful, and built for indie developers who want to succeed together.',
    'home.joinFavle': 'Join Favle',
    'home.joinFavleDesc': 'Sign up and create your developer profile. Showcase your games and what you bring to the table.',
    'home.formYourCircle': 'Form Your Circle',
    'home.formYourCircleDesc': 'Connect with up to 4 other developers. Choose partners whose games and values align with yours.',
    'home.launchGame': 'Launch Your Game',
    'home.launchGameDesc': 'Release your game and watch your circle members support your launch with their audiences.',
    'home.shareSuccessStep': 'Share Success',
    'home.shareSuccessStepDesc': 'When you hit it big, promote your circle\'s games as bundles, lifting everyone together.',
    'home.readyTitle': 'Ready to Stop Going It Alone?',
    'home.readySubtitle': 'Join Favle today and find your circle of indie developers who will support your success and celebrate your wins.',
    'home.startBuilding': 'Start Building Your Circle',
    'home.freeToJoin': 'Free to join.',
    'home.noCreditCard': 'No credit card required.',
    'home.findInMinutes': 'Find your circle in minutes.',
    
    // Auth
    'auth.welcomeBack': 'Welcome Back',
    'auth.continue': 'Sign in to continue',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.login': 'Sign In',
    'auth.loggingIn': 'Signing in...',
    'auth.or': 'Or',
    'auth.loginWithSteam': 'Sign in with Steam',
    'auth.loginWithDiscord': 'Sign in with Discord',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.signUp': 'Sign up now',
    'auth.startJourney': 'Start Your Journey',
    'auth.joinCommunity': 'Create your account and join the developer community',
    'auth.name': 'Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.createAccount': 'Create Account',
    'auth.creating': 'Creating account...',
    'auth.registerWithSteam': 'Sign up with Steam',
    'auth.registerWithDiscord': 'Sign up with Discord',
    'auth.haveAccount': 'Already have an account?',
    'auth.signIn': 'Sign in',
    'auth.loginError': 'Invalid email or password',
    'auth.registerError': 'Error creating account',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.create': 'Create',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.complete': 'Complete',
    
    // Discovery
    'discovery.title': 'Discovery',
    'discovery.subtitle': 'Browse available games and circles',
    'discovery.games': 'Games',
    'discovery.circles': 'Circles',
    'discovery.searchPlaceholder': 'Search for games or circles...',
    'discovery.genre': 'Genre',
    'discovery.platform': 'Platform',
    'discovery.sort': 'Sort',
    'discovery.allGenres': 'All Genres',
    'discovery.allPlatforms': 'All Platforms',
    'discovery.popular': 'Most Popular',
    'discovery.recent': 'Most Recent',
    'discovery.name': 'Name',
    'discovery.noGames': 'No games',
    'discovery.noCircles': 'No circles',
    'discovery.gamesCount': 'games',
    
    // Dashboard
    'dashboard.welcome': 'Welcome,',
    'dashboard.subtitle': 'Overview of your performance and activities',
    'dashboard.circles': 'Circles',
    'dashboard.activeCampaigns': 'Active Campaigns',
    'dashboard.games': 'Games',
    'dashboard.views': 'Views',
    'dashboard.createCircle': 'Create New Circle',
    'dashboard.createCircleDesc': 'Form a circle with other developers and start collaborating',
    'dashboard.discoverGames': 'Discover Games',
    'dashboard.discoverGamesDesc': 'Browse games and circles available to join',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.allNotifications': 'All Notifications',
    'dashboard.noActivity': 'No recent activity',
    'dashboard.startCreating': 'Start by creating a circle',
    'dashboard.newCampaign': 'New Campaign:',
    'dashboard.tasks': 'tasks',
    'dashboard.completed': 'completed',
    'dashboard.active': 'Active',
    'dashboard.completedStatus': 'Completed',
    'dashboard.draft': 'Draft',
    
    // Circles
    'circles.title': 'Circles',
    'circles.subtitle': 'Manage your circles and join new ones',
    'circles.createNew': 'Create New Circle',
    'circles.noCircles': 'No circles yet',
    'circles.noCirclesDesc': 'Start by creating a new circle or join an existing one',
    'circles.gamesCount': 'games',
  },
  ar: {
    // Navigation
    'nav.discovery': 'اكتشاف',
    'nav.dashboard': 'لوحة التحكم',
    'nav.circles': 'دوائري',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    
    // Home
    'home.forIndieDevs': 'لمطوري الألعاب المستقلين',
    'home.heroTitle': 'لعبتك تستحق أن تُكتشف',
    'home.heroSubtitle': 'انضم إلى دائرة من المطورين المستقلين الذين يدعمون بعضهم البعض. عندما ينجح أحدهم، ينمو الجميع معاً.',
    'home.cta': 'ابدأ بناء دائرة',
    'home.developersPerCircle': 'مطورين في كل دائرة',
    'home.sharedSuccess': 'نجاح مشترك',
    'home.growthPotential': 'إمكانيات النمو',
    'home.realityTitle': 'واقع مطور الألعاب المستقل',
    'home.realitySubtitle': 'إنشاء لعبة رائعة هو نصف المعركة فقط. اكتشافها؟ هذا هو التحدي الحقيقي.',
    'home.gamesDisappear': 'الألعاب تختفي في أيام',
    'home.gamesDisappearDesc': 'يتم إطلاق أكثر من 50 لعبة جديدة يومياً على المنصات الرئيسية. بدون ظهور، حتى الألعاب الرائعة تختفي في الغموض.',
    'home.marketingExpensive': 'التسويق مكلف',
    'home.marketingExpensiveDesc': 'التسويق التقليدي يكلف آلاف الدولارات. بالنسبة للمطورين المستقلين بميزانيات محدودة، غالباً ما يكون من المستحيل المنافسة.',
    'home.soloStruggle': 'المطورون المنفردون يعانون',
    'home.soloStruggleDesc': 'العمل بمفردك يعني وصول محدود. لا شبكة، لا ترويج متبادل، لا نظام دعم لتضخيم نجاحك.',
    'home.indieStats': 'من ألعاب المطورين المستقلين لا تستعيد تكاليف التطوير أبداً.',
    'home.solutionTag': 'حل Favle',
    'home.riseTogether': 'ارتقوا معاً، وليس وحدكم',
    'home.riseTogetherDesc': 'يخلق Favle دوائر صغيرة وقوية من المطورين المستقلين الذين يشاركون النجاح ويضخمون وصول بعضهم البعض.',
    'home.moreVisibility': 'مزيد من الظهور',
    'home.formCircle': 'شكل دائرة',
    'home.formCircleDesc': 'تواصل مع ما يصل إلى 4 مطورين آخرين يشاركونك قيمك ورؤيتك. بناء علاقات حقيقية قائمة على الدعم المتبادل.',
    'home.shareSuccess': 'شارك النجاح',
    'home.shareSuccessDesc': 'عندما تصبح لعبتك نجاحاً، اروّج لألعاب دائرة كحزمة. نجاحك يصبح نجاحهم، مما يخلق تأثير مضاعف قوي.',
    'home.growTogether': 'نمو معاً',
    'home.growTogetherDesc': 'فوز كل عضو يرفع الدائرة بأكملها. الترويج المتبادل، الجماهير المشتركة، والزخم الجماعي يخلق نمواً مستداماً للجميع.',
    'home.howItWorks': 'كيف يعمل Favle',
    'home.howItWorksDesc': 'بسيط، قوي، ومصمم لمطوري الألعاب المستقلين الذين يريدون النجاح معاً.',
    'home.joinFavle': 'انضم إلى Favle',
    'home.joinFavleDesc': 'سجّل وأنشئ ملفك كمطور. اعرض ألعابك وما تقدمه.',
    'home.formYourCircle': 'شكل دائرة',
    'home.formYourCircleDesc': 'تواصل مع ما يصل إلى 4 مطورين آخرين. اختر شركاء تتوافق ألعابهم وقيمهم معك.',
    'home.launchGame': 'أطلق لعبتك',
    'home.launchGameDesc': 'أطلق لعبتك وشاهد أعضاء دائرة يدعمون إطلاقك بجماهيرهم.',
    'home.shareSuccessStep': 'شارك النجاح',
    'home.shareSuccessStepDesc': 'عندما تحقق نجاحاً كبيراً، اروّج لألعاب دائرة كحزم، رافعاً الجميع معاً.',
    'home.readyTitle': 'مستعد للتوقف عن العمل وحدك؟',
    'home.readySubtitle': 'انضم إلى Favle اليوم وابحث عن دائرة من المطورين المستقلين الذين سيدعمون نجاحك ويحتفلون بانتصاراتك.',
    'home.startBuilding': 'ابدأ بناء دائرة',
    'home.freeToJoin': 'مجاني للانضمام',
    'home.noCreditCard': 'لا حاجة لبطاقة ائتمان',
    'home.findInMinutes': 'ابحث عن دائرة في دقائق',
    
    // Auth
    'auth.welcomeBack': 'مرحباً بعودتك',
    'auth.continue': 'سجّل الدخول للمتابعة',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.login': 'تسجيل الدخول',
    'auth.loggingIn': 'جاري تسجيل الدخول...',
    'auth.or': 'أو',
    'auth.loginWithSteam': 'تسجيل الدخول بـ Steam',
    'auth.loginWithDiscord': 'تسجيل الدخول بـ Discord',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.signUp': 'سجّل الآن',
    'auth.startJourney': 'ابدأ رحلتك',
    'auth.joinCommunity': 'أنشئ حسابك وانضم إلى مجتمع المطورين',
    'auth.name': 'الاسم',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.createAccount': 'إنشاء حساب',
    'auth.creating': 'جاري إنشاء الحساب...',
    'auth.registerWithSteam': 'التسجيل بـ Steam',
    'auth.registerWithDiscord': 'التسجيل بـ Discord',
    'auth.haveAccount': 'لديك حساب بالفعل؟',
    'auth.signIn': 'سجّل الدخول',
    'auth.loginError': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'auth.registerError': 'حدث خطأ أثناء إنشاء الحساب',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.add': 'إضافة',
    'common.create': 'إنشاء',
    'common.search': 'بحث',
    'common.filter': 'فلاتر',
    'common.back': 'السابق',
    'common.next': 'التالي',
    'common.complete': 'اكتمل',
    
    // Discovery
    'discovery.title': 'اكتشف',
    'discovery.subtitle': 'تصفح الألعاب والدوائر المتاحة',
    'discovery.games': 'الألعاب',
    'discovery.circles': 'الدوائر',
    'discovery.searchPlaceholder': 'ابحث عن ألعاب أو دوائر...',
    'discovery.genre': 'النوع',
    'discovery.platform': 'المنصة',
    'discovery.sort': 'الترتيب',
    'discovery.allGenres': 'جميع الأنواع',
    'discovery.allPlatforms': 'جميع المنصات',
    'discovery.popular': 'الأكثر شعبية',
    'discovery.recent': 'الأحدث',
    'discovery.name': 'الاسم',
    'discovery.noGames': 'لا توجد ألعاب',
    'discovery.noCircles': 'لا توجد دوائر',
    'discovery.gamesCount': 'لعبة',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً،',
    'dashboard.subtitle': 'نظرة عامة على أدائك وأنشطتك',
    'dashboard.circles': 'الدوائر',
    'dashboard.activeCampaigns': 'حملات نشطة',
    'dashboard.games': 'الألعاب',
    'dashboard.views': 'المشاهدات',
    'dashboard.createCircle': 'إنشاء دائرة جديدة',
    'dashboard.createCircleDesc': 'شكل دائرة مع مطورين آخرين وابدأ التعاون',
    'dashboard.discoverGames': 'اكتشف الألعاب',
    'dashboard.discoverGamesDesc': 'تصفح الألعاب والدوائر المتاحة للانضمام',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.allNotifications': 'جميع الإشعارات',
    'dashboard.noActivity': 'لا توجد أنشطة حديثة',
    'dashboard.startCreating': 'ابدأ بإنشاء دائرة',
    'dashboard.newCampaign': 'حملة جديدة:',
    'dashboard.tasks': 'مهمة',
    'dashboard.completed': 'مكتملة',
    'dashboard.active': 'نشطة',
    'dashboard.completedStatus': 'مكتملة',
    'dashboard.draft': 'مسودة',
    
    // Circles
    'circles.title': 'الدوائر',
    'circles.subtitle': 'إدارة دوائرك والانضمام إلى دوائر جديدة',
    'circles.createNew': 'إنشاء دائرة جديدة',
    'circles.noCircles': 'لا توجد دوائر بعد',
    'circles.noCirclesDesc': 'ابدأ بإنشاء دائرة جديدة أو انضم إلى دائرة موجودة',
    'circles.gamesCount': 'لعبة',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

