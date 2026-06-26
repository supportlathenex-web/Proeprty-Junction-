import React from 'react';
import brandLogo from '../assets/images/brand_seal_emblem_1781918385899.jpg';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10', iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img src={brandLogo} alt="Property Junction Logo" className="h-full w-auto object-contain rounded-md" />
      {!iconOnly && (
        <div className="flex flex-col">
          <span className="font-sans text-lg font-bold tracking-wide uppercase leading-none text-zinc-900">
            Property Junction
          </span>
          <span className="font-sans text-xs text-zinc-500 mt-1 leading-none tracking-normal">
            Real Estate Brokerage
          </span>
        </div>
      )}
    </div>
  );
};
