'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
     <div className="container mx-auto px-4 py-20">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
    
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-6 text-white/80">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit our website.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To remember your preferences</li>
          <li>To improve user experience</li>
          <li>To analyze website usage</li>
          <li>To ensure platform security</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
        <p>
          You can manage cookies through your browser settings. Disabling cookies may affect site functionality.
        </p>
      </section>
    </div>
  </div>
</div>


      <Footer />
    </div>
  );
}

