import React from 'react';
import { Printer, Megaphone, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface CtaBannerProps {
  lang: Language;
  onContact: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ lang, onContact }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative overflow-hidden bg-[#041f14] text-white py-14 lg:py-16 border-y border-amber-500/25">
      {/* Pristine Modern Gradient & Ambient Lighting (NO baked-in ghost text) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03180f] via-[#073320] to-[#041e13] pointer-events-none" />
      
      {/* Soft Ambient Radial Glows */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle decorative gold light streak */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Text Column (5 cols) */}
          <div className="lg:col-span-5 text-left rtl:text-right space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight leading-snug">
              {t.cta.heading}
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed max-w-lg">
              {t.cta.subtitle}
            </p>
          </div>

          {/* Center Action Button (3 cols) */}
          <div className="lg:col-span-3 flex justify-start lg:justify-center">
            <button
              onClick={onContact}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c59239] via-[#b87e2a] to-[#9e671d] hover:from-[#d9a242] hover:via-[#c59239] hover:to-[#b87e2a] text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(184,126,42,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(184,126,42,0.65)] transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border border-amber-300/30"
            >
              <span>{t.cta.button}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </button>
          </div>

          {/* Right 3 Feature Highlights (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-3 sm:gap-4 border-t lg:border-t-0 lg:border-l rtl:lg:border-l-0 rtl:lg:border-r border-emerald-700/50 pt-6 lg:pt-0 lg:pl-8 rtl:lg:pl-0 rtl:lg:pr-8">
            
            {/* Feature 1: Printing */}
            <div className="flex flex-col items-center text-center group cursor-pointer" onClick={onContact}>
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#02130b] border-2 border-amber-400/80 ring-2 ring-amber-400/20 flex items-center justify-center mb-2.5 shadow-lg group-hover:border-amber-300 group-hover:scale-105 transition-all">
                <Printer className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {t.cta.feature1}
              </span>
              <span className="text-[11px] text-emerald-200/75 block mt-0.5 leading-tight">
                {t.cta.feature1Sub}
              </span>
            </div>

            {/* Feature 2: Embroidery */}
            <div className="flex flex-col items-center text-center group cursor-pointer" onClick={onContact}>
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#02130b] border-2 border-amber-400/80 ring-2 ring-amber-400/20 flex items-center justify-center mb-2.5 shadow-lg group-hover:border-amber-300 group-hover:scale-105 transition-all">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400 stroke-current fill-none stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
                  {/* Stylized Embroidery Needle & Thread Stitch */}
                  <path d="M19 3l-3.5 3.5m0 0l-8.5 8.5a2 2 0 002.8 2.8l8.5-8.5-2.8-2.8z" />
                  <circle cx="17.5" cy="4.5" r="0.75" fill="currentColor" />
                  <path d="M6 18c-2 2-4 1-4-1s3-3 4-1" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {t.cta.feature2}
              </span>
              <span className="text-[11px] text-emerald-200/75 block mt-0.5 leading-tight">
                {t.cta.feature2Sub}
              </span>
            </div>

            {/* Feature 3: Advertising */}
            <div className="flex flex-col items-center text-center group cursor-pointer" onClick={onContact}>
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#02130b] border-2 border-amber-400/80 ring-2 ring-amber-400/20 flex items-center justify-center mb-2.5 shadow-lg group-hover:border-amber-300 group-hover:scale-105 transition-all">
                <Megaphone className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white block">
                {t.cta.feature3}
              </span>
              <span className="text-[11px] text-emerald-200/75 block mt-0.5 leading-tight">
                {t.cta.feature3Sub}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
