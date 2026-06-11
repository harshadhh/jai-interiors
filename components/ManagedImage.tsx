'use client';

import Image, { ImageProps } from 'next/image';
import { useImageUrl } from '@/hooks/useImageStore';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ManagedImageProps = Omit<ImageProps, 'src'> & {
  slotId: string;
  defaultSrc: string;
};

export function ManagedImage({ slotId, defaultSrc, alt, className, style, ...rest }: ManagedImageProps) {
  const src = useImageUrl(slotId, defaultSrc);
  const [prevSrc, setPrevSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Adjust state during render if src changes to avoid effect warnings and layout flash
  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoaded(false);
  }


  return (
    <div className="relative w-full h-full bg-charcoal/10 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm",
          className
        )}
        style={{
          opacity: isLoaded ? undefined : 0,
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}


