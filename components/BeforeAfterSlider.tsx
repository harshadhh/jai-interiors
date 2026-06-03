'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ManagedImage } from '@/components/ManagedImage';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden select-none cursor-ew-resize group"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0">
        <ManagedImage slotId="before_after_before" defaultSrc={beforeImage} alt="Before" fill className="object-cover" unoptimized />
        <div className="absolute top-4 left-4 bg-charcoal/80 text-alabaster px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm">
          Before
        </div>
      </div>

      {/* After Image (Foreground/Clipped) */}
      <div 
        className="absolute inset-0 border-r border-brass shadow-[2px_0_10px_rgba(0,0,0,0.3)]"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <ManagedImage slotId="before_after_after" defaultSrc={afterImage} alt="After" fill className="object-cover" unoptimized />
        <div className="absolute top-4 right-4 bg-brass/90 text-charcoal px-3 py-1 text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm"
             style={{ right: `calc(${100 - sliderPosition}% + 1rem)` }}>
          After
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-brass cursor-ew-resize transition-all duration-100 ease-out flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-8 h-8 bg-charcoal rounded-full border-2 border-brass flex items-center justify-center shadow-lg transform -translate-x-1/2 group-hover:scale-110 transition-transform">
          <span className="text-brass text-xs opacity-70">↔</span>
        </div>
      </div>
    </div>
  );
}
