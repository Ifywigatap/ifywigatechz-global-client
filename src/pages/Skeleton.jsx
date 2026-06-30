import React from 'react';

export default function Skeleton({ className = '', variant = 'rectangular' }) {
  const baseClass = 'animate-pulse bg-white/10 relative overflow-hidden';
  const variants = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}