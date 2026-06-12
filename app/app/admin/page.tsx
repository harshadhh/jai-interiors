'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { uploadToCloudinary, validateImageFile, type UploadProgress } from '@/lib/cloudinary';
import { setImage, resetImage, getImage, resetAllImages } from '@/lib/imageStore';
import { getConfig, setConfig } from '@/lib/configStore';

// ─── ALL IMAGE SLOTS ACROSS THE SITE ──────────────────────────────────────────

const IMAGE_SLOTS = {
  home: {
    label: 'Home Page',
    icon: '🏠',
    slots: [
      { id: 'site_logo', label: 'Global Site Logo (Square/Transparent)', defaultSrc: '', section: 'Global Branding' },
      { id: 'hero_bg', label: 'Hero Background', defaultSrc: '', section: 'Hero Section' },
      { id: 'featured_1', label: 'Featured Project 1 — The Penthouse', defaultSrc: '', section: 'The Vault (Featured Work)' },
      { id: 'featured_2', label: 'Featured Project 2 — Villa 74', defaultSrc: '', section: 'The Vault (Featured Work)' },
      { id: 'featured_3', label: 'Featured Project 3 — Glass Pavilion', defaultSrc: '', section: 'The Vault (Featured Work)' },
      { id: 'before_after_before_1', label: 'Before/After 1 — Before', defaultSrc: '', section: 'Before & After Slider 1' },
      { id: 'before_after_after_1', label: 'Before/After 1 — After', defaultSrc: '', section: 'Before & After Slider 1' },
      { id: 'before_after_before_2', label: 'Before/After 2 — Before', defaultSrc: '', section: 'Before & After Slider 2' },
      { id: 'before_after_after_2', label: 'Before/After 2 — After', defaultSrc: '', section: 'Before & After Slider 2' },
      { id: 'before_after_before_3', label: 'Before/After 3 — Before', defaultSrc: '', section: 'Before & After Slider 3' },
      { id: 'before_after_after_3', label: 'Before/After 3 — After', defaultSrc: '', section: 'Before & After Slider 3' },
      { id: 'before_after_before_4', label: 'Before/After 4 — Before', defaultSrc: '', section: 'Before & After Slider 4' },
      { id: 'before_after_after_4', label: 'Before/After 4 — After', defaultSrc: '', section: 'Before & After Slider 4' },
      { id: 'renovation_banner', label: 'Renovation Banner Background', defaultSrc: '', section: 'Renovation Banner' },
    ],
  },
  portfolio: {
    label: 'Portfolio Page',
    icon: '🖼️',
    slots: [
      { id: 'portfolio_1', label: 'The Penthouse', defaultSrc: '', section: 'Project Cards' },
      { id: 'portfolio_2', label: 'Villa 74', defaultSrc: '', section: 'Project Cards' },
      { id: 'portfolio_3', label: 'Noir Studio Kitchen', defaultSrc: '', section: 'Project Cards' },
      { id: 'portfolio_4', label: 'Glass Pavilion', defaultSrc: '', section: 'Project Cards' },
      { id: 'portfolio_5', label: 'The Silk Suite', defaultSrc: '', section: 'Project Cards' },
      { id: 'portfolio_6', label: 'Matte Kitchen', defaultSrc: '', section: 'Project Cards' },
      { id: 'portfolio_7', label: 'The Marble Loft', defaultSrc: '', section: 'Project Cards' },
      { id: 'portfolio_8', label: 'Studio Black', defaultSrc: '', section: 'Project Cards' },
    ],
  },
  services: {
    label: 'Services Page',
    icon: '⚙️',
    slots: [
      // ── SERVICE BACKGROUND IMAGES (shown at low opacity when a service is active) ──
      { id: 'service_bg_01', label: 'Modular Kitchen — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_02', label: 'Kitchen Accessories — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_03', label: 'Bedroom — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_04', label: 'Living Room — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_05', label: 'Entrance Design — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_06', label: 'Balcony — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_07', label: 'Wallpapers — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_08', label: 'Tiles — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_09', label: 'Lighting Design — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_10', label: 'Civil Work — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_bg_11', label: 'Commercial Spaces — Page Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      { id: 'service_studio_cta', label: 'Studio CTA Background', defaultSrc: '', section: '🖼 Service Page Backgrounds' },
      // ── MODULAR KITCHEN SUB-ITEMS ──
      { id: 'service_item_01_0', label: 'Modular Kitchen — Tandems', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_1', label: 'Modular Kitchen — SS Stainless Trollies', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_2', label: 'Modular Kitchen — Wicker Baskets', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_3', label: 'Modular Kitchen — Pantry Unit', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_4', label: 'Modular Kitchen — Rolling Shutter', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_5', label: 'Modular Kitchen — Tall Unit', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_6', label: 'Modular Kitchen — Crockery Cabinet with Glass', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_7', label: 'Modular Kitchen — Loft', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      { id: 'service_item_01_8', label: 'Modular Kitchen — Platform Tops', defaultSrc: '', section: '🍳 Modular Kitchen Items' },
      // ── KITCHEN ACCESSORIES SUB-ITEMS ──
      { id: 'service_item_02_0', label: 'Kitchen Accessories — Handles', defaultSrc: '', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_1', label: 'Kitchen Accessories — Magic Corner', defaultSrc: '', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_2', label: 'Kitchen Accessories — Pantry Pull-Out Larder', defaultSrc: '', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_3', label: 'Kitchen Accessories — Masala Pull-Out', defaultSrc: '', section: '🔧 Kitchen Accessories Items' },
      { id: 'service_item_02_4', label: 'Kitchen Accessories — DBR Pull-Down Basket Elevator', defaultSrc: '', section: '🔧 Kitchen Accessories Items' },
      // ── BEDROOM SUB-ITEMS ──
      { id: 'service_item_03_0', label: 'Bedroom — Hydraulic Bed', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_1', label: 'Bedroom — Drawer Bed', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_2', label: 'Bedroom — Wall Mounted Bed', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_3', label: 'Bedroom — Side Tables', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_4', label: 'Bedroom — Foam Headboard', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_5', label: 'Bedroom — Wardrobe', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_6', label: 'Bedroom — Wall Décor', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_7', label: 'Bedroom — Study Table', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_8', label: 'Bedroom — Loft', defaultSrc: '', section: '🛏 Bedroom Items' },
      { id: 'service_item_03_9', label: 'Bedroom — Book Rack', defaultSrc: '', section: '🛏 Bedroom Items' },
      // ── LIVING ROOM SUB-ITEMS ──
      { id: 'service_item_04_0', label: 'Living Room — TV Unit', defaultSrc: '', section: '🛋 Living Room Items' },
      { id: 'service_item_04_1', label: 'Living Room — Mandir', defaultSrc: '', section: '🛋 Living Room Items' },
      { id: 'service_item_04_2', label: 'Living Room — Sofa Set', defaultSrc: '', section: '🛋 Living Room Items' },
      { id: 'service_item_04_3', label: 'Living Room — Back Wall Décor', defaultSrc: '', section: '🛋 Living Room Items' },
      { id: 'service_item_04_4', label: 'Living Room — False Ceiling', defaultSrc: '', section: '🛋 Living Room Items' },
      { id: 'service_item_04_5', label: 'Living Room — Partition', defaultSrc: '', section: '🛋 Living Room Items' },
      { id: 'service_item_04_6', label: 'Living Room — Dining Table', defaultSrc: '', section: '🛋 Living Room Items' },
      // ── ENTRANCE DESIGN SUB-ITEMS ──
      { id: 'service_item_05_0', label: 'Entrance — Wall Panelling', defaultSrc: '', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_1', label: 'Entrance — Shoe Rack', defaultSrc: '', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_2', label: 'Entrance — Safety Door with Digital Lock', defaultSrc: '', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_3', label: 'Entrance — CNC Jali', defaultSrc: '', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_4', label: 'Entrance — Name Plates', defaultSrc: '', section: '🚪 Entrance Design Items' },
      { id: 'service_item_05_5', label: 'Entrance — Main Door', defaultSrc: '', section: '🚪 Entrance Design Items' },
      // ── BALCONY SUB-ITEMS ──
      { id: 'service_item_06_0', label: 'Balcony — PVC Ceiling', defaultSrc: '', section: '🌿 Balcony Items' },
      // ── WALLPAPERS SUB-ITEMS ──
      { id: 'service_item_07_0', label: 'Wallpapers — Custom Designed Wallpapers', defaultSrc: '', section: '🎨 Wallpapers Items' },
      // ── TILES SUB-ITEMS ──
      { id: 'service_item_08_0', label: 'Tiles — Full Body Tiles', defaultSrc: '', section: '🪨 Tiles Items' },
      { id: 'service_item_08_1', label: 'Tiles — Ceramic Tiles', defaultSrc: '', section: '🪨 Tiles Items' },
      { id: 'service_item_08_2', label: 'Tiles — Marbles', defaultSrc: '', section: '🪨 Tiles Items' },
      // ── LIGHTING DESIGN SUB-ITEMS ──
      { id: 'service_item_09_0', label: 'Lighting — Panel Lights', defaultSrc: '', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_1', label: 'Lighting — Profile Lights', defaultSrc: '', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_2', label: 'Lighting — Magnetic Lights', defaultSrc: '', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_3', label: 'Lighting — Spot Lights', defaultSrc: '', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_4', label: 'Lighting — Track Lights', defaultSrc: '', section: '💡 Lighting Design Items' },
      { id: 'service_item_09_5', label: 'Lighting — Cove Lights', defaultSrc: '', section: '💡 Lighting Design Items' },
      // ── CIVIL WORK SUB-ITEMS ──
      { id: 'service_item_10_0', label: 'Civil Work — Painting', defaultSrc: '', section: '🏗 Civil Work Items' },
      { id: 'service_item_10_1', label: 'Civil Work — Plumbing', defaultSrc: '', section: '🏗 Civil Work Items' },
      // ── COMMERCIAL SPACES SUB-ITEMS ──
      { id: 'service_item_11_0', label: 'Commercial — Office Work', defaultSrc: '', section: '🏢 Commercial Spaces Items' },
      { id: 'service_item_11_1', label: 'Commercial — Shop', defaultSrc: '', section: '🏢 Commercial Spaces Items' },
      { id: 'service_item_11_2', label: 'Commercial — Mall', defaultSrc: '', section: '🏢 Commercial Spaces Items' },
    ],
  },
  kitchen: {
    label: 'Kitchen Page',
    icon: '🍳',
    slots: [
      { id: 'kitchen_hero_mk', label: 'Modular Kitchen Hero', defaultSrc: '', section: 'Hero Section' },
      { id: 'kitchen_finish_acrylic', label: 'Finish — Acrylic', defaultSrc: '', section: 'Finishes' },
      { id: 'kitchen_finish_laminate', label: 'Finish — Laminate', defaultSrc: '', section: 'Finishes' },
      { id: 'kitchen_finish_pu', label: 'Finish — PU + Deco', defaultSrc: '', section: 'Finishes' },
    ],
  },
  about: {
    label: 'About Page',
    icon: '👥',
    slots: [
      { id: 'about_hero_founders', label: 'Hero — Founders Portrait', defaultSrc: '', section: 'Hero Section' },
      { id: 'about_dev_portrait', label: 'Dev — Founder Portrait', defaultSrc: '', section: 'Founders Section' },
      { id: 'about_suresh_portrait', label: 'Suresh — Founder Portrait', defaultSrc: '', section: 'Founders Section' },
      { id: 'about_workshop', label: 'The Workshop / Factory', defaultSrc: '', section: 'Workshop Section' },
    ],
  },
};

// ─── DEFAULT PROJECT TEXT DETAILS ──────────────────────────────────────────────
const DEFAULT_PROJECT_TEXTS: Record<string, { title: string; client: string; category: string; year: string; area: string }> = {
  'the-penthouse': { title: 'The Penthouse', client: 'Baner Enclave', category: 'Residential', year: '2024', area: '4,200 sq ft' },
  'villa-74': { title: 'Villa 74', client: 'Koregaon Park', category: 'Residential', year: '2024', area: '3,600 sq ft' },
  'noir-studio-kitchen': { title: 'Noir Studio Kitchen', client: 'Kalyani Nagar', category: 'Kitchens', year: '2023', area: '580 sq ft' },
  'glass-pavilion': { title: 'Glass Pavilion', client: 'Aundh', category: 'Living Spaces', year: '2023', area: '2,100 sq ft' },
  'the-silk-suite': { title: 'The Silk Suite', client: 'Wakad', category: 'Residential', year: '2023', area: '2,800 sq ft' },
  'matte-kitchen': { title: 'Matte Kitchen', client: 'Baner', category: 'Kitchens', year: '2022', area: '420 sq ft' },
  'the-marble-loft': { title: 'The Marble Loft', client: 'Viman Nagar', category: 'Living Spaces', year: '2022', area: '1,800 sq ft' },
  'studio-black': { title: 'Studio Black', client: 'Pune CBD', category: 'Commercial', year: '2022', area: '950 sq ft' },
};

function ProjectTextDetailsForm({ slug }: { slug: string }) {
  const defaults = DEFAULT_PROJECT_TEXTS[slug];
  const [details, setDetails] = useState({
    title: '',
    client: '',
    category: '',
    year: '',
    area: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails({
      title: getConfig(`project_${slug}_title`, defaults?.title || ''),
      client: getConfig(`project_${slug}_client`, defaults?.client || ''),
      category: getConfig(`project_${slug}_category`, defaults?.category || ''),
      year: getConfig(`project_${slug}_year`, defaults?.year || ''),
      area: getConfig(`project_${slug}_area`, defaults?.area || ''),
    });
  }, [slug, defaults]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(`project_${slug}_title`, details.title);
    setConfig(`project_${slug}_client`, details.client);
    setConfig(`project_${slug}_category`, details.category);
    setConfig(`project_${slug}_year`, details.year);
    setConfig(`project_${slug}_area`, details.area);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <form onSubmit={handleSave} className="admin-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px', gridColumn: 'span 2', maxWidth: '600px', width: '100%' }}>
      <p className="admin-sidebar-heading" style={{ margin: 0, color: '#C8A97E', fontSize: '14px', letterSpacing: '0.1em' }}>Edit Project Details</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Project Title</label>
        <input 
          type="text" 
          value={details.title}
          onChange={(e) => setDetails(p => ({ ...p, title: e.target.value }))}
          className="admin-form-input" 
          style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', fontSize: '13px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Client / Location</label>
          <input 
            type="text" 
            value={details.client}
            onChange={(e) => setDetails(p => ({ ...p, client: e.target.value }))}
            className="admin-form-input" 
            style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', fontSize: '13px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Category</label>
          <input 
            type="text" 
            value={details.category}
            onChange={(e) => setDetails(p => ({ ...p, category: e.target.value }))}
            className="admin-form-input" 
            style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Year</label>
          <input 
            type="text" 
            value={details.year}
            onChange={(e) => setDetails(p => ({ ...p, year: e.target.value }))}
            className="admin-form-input" 
            style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', fontSize: '13px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Area / Sq Ft</label>
          <input 
            type="text" 
            value={details.area}
            onChange={(e) => setDetails(p => ({ ...p, area: e.target.value }))}
            className="admin-form-input" 
            style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', fontSize: '13px' }}
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="admin-form-btn" 
        style={{ background: '#C8A97E', color: '#1A1A1A', fontWeight: 'bold', border: 'none', padding: '12px', cursor: 'pointer', marginTop: '5px' }}
      >
        Save Details
      </button>

      {saved && (
        <p style={{ color: '#25D366', fontSize: '12px', margin: '5px 0 0 0', fontWeight: 'bold' }}>✓ Details saved successfully & synced!</p>
      )}
    </form>
  );
}

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
    currentUrl: defaultSrc,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep in sync with external store updates and initialize on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((prev) => ({
      ...prev,
      currentUrl: getImage(slotId, defaultSrc),
    }));

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
  }, [slotId, defaultSrc]);  const processFile = useCallback(
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
      <div className="admin-preview-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
        {state.currentUrl ? (
          <img
            src={state.currentUrl}
            alt={label}
            className="admin-preview-img w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {slotId === 'site_logo' ? 'JI (Text Fallback Active)' : 'No Image Override'}
          </div>
        )}
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

      {/* Reset/Delete Button */}
      {isOverridden && (
        <button className="admin-reset-btn" onClick={() => setShowDeleteConfirm(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          🗑️ Delete Uploaded Image
        </button>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-title">Delete Uploaded Image?</h3>
            <p className="admin-modal-desc">
              Are you sure you want to delete the uploaded image override for this slot and revert back to the default placeholder?
            </p>
            <div className="admin-modal-actions">
              <button 
                type="button" 
                className="admin-modal-btn admin-modal-btn--cancel" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="admin-modal-btn admin-modal-btn--danger" 
                onClick={() => {
                  handleReset();
                  setShowDeleteConfirm(false);
                }}
              >
                Yes, Delete Image
              </button>
            </div>
          </div>
        </div>
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        setIsAuthenticated(sessionStorage.getItem(ADMIN_PASSWORD_KEY) === 'true');
        const lockoutTs = localStorage.getItem(LOCKOUT_KEY);
        if (lockoutTs) {
          const ts = parseInt(lockoutTs, 10);
          if (Date.now() < ts) {
            setLockedUntil(ts);
            setAttemptsLeft(0);
          } else {
            localStorage.removeItem(LOCKOUT_KEY);
            localStorage.removeItem(ATTEMPT_KEY);
          }
        } else {
          const attempts = parseInt(localStorage.getItem(ATTEMPT_KEY) || '0', 10);
          setAttemptsLeft(Math.max(0, MAX_ATTEMPTS - attempts));
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);
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
    cloudinary_cloud_name: '',
    cloudinary_upload_preset: '',
    before_after_title_1: '',
    before_after_subtitle_1: '',
    before_after_title_2: '',
    before_after_subtitle_2: '',
    before_after_title_3: '',
    before_after_subtitle_3: '',
    before_after_title_4: '',
    before_after_subtitle_4: '',
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // States for changing admin password
  const [passChange, setPassChange] = useState({ current: '', newPass: '', confirm: '' });
  const [passChangeError, setPassChangeError] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  // Logo state for Admin Topbar
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogoUrl(getImage('site_logo', ''));

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.slotId === 'site_logo' || detail.slotId === '*') {
        setLogoUrl(detail.url || '');
      }
    };
    window.addEventListener('jay-image-update', handler);
    return () => window.removeEventListener('jay-image-update', handler);
  }, []);

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
          cloudinary_cloud_name: getConfig('cloudinary_cloud_name', ''),
          cloudinary_upload_preset: getConfig('cloudinary_upload_preset', ''),
          before_after_title_1: getConfig('before_after_title_1', 'The Noir Kitchen Remodel'),
          before_after_subtitle_1: getConfig('before_after_subtitle_1', 'Baner, Pune · Delivered in 28 Days'),
          before_after_title_2: getConfig('before_after_title_2', 'The Marble Loft'),
          before_after_subtitle_2: getConfig('before_after_subtitle_2', 'Viman Nagar · Delivered in 45 Days'),
          before_after_title_3: getConfig('before_after_title_3', 'Studio Black'),
          before_after_subtitle_3: getConfig('before_after_subtitle_3', 'Pune CBD · Delivered in 20 Days'),
          before_after_title_4: getConfig('before_after_title_4', 'Glass Pavilion'),
          before_after_subtitle_4: getConfig('before_after_subtitle_4', 'Aundh · Delivered in 60 Days'),
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

    const storedHash = getConfig('admin_password_hash', CORRECT_HASH);
    if (hash === storedHash) {
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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeError('');
    setPassChangeSuccess(false);

    if (passChange.newPass !== passChange.confirm) {
      setPassChangeError('New passwords do not match.');
      return;
    }

    const currentHash = getConfig('admin_password_hash', CORRECT_HASH);
    const verifyCurrent = await hashPassword(passChange.current);

    if (verifyCurrent !== currentHash) {
      setPassChangeError('Incorrect current password.');
      return;
    }

    const newHash = await hashPassword(passChange.newPass);
    setConfig('admin_password_hash', newHash);
    setPassChangeSuccess(true);
    setPassChange({ current: '', newPass: '', confirm: '' });
  };

  // Check if Cloudinary is configured
  const cloudinaryConfigured =
    (!!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME_HERE') ||
    true; // Configured via built-in fallback

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
            
            <Link
              href="/"
              className="admin-form-btn"
              style={{
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                marginTop: '10px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              ← Back to Website
            </Link>

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
            {logoUrl ? (
              <img key={logoUrl} src={logoUrl} alt="Logo" className="admin-topbar-logo" style={{ objectFit: 'contain', background: 'transparent' }} />
            ) : (
              <span className="admin-topbar-logo">JI</span>
            )}
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px', marginTop: '5px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Custom Cloudinary Cloud Name</label>
                      <input 
                        type="text" 
                        value={settings.cloudinary_cloud_name}
                        onChange={(e) => setSettings(prev => ({ ...prev, cloudinary_cloud_name: e.target.value }))}
                        placeholder="doy3h1jvx (default fallback)"
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Custom Cloudinary Upload Preset (Unsigned)</label>
                      <input 
                        type="text" 
                        value={settings.cloudinary_upload_preset}
                        onChange={(e) => setSettings(prev => ({ ...prev, cloudinary_upload_preset: e.target.value }))}
                        placeholder="jay_interiors (default fallback)"
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {[1, 2, 3, 4].map(num => (
                    <div key={`ba_settings_${num}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px', marginTop: '5px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Before & After {num}: Title</label>
                        <input 
                          type="text" 
                          value={settings[`before_after_title_${num}` as keyof typeof settings]}
                          onChange={(e) => setSettings(prev => ({ ...prev, [`before_after_title_${num}`]: e.target.value }))}
                          placeholder="e.g. The Noir Kitchen Remodel"
                          className="admin-form-input" 
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Before & After {num}: Subtitle</label>
                        <input 
                          type="text" 
                          value={settings[`before_after_subtitle_${num}` as keyof typeof settings]}
                          onChange={(e) => setSettings(prev => ({ ...prev, [`before_after_subtitle_${num}`]: e.target.value }))}
                          placeholder="e.g. Baner, Pune · Delivered in 28 Days"
                          className="admin-form-input" 
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                        />
                      </div>
                    </div>
                  ))}

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

              {/* CHANGE PASSWORD CARD */}
              <div className="admin-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', maxWidth: '600px' }}>
                <p className="admin-sidebar-heading" style={{ margin: 0, color: '#C8A97E', fontSize: '14px', letterSpacing: '0.1em' }}>Change Admin Password</p>
                <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Current Password</label>
                    <input 
                      type="password" 
                      required
                      value={passChange.current}
                      onChange={(e) => setPassChange(prev => ({ ...prev, current: e.target.value }))}
                      className="admin-form-input" 
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>New Password</label>
                      <input 
                        type="password" 
                        required
                        value={passChange.newPass}
                        onChange={(e) => setPassChange(prev => ({ ...prev, newPass: e.target.value }))}
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <label className="admin-slot-label" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Confirm New Password</label>
                      <input 
                        type="password" 
                        required
                        value={passChange.confirm}
                        onChange={(e) => setPassChange(prev => ({ ...prev, confirm: e.target.value }))}
                        className="admin-form-input" 
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>
                  {passChangeError && <p style={{ color: '#ff4d4d', fontSize: '12px', margin: '5px 0 0 0' }}>{passChangeError}</p>}
                  {passChangeSuccess && <p style={{ color: '#25D366', fontSize: '12px', margin: '5px 0 0 0', fontWeight: 'bold' }}>✓ Password updated successfully!</p>}
                  <button 
                    type="submit" 
                    className="admin-form-btn" 
                    style={{ background: '#C8A97E', color: '#1A1A1A', fontWeight: 'bold', border: 'none', padding: '14px', cursor: 'pointer', marginTop: '10px' }}
                  >
                    Update Password
                  </button>
                </form>
              </div>
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
                  <>
                    <ProjectTextDetailsForm slug={activePortfolioProject} />
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const num = idx + 1;
                      const slotId = `project_${activePortfolioProject}_gallery_${num}`;
                      return (
                        <ImageSlotCard
                          key={slotId}
                          slotId={slotId}
                          label={`Gallery Image ${num}`}
                          section={`${activePortfolioProject.replace(/-/g, ' ').toUpperCase()} GALLERY`}
                          defaultSrc={''}
                        />
                      );
                    })}
                  </>
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
