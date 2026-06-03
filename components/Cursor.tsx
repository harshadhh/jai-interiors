'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth mouse follow
  const springOptions = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springOptions);
  const smoothY = useSpring(cursorY, springOptions);

  useEffect(() => {
    // Check if it is a touch device or small screen
    const checkDevice = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobileDevice(isTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('magnetic-target')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobileDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          opacity: isHovered ? 0.8 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
      />
      {/* Soft glow behind the cursor */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 -ml-32 -mt-32 rounded-full pointer-events-none z-[9998] opacity-30 blur-3xl bg-brass"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />
    </>
  );
}
