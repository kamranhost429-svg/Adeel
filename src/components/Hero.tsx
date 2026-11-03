import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Check, Award } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onNavigate: (page: string, params?: any) => void;
}

interface ItemHotspot {
  id: string;
  name: string;
  nameAr: string;
  category: 'embroidery' | 'printing' | 'advertising' | 'corporate-gifts';
  badge: string;
  badgeAr: string;
  specs: string[];
  specsAr: string[];
  xPercent: number;
  yPercent: number;
}

const HERO_HOTSPOTS: ItemHotspot[] = [
  {
    id: 'polo-shirts',
    name: 'Custom Embroidered Corporate Polo Shirts',
    nameAr: 'قمصان بولو مطرزة بشعار الشركة',
    category: 'embroidery',
    badge: 'Your Logo, Our Craft',
    badgeAr: 'شعارك بأدق غرزة تطريز',
    specs: [
      '100% Premium Cotton Pique (220-240 GSM)',
      'Tajima Multi-Head 3D Gold Embroidery',
      'Washable & Colorfast Madeira Thread',
      'Available in all corporate colorways',
    ],
    specsAr: [
      'قطن بيكيه فاخر 100% (220-240 جم)',
      'تطريز ذهبي مجسم 3D بمكائن تاجيما اليابانية',
      'خيوط ماديرا الألمانية المقاومة للغسيل',
      'متوفر بجميع الألوان الرسمية للشركات',
    ],
    xPercent: 49.5,
    yPercent: 49.0,
  },
  {
    id: 'shopping-bag',
    name: 'Luxury Branded Shopping Bags & Packaging',
    nameAr: 'أكياس تسوق وعلب تغليف فاخرة بهوية مخصصة',
    category: 'printing',
    badge: 'Premium Brand Presentation',
    badgeAr: 'طباعة تغليف فاخر بأعلى المواصفات',
    specs: [
      '250 GSM Heavy Art Paper + Matte Soft-Touch',
      'Hot Stamped Metallic Gold Foil Accents',
      'Reinforced Base & Twisted Gold Braided Handle',
      'Custom Corporate Bag Sizes & Finishes',
    ],
    specsAr: [
      'ورق كوشيه مقوى 250 جم مع طبقة حماية مخملية',
      'بصمة ذهبية معدنية حرارية فائقة اللمعان',
      'قاعدة مقواة مع حبال يد ذهبية مجدولة فاخرة',
      'مقاسات وتشطيبات مخصصة لكبرى الشركات',
    ],
    xPercent: 39.5,
    yPercent: 71.0,
  },
  {
    id: 'embroidered-cap',
    name: '3D Embroidered Cap & Corporate Mug',
    nameAr: 'كابات مطرزة 3D ومجات سيراميك حرارية',
    category: 'corporate-gifts',
    badge: 'Executive Headwear & Merchandise',
    badgeAr: 'منتجات ترويجية فاخرة',
    specs: [
      'Structured 6-Panel Heavy Cotton Twill Cap',
      'High-Density 3D Puff Gold Foam Embroidery',
      'Grade-A Ceramic Mug with Full-Color Print',
      'Adjustable Metal Buckle Headwear Closure',
    ],
    specsAr: [
      'كاب 6 قطع قطن ثقيل متماسك ومقاوم للشمس',
      'تطريز بارز ثلاثي الأبعاد 3D خيوط ذهبية',
      'مج سيراميك فاخر بطباعة حرارية كاملة',
      'حزام إغلاق معدني خلفي قابل للتعديل',
    ],
    xPercent: 53.5,
    yPercent: 77.0,
  },
  {
    id: 'stationery-suite',
    name: 'Corporate Stationery, Cards & Laser Pen',
    nameAr: 'مستلزمات مكتبية وبطاقات عمل وأقلام ليزر',
    category: 'printing',
    badge: 'Corporate Identity & Stationery',
    badgeAr: 'هوية مكتبية متكاملة للشركات',
    specs: [
      'Luxury 450 GSM Business Cards with Foil',
      'Matching Branded Letterheads & Spiral Notepads',
      'Weighted Metal Executive Pen with Laser Logo',
      'Full Tehreem Cleaning Identity Showcase',
    ],
    specsAr: [
      'بطاقات عمل فاخرة 450 جم بختم حراري',
      'ورق رسمي ومذكرات سلكية بتصميم متناسق',
      'قلم تنفيذي معدني محفور بدقة الليزر',
      'نموذج تنفيذي متكامل لهوية الشركات',
    ],
    xPercent: 71.5,
    yPercent: 73.0,
  },
  {
    id: 'storefront-signage',
    name: 'Illuminated 3D LED Architectural Signage',
    nameAr: 'واجهات إعلانية وحروف بارزة مضيئة 3D',
    category: 'advertising',
    badge: '3D LED Storefront Letters',
    badgeAr: 'لوحات واجهات مضيئة معتمدة',
    specs: [
      'Fabricated Mirror Gold Acrylic & Stainless Steel',
      'Warm High-Lumen Waterproof Samsung LEDs',
      'CNC Routed 3D Emblems & Channel Letters',
      'Full UAE Municipality Approval & Installation',
    ],
    specsAr: [
      'أكريليك ذهبي مرآة وستانلس ستيل مقاوم للصدأ',
      'إضاءة LED سامسونج عالية السطوع ومقاومة للمطر',
      'قص كمبيوتري CNC فائق الدقة للشعارات',
      'شامل اعتمادات البلدية والتركيب في كافة الإمارات',
    ],
    xPercent: 77.0,
    yPercent: 14.5,
  },
  {
    id: 'vehicle-wrap',
    name: 'Commercial Fleet Graphics & Vehicle Branding',
    nameAr: 'تجليد سيارات وتصميم جرافيك أساطيل النقل',
    category: 'advertising',
    badge: 'RTA-Approved Vehicle Wrap',
    badgeAr: 'تصاريح وتجليد سيارات معتمد RTA',
    specs: [
      'High-Performance 3M Cast Wrap Film',
      'Anti-Scratch UV Protective Gloss Overlaminate',
      'Precision Computer-Cut Commercial Decals',
      'RTA Advertising Permit Support & Warranty',
    ],
    specsAr: [
      'فينيل كاست 3M عالي التحمل لحرارة الإمارات',
      'طبقة حماية لامعة مانعة للخدش وأشعة الشمس',
      'قص إلكتروني دقيق متطابق مع منحنيات المركبة',
      'ضمان شامل ودعم استخراج تصاريح RTA',
    ],
    xPercent: 88.0,
    yPercent: 53.0,
  },
];

