'use client';

import { useImageUrl } from '@/hooks/useImageStore';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ManagedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  slotId: string;
  defaultSrc: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};

export function ManagedImage({
  slotId,
  defaultSrc,
  alt,
  className,
  style,
  fill,
  priority,
  unoptimized,
  ...rest
}: ManagedImageProps) {
  const src = useImageUrl(slotId, defaultSrc);
  const [prevSrc, setPrevSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset isLoaded when src changes to trigger clean fade-in
  // Doing this during render is the recommended React pattern to avoid cascading renders
  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsLoaded(false);
  }

  // Determine wrapper styling based on `fill` to perfectly mimic Next.js <Image fill />
  const wrapperClass = fill ? "absolute inset-0" : "relative w-full h-full";

  if (!src) {
    return (
      <div 
        className={cn(wrapperClass, "bg-charcoal/10 overflow-hidden", className)} 
        style={style} 
      />
    );
  }

  return (
    <div className={cn(wrapperClass, "bg-charcoal/10 overflow-hidden")}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        ref={(img) => {
          if (img && img.complete) setIsLoaded(true);
        }}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-sm",
          fill ? "absolute inset-0 w-full h-full object-cover" : "w-full h-full object-cover",
          className
        )}
        style={{
          ...style,
          opacity: isLoaded ? undefined : 0,
        }}
        {...rest}
      />
    </div>
  );
}



