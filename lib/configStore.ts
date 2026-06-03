/**
 * Jay Interiors — Client-side Config Store
 * Persists basic text configurations (like Google ratings, contact numbers, address, hours)
 * to localStorage and synchronizes with Firebase Realtime Database (if configured).
 */

const STORAGE_KEY = 'jay_interiors_config';
const DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

export interface ConfigSettings {
  [key: string]: string;
}

/** Read all configs from localStorage (local cache) */
export function getAllConfigs(): ConfigSettings {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Get a single config value — returns the override or the default value */
export function getConfig(key: string, defaultValue: string): string {
  const configs = getAllConfigs();
  return configs[key] !== undefined ? configs[key] : defaultValue;
}

/** Persist a config value and sync with remote database */
export function setConfig(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    const configs = getAllConfigs();
    configs[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    
    // Dispatch local reactive event
    window.dispatchEvent(new CustomEvent('jay-config-update', { detail: { key, value } }));

    // Sync to Firebase if configured
    if (DB_URL) {
      const cleanDbUrl = DB_URL.endsWith('/') ? DB_URL.slice(0, -1) : DB_URL;
      fetch(`${cleanDbUrl}/config_settings/${key}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      }).catch((err) => console.error('Failed to sync config setting to Firebase:', err));
    }
  } catch {
    console.error('Failed to save config setting to localStorage');
  }
}

// ─── INITIAL SYNC FROM DATABASE ──────────────────────────────────────────────
if (typeof window !== 'undefined' && DB_URL) {
  const cleanDbUrl = DB_URL.endsWith('/') ? DB_URL.slice(0, -1) : DB_URL;
  fetch(`${cleanDbUrl}/config_settings.json`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Failed to fetch remote config settings');
    })
    .then((data) => {
      if (data && typeof data === 'object') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Notify all listeners that the store is hydrated
        window.dispatchEvent(new CustomEvent('jay-config-update', { detail: { key: '*', value: null } }));
      }
    })
    .catch((err) => console.warn('Could not sync remote config settings:', err));
}
