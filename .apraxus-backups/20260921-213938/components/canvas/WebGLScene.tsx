'use client';

import React from 'react';

export const WebGLScene: React.FC<{ progress?: number }> = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Precision Ambient Architectural Glow Grid without heavy particle motion */}
      <div className="absolute inset-0 bg-[#030305]" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#7B5CFA]/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#38E8F8]/5 blur-[140px] pointer-events-none rounded-full" />
    </div>
  );
};
