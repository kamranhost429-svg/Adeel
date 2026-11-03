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
  // Height sizing for header and footer logos - Enhanced for maximum clarity and presence
  const headerHeightClass =
    size === 'sm'
      ? 'h-10 sm:h-11'
      : size === 'lg'
      ? 'h-14 sm:h-16 md:h-20'
      : 'h-12 sm:h-14 md:h-16 lg:h-18';

  const footerHeightClass =
    size === 'sm'
      ? 'h-14 sm:h-16'
      : size === 'lg'
      ? 'h-24 sm:h-28'
      : 'h-18 sm:h-22';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {variant === 'dark' ? (
        <div className="inline-flex items-center justify-center bg-white p-2.5 sm:p-3 rounded-2xl shadow-md border border-amber-500/20">
          <img
            src="/assets/aistudio/17243eaa-7bbd-4349-92dd-439c21ad3699_ff55c77f.jpg"
            alt="Al Adeel Advertising LLC Logo"
            width={1254}
            height={1254}
            loading="eager"
            decoding="async"
            className={`${footerHeightClass} w-auto object-contain block rounded-lg`}
          />
        </div>
      ) : (
        <img
          src="/assets/aistudio/3f5302dd-b3e9-4a33-8f91-51b76db08223_f2f8eb28.png"
          alt="Al Adeel Advertising LLC Logo"
          width={2172}
          height={724}
          loading="eager"
          decoding="async"
          className={`${headerHeightClass} w-auto max-w-[250px] xs:max-w-[280px] sm:max-w-[340px] md:max-w-[400px] object-contain block`}
        />
      )}
    </div>
  );
};
