'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import { Cursor } from '@/components/Cursor';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
      // direction: 'vertical',
      // gestureDirection: 'vertical',
      // smooth: true,
      // mouseMultiplier: 1,
      // smoothTouch: false,
      // touchMultiplier: 2,
      // infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
