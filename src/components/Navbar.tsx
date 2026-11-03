import React, { useState, useRef, useEffect } from 'react';
import { Phone, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UaeFlag } from './UaeFlag';
import { Language } from '../types';
import { PageRoute } from '../types/routes';
import { TRANSLATIONS, SERVICES_DATA } from '../data/content';

interface NavbarProps {
  lang: Language;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, params?: any) => void;
  onToggleLang?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  currentPage,
  onNavigate,
  onToggleLang,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageRoute, params?: any) => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    onNavigate(page, params);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer py-1" onClick={() => handleNavClick('home')}>
            <BrandLogo size="lg" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 rtl:space-x-reverse text-[15px] font-medium text-gray-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'home' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.home}
              {currentPage === 'home' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>

            {/* Services with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => handleNavClick('services')}
                onMouseEnter={() => setServicesOpen(true)}
                className={`flex items-center gap-1.5 transition-colors hover:text-amber-700 py-2 cursor-pointer ${
                  currentPage === 'services' ? 'text-amber-700 font-bold' : ''
                }`}
                aria-expanded={servicesOpen}
              >
                <span>{t.nav.services}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div
                  onMouseLeave={() => setServicesOpen(false)}
                  className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleNavClick('services', { serviceId: service.id })}
                      className="w-full text-left rtl:text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="font-medium">{service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2 px-4">
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-900 cursor-pointer"
                    >
                      {t.nav.allServices} →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'portfolio' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.portfolio}
              {currentPage === 'portfolio' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'about' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.about}
              {currentPage === 'about' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`relative transition-colors hover:text-amber-700 cursor-pointer ${
                currentPage === 'contact' ? 'text-amber-700 font-bold' : ''
              }`}
            >
              {t.nav.contact}
              {currentPage === 'contact' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>
          </nav>

          {/* Desktop Right Action Bar (lg and up) */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Phone & Location */}
            <a
              href="tel:+971562612617"
              className="flex items-center gap-2.5 text-left rtl:text-right group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Phone className="w-4 h-4 fill-emerald-600" />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {t.topBar.phone}
                </span>
                <span className="block text-xs text-gray-500 font-normal">
                  {t.topBar.location}
                </span>
              </div>
            </a>

            {/* "Contact Us →" CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#b87e2a] hover:bg-[#a36e22] active:bg-[#8f5e1b] text-white text-sm font-semibold shadow-xs transition-all hover:shadow-md cursor-pointer"
            >
              <span>{t.nav.contactBtn}</span>
              <span className="text-white">→</span>
            </button>
          </div>

          {/* Tablet & Mobile Navigation Toggle (visible below lg) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {/* Tablet phone link */}
            <a
              href="tel:+971562612617"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-emerald-600" />
              <span>+971 56 261 2617</span>
            </a>

            {/* Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 sm:px-4 py-2 rounded-lg bg-[#b87e2a] hover:bg-[#a36e22] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              {t.nav.contactBtn}
            </button>

            {/* Hamburger / Close Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-700" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet menu dropdown (lg:hidden) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 px-3 space-y-1.5 bg-white/98 backdrop-blur-md shadow-xl animate-in slide-in-from-top-2 rounded-b-2xl">
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'home' ? 'bg-amber-50 text-amber-900' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.home}
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'services' ? 'bg-amber-50 text-amber-900' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.services}
            </button>

            {/* Quick service links inside mobile menu */}
            <div className="grid grid-cols-2 gap-1 px-4 py-1.5 bg-gray-50 rounded-xl my-1">
              {SERVICES_DATA.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => handleNavClick('services', { serviceId: srv.id })}
                  className="text-left rtl:text-right text-xs py-1.5 px-2 text-gray-600 hover:text-amber-800 hover:bg-white rounded-lg transition-colors cursor-pointer font-medium"
                >
                  • {srv.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'portfolio' ? 'bg-amber-50 text-amber-900' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.portfolio}
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'about' ? 'bg-amber-50 text-amber-900' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.about}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                currentPage === 'contact' ? 'bg-amber-50 text-amber-900' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {t.nav.contact}
            </button>

            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
              <a
                href="tel:+971562612617"
                className="flex items-center justify-center gap-2 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 py-2.5 px-3 rounded-xl transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+971 56 261 2617</span>
              </a>
              <a
                href="https://wa.me/971562612617"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 py-2.5 px-3 rounded-xl transition-colors"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
