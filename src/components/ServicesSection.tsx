import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, ServiceId } from '../types';
import { TRANSLATIONS } from '../data/content';
import { useCms } from '../context/CmsContext';

interface ServicesSectionProps {
  lang: Language;
  onNavigateToServices: (serviceId?: ServiceId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onNavigateToServices,
}) => {
  const { content } = useCms();
  const t = TRANSLATIONS[lang];
  const servicesList = content.services;

  return (
    <section id="services" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-12 text-left rtl:text-right">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block">
              {t.services.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 font-serif tracking-tight leading-tight">
              {t.services.heading}
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2 lg:pt-0">
            <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed max-w-xl">
              {t.services.subheading}
            </p>
            <button
              onClick={() => onNavigateToServices()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-amber-600 text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-md flex-shrink-0 cursor-pointer self-start sm:self-center"
            >
              <span>{t.services.viewAll}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Dynamic Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {servicesList.map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigateToServices(service.id)}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-amber-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Card Image Cover - balanced 4:3 aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/aladeel/2c652956-7da9-4202-8a68-8f60648a4af5_0d1999c8.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left rtl:text-right">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-serif group-hover:text-[#b87e2a] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Learn More link */}
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#b87e2a] transition-colors mt-auto pt-2 border-t border-gray-50">
                  <span>{t.services.learnMore}</span>
                  <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
