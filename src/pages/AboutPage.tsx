import React from 'react';
import { Factory, Award, ShieldCheck, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  return (
    <div className="py-12 bg-white">
      {/* Hero Section: Side-by-Side 2-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-left rtl:text-right">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Paragraph, Highlights & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block">
              {lang === 'ar' ? 'من نحن' : 'About Al Adeel Advertising LLC'}
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif leading-tight">
              {lang === 'ar' ? 'شريككم الموثوق في عالم الطباعة والتطريز والإعلان' : 'Your Trusted Branding & Advertising Partner in Dubai, UAE'}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Headquartered in Dubai, UAE, Al Adeel Advertising LLC is a leading provider of complete printing, computerized embroidery, signage, and corporate branding solutions. We proudly serve businesses across all seven emirates of the United Arab Emirates, delivering high-quality products and customized solutions to meet every client's branding needs.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/60 border border-amber-900/10 text-xs font-semibold text-gray-800">
                <CheckCircle className="w-4 h-4 text-[#b87e2a] flex-shrink-0" />
                <span>In-House Dubai Manufacturing</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-900/10 text-xs font-semibold text-gray-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Printing, Embroidery & Signage</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] active:bg-[#8f5e1b] text-white font-semibold text-sm shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{lang === 'ar' ? 'تواصل معنا' : 'Get In Touch'}</span>
                <span>→</span>
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-all cursor-pointer"
              >
                <span>View Our Works</span>
              </button>
            </div>
          </div>

          {/* Right Column: Showcase Image Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-gray-50 group transition-all duration-300">
              <img
                src="/assets/aistudio/18505b1f-e21e-4f40-8289-f55d8e4352d3_b913fe5f.jpg"
                alt="Al Adeel Printing, Embroidery, Advertising & Merchandise Showcase in Dubai"
                className="w-full h-auto object-cover block group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 4 Feature Pillars */}
      <div className="bg-[#faf8f5] py-14 border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left rtl:text-right">
            
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <Factory className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Dubai Facility</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dedicated printing and embroidery workshop with state-of-the-art machinery.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <Award className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">Quality Guaranteed</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Premium materials, embroidery threads, and fade-resistant outdoor UV inks.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <ShieldCheck className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">UAE Compliance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Full assistance with Dubai Municipality approvals and RTA vehicle branding permits.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-2xs">
              <MapPin className="w-8 h-8 text-[#b87e2a] mb-3" />
              <h3 className="text-lg font-bold font-serif text-gray-900 mb-1">UAE-Wide Delivery</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Reliable door-to-door delivery across Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
