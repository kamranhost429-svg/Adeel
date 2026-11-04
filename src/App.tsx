import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Language } from './types';
import { PageRoute } from './types/routes';
import { MessageCircle } from 'lucide-react';

function AppContent() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [pageParams, setPageParams] = useState<any>({});
  const { content } = useCms();

  // Sync route with URL hash
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const [route, queryStr] = hash.split('?');
      if (route === 'quote') {
        setCurrentPage('contact');
        return;
      }
      const validPages: PageRoute[] = ['home', 'services', 'portfolio', 'about', 'contact', 'admin'];
      if (validPages.includes(route as PageRoute)) {
        setCurrentPage(route as PageRoute);
        if (queryStr) {
          const params = new URLSearchParams(queryStr);
          setPageParams(Object.fromEntries(params.entries()));
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: PageRoute | string, params?: any) => {
    const targetPage = (page as PageRoute) || 'home';
    setCurrentPage(targetPage);
    setPageParams(params || {});

    const queryPart =
      params && Object.keys(params).length > 0
        ? '?' + new URLSearchParams(params).toString()
        : '';
    window.location.hash = targetPage + queryPart;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  if (currentPage === 'admin') {
    return (
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50 text-gray-900">
        <AdminDashboard lang={lang} onNavigate={navigate} />
      </div>
    );
  }

  const whatsappHref = `https://wa.me/${content.branding.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(content.branding.brandNameEn)},%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-gray-900 selection:bg-amber-100 selection:text-amber-900 flex flex-col justify-between"
    >
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        currentPage={currentPage}
        onNavigate={navigate}
        onToggleLang={toggleLanguage}
      />

      {/* Main Multi-Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage lang={lang} onNavigate={navigate} />}
        {currentPage === 'services' && (
          <ServicesPage lang={lang} onNavigate={navigate} initialServiceId={pageParams.serviceId} />
        )}
        {currentPage === 'portfolio' && <PortfolioPage lang={lang} onNavigate={navigate} />}
        {currentPage === 'about' && <AboutPage lang={lang} onNavigate={navigate} />}
        {currentPage === 'contact' && <ContactPage lang={lang} />}
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={navigate} />

      {/* Floating Dynamic WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-white cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2 rtl:group-hover:pl-0 rtl:group-hover:pr-2">
          {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
        </span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
