import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import { PageRoute } from '../types/routes';
import { TRANSLATIONS } from '../data/content';
import { useCms } from '../context/CmsContext';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageRoute, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { content } = useCms();
  const t = TRANSLATIONS[lang];
  const { branding, services } = content;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="footer" className="bg-[#051d13] text-gray-300 pt-12 sm:pt-16 pb-12 sm:pb-16 border-t border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. TOP SECTION: Brand & Socials + Newsletter (Perfect on Tablet & Desktop) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-emerald-800/40 items-start">
          
          {/* Brand Info & Socials: (Mobile: center, Tablet/Desktop: left/start) */}
          <div className="md:col-span-6 lg:col-span-6 space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left rtl:sm:text-right">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <BrandLogo variant="dark" size="lg" />
            </div>
            
            <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed max-w-md">
              {t.footer.desc}
            </p>

            {/* Social Icons with accessible touch targets */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.facebook.com/share/1J3jsDu2DB/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Follow us on Facebook"
                className="w-9 h-9 rounded-full bg-emerald-950/90 border border-emerald-800/80 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-[#1877F2] transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.2 22 12z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/aladeeladvertisingllc?utm_source=qr&psln=N2hpaWU0bGk3NDRs"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-9 h-9 rounded-full bg-emerald-950/90 border border-emerald-800/80 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@al.adeel.advertis?_r=1&_t=ZS-9B4DpB1d6Ty"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                title="Follow us on TikTok"
                className="w-9 h-9 rounded-full bg-emerald-950/90 border border-emerald-800/80 flex items-center justify-center text-emerald-200 hover:text-white hover:border-amber-400 hover:bg-black transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>

              <a
                href={`https://wa.me/${branding.whatsappNumber.replace(/[^0-9]/g, '').replace(/^9710/, '971')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
                className="w-9 h-9 rounded-full bg-emerald-950/90 border border-emerald-800/80 flex items-center justify-center text-emerald-200 hover:text-white hover:border-emerald-400 hover:bg-emerald-600 transition-all shadow-xs"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter & Working Hours: Balanced right side on Tablet and Desktop */}
          <div className="md:col-span-6 lg:col-span-6 space-y-3.5 bg-emerald-950/40 p-5 sm:p-6 rounded-2xl border border-emerald-800/40">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.footer.newsletter}</span>
              </h4>
              <span className="text-[11px] text-amber-400/90 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Mon - Sun: 9:00 AM - 7:00 PM</span>
              </span>
            </div>

            <p className="text-xs text-emerald-100/75 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                className="w-full pl-4 pr-12 rtl:pr-4 rtl:pl-12 py-3 text-xs sm:text-sm rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-emerald-800/60 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
              <button
                type="submit"
                aria-label={t.footer.subscribeBtn}
                className="absolute right-1.5 rtl:right-auto rtl:left-1.5 top-1.5 bottom-1.5 px-4 bg-[#b87e2a] hover:bg-[#a36e22] text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-300 flex items-center gap-1.5 animate-in fade-in pt-1 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing!</span>
              </p>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. DIRECTORY SECTION: Links, Services & Contact Info (3 Balanced Columns)  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 pt-8 sm:pt-10 pb-10 sm:pb-12 border-b border-emerald-800/40 text-left rtl:text-right">
          
          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800/40 pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/75">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800/40 pb-2">
              {t.footer.ourServices}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/75">
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'printing' })} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  Printing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'embroidery' })} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  Embroidery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'advertising' })} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  Advertising
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'corporate-gifts' })} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  Corporate Gifts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'advertising' })} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  Signage & Light Boxes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', { serviceId: 'advertising' })} className="hover:text-amber-300 transition-colors cursor-pointer text-left rtl:text-right py-0.5">
                  Vehicle & Fleet Graphics
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Directory: (Tablet: 2-col, Desktop: 6-col) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-6 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800/40 pb-2">
              {t.footer.contactUs}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3 bg-emerald-950/50 p-3.5 rounded-xl border border-emerald-800/30">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 border border-emerald-700/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-1.5 w-full text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-300/70 uppercase block font-semibold">Sales & Inquiries</span>
                    <a href={`tel:${branding.phonePrimary}`} className="hover:text-white transition-colors font-bold text-emerald-100 text-sm block">
                      {branding.phonePrimary}
                    </a>
                  </div>
                  <div className="pt-1.5 border-t border-emerald-800/40">
                    <span className="text-[10px] text-emerald-300/70 uppercase block font-semibold">Direct Line</span>
                    <a href="tel:+971562612617" className="hover:text-white transition-colors font-bold text-emerald-100 text-sm block">
                      +971 56 261 2617
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 bg-emerald-950/50 p-3.5 rounded-xl border border-emerald-800/30">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 border border-emerald-700/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-1.5 w-full text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-300/70 uppercase block font-semibold">Warehouse & Factory</span>
                    <span className="font-bold text-emerald-100 text-xs block leading-tight">
                      Warehouse 2, Dubai Industrial City
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-emerald-800/40">
                    <span className="text-[10px] text-emerald-300/70 uppercase block font-semibold">Showrooms</span>
                    <span className="text-emerald-100/90 text-[11px] block leading-tight">
                      Cluster T (4–11) & Cluster A (3–11, 13, 15)
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Directory (Spans full width of contact card) */}
              <div className="sm:col-span-2 flex items-start gap-3 bg-emerald-950/50 p-3.5 rounded-xl border border-emerald-800/30">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 border border-emerald-700/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 w-full text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-300/70 uppercase block font-semibold">Carina (Sales & Accounts)</span>
                    <a href="mailto:carina@aladeeladvertising.com" className="hover:text-white transition-colors text-emerald-200 font-medium block">
                      carina@aladeeladvertising.com
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300/70 uppercase block font-semibold">General & Quotations</span>
                    <a href="mailto:info@aladeeladvertising.com" className="hover:text-white transition-colors text-emerald-200 font-medium block">
                      info@aladeeladvertising.com
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300/70 uppercase block font-semibold">Adeel (Executive)</span>
                    <a href="mailto:adeel@aladeeladvertising.com" className="hover:text-white transition-colors text-emerald-100/80 block">
                      adeel@aladeeladvertising.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. SUB-FOOTER BAR: Clean Wrap, Centered Domain Badge & Protected Height   */}
        {/* ========================================================================= */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-100/65 gap-4 text-center md:text-left rtl:md:text-right">
          <div>
            <span>{t.footer.copyright}</span>
          </div>

          <div>
            <span className="font-mono text-emerald-300/90 text-xs tracking-wider bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60 inline-block shadow-xs">
              {t.footer.domain}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer py-1">
              {t.nav.home}
            </button>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer py-1">
              {t.nav.services}
            </button>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors cursor-pointer py-1">
              {t.nav.portfolio}
            </button>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer py-1">
              {t.nav.about}
            </button>
            <span className="text-emerald-800 hidden sm:inline">•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer py-1">
              {t.nav.contact}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
