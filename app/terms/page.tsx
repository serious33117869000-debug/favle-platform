'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
  <div className="max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
    
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-6 text-white/80">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
        <p>
          By using the Favle platform, you agree to be bound by these terms and conditions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Platform Usage</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>You must be 18 years old or above to use the platform</li>
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You must not share illegal or abusive content</li>
          <li>Each circle can contain a maximum of 5 members</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Liability</h2>
        <p>
          Favle is not responsible for any losses or damages resulting from the use of the platform or collaboration between developers.
        </p>
      </section>
    </div>
  </div>
</div>


      <Footer />
    </div>
  );
}

