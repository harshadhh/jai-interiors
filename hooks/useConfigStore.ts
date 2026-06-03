/**
 * Jay Interiors — useConfigStore Hooks
 * Reactively retrieves general configuration settings from the local/remote stores.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getConfig, getAllConfigs } from '@/lib/configStore';

export function useConfigSetting(key: string, defaultValue: string): string {
  const [val, setVal] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getConfig(key, defaultValue);
    }
    return defaultValue;
  });

  const handleUpdate = useCallback(
    (e: Event) => {
      const detail = (e as CustomEvent).detail as { key: string; value: string | null };
      if (detail.key === key || detail.key === '*') {
        setVal(getConfig(key, defaultValue));
      }
    },
    [key, defaultValue]
  );

  useEffect(() => {
    // Sync on mount
    setVal(getConfig(key, defaultValue));

    window.addEventListener('jay-config-update', handleUpdate);
    return () => window.removeEventListener('jay-config-update', handleUpdate);
  }, [key, defaultValue, handleUpdate]);

  return val;
}

export function useAllConfigs() {
  const [configs, setConfigs] = useState<Record<string, string>>({});

  useEffect(() => {
    setConfigs(getAllConfigs());

    const handleUpdate = () => {
      setConfigs(getAllConfigs());
    };

    window.addEventListener('jay-config-update', handleUpdate);
    return () => window.removeEventListener('jay-config-update', handleUpdate);
  }, []);

  return configs;
}
