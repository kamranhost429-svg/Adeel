import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceItem, PortfolioItem, ValuedCustomer } from '../types';
import { SERVICES_DATA, PORTFOLIO_DATA, WHY_CHOOSE_ITEMS, CUSTOMERS_DATA, TRANSLATIONS } from '../data/content';

export interface BrandingConfig {
  brandNameEn: string;
  brandNameAr: string;
  taglineEn: string;
  taglineAr: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  email: string;
  addressEn: string;
  addressAr: string;
  officeHoursEn: string;
  officeHoursAr: string;
  googleMapsUrl: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}

export interface HeroConfig {
  eyebrowEn: string;
  eyebrowAr: string;
  title1En: string;
  title1Ar: string;
  title2En: string;
  title2Ar: string;
  titleHighlightEn: string;
  titleHighlightAr: string;
  subtitleEn: string;
  subtitleAr: string;
  viewPortfolioBtnEn: string;
  viewPortfolioBtnAr: string;
  badge1En: string;
  badge1Ar: string;
  badge2En: string;
  badge2Ar: string;
  badge3En: string;
  badge3Ar: string;
  heroBgImage: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  desc: string;
  titleAr: string;
  descAr: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  answerEn: string;
  questionAr: string;
  answerAr: string;
}

export interface FullSiteContent {
  branding: BrandingConfig;
  hero: HeroConfig;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  customers: ValuedCustomer[];
  whyChoose: WhyChooseItem[];
  faqs: FaqItem[];
  mediaAssets: string[];
}

export const INITIAL_DEFAULT_CONTENT: FullSiteContent = {
  branding: {
    brandNameEn: TRANSLATIONS.en.brandName,
    brandNameAr: TRANSLATIONS.ar.brandName,
    taglineEn: TRANSLATIONS.en.tagline,
    taglineAr: TRANSLATIONS.ar.tagline,
    phonePrimary: '+971 50 719 6248',
    phoneSecondary: '+971 4 221 8830',
    whatsappNumber: '+971507196248',
    email: 'info@aladeeladvertising.com',
    addressEn: 'Warehouse 2, Dubai Industrial City (Cluster T & A Showrooms)',
    addressAr: 'مستودع 2، مدينة دبي الصناعية (معارض كلاستر T و A)',
    officeHoursEn: 'Mon - Sat: 8:00 AM - 8:00 PM',
    officeHoursAr: 'الإثنين - السبت: 8:00 صباحاً - 8:00 مساءً',
    googleMapsUrl: 'https://maps.google.com/?q=Al+Adeel+Advertising+Dubai',
    socialLinks: {
      facebook: 'https://facebook.com/aladeeladvertising',
      instagram: 'https://instagram.com/aladeeladvertising',
      linkedin: 'https://linkedin.com/company/aladeeladvertising',
      twitter: 'https://twitter.com/aladeeladv',
    },
  },
  hero: {
    eyebrowEn: TRANSLATIONS.en.hero.eyebrow,
    eyebrowAr: TRANSLATIONS.ar.hero.eyebrow,
    title1En: TRANSLATIONS.en.hero.title1,
    title1Ar: TRANSLATIONS.ar.hero.title1,
    title2En: TRANSLATIONS.en.hero.title2,
    title2Ar: TRANSLATIONS.ar.hero.title2,
    titleHighlightEn: TRANSLATIONS.en.hero.titleHighlight,
    titleHighlightAr: TRANSLATIONS.ar.hero.titleHighlight,
    subtitleEn: TRANSLATIONS.en.hero.subtitle,
    subtitleAr: TRANSLATIONS.ar.hero.subtitle,
    viewPortfolioBtnEn: TRANSLATIONS.en.hero.viewPortfolio,
    viewPortfolioBtnAr: TRANSLATIONS.ar.hero.viewPortfolio,
    badge1En: TRANSLATIONS.en.hero.badge1,
    badge1Ar: TRANSLATIONS.ar.hero.badge1,
    badge2En: TRANSLATIONS.en.hero.badge2,
    badge2Ar: TRANSLATIONS.ar.hero.badge2,
    badge3En: TRANSLATIONS.en.hero.badge3,
    badge3Ar: TRANSLATIONS.ar.hero.badge3,
    heroBgImage: '/assets/aladeel/2c652956-7da9-4202-8a68-8f60648a4af5_0d1999c8.jpg',
  },
  services: SERVICES_DATA,
  portfolio: PORTFOLIO_DATA,
  customers: CUSTOMERS_DATA,
  whyChoose: WHY_CHOOSE_ITEMS,
  faqs: [
    {
      id: 'faq-1',
      questionEn: 'What is your standard turnaround time for printing and embroidery orders?',
      answerEn: 'Standard printing orders take 24–48 hours, while embroidery and custom corporate wear typically take 3–5 business days depending on quantity and design complexity.',
      questionAr: 'ما هي المدة الزمنية المعتادة لإنجاز طلبات الطباعة والتطريز؟',
      answerAr: 'تستغرق طلبات الطباعة العادية من 24 إلى 48 ساعة، بينما يستغرق التطريز والملابس المخصصة من 3 إلى 5 أيام عمل حسب الكمية وتعقيد التصميم.',
    },
    {
      id: 'faq-2',
      questionEn: 'Do you offer delivery across all UAE emirates?',
      answerEn: 'Yes! We deliver directly to Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain.',
      questionAr: 'هل توفرون خدمة التوصيل لجميع إمارات الدولة؟',
      answerAr: 'نعم! نوفر التوصيل السريع لجميع مناطق دبي، أبوظبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، وأم القيوين.',
    },
    {
      id: 'faq-3',
      questionEn: 'Can I get a custom sample before committing to a bulk production order?',
      answerEn: 'Absolutely. We provide digital artwork proofs and physical sample approvals for corporate apparel, packaging, and high-volume print runs.',
      questionAr: 'هل يمكنني الحصول على عينة قبل إقرار طلبية الضخمة؟',
      answerAr: 'بكل تأكيد. نقدم عينات معتمدة ومطبوعات تجريبية قبل بدء الإنتاج المجمع لضمان مطابقة الهوية المعيارية.',
    },
  ],
  mediaAssets: [
    '/images/clients/seybrew.png',
    '/images/clients/ja1-baniyas.png',
    '/images/clients/hsi.png',
    '/images/clients/called-committed-commissioned.png',
    '/images/clients/reform-social-grill.png',
    '/images/clients/seypec.png',
    '/images/clients/pop-igniters.png',
    '/images/clients/hops-on-the-lakes.png',
    '/images/clients/75-south.png',
    '/images/optimized/about-showcase.webp',
    '/images/optimized/port-banners.webp',
    '/images/optimized/port-caps-uniforms.webp',
    '/images/optimized/port-corporate-gifts.webp',
    '/images/optimized/port-packaging.webp',
    '/images/optimized/port-printing.webp',
    '/images/optimized/port-store-signage.webp',
    '/images/optimized/port-uniforms.webp',
    '/images/optimized/port-vehicle.webp',
    '/images/optimized/service-advertising.webp',
    '/images/optimized/service-corporate-gifts.webp',
    '/images/optimized/service-embroidery.webp',
    '/images/optimized/service-packaging.webp',
    '/images/optimized/service-printing.webp',
    '/assets/aladeel/2c652956-7da9-4202-8a68-8f60648a4af5_0d1999c8.jpg',
  ],
};

