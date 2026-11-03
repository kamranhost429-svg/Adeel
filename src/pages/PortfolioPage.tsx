import React, { useState } from 'react';
import { ArrowRight, Clock, Package, Sparkles } from 'lucide-react';
import { Language, PortfolioCategory } from '../types';
import { PORTFOLIO_DATA } from '../data/content';

interface PortfolioPageProps {
  lang: Language;
  onNavigate: (page: string, params?: any) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ lang, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filterTabs: { key: PortfolioCategory; label: string; labelAr: string }[] = [
    { key: 'all', label: 'All Projects', labelAr: 'كافة الأعمال' },
    { key: 'printing', label: 'Printing', labelAr: 'الطباعة' },
    { key: 'embroidery', label: 'Embroidery', labelAr: 'التطريز' },
    { key: 'advertising', label: 'Advertising', labelAr: 'الإعلان' },
    { key: 'signage', label: 'Signage', labelAr: 'اللافتات' },
    { key: 'corporate-gifts', label: 'Corporate Gifts', labelAr: 'الهدايا' },
  ];

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === activeFilter);

  return (
    <div className="py-12 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-left rtl:text-right">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
          {lang === 'ar' ? 'معرض المشاريع' : 'Featured Client Works'}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif">
          {lang === 'ar' ? 'أحدث أعمالنا في الإمارات' : 'Our Recent Projects Across the UAE'}
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-2xl leading-relaxed">
          {lang === 'ar'
            ? 'استكشف نماذج من أعمالنا المنفذة للشركات والمؤسسات والفعاليات في دبي وأبوظبي وجميع إمارات الدولة.'
            : 'Explore our portfolio of branding, custom uniform embroidery, illuminated storefront signage, vehicle branding, and premium corporate gifts delivered across the UAE.'}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-[#083120] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Portfolio Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left rtl:text-right">
          {filteredItems.map((item) => {
            const isExpanded = selectedItem === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo */}
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative group">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/aladeel/2c652956-7da9-4202-8a68-8f60648a4af5_0d1999c8.jpg';
                      }}
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="text-base font-bold text-gray-900 font-serif leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Specifications table inside card (no popups needed!) */}
                    <div className="pt-2 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-700">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Material:</span>
                        <span className="font-semibold text-gray-900">{item.specs.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Finishing:</span>
                        <span className="font-semibold text-gray-900">{item.specs.finish}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" /> Lead Time:
                        </span>
                        <span className="font-semibold text-gray-900">{item.specs.turnaround}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Package className="w-3 h-3 text-emerald-600" /> Min Order:
                        </span>
                        <span className="font-semibold text-gray-900">{item.specs.minOrder}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
