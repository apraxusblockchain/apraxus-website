'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg'; withWordmark?: boolean }> = ({ 
  size = 'md',
  withWordmark = true 
}) => {
  const markDim = size === 'sm' ? 30 : size === 'lg' ? 48 : 38;
  const textClass = size === 'sm' ? 'text-lg tracking-tight' : size === 'lg' ? 'text-3xl tracking-tight' : 'text-xl tracking-tight';

  return (
    <Link href="/" className="flex items-center gap-3.5 group select-none relative z-50">
      {/* Exact Styled Logo with Floating Violet Core Glow */}
      <div 
        className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{ width: markDim, height: markDim }}
      >
        {/* Violet Core Ambient Glow radiating from the purple center node */}
        <div className="absolute inset-0 bg-[#7B5CFA] opacity-40 blur-[10px] rounded-full group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Exact Logo Render with pure crisp transparency */}
        <Image
          src="/logo/apraxus_mark_clean.png"
          alt="Apraxus Official Brand Mark"
          width={markDim}
          height={markDim}
          className="object-contain w-full h-full relative z-10 drop-shadow-[0_2px_14px_rgba(123,92,250,0.5)]"
          priority
        />
      </div>

      {withWordmark && (
        <span className={`font-semibold text-white ${textClass} font-sans group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#7B5CFA] transition-all`}>
          Apraxus
        </span>
      )}
    </Link>
  );
};
