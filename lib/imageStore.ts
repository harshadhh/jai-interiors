/**
 * Jay Interiors — Client-side Image Store
 * Persists Cloudinary URLs to localStorage and synchronizes with Firebase Realtime Database (if configured).
 * Falls back to the default (picsum) URL if no override is set.
 */

const STORAGE_KEY = 'jay_interiors_images';
const DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

export interface ImageOverrides {
  [slotId: string]: string;
}

/** Read overrides from localStorage (local cache) */
export function getAllOverrides(): ImageOverrides {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Get a single image URL — returns the override or the default URL */
export function getImage(slotId: string, defaultUrl: string): string {
  const overrides = getAllOverrides();
  return overrides[slotId] || defaultUrl;
}

/** Persist a Cloudinary URL for a slot and sync with remote database */
export function setImage(slotId: string, url: string): void {
  if (typeof window === 'undefined') return;
  try {
    const overrides = getAllOverrides();
    overrides[slotId] = url;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    
    // Dispatch event so all ManagedImage components update reactively on this page
    window.dispatchEvent(new CustomEvent('jay-image-update', { detail: { slotId, url } }));

    // Sync to Firebase if configured
    if (DB_URL) {
      const cleanDbUrl = DB_URL.endsWith('/') ? DB_URL.slice(0, -1) : DB_URL;
      fetch(`${cleanDbUrl}/image_overrides/${slotId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(url),
      }).catch((err) => console.error('Failed to sync image override to Firebase:', err));
    }
  } catch {
    console.error('Failed to save image override to localStorage');
  }
}

/** Remove a single slot override (reset to default) */
export function resetImage(slotId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const overrides = getAllOverrides();
    delete overrides[slotId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    
    window.dispatchEvent(new CustomEvent('jay-image-update', { detail: { slotId, url: null } }));

    // Delete from Firebase if configured
    if (DB_URL) {
      const cleanDbUrl = DB_URL.endsWith('/') ? DB_URL.slice(0, -1) : DB_URL;
      fetch(`${cleanDbUrl}/image_overrides/${slotId}.json`, {
        method: 'DELETE',
      }).catch((err) => console.error('Failed to delete image override from Firebase:', err));
    }
  } catch {
    console.error('Failed to reset image override');
  }
}

/** Clear ALL overrides */
export function resetAllImages(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('jay-image-update', { detail: { slotId: '*', url: null } }));

  // Clear overrides in Firebase if configured
  if (DB_URL) {
    const cleanDbUrl = DB_URL.endsWith('/') ? DB_URL.slice(0, -1) : DB_URL;
    fetch(`${cleanDbUrl}/image_overrides.json`, {
      method: 'DELETE',
    }).catch((err) => console.error('Failed to clear overrides in Firebase:', err));
  }
}

// ─── INITIAL SYNC FROM DATABASE ──────────────────────────────────────────────
if (typeof window !== 'undefined' && DB_URL) {
  const cleanDbUrl = DB_URL.endsWith('/') ? DB_URL.slice(0, -1) : DB_URL;
  fetch(`${cleanDbUrl}/image_overrides.json`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Failed to fetch remote overrides');
    })
    .then((data) => {
      if (data && typeof data === 'object') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Notify all listeners that the store is hydrated
        window.dispatchEvent(new CustomEvent('jay-image-update', { detail: { slotId: '*', url: null } }));
      }
    })
    .catch((err) => console.warn('Could not sync remote image overrides:', err));
}

