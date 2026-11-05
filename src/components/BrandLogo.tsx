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
  // Height sizing for header and footer logos - Clean, proportionate sizing
  const headerHeightClass =
    size === 'sm'
      ? 'h-6 sm:h-7'
      : size === 'lg'
      ? 'h-9 sm:h-11 md:h-12 lg:h-[50px]'
      : 'h-8 sm:h-9 md:h-10';

  const footerHeightClass =
    size === 'sm'
      ? 'h-8 sm:h-9'
      : size === 'lg'
      ? 'h-12 sm:h-14 md:h-16'
      : 'h-10 sm:h-12';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {variant === 'dark' ? (
        <div className="inline-flex items-center justify-center bg-white p-1.5 sm:p-2 rounded-xl shadow-sm border border-amber-500/20">
          <img
            src="/assets/aladeel/17243eaa-7bbd-4349-92dd-439c21ad3699_ff55c77f.jpg"
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
          src="/assets/aistudio/a807b86b-5370-43d2-a374-4e7ca63ceb5b_631c4a19.png"
          alt="Al Adeel Advertising LLC Logo"
          width={2172}
          height={724}
          loading="eager"
          decoding="async"
          className={`${headerHeightClass} w-auto max-w-[170px] xs:max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain block`}
        />
      )}
    </div>
  );
};
