/**
 * Jay Interiors — useImageStore Hook
 * Reactively returns the current image URL for a given slot.
 * Listens to 'jay-image-update' events to re-render when an admin updates an image.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getImage, getAllOverrides } from '@/lib/imageStore';

export function useImageUrl(slotId: string, defaultUrl: string): string {
  const [url, setUrl] = useState<string>(() => {
    // On initial render, try to read from localStorage
    if (typeof window !== 'undefined') {
      return getImage(slotId, defaultUrl);
    }
    return defaultUrl;
  });

  const handleUpdate = useCallback(
    (e: Event) => {
      const detail = (e as CustomEvent).detail as { slotId: string; url: string | null };
      if (detail.slotId === slotId || detail.slotId === '*') {
        setUrl(detail.url || defaultUrl);
      }
    },
    [slotId, defaultUrl]
  );

  useEffect(() => {
    // Sync on mount (in case localStorage changed since SSR/initial render)
    setUrl(getImage(slotId, defaultUrl));

    window.addEventListener('jay-image-update', handleUpdate);
    return () => window.removeEventListener('jay-image-update', handleUpdate);
  }, [slotId, defaultUrl, handleUpdate]);

  return url;
}

/** Returns a map of all current overrides — useful for the admin panel */
export function useAllImageOverrides() {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    setOverrides(getAllOverrides());

    const handleUpdate = () => {
      setOverrides(getAllOverrides());
    };

    window.addEventListener('jay-image-update', handleUpdate);
    return () => window.removeEventListener('jay-image-update', handleUpdate);
  }, []);

  return overrides;
}
