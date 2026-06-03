/**
 * Jay Interiors — Cloudinary Upload Helper
 * Uses the Cloudinary unsigned upload API directly via fetch.
 * No SDK required — works perfectly with Next.js static export.
 */

import { getConfig } from './configStore';

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Upload a file to Cloudinary using an unsigned preset.
 * @param file - The File object to upload
 * @param onProgress - Optional callback for upload progress (0–100)
 * @returns CloudinaryUploadResult with the secure_url
 */
export async function uploadToCloudinary(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<CloudinaryUploadResult> {
  const envCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const envUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // 1. Get dynamic user-entered credentials from the Admin Panel configStore
  const dynamicCloudName = getConfig('cloudinary_cloud_name', '');
  const dynamicUploadPreset = getConfig('cloudinary_upload_preset', '');

  // 2. Resolve final Cloud Name (Dynamic UI > Environment > Fallback)
  let cloudName = '';
  if (dynamicCloudName) {
    cloudName = dynamicCloudName;
  } else if (envCloudName && envCloudName !== 'YOUR_CLOUD_NAME_HERE') {
    cloudName = envCloudName;
  } else {
    cloudName = 'doy3h1jvx';
  }

  // 3. Resolve final Upload Preset
  let uploadPreset = '';
  if (dynamicUploadPreset) {
    uploadPreset = dynamicUploadPreset;
  } else if (envUploadPreset && envUploadPreset !== 'jay_interiors_upload') {
    uploadPreset = envUploadPreset;
  } else {
    uploadPreset = 'jay_interiors';
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'jay-interiors');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress({
          loaded: e.loaded,
          total: e.total,
          percentage: Math.round((e.loaded / e.total) * 100),
        });
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const result = JSON.parse(xhr.responseText) as CloudinaryUploadResult;
          resolve(result);
        } catch {
          reject(new Error('Invalid response from Cloudinary'));
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err?.error?.message || `Upload failed: HTTP ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed: HTTP ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload. Check your internet connection.'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload was aborted.'));
    });

    xhr.open('POST', url);
    xhr.send(formData);
  });
}

/** Validate a file before uploading */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
  const maxSizeMB = 20;

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, WebP, and AVIF images are allowed.' };
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `File size must be under ${maxSizeMB}MB.` };
  }

  return { valid: true };
}