// Ambient floating gold dust motes over pedestal
const SPARKLES = [
  { id: 1, x: 42, y: 68, size: 4, delay: '0s', duration: '4.2s' },
  { id: 2, x: 50, y: 75, size: 3, delay: '1.2s', duration: '3.8s' },
  { id: 3, x: 58, y: 65, size: 4.5, delay: '0.6s', duration: '4.6s' },
  { id: 4, x: 68, y: 72, size: 3.5, delay: '2.1s', duration: '4.0s' },
  { id: 5, x: 76, y: 68, size: 4, delay: '1.8s', duration: '3.6s' },
  { id: 6, x: 74, y: 20, size: 3, delay: '0.9s', duration: '4.4s' },
  { id: 7, x: 86, y: 48, size: 4.5, delay: '2.5s', duration: '4.8s' },
];

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const [activeHotspot, setActiveHotspot] = useState<ItemHotspot | null>(null);

  return (
    <section className="relative w-full bg-[#fcfbfa] py-2.5 sm:py-5 lg:py-6 border-b border-amber-900/10">
      {/* Banner Canvas - Constrained to website margins */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 select-none">
        <div className="relative w-full rounded-xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-amber-900/15 bg-white">
          
          {/* ============================================================== */}
          {/* BASE HERO IMAGE (New Authentic Ultra-Res Panoramic Banner)    */}
          {/* ============================================================== */}
          <img
            src="/assets/aistudio/8eaabfe4-c5b7-499a-ad98-5939538b7ea6_284a4282.png"
            alt="Al Adeel Advertising LLC - Printing, Embroidery & Advertising Solutions Across the UAE"
            width={1923}
            height={818}
            loading="eager"
            decoding="async"
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* ============================================================== */}
          {/* AMBIENT LIGHTING OVER SIGNAGE & PEDESTAL                       */}
          {/* ============================================================== */}
          {/* 1. Warm Neon Pulsing Glow over Storefront Signage */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '60%',
              top: '2%',
              width: '36%',
              height: '24%',
              animation: 'heroNeonPulse 3.4s ease-in-out infinite',
            }}
          >
            <div className="w-full h-full bg-amber-400/20 blur-2xl rounded-full" />
          </div>

          {/* 2. Floating Gold Dust Particles */}
          {SPARKLES.map((sp) => (
            <div
              key={sp.id}
              className="absolute rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b] pointer-events-none"
              style={{
                left: `${sp.x}%`,
                top: `${sp.y}%`,
                width: `${sp.size}px`,
                height: `${sp.size}px`,
                animation: `heroDustFloat ${sp.duration} ease-in-out ${sp.delay} infinite`,
              }}
            />
          ))}

          {/* ============================================================== */}
          {/* CLICKABLE HOTSPOTS OVER BOTTOM-LEFT PRINTED BADGES             */}
          {/* ============================================================== */}
          <button
            onClick={() => onNavigate('services', { serviceId: 'printing' })}
            aria-label="Printing Services"
            className="absolute left-[2.5%] top-[75.5%] w-[8.8%] h-[12.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-amber-400/80 hover:bg-black/10 transition-all"
            title="Explore Printing"
          />
          <button
            onClick={() => onNavigate('services', { serviceId: 'embroidery' })}
            aria-label="Embroidery Services"
            className="absolute left-[11.8%] top-[75.5%] w-[9.8%] h-[12.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-amber-400/80 hover:bg-black/10 transition-all"
            title="Explore Embroidery"
          />
          <button
            onClick={() => onNavigate('services', { serviceId: 'advertising' })}
            aria-label="Advertising Services"
            className="absolute left-[22.2%] top-[75.5%] w-[9.8%] h-[12.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-amber-400/80 hover:bg-black/10 transition-all"
            title="Explore Advertising"
          />

        </div>
      </div>
    </section>
  );
};
