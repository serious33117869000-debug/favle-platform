'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">privacy policy</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-6 text-white/80">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p>
                We at Favle are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Account information (name, email)</li>
                <li>Game info you add</li>
                <li>Information about the circles you join</li>
                <li>Usage and interaction data with the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p>
                We use your information to 
                 provide and improve our services, facilitate communication between developers, and manage circles and campaigns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Protection</h2>
              <p>
                We take appropriate security measures to protect your information from unauthorized access, alteration, or disclosure.
               </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

