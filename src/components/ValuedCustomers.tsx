import React from 'react';
import { useCms } from '../context/CmsContext';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';
import { Sparkles } from 'lucide-react';

interface ValuedCustomersProps {
  lang: Language;
  onNavigate?: (page: string, params?: any) => void;
}

export const ValuedCustomers: React.FC<ValuedCustomersProps> = ({ lang }) => {
  const { content } = useCms();
  const customers = content.customers && content.customers.length > 0 ? content.customers : [];
  const t = TRANSLATIONS[lang].valuedCustomers;
  const isRtl = lang === 'ar';

  if (customers.length === 0) return null;

  // Duplicate items 2 times for a completely seamless, gapless infinite marquee (-50% translation)
  const marqueeList = [...customers, ...customers];

  return (
    <section
      aria-label={t.heading}
      className="relative w-full bg-[#fdfcfa] py-4 sm:py-6 border-b border-amber-900/10 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Centered Header */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-amber-700 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>{t.eyebrow}</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold font-serif text-gray-900 tracking-tight mt-0.5">
            {t.heading}
          </h2>
        </div>
      </div>

      {/* Marquee Carousel Track with Edge Fades */}
      <div className="customer-slider-container relative w-full overflow-hidden py-1">
        {/* Left & Right Subtle Soft Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#fdfcfa] via-[#fdfcfa]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#fdfcfa] via-[#fdfcfa]/90 to-transparent z-10" />

        {/* Sliding Row of Compact Boxes */}
        <div className="customer-slider-track gap-2.5 sm:gap-3 px-3">
          {marqueeList.map((customer, idx) => {
            const customerName = isRtl ? customer.nameAr || customer.name : customer.name;
            const customerCat = isRtl
              ? customer.categoryAr || customer.categoryEn || ''
              : customer.categoryEn || customer.categoryAr || '';

            return (
              <div
                key={`${customer.id}-${idx}`}
                className="group relative flex items-center justify-center shrink-0 h-12 sm:h-13.5 min-w-[135px] sm:min-w-[165px] max-w-[195px] px-3 sm:px-4 py-1.5 rounded-lg bg-white border border-gray-200/85 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-amber-400 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer overflow-hidden"
                title={`${customerName} - ${customerCat}`}
              >
                {/* Compact Logo Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                  <img
                    src={customer.logoUrl}
                    alt={customerName}
                    loading="lazy"
                    className="max-h-7 sm:max-h-8 max-w-[115px] sm:max-w-[140px] w-auto h-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback text badge if logo file is unreachable
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-badge')) {
                        const span = document.createElement('span');
                        span.className =
                          'fallback-badge text-[11px] font-bold text-gray-800 tracking-wider truncate max-w-full uppercase';
                        span.innerText = customerName;
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>

                {/* Subtle Hover Tooltip with Name & Industry */}
                <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-[10px] font-medium py-0.5 px-2 rounded-md shadow-md whitespace-nowrap z-30">
                  {customerName}
                  {customerCat ? ` • ${customerCat}` : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
