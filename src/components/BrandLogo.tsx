import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
}) => {
  // Sizing tuned for horizontal logo in header, badge in footer
  const headerHeightClass = size === 'sm' ? 'h-9 sm:h-10' : size === 'lg' ? 'h-14 sm:h-16' : 'h-11 sm:h-13 md:h-14';
  const footerHeightClass = size === 'sm' ? 'h-12 sm:h-14' : size === 'lg' ? 'h-20 sm:h-24' : 'h-16 sm:h-18';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {variant === 'dark' ? (
        <div className="inline-flex items-center justify-center bg-white p-2.5 rounded-2xl shadow-lg border border-amber-500/20 transition-transform hover:scale-[1.02]">
          <img
            src="/assets/aistudio/17243eaa-7bbd-4349-92dd-439c21ad3699_ff55c77f.jpg"
            alt="Al Adeel Advertising LLC Logo"
            className={`${footerHeightClass} w-auto object-contain block rounded-lg`}
          />
        </div>
      ) : (
        <img
          src="/assets/aistudio/3f5302dd-b3e9-4a33-8f91-51b76db08223_f2f8eb28.png"
          alt="Al Adeel Advertising LLC Logo"
          className={`${headerHeightClass} w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[340px] object-contain block transition-transform hover:scale-[1.02]`}
        />
      )}
    </div>
  );
};
