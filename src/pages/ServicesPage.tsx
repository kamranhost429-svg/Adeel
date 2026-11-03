import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Language, ServiceId } from '../types';
import { SERVICES_DATA } from '../data/content';

interface ServicesPageProps {
  lang: Language;
  onNavigate: (page: string, params?: any) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ lang, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ServiceId>('printing');

  const selectedService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <div className="py-12 bg-white">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-left rtl:text-right">
        <div className="border-b border-gray-100 pb-8">
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#b87e2a] uppercase block mb-2">
            {lang === 'ar' ? 'خدماتنا المتكاملة' : 'Al Adeel Solutions'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-serif">
            {lang === 'ar' ? 'حلول الطباعة والتطريز والإعلان في الإمارات' : 'Printing, Embroidery & Advertising Services'}
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'نقدم لعملائنا في دبي وكافة إمارات الدولة حلولاً صناعية متطورة للتصنيع الإعلاني، التطريز الآلي فائق الدقة، والطباعة التجارية بمواصفات قياسية.'
              : 'Direct in-house manufacturing in Dubai for corporate printing, computerised embroidery, architectural 3D signage, and fleet branding across all UAE emirates.'}
          </p>

          {/* Quick Service Selection Tabs */}
          <div className="flex flex-wrap gap-2 pt-6">
            {SERVICES_DATA.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setActiveTab(srv.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === srv.id
                    ? 'bg-[#083120] text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {srv.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Selected Service Deep-Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-sm text-left rtl:text-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Photo */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg aspect-[16/11] bg-white">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/aladeel/2c652956-7da9-4202-8a68-8f60648a4af5_0d1999c8.jpg';
                }}
              />
            </div>

            {/* Details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{selectedService.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">
                {selectedService.title} Solutions in UAE
              </h2>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {selectedService.description}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Grid of All 4 Services with Detailed Catalogs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold font-serif text-gray-900 mb-8 text-left rtl:text-right">
          Full Services Catalog & Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left rtl:text-right">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-serif text-gray-900">{srv.title}</h4>
                    <span className="text-xs text-amber-700 font-medium">{srv.badge}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{srv.description}</p>

                <div className="space-y-3 py-3 border-t border-b border-gray-100 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block mb-1">Frequently Ordered:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.popularItems.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-gray-900 block mb-1">Supported Materials:</span>
                    <span className="text-gray-600">{srv.materials.join(' • ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
