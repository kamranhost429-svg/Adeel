import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PortfolioSection } from '../components/PortfolioSection';
import { CtaBanner } from '../components/CtaBanner';
import { Language, ServiceId } from '../types';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: string, params?: { serviceId?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        lang={lang}
        onNavigate={(page, params) => onNavigate(page, params)}
      />

      {/* Trust Badges Bar (Directly after Hero) */}
      <WhyChooseUs lang={lang} />

      {/* Services Section */}
      <ServicesSection
        lang={lang}
        onNavigateToServices={(serviceId) => onNavigate('services', { serviceId })}
      />

      {/* Portfolio Section */}
      <PortfolioSection
        lang={lang}
        onNavigateToPortfolio={() => onNavigate('portfolio')}
      />

      {/* CTA Banner */}
      <CtaBanner
        lang={lang}
        onContact={() => onNavigate('contact')}
      />
    </div>
  );
};
