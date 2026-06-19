import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10', iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Logo */}
      <svg
        viewBox="0 0 200 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto transition-transform duration-300 hover:scale-105"
      >
        {/* Outer Navy Blue House Outline */}
        <path
          d="M100 12 L172 63 V155 L100 200 L28 155 V63 L100 12 Z"
          stroke="#0E2F56"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Outer Roof Eaves Accents */}
        <path
          d="M18 63 L100 5 L182 63"
          stroke="#0E2F56"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Red House/P/J Shape */}
        <path
          d="M100 48 L142 78 V138 L114 156 L100 146 L100 178 L78 164 M78 63 V164 L78 63"
          stroke="#E3262A"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Connection to form the "P" loop */}
        <path
          d="M78 63 L100 48 M78 124 L142 124"
          stroke="#E3262A"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2x2 Window Panes Grid inside */}
        <rect x="91" y="78" width="8" height="8" fill="#0E2F56" rx="1" />
        <rect x="103" y="78" width="8" height="8" fill="#0E2F56" rx="1" />
        <rect x="91" y="90" width="8" height="8" fill="#0E2F56" rx="1" />
        <rect x="103" y="90" width="8" height="8" fill="#0E2F56" rx="1" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col select-none">
          {/* Spaced Wordmark */}
          <span className="font-serif text-lg font-extrabold tracking-[0.25em] text-[#0E2F56] leading-none">
            PROPERTY
          </span>
          <span className="font-serif text-sm font-extrabold tracking-[0.44em] text-[#E3262A] leading-none mt-1">
            JUNCTION
          </span>
        </div>
      )}
    </div>
  );
};
