'use client';

/**
 * ManagedImage — Drop-in replacement for Next.js <Image>
 * Reads the current URL from the localStorage image store (with reactive updates).
 * Falls back to `defaultSrc` if no Cloudinary override is set.
 */

import Image, { ImageProps } from 'next/image';
import { useImageUrl } from '@/hooks/useImageStore';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ManagedImageProps = Omit<ImageProps, 'src'> & {
  slotId: string;
  defaultSrc: string;
};

export function ManagedImage({ slotId, defaultSrc, alt, className, ...rest }: ManagedImageProps) {
  const src = useImageUrl(slotId, defaultSrc);
  const [isLoaded, setIsLoaded] = useState(false);

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
        {...rest}
      />
    </div>
  );
}