export const sanitizePhoneNumber = (phone: string | undefined): string => {
  if (!phone) return '+971 50 719 6248';
  return phone
    .replace(/\+971[\s\u00A0]*0*50[\s\u00A0]*719[\s\u00A0]*6248/g, '+971 50 719 6248')
    .replace(/\+971[\s\u00A0]*050/g, '+971 50')
    .replace(/\+971050/g, '+971 50')
    .replace(/050[\s\u00A0]*719[\s\u00A0]*6248/g, '50 719 6248');
};

const STORAGE_KEY = 'al_adeel_cms_content_v5';

interface CmsContextType {
  content: FullSiteContent;
  updateBranding: (branding: Partial<BrandingConfig>) => void;
  updateHero: (hero: Partial<HeroConfig>) => void;
  updateServices: (services: ServiceItem[]) => void;
  addService: (service: ServiceItem) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  updatePortfolio: (portfolio: PortfolioItem[]) => void;
  addPortfolioItem: (item: PortfolioItem) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  updateCustomers: (customers: ValuedCustomer[]) => void;
  addCustomer: (customer: ValuedCustomer) => void;
  updateCustomer: (id: string, customer: Partial<ValuedCustomer>) => void;
  deleteCustomer: (id: string) => void;
  updateWhyChoose: (items: WhyChooseItem[]) => void;
  updateFaqs: (faqs: FaqItem[]) => void;
  addFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;
  addMediaAsset: (url: string) => void;
  exportJsonBackup: () => string;
  importJsonBackup: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<FullSiteContent>(() => {
    try {
      // Purge all legacy cached CMS versions to prevent outdated phone numbers
      ['al_adeel_cms_content_v1', 'al_adeel_cms_content_v2', 'al_adeel_cms_content_v3', 'al_adeel_cms_content_v4'].forEach((k) => {
        try { localStorage.removeItem(k); } catch (e) {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const loadedBranding = { ...INITIAL_DEFAULT_CONTENT.branding, ...(parsed.branding || {}) };
        loadedBranding.phonePrimary = sanitizePhoneNumber(loadedBranding.phonePrimary);
        if (loadedBranding.whatsappNumber === '+971562612617' || loadedBranding.whatsappNumber === '+971528186248') {
          loadedBranding.whatsappNumber = '+971507196248';
        }

        const hasLegacy = !parsed.customers || parsed.customers.some((c: ValuedCustomer) => c.id === 'premium-cobras' || c.logoUrl?.endsWith('.svg') || c.id === 'reform');
        const loadedCustomers = (!hasLegacy && parsed.customers.length === 9)
          ? parsed.customers
          : INITIAL_DEFAULT_CONTENT.customers;

        return {
          ...INITIAL_DEFAULT_CONTENT,
          ...parsed,
          customers: loadedCustomers,
          branding: loadedBranding,
          hero: { ...INITIAL_DEFAULT_CONTENT.hero, ...(parsed.hero || {}) },
        };
      }
    } catch (e) {
      console.error('Failed to parse saved CMS content from localStorage', e);
    }
    return INITIAL_DEFAULT_CONTENT;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save CMS content to localStorage', e);
    }
  }, [content]);

  useEffect(() => {
    if (content.branding.phonePrimary.includes('050') || content.branding.phonePrimary !== '+971 50 719 6248') {
      if (content.branding.phonePrimary.includes('719')) {
        setContent((prev) => ({
          ...prev,
          branding: {
            ...prev.branding,
            phonePrimary: '+971 50 719 6248',
            whatsappNumber: '+971507196248',
          },
        }));
      }
    }
  }, [content.branding.phonePrimary]);

  const updateBranding = (brandingUpdates: Partial<BrandingConfig>) => {
    setContent((prev) => ({
      ...prev,
      branding: { ...prev.branding, ...brandingUpdates },
    }));
  };

  const updateHero = (heroUpdates: Partial<HeroConfig>) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates },
    }));
  };

  const updateServices = (services: ServiceItem[]) => {
    setContent((prev) => ({ ...prev, services }));
  };

  const addService = (service: ServiceItem) => {
    setContent((prev) => ({ ...prev, services: [...prev.services, service] }));
  };

  const updateService = (id: string, serviceUpdates: Partial<ServiceItem>) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...serviceUpdates } : s)),
    }));
  };

  const deleteService = (id: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const updatePortfolio = (portfolio: PortfolioItem[]) => {
    setContent((prev) => ({ ...prev, portfolio }));
  };

  const addPortfolioItem = (item: PortfolioItem) => {
    setContent((prev) => ({ ...prev, portfolio: [item, ...prev.portfolio] }));
  };

  const updatePortfolioItem = (id: string, itemUpdates: Partial<PortfolioItem>) => {
    setContent((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((p) => (p.id === id ? { ...p, ...itemUpdates } : p)),
    }));
  };

  const deletePortfolioItem = (id: string) => {
    setContent((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => p.id !== id),
    }));
  };

  const updateCustomers = (newCustomers: ValuedCustomer[]) => {
    setContent((prev) => ({ ...prev, customers: newCustomers }));
  };

  const addCustomer = (customer: ValuedCustomer) => {
    setContent((prev) => ({ ...prev, customers: [...prev.customers, customer] }));
  };

  const updateCustomer = (id: string, updated: Partial<ValuedCustomer>) => {
    setContent((prev) => ({
      ...prev,
      customers: prev.customers.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    }));
  };

  const deleteCustomer = (id: string) => {
    setContent((prev) => ({
      ...prev,
      customers: prev.customers.filter((c) => c.id !== id),
    }));
  };

  const updateWhyChoose = (items: WhyChooseItem[]) => {
    setContent((prev) => ({ ...prev, whyChoose: items }));
  };

  const updateFaqs = (faqs: FaqItem[]) => {
    setContent((prev) => ({ ...prev, faqs }));
  };

  const addFaq = (faq: FaqItem) => {
    setContent((prev) => ({ ...prev, faqs: [...prev.faqs, faq] }));
  };

  const deleteFaq = (id: string) => {
    setContent((prev) => ({ ...prev, faqs: prev.faqs.filter((f) => f.id !== id) }));
  };

  const addMediaAsset = (url: string) => {
    if (!url || content.mediaAssets.includes(url)) return;
    setContent((prev) => ({ ...prev, mediaAssets: [url, ...prev.mediaAssets] }));
  };

  const exportJsonBackup = () => {
    return JSON.stringify(content, null, 2);
  };

  const importJsonBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && parsed.branding && parsed.services) {
        setContent(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON backup file', e);
    }
    return false;
  };

  const resetToDefaults = () => {
    setContent(INITIAL_DEFAULT_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        updateBranding,
        updateHero,
        updateServices,
        addService,
        updateService,
        deleteService,
        updatePortfolio,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        updateCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        updateWhyChoose,
        updateFaqs,
        addFaq,
        deleteFaq,
        addMediaAsset,
        exportJsonBackup,
        importJsonBackup,
        resetToDefaults,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
