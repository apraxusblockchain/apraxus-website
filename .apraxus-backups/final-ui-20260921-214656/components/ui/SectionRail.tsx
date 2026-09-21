'use client';

import React, { useEffect, useState } from 'react';

type Section = {
  id: string;
  label: string;
};

const SECTIONS: Section[] = [
  { id: 'authority-gap', label: 'The Authority Gap' },
  { id: 'agent-infrastructure', label: 'Agent Infrastructure' },
  { id: 'payments', label: 'Programmable Payments' },
  { id: 'developer-platform', label: 'Developer Platform' },
  { id: 'engineering', label: 'Public Engineering' },
];

export const SectionRail = () => {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(section.id);
          }
        },
        {
          rootMargin: '-35% 0px -55% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <aside
      aria-label="Page sections"
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <div className="pointer-events-auto flex flex-col items-end">
        {SECTIONS.map((section, index) => {
          const isActive = active === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className="group relative flex h-9 items-center"
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className={[
                  'mr-4 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.16em] transition-all duration-300',
                  isActive
                    ? 'translate-x-0 text-zinc-300 opacity-100'
                    : 'translate-x-2 text-zinc-700 opacity-0 group-hover:translate-x-0 group-hover:text-zinc-400 group-hover:opacity-100',
                ].join(' ')}
              >
                {section.label}
              </span>

              <span
                className={[
                  'relative flex h-5 w-5 items-center justify-center transition-all duration-300',
                  isActive ? 'scale-100' : 'scale-90',
                ].join(' ')}
              >
                <span
                  className={[
                    'h-1.5 w-1.5 rounded-full border transition-all duration-300',
                    isActive
                      ? 'border-[#8A5CE6] bg-[#8A5CE6] shadow-[0_0_14px_rgba(138,92,230,0.55)]'
                      : 'border-zinc-700 bg-transparent group-hover:border-zinc-400',
                  ].join(' ')}
                />

                {index < SECTIONS.length - 1 && (
                  <span className="absolute left-1/2 top-5 h-4 w-px -translate-x-1/2 bg-white/[0.07]" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
