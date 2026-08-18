import React from 'react';

export type StatusType = 'SHIPPED' | 'TESTING' | 'UNDER_DEVELOPMENT' | 'PLANNED' | 'COMING_SOON';

interface StatusPillProps {
  status: StatusType;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, className = '' }) => {
  const getStyles = () => {
    switch (status) {
      case 'SHIPPED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'TESTING':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'UNDER_DEVELOPMENT':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30 animate-pulse';
      case 'PLANNED':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'COMING_SOON':
      default:
        return 'bg-white/[0.04] text-[#77727D] border-white/10';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'SHIPPED': return 'SHIPPED';
      case 'TESTING': return 'TESTING';
      case 'UNDER_DEVELOPMENT': return 'UNDER DEV';
      case 'PLANNED': return 'PLANNED';
      case 'COMING_SOON': return 'COMING SOON';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${getStyles()} ${className}`}
    >
      {getLabel()}
    </span>
  );
};
