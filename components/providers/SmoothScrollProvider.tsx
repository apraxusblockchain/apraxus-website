'use client';

import React, {
  useEffect,
  createContext,
  useContext,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

interface ScrollContextType {
  scrollProgress: number;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollProgress: 0,
});

export const useScrollProgress = () => useContext(ScrollContext);

export const SmoothScrollProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    /*
     * The whitepaper is a long-form technical document.
     * Use native browser scrolling there so the full document
     * remains accessible and predictable.
     */
    if (pathname === '/whitepaper') {
      document.documentElement.style.scrollBehavior = 'smooth';

      const handleScroll = () => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;

        if (total > 0) {
          setScrollProgress(
            Math.min(Math.max(window.scrollY / total, 0), 1),
          );
        }
      };

      window.addEventListener('scroll', handleScroll, {
        passive: true,
      });

      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.documentElement.style.scrollBehavior = '';
      };
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      const handleScroll = () => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;

        if (total > 0) {
          setScrollProgress(
            Math.min(Math.max(window.scrollY / total, 0), 1),
          );
        }
      };

      window.addEventListener('scroll', handleScroll, {
        passive: true,
      });

      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', (e: any) => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;

      if (total > 0) {
        const progress = Math.min(
          Math.max(e.scroll / total, 0),
          1,
        );

        setScrollProgress(progress);
      }
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);

  return (
    <ScrollContext.Provider value={{ scrollProgress }}>
      {children}
    </ScrollContext.Provider>
  );
};
