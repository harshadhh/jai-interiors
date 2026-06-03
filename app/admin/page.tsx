'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { uploadToCloudinary, validateImageFile, type UploadProgress } from '@/lib/cloudinary';
import { setImage, resetImage, getImage, resetAllImages } from '@/lib/imageStore';
import { getConfig, setConfig } from '@/lib/configStore';

// ─── ALL IMAGE SLOTS ACROSS THE SITE ──────────────────────────────────────────

const IMAGE_SLOTS = {
  home: {
    label: 'Home Page',
    icon: '🏠',
    slots: [
      { id: 'hero_bg', label: 'Hero Background', defaultSrc: 'https://picsum.photos/seed/hero-luxury/1920/1080', section: 'Hero Section' },
      { id: 'featured_1', label: 'Featured Project 1 — The Penthouse', defaultSrc: 'https://picsum.photos/seed/penth1/900/1200', section: 'The Vault (Featured Work)' },
      { id: 'featured_2', label: 'Featured Project 2 — Villa 74', defaultSrc: 'https://picsum.photos/seed/villa74x/900/1200', section: 'The Vault (Featured Work)' },
      { id: 'featured_3', label: 'Featured Project 3 — Glass Pavilion', defaultSrc: 'https://picsum.photos/seed/glasspav1/900/1200', section: 'The Vault (Featured Work)' },
      { id: 'before_after_before', label: 'Before/After — Before Image', defaultSrc: 'https://picsum.photos/seed/before-kitchen/1200/800', section: 'Before & After Slider' },
      { id: 'before_after_after', label: 'Before/After — After Image', defaultSrc: 'https://picsum.photos/seed/after-kitchen/1200/800', section: 'Before & After Slider' },
      { id: 'renovation_banner', label: 'Renovation Banner Background', defaultSrc: 'https://picsum.photos/seed/renovation-banner/900/500', section: 'Renovation Banner' },
    ],
  },
  portfolio: {
    label: 'Portfolio Page',
    icon: '🖼️',
    slots: [
      { id: 'portfolio_1', label: 'The Penthouse', defaultSrc: 'https://picsum.photos/seed/penth2/800/1000', section: 'Project Cards' },
      { id: 'portfolio_2', label: 'Villa 74', defaultSrc: 'https://picsum.photos/seed/villa74b/800/800', section: 'Project Cards' },
      { id: 'portfolio_3', label: 'Noir Studio Kitchen', defaultSrc: 'https://picsum.photos/seed/noirkitchen/1000/700', section: 'Project Cards' },
      { id: 'portfolio_4', label: 'Glass Pavilion', defaultSrc: 'https://picsum.photos/seed/pavilion2/600/900', section: 'Project Cards' },
      { id: 'portfolio_5', label: 'The Silk Suite', defaultSrc: 'https://picsum.photos/seed/silksuite/800/1000', section: 'Project Cards' },
      { id: 'portfolio_6', label: 'Matte Kitchen', defaultSrc: 'https://picsum.photos/seed/mattekitch/800/700', section: 'Project Cards' },
      { id: 'portfolio_7', label: 'The Marble Loft', defaultSrc: 'https://picsum.photos/seed/marbleloft/900/1100', section: 'Project Cards' },
      { id: 'portfolio_8', label: 'Studio Black', defaultSrc: 'https://picsum.photos/seed/studioblk/800/700', section: 'Project Cards' },
    ],
  },
  services: {
    label: 'Services Page',
    icon: '⚙️',
    slots: [
      // ── SERVICE BACKGROUND IMAGES (shown at low opacity when a service is active) ──
      { id: 'service_bg_01', label: 'Modular Kitchen — Page Background', defaultSrc: 'https://picsum.photos/seed/modular-kitchen/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_02', label: 'Kitchen Accessories — Page Background', defaultSrc: 'https://picsum.photos/seed/kitchen-acc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_03', label: 'Bedroom — Page Background', defaultSrc: 'https://picsum.photos/seed/bedroom-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_04', label: 'Living Room — Page Background', defaultSrc: 'https://picsum.photos/seed/living-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_05', label: 'Entrance Design — Page Background', defaultSrc: 'https://picsum.photos/seed/entrance-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_06', label: 'Balcony — Page Background', defaultSrc: 'https://picsum.photos/seed/balcony-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_07', label: 'Wallpapers — Page Background', defaultSrc: 'https://picsum.photos/seed/wallpaper-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_08', label: 'Tiles — Page Background', defaultSrc: 'https://picsum.photos/seed/tiles-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_09', label: 'Lighting Design — Page Background', defaultSrc: 'https://picsum.photos/seed/light-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_10', label: 'Civil Work — Page Background', defaultSrc: 'https://picsum.photos/seed/civil-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_11', label: 'Commercial Spaces — Page Background', defaultSrc: 'https://picsum.photos/seed/commercial-svc/1920/1080', section: '🖼 Service Page Backgrounds' },
      { id: 'service_studio_cta', label: 'Studio CTA Background', defaultSrc: 'https://picsum.photos/seed/studiobaner/800/800', section: '🖼 Service Page Backgrounds' },
      // ── MODULAR KITCHEN SUB-ITEMS ──
      { id: 'service_item_01_0', label: 'Modular Kitchen — Tandems', defaultSrc: 'https://picsum.photos/seed/jay-01-0/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_1', label: 'Modular Kitchen — SS Stainless Trollies', defaultSrc: 'https://picsum.photos/seed/jay-01-1/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_2', label: 'Modular Kitchen — Wicker Baskets', defaultSrc: 'https://picsum.photos/seed/jay-01-2/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_3', label: 'Modular Kitchen — Pantry Unit', defaultSrc: 'https://picsum.photos/seed/jay-01-3/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_4', label: 'Modular Kitchen — Rolling Shutter', defaultSrc: 'https://picsum.photos/seed/jay-01-4/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_5', label: 'Modular Kitchen — Tall Unit', defaultSrc: 'https://picsum.photos/seed/jay-01-5/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_6', label: 'Modular Kitchen — Crockery Cabinet with Glass', defaultSrc: 'https://picsum.photos/seed/jay-01-6/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_7', label: 'Modular Kitchen — Loft', defaultSrc: 'https://picsum.photos/seed/jay-01-7/600/450', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_8', label: 'Modular Kitchen — Platform Tops', defaultSrc: 'https://picsum.photos/seed/jay-01-8/600/450', section: '🍳 Modular Kitchen Items' },
      // ── KITCHEN ACCESSORIES SUB-ITEMS ──
      { id: 'service_item_02_0', label: 'Kitchen Accessories — Handles', defaultSrc: 'https://picsum.photos/seed/jay-02-0/600/450', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_1', label: 'Kitchen Accessories — Magic Corner', defaultSrc: 'https://picsum.photos/seed/jay-02-1/600/450', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_2', label: 'Kitchen Accessories — Pantry Pull-Out Larder', defaultSrc: 'https://picsum.photos/seed/jay-02-2/600/450', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_3', label: 'Kitchen Accessories — Masala Pull-Out', defaultSrc: 'https://picsum.photos/seed/jay-02-3/600/450', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_4', label: 'Kitchen Accessories — DBR Pull-Down Basket Elevator', defaultSrc: 'https://picsum.photos/seed/jay-02-4/600/450', section: '🔧 Kitchen Accessories Items' },
      // ── BEDROOM SUB-ITEMS ──
      { id: 'service_item_03_0', label: 'Bedroom — Hydraulic Bed', defaultSrc: 'https://picsum.photos/seed/jay-03-0/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_1', label: 'Bedroom — Drawer Bed', defaultSrc: 'https://picsum.photos/seed/jay-03-1/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_2', label: 'Bedroom — Wall Mounted Bed', defaultSrc: 'https://picsum.photos/seed/jay-03-2/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_3', label: 'Bedroom — Side Tables', defaultSrc: 'https://picsum.photos/seed/jay-03-3/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_4', label: 'Bedroom — Foam Headboard', defaultSrc: 'https://picsum.photos/seed/jay-03-4/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_5', label: 'Bedroom — Wardrobe', defaultSrc: 'https://picsum.photos/seed/jay-03-5/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_6', label: 'Bedroom — Wall Décor', defaultSrc: 'https://picsum.photos/seed/jay-03-6/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_7', label: 'Bedroom — Study Table', defaultSrc: 'https://picsum.photos/seed/jay-03-7/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_8', label: 'Bedroom — Loft', defaultSrc: 'https://picsum.photos/seed/jay-03-8/600/450', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_9', label: 'Bedroom — Book Rack', defaultSrc: 'https://picsum.photos/seed/jay-03-9/600/450', section: '🛏 Bedroom Items' },
      // ── LIVING ROOM SUB-ITEMS ──
      { id: 'service_item_04_0', label: 'Living Room — TV Unit', defaultSrc: 'https://picsum.photos/seed/jay-04-0/600/450', section: '🛋 Living Room Items' },
      { id: 'service_item_04_1', label: 'Living Room — Mandir', defaultSrc: 'https://picsum.photos/seed/jay-04-1/600/450', section: '🛋 Living Room Items' },
      { id: 'service_item_04_2', label: 'Living Room — Sofa Set', defaultSrc: 'https://picsum.photos/seed/jay-04-2/600/450', section: '🛋 Living Room Items' },
      { id: 'service_item_04_3', label: 'Living Room — Back Wall Décor', defaultSrc: 'https://picsum.photos/seed/jay-04-3/600/450', section: '🛋 Living Room Items' },
      { id: 'service_item_04_4', label: 'Living Room — False Ceiling', defaultSrc: 'https://picsum.photos/seed/jay-04-4/600/450', section: '🛋 Living Room Items' },
      { id: 'service_item_04_5', label: 'Living Room — Partition', defaultSrc: 'https://picsum.photos/seed/jay-04-5/600/450', section: '🛋 Living Room Items' },
      { id: 'service_item_04_6', label: 'Living Room — Dining Table', defaultSrc: 'https://picsum.photos/seed/jay-04-6/600/450', section: '🛋 Living Room Items' },
      // ── ENTRANCE DESIGN SUB-ITEMS ──
      { id: 'service_item_05_0', label: 'Entrance — Wall Panelling', defaultSrc: 'https://picsum.photos/seed/jay-05-0/600/450', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_1', label: 'Entrance — Shoe Rack', defaultSrc: 'https://picsum.photos/seed/jay-05-1/600/450', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_2', label: 'Entrance — Safety Door with Digital Lock', defaultSrc: 'https://picsum.photos/seed/jay-05-2/600/450', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_3', label: 'Entrance — CNC Jali', defaultSrc: 'https://picsum.photos/seed/jay-05-3/600/450', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_4', label: 'Entrance — Name Plates', defaultSrc: 'https://picsum.photos/seed/jay-05-4/600/450', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_5', label: 'Entrance — Main Door', defaultSrc: 'https://picsum.photos/seed/jay-05-5/600/450', section: '🚪 Entrance Design Items' },
      // ── BALCONY SUB-ITEMS ──
      { id: 'service_item_06_0', label: 'Balcony — PVC Ceiling', defaultSrc: 'https://picsum.photos/seed/jay-06-0/600/450', section: '🌿 Balcony Items' },
      // ── WALLPAPERS SUB-ITEMS ──
      { id: 'service_item_07_0', label: 'Wallpapers — Custom Designed Wallpapers', defaultSrc: 'https://picsum.photos/seed/jay-07-0/600/450', section: '🎨 Wallpapers Items' },
      // ── TILES SUB-ITEMS ──
      { id: 'service_item_08_0', label: 'Tiles — Full Body Tiles', defaultSrc: 'https://picsum.photos/seed/jay-08-0/600/450', section: '🪨 Tiles Items' },
      { id: 'service_item_08_1', label: 'Tiles — Ceramic Tiles', defaultSrc: 'https://picsum.photos/seed/jay-08-1/600/450', section: '🪨 Tiles Items' },
      { id: 'service_item_08_2', label: 'Tiles — Marbles', defaultSrc: 'https://picsum.photos/seed/jay-08-2/600/450', section: '🪨 Tiles Items' },
      // ── LIGHTING DESIGN SUB-ITEMS ──
      { id: 'service_item_09_0', label: 'Lighting — Panel Lights', defaultSrc: 'https://picsum.photos/seed/jay-09-0/600/450', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_1', label: 'Lighting — Profile Lights', defaultSrc: 'https://picsum.photos/seed/jay-09-1/600/450', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_2', label: 'Lighting — Magnetic Lights', defaultSrc: 'https://picsum.photos/seed/jay-09-2/600/450', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_3', label: 'Lighting — Spot Lights', defaultSrc: 'https://picsum.photos/seed/jay-09-3/600/450', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_4', label: 'Lighting — Track Lights', defaultSrc: 'https://picsum.photos/seed/jay-09-4/600/450', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_5', label: 'Lighting — Cove Lights', defaultSrc: 'https://picsum.photos/seed/jay-09-5/600/450', section: '💡 Lighting Design Items' },
      // ── CIVIL WORK SUB-ITEMS ──
      { id: 'service_item_10_0', label: 'Civil Work — Painting', defaultSrc: 'https://picsum.photos/seed/jay-10-0/600/450', section: '🏗 Civil Work Items' },
      { id: 'service_item_10_1', label: 'Civil Work — Plumbing', defaultSrc: 'https://picsum.photos/seed/jay-10-1/600/450', section: '🏗 Civil Work Items' },
      // ── COMMERCIAL SPACES SUB-ITEMS ──
      { id: 'service_item_11_0', label: 'Commercial — Office Work', defaultSrc: 'https://picsum.photos/seed/jay-11-0/600/450', section: '🏢 Commercial Spaces Items' },
      { id: 'service_item_11_1', label: 'Commercial — Shop', defaultSrc: 'https://picsum.photos/seed/jay-11-1/600/450', section: '🏢 Commercial Spaces Items' },
      { id: 'service_item_11_2', label: 'Commercial — Mall', defaultSrc: 'https://picsum.photos/seed/jay-11-2/600/450', section: '🏢 Commercial Spaces Items' },
    ],
  },
  kitchen: {
    label: 'Kitchen Page',
    icon: '🍳',
    slots: [
      { id: 'kitchen_hero_mk', label: 'Modular Kitchen Hero', defaultSrc: 'https://picsum.photos/seed/kitchen-hero-mk/1920/1080', section: 'Hero Section' },
      { id: 'kitchen_finish_acrylic', label: 'Finish — Acrylic', defaultSrc: 'https://picsum.photos/seed/acrylic-finish/600/400', section: 'Finishes' },
      { id: 'kitchen_finish_laminate', label: 'Finish — Laminate', defaultSrc: 'https://picsum.photos/seed/laminate-finish/600/400', section: 'Finishes' },
      { id: 'kitchen_finish_pu', label: 'Finish — PU + Deco', defaultSrc: 'https://picsum.photos/seed/pu-finish/600/400', section: 'Finishes' },
    ],
  },
  about: {
    label: 'About Page',
    icon: '👥',
    slots: [
      { id: 'about_hero_founders', label: 'Hero — Founders Portrait', defaultSrc: 'https://picsum.photos/seed/founders-team/800/1000', section: 'Hero Section' },
      { id: 'about_dev_portrait', label: 'Dev — Founder Portrait', defaultSrc: 'https://picsum.photos/seed/dev-founder/900/700', section: 'Founders Section' },
      { id: 'about_suresh_portrait', label: 'Suresh — Founder Portrait', defaultSrc: 'https://picsum.photos/seed/suresh-founder/900/700', section: 'Founders Section' },
      { id: 'about_workshop', label: 'The Workshop / Factory', defaultSrc: 'https://picsum.photos/seed/workshop1/800/1000', section: 'Workshop Section' },
    ],
  },
};

// ─── TYPES ────────────────────────────────────────────────────────────────────

type TabKey = keyof typeof IMAGE_SLOTS;
type UploadState = 'idle' | 'uploading' | 'success' | 'error';

interface SlotState {
  uploadState: UploadState;
  progress: number;
  errorMessage: string;
  isDragging: boolean;
  currentUrl: string;
}

// ─── SINGLE IMAGE SLOT COMPONENT ──────────────────────────────────────────────

function ImageSlotCard({
  slotId,
  label,
  section,
  defaultSrc,
}: {
  slotId: string;
  label: string;
  section: string;
  defaultSrc: string;
}) {
  const [state, setState] = useState<SlotState>({
    uploadState: 'idle',
    progress: 0,
    errorMessage: '',
    isDragging: false,
    currentUrl: typeof window !== 'undefined' ? getImage(slotId, defaultSrc) : defaultSrc,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep in sync with external store updates
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.slotId === slotId || detail.slotId === '*') {
        setState((prev) => ({
          ...prev,
          currentUrl: detail.url || defaultSrc,
          uploadState: 'idle',
        }));
      }
    };
    window.addEventListener('jay-image-update', handler);
    return () => window.removeEventListener('jay-image-update', handler);
  }, [slotId, defaultSrc]);

  const processFile = useCallback(
    async (file: File) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setState((prev) => ({ ...prev, uploadState: 'error', errorMessage: validation.error! }));
        return;
      }

      setState((prev) => ({ ...prev, uploadState: 'uploading', progress: 0, errorMessage: '' }));

      try {
        const result = await uploadToCloudinary(file, (prog: UploadProgress) => {
          setState((prev) => ({ ...prev, progress: prog.percentage }));
        });

        setImage(slotId, result.secure_url);
        setState((prev) => ({
          ...prev,
          uploadState: 'success',
          progress: 100,
          currentUrl: result.secure_url,
        }));

        // Auto-clear success state after 4s
        setTimeout(() => {
          setState((prev) => (prev.uploadState === 'success' ? { ...prev, uploadState: 'idle' } : prev));
        }, 4000);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Upload failed.';
        setState((prev) => ({ ...prev, uploadState: 'error', errorMessage: msg }));
      }
    },
    [slotId]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setState((prev) => ({ ...prev, isDragging: false }));
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      // Reset input so same file can be re-uploaded
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [processFile]
  );

  const handleReset = () => {
    resetImage(slotId);
    setState((prev) => ({
      ...prev,
      currentUrl: defaultSrc,
      uploadState: 'idle',
      errorMessage: '',
    }));
  };

  const isOverridden = state.currentUrl !== defaultSrc;
  const isUploading = state.uploadState === 'uploading';

  return (
    <div className="admin-card">
      {/* Section Label */}
      <div className="admin-section-tag">{section}</div>

      {/* Slot Label */}
      <p className="admin-slot-label">{label}</p>
      <p className="admin-slot-id">{slotId}</p>

      {/* Current Image Preview */}
      <div className="admin-preview-wrap">
        <Image
          src={state.currentUrl}
          alt={label}
          fill
          className="admin-preview-img"
          unoptimized
          referrerPolicy="no-referrer"
        />
        {isOverridden && (
          <div className="admin-cloudinary-badge">
            <span>☁ Cloudinary</span>
          </div>
        )}
      </div>

      {/* Drag & Drop Zone */}
      <div
        className={`admin-dropzone ${state.isDragging ? 'admin-dropzone--dragging' : ''} ${isUploading ? 'admin-dropzone--uploading' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setState((p) => ({ ...p, isDragging: true })); }}
        onDragLeave={() => setState((p) => ({ ...p, isDragging: false }))}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={handleFileChange}
        />

        {isUploading ? (
          <div className="admin-upload-progress">
            <div className="admin-spinner" />
            <span className="admin-progress-text">Uploading… {state.progress}%</span>
            <div className="admin-progress-bar-bg">
              <div className="admin-progress-bar-fill" style={{ width: `${state.progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="admin-dropzone-content">
            <div className="admin-upload-icon">
              {state.isDragging ? '📂' : '☁️'}
            </div>
            <p className="admin-dropzone-title">
              {state.isDragging ? 'Drop to upload' : 'Drag & drop image here'}
            </p>
            <p className="admin-dropzone-subtitle">or click to browse · JPG, PNG, WebP · max 20MB</p>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {state.uploadState === 'success' && (
        <div className="admin-status admin-status--success">
          <span>✓</span> Image uploaded & saved to Cloudinary successfully!
        </div>
      )}
      {state.uploadState === 'error' && (
        <div className="admin-status admin-status--error">
          <span>✕</span> {state.errorMessage}
        </div>
      )}

      {/* Reset Button */}
      {isOverridden && (
        <button className="admin-reset-btn" onClick={handleReset}>
          ↺ Reset to Default
        </button>
      )}
    </div>
  );
}

// ─── SECURE PASSWORD SYSTEM ───────────────────────────────────────────────────
// The password is NEVER stored in plaintext anywhere in the bundle.
// Only the SHA-256 hash is embedded. Even reading minified JS reveals nothing.
//
// To change the password:
//   1. Run in browser console: crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword'))
//      .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
//   2. Replace CORRECT_HASH below with the output.
//
// Current password hash corresponds to: JayInt@2024#Secure!

const CORRECT_HASH =
  process.env.NEXT_PUBLIC_ADMIN_HASH ||
  'cb42a8999390f8e3d8a34e451496dd54f6bd5f3f91a0637335c5973a0b769fc2'; // SHA-256 of JayInt@2024#Secure!

const ADMIN_PASSWORD_KEY = 'jay_admin_authenticated';
const ATTEMPT_KEY = 'jay_admin_attempts';
const LOCKOUT_KEY = 'jay_admin_lockout';
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 60;

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ─── MAIN ADMIN PAGE ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(ADMIN_PASSWORD_KEY) === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const lockoutTs = localStorage.getItem(LOCKOUT_KEY);
      if (lockoutTs) {
        const ts = parseInt(lockoutTs, 10);
        if (Date.now() < ts) {
          return ts;
        } else {
          localStorage.removeItem(LOCKOUT_KEY);
          localStorage.removeItem(ATTEMPT_KEY);
        }
      }
    }
    return null;
  });
  const [attemptsLeft, setAttemptsLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const lockoutTs = localStorage.getItem(LOCKOUT_KEY);
      if (lockoutTs && Date.now() < parseInt(lockoutTs, 10)) {
        return 0;
      }
      const attempts = parseInt(localStorage.getItem(ATTEMPT_KEY) || '0', 10);
      return Math.max(0, MAX_ATTEMPTS - attempts);
    }
    return MAX_ATTEMPTS;
  });
  const [lockoutCountdown, setLockoutCountdown] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey | 'basic_settings'>('home');
  const [activePortfolioProject, setActivePortfolioProject] = useState<string>('covers');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [globalResetDone, setGlobalResetDone] = useState(false);
  const [activeSectionFilter, setActiveSectionFilter] = useState<string>('All');
  
  const [settings, setSettings] = useState({
    google_rating_value: '',
    google_rating_count: '',
    contact_phone: '',
    contact_whatsapp: '',
    contact_email: '',
    contact_address: '',
    studio_hours_weekdays: '',
    studio_hours_saturday: '',
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load basic configurations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setSettings({
          google_rating_value: getConfig('google_rating_value', '5.0'),
          google_rating_count: getConfig('google_rating_count', '80+'),
          contact_phone: getConfig('contact_phone', '+91 98765 43210'),
          contact_whatsapp: getConfig('contact_whatsapp', '919876543210'),
          contact_email: getConfig('contact_email', 'hello@jayinteriors.in'),
          contact_address: getConfig('contact_address', 'Baner, Pune — 411045'),
          studio_hours_weekdays: getConfig('studio_hours_weekdays', '10:00 – 18:00'),
          studio_hours_saturday: getConfig('studio_hours_saturday', '10:00 – 14:00'),
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(settings).forEach(([key, val]) => {
      setConfig(key, val);
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 4000);
  };

  // Countdown timer for lockout
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttemptsLeft(MAX_ATTEMPTS);
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPT_KEY);
        setLockoutCountdown(0);
      } else {
        setLockoutCountdown(remaining);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying || lockedUntil) return;

    setIsVerifying(true);
    setPasswordError('');

    // Artificial minimum delay (prevents timing attacks)
    const [hash] = await Promise.all([
      hashPassword(passwordInput),
      new Promise((r) => setTimeout(r, 600)),
    ]);

    if (hash === CORRECT_HASH) {
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, 'true');
      localStorage.removeItem(ATTEMPT_KEY);
      localStorage.removeItem(LOCKOUT_KEY);
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      const prevAttempts = parseInt(localStorage.getItem(ATTEMPT_KEY) || '0', 10);
      const newAttempts = prevAttempts + 1;
      localStorage.setItem(ATTEMPT_KEY, String(newAttempts));
      const remaining = MAX_ATTEMPTS - newAttempts;

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockTs = Date.now() + LOCKOUT_SECONDS * 1000;
        localStorage.setItem(LOCKOUT_KEY, String(lockTs));
        setLockedUntil(lockTs);
        setAttemptsLeft(0);
        setPasswordError(`Too many failed attempts. Locked for ${LOCKOUT_SECONDS} seconds.`);
      } else {
        setAttemptsLeft(remaining);
        setPasswordError(`Incorrect password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`);
      }
    }
    setPasswordInput('');
    setIsVerifying(false);
  };

  const handleGlobalReset = () => {
    resetAllImages();
    setShowResetConfirm(false);
    setGlobalResetDone(true);
    setTimeout(() => setGlobalResetDone(false), 4000);
  };

  // Check if Cloudinary is configured
  const cloudinaryConfigured =
    !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    !!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Check if Firebase Database is configured
  const databaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  // ── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    const isLocked = !!lockedUntil;
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <span className="admin-login-brand">JAY INTERIORS</span>
            <span className="admin-login-tagline">Admin Portal</span>
          </div>
          <form onSubmit={handleLogin} className="admin-login-form">
            <label className="admin-form-label">Access Password</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }}
              placeholder={isLocked ? `Locked — wait ${lockoutCountdown}s` : 'Enter password'}
              className="admin-form-input"
              autoFocus
              disabled={isLocked || isVerifying}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {passwordError && <p className="admin-form-error">{passwordError}</p>}
            {isLocked && (
              <div className="admin-lockout-bar">
                <div
                  className="admin-lockout-fill"
                  style={{ width: `${(lockoutCountdown / LOCKOUT_SECONDS) * 100}%` }}
                />
                <span className="admin-lockout-text">Locked · {lockoutCountdown}s remaining</span>
              </div>
            )}
            <button
              type="submit"
              className="admin-form-btn"
              disabled={isLocked || isVerifying}
            >
              {isVerifying ? 'Verifying…' : isLocked ? `Wait ${lockoutCountdown}s` : 'Unlock Admin Panel →'}
            </button>
            {!isLocked && attemptsLeft < MAX_ATTEMPTS && (
              <p className="admin-attempts-left">{attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  const currentPage = activeTab !== 'basic_settings' ? IMAGE_SLOTS[activeTab] : null;
  const uniqueSections = currentPage ? Array.from(new Set(currentPage.slots.map(s => s.section))) : [];
  const filteredSlots = currentPage 
    ? (activeSectionFilter === 'All' 
        ? currentPage.slots 
        : currentPage.slots.filter(s => s.section === activeSectionFilter))
    : [];

  // ── MAIN ADMIN UI ─────────────────────────────────────────────────────────
  return (
    <div className="admin-root">

      {/* ── TOPBAR ── */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="admin-topbar-brand">
            <span className="admin-topbar-logo">JI</span>
            <div>
              <p className="admin-topbar-title">Jay Interiors</p>
              <p className="admin-topbar-subtitle">Image Manager</p>
            </div>
          </div>
          <div className="admin-topbar-actions">
            <a href="/" target="_blank" className="admin-topbar-btn admin-topbar-btn--ghost">
              View Site ↗
            </a>
            <button
              className="admin-topbar-btn admin-topbar-btn--danger"
              onClick={() => setShowResetConfirm(true)}
            >
              Reset All Images
            </button>
            <button
              className="admin-topbar-btn admin-topbar-btn--ghost"
              onClick={() => { sessionStorage.removeItem(ADMIN_PASSWORD_KEY); setIsAuthenticated(false); }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ── CLOUDINARY CONFIG WARNING ── */}
      {!cloudinaryConfigured && (
        <div className="admin-config-warning">
          <div className="admin-config-warning-inner">
            <span className="admin-warning-icon">⚠️</span>
            <div>
              <p className="admin-warning-title">Cloudinary Not Configured</p>
              <p className="admin-warning-desc">
                Add the following to your <code>.env.local</code> file, then restart the dev server:
              </p>
              <pre className="admin-warning-code">{`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=jay_interiors_upload
NEXT_PUBLIC_ADMIN_PASSWORD=jay2024admin`}</pre>
              <p className="admin-warning-desc admin-warning-steps">
                <strong>Steps:</strong> 1. Go to <a href="https://cloudinary.com" target="_blank" className="admin-link">cloudinary.com</a> →
                Login → Settings → Upload → Upload Presets → Add Upload Preset →
                Set Signing Mode to <strong>Unsigned</strong> → Save → Copy the preset name above.
              </p>
            </div>
          </div>
        </div>
      )}

      {!databaseConfigured && (
        <div className="admin-config-warning" style={{ backgroundColor: 'rgba(200, 169, 126, 0.1)', borderColor: 'rgba(200, 169, 126, 0.3)' }}>
          <div className="admin-config-warning-inner">
            <span className="admin-warning-icon">☁️</span>
            <div>
              <p className="admin-warning-title" style={{ color: '#C8A97E' }}>Firebase Database Sync Inactive</p>
              <p className="admin-warning-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Image updates will only save locally to your browser storage. To enable global instant sync across all users:
              </p>
              <p className="admin-warning-desc admin-warning-steps" style={{ color: 'rgba(255,255,255,0.6)' }}>
                1. Go to your Firebase Console and create a <strong>Realtime Database</strong>. <br />
                2. Copy the database URL (e.g., <code>https://your-project.firebaseio.com/</code>). <br />
                3. Add it to <code>.env.local</code>:
              </p>
              <pre className="admin-warning-code" style={{ borderColor: 'rgba(200, 169, 126, 0.2)' }}>{`NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com/`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* ── GLOBAL RESET CONFIRM ── */}
      {showResetConfirm && (
        <div className="admin-modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-title">Reset All Images?</h3>
            <p className="admin-modal-desc">
              This will remove ALL Cloudinary overrides and revert every image on the site back to the default placeholder. This cannot be undone.
            </p>
            <div className="admin-modal-actions">
              <button className="admin-modal-btn admin-modal-btn--cancel" onClick={() => setShowResetConfirm(false)}>Cancel</button>
              <button className="admin-modal-btn admin-modal-btn--danger" onClick={handleGlobalReset}>Yes, Reset Everything</button>
            </div>
          </div>
        </div>
      )}

      {/* ── GLOBAL RESET DONE ── */}
      {globalResetDone && (
        <div className="admin-toast">
          ✓ All images have been reset to defaults.
        </div>
      )}

      {/* ── BODY ── */}
      <div className="admin-body">

        {/* ── SIDEBAR TABS ── */}
        <aside className="admin-sidebar">
          <p className="admin-sidebar-heading">Pages</p>
          {(Object.keys(IMAGE_SLOTS) as TabKey[]).map((key) => {
            const page = IMAGE_SLOTS[key];
            return (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setActiveSectionFilter('All'); }}
                className={`admin-sidebar-tab ${activeTab === key ? 'admin-sidebar-tab--active' : ''}`}
              >
                <span className="admin-tab-icon">{page.icon}</span>
                <span className="admin-tab-label">{page.label}</span>
                <span className="admin-tab-count">{page.slots.length}</span>
              </button>
            );
          })}

          <button
            onClick={() => setActiveTab('basic_settings')}
            className={`admin-sidebar-tab ${activeTab === 'basic_settings' ? 'admin-sidebar-tab--active' : ''}`}
            style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px' }}
          >
            <span className="admin-tab-icon">⚙️</span>
            <span className="admin-tab-label">Basic Edits</span>
          </button>

          {/* Slot stats */}
          <div className="admin-sidebar-stats">
            <p className="admin-stats-label">Total Image Slots</p>
            <p className="admin-stats-value">
              {Object.values(IMAGE_SLOTS).reduce((sum, p) => sum + p.slots.length, 0)}
            </p>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="admin-main">
          {activeTab === 'basic_settings' ? (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    <span>⚙️</span>
                    Basic Edits
                  </h1>
                  <p className="admin-page-subtitle">
                    Update text parameters across the site like Google Ratings, contact phone, email, and studio hours.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="admin-settings-form" style={{ maxWidth: '600px', marginTop: '30px' }}>
                <div className="admin-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p className="admin-sidebar-heading" style={{ margin: 0, color: '#C8A97E', fontSize: '14px', letterSpacing: '0.1em' }}>Website Parameters</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Google Rating Value</label>
                      <input 
                        type="text" 
                        value={settings.google_rating_value}
                        onChange={(e) => setSettings(prev => ({ ...prev, google_rating_value: e.target.value }))}
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Google Reviews Count</label>
                      <input 
                        type="text" 
                        value={settings.google_rating_count}
                        onChange={(e) => setSettings(prev => ({ ...prev, google_rating_count: e.target.value }))}
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Contact Phone Number</label>
                    <input 
                      type="text" 
                      value={settings.contact_phone}
                      onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                      className="admin-form-input" 
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>WhatsApp Number (digits only, e.g. 919876543210)</label>
                    <input 
                      type="text" 
                      value={settings.contact_whatsapp}
                      onChange={(e) => setSettings(prev => ({ ...prev, contact_whatsapp: e.target.value }))}
                      className="admin-form-input" 
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={settings.contact_email}
                      onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                      className="admin-form-input" 
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Studio Location Address</label>
                    <input 
                      type="text" 
                      value={settings.contact_address}
                      onChange={(e) => setSettings(prev => ({ ...prev, contact_address: e.target.value }))}
                      className="admin-form-input" 
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Studio Hours (Weekdays)</label>
                      <input 
                        type="text" 
                        value={settings.studio_hours_weekdays}
                        onChange={(e) => setSettings(prev => ({ ...prev, studio_hours_weekdays: e.target.value }))}
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Studio Hours (Saturdays)</label>
                      <input 
                        type="text" 
                        value={settings.studio_hours_saturday}
                        onChange={(e) => setSettings(prev => ({ ...prev, studio_hours_saturday: e.target.value }))}
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="admin-form-btn" 
                    style={{ background: '#C8A97E', color: '#1A1A1A', fontWeight: 'bold', border: 'none', padding: '14px', cursor: 'pointer', marginTop: '10px' }}
                  >
                    Save Basic Settings
                  </button>

                  {settingsSaved && (
                    <p style={{ color: '#25D366', fontSize: '12px', margin: '5px 0 0 0', fontWeight: 'bold' }}>✓ Settings saved successfully & synced!</p>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">
                    <span>{currentPage?.icon}</span>
                    {currentPage?.label}
                  </h1>
                  <p className="admin-page-subtitle">
                    {activeTab === 'portfolio' && activePortfolioProject !== 'covers'
                      ? `5 image slots — drag & drop or click to upload project gallery slideshow images.`
                      : `${currentPage?.slots.length || 0} image slot${currentPage?.slots.length !== 1 ? 's' : ''} — drag & drop or click to upload.`}
                  </p>
                </div>
              </div>

              {activeTab === 'portfolio' && (
                <div className="admin-section-filters" style={{ marginBottom: '25px', display: 'flex', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>
                  <button
                    className={`admin-filter-btn ${activePortfolioProject === 'covers' ? 'active' : ''}`}
                    onClick={() => setActivePortfolioProject('covers')}
                  >
                    Project Covers
                  </button>
                  {['the-penthouse', 'villa-74', 'noir-studio-kitchen', 'glass-pavilion', 'the-silk-suite', 'matte-kitchen', 'the-marble-loft', 'studio-black'].map((slug) => (
                    <button
                      key={slug}
                      className={`admin-filter-btn ${activePortfolioProject === slug ? 'active' : ''}`}
                      onClick={() => setActivePortfolioProject(slug)}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {slug.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              )}

              {currentPage && activeTab !== 'portfolio' && uniqueSections.length > 1 && (
                <div className="admin-section-filters">
                  <button 
                    className={`admin-filter-btn ${activeSectionFilter === 'All' ? 'active' : ''}`}
                    onClick={() => setActiveSectionFilter('All')}
                  >
                    All ({currentPage.slots.length})
                  </button>
                  {uniqueSections.map(section => {
                    const count = currentPage.slots.filter(s => s.section === section).length;
                    return (
                      <button 
                        key={section}
                        className={`admin-filter-btn ${activeSectionFilter === section ? 'active' : ''}`}
                        onClick={() => setActiveSectionFilter(section)}
                      >
                        {section} ({count})
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="admin-slots-grid">
                {activeTab === 'portfolio' && activePortfolioProject !== 'covers' ? (
                  Array.from({ length: 5 }).map((_, idx) => {
                    const num = idx + 1;
                    const slotId = `project_${activePortfolioProject}_gallery_${num}`;
                    return (
                      <ImageSlotCard
                        key={slotId}
                        slotId={slotId}
                        label={`Gallery Image ${num}`}
                        section={`${activePortfolioProject.replace(/-/g, ' ').toUpperCase()} GALLERY`}
                        defaultSrc={`https://picsum.photos/seed/${activePortfolioProject}-gal${num}/1200/900`}
                      />
                    );
                  })
                ) : (
                  filteredSlots.map((slot) => (
                    <ImageSlotCard
                      key={slot.id}
                      slotId={slot.id}
                      label={slot.label}
                      section={slot.section}
                      defaultSrc={slot.defaultSrc}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
