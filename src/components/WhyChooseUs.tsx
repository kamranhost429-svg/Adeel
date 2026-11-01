import React from 'react';
import { Gem, Truck, Sliders, MapPin } from 'lucide-react';
import { Language } from '../types';
import { WHY_CHOOSE_ITEMS, TRANSLATIONS } from '../data/content';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'diamond':
        return <Gem className="w-5 h-5 text-[#b87e2a]" />;
      case 'truck':
        return <Truck className="w-5 h-5 text-[#b87e2a]" />;
      case 'gears':
        return <Sliders className="w-5 h-5 text-[#b87e2a]" />;
      case 'pin':
      default:
        return <MapPin className="w-5 h-5 text-[#b87e2a]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-7 sm:py-8 bg-[#faf8f5] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Title on the left with gold accent bar */}
          <div className="lg:col-span-3 text-left rtl:text-right border-b lg:border-b-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-amber-900/15 pb-4 lg:pb-0 lg:pr-6 rtl:lg:pr-0 rtl:lg:pl-6">
            <div className="w-9 h-1 bg-[#b87e2a] mb-2.5 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-serif leading-tight">
              {t.whyChoose.heading}
            </h2>
          </div>

          {/* 4 Trust Badges Pillars */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 text-left rtl:text-right ${
                  idx < WHY_CHOOSE_ITEMS.length - 1
                    ? 'lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-amber-900/10 lg:pr-3 rtl:lg:pr-0 rtl:lg:pl-3'
                    : ''
                }`}
              >
                {/* Gold Circle Badge */}
                <div className="w-11 h-11 rounded-full bg-white border border-amber-300 shadow-2xs flex items-center justify-center flex-shrink-0">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">
                    {lang === 'ar' ? item.titleAr : item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                    {lang === 'ar' ? item.descAr : item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
