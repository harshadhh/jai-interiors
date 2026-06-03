'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ManagedImage } from '@/components/ManagedImage';
import Link from 'next/link';
import { useState } from 'react';

const categories = ['All', 'Residential', 'Kitchens', 'Living Spaces', 'Commercial'];

const projects = [
  { id: 1, slug: 'the-penthouse', slotId: 'portfolio_1', title: 'The Penthouse', client: 'Baner Enclave', category: 'Residential', year: '2024', area: '4,200 sq ft', src: 'https://picsum.photos/seed/penth2/800/1000', featured: true },
  { id: 2, slug: 'villa-74', slotId: 'portfolio_2', title: 'Villa 74', client: 'Koregaon Park', category: 'Residential', year: '2024', area: '3,600 sq ft', src: 'https://picsum.photos/seed/villa74b/800/800', featured: false },
  { id: 3, slug: 'noir-studio-kitchen', slotId: 'portfolio_3', title: 'Noir Studio Kitchen', client: 'Kalyani Nagar', category: 'Kitchens', year: '2023', area: '580 sq ft', src: 'https://picsum.photos/seed/noirkitchen/1000/700', featured: false },
  { id: 4, slug: 'glass-pavilion', slotId: 'portfolio_4', title: 'Glass Pavilion', client: 'Aundh', category: 'Living Spaces', year: '2023', area: '2,100 sq ft', src: 'https://picsum.photos/seed/pavilion2/600/900', featured: false },
  { id: 5, slug: 'the-silk-suite', slotId: 'portfolio_5', title: 'The Silk Suite', client: 'Wakad', category: 'Residential', year: '2023', area: '2,800 sq ft', src: 'https://picsum.photos/seed/silksuite/800/1000', featured: false },
  { id: 6, slug: 'matte-kitchen', slotId: 'portfolio_6', title: 'Matte Kitchen', client: 'Baner', category: 'Kitchens', year: '2022', area: '420 sq ft', src: 'https://picsum.photos/seed/mattekitch/800/700', featured: false },
  { id: 7, slug: 'the-marble-loft', slotId: 'portfolio_7', title: 'The Marble Loft', client: 'Viman Nagar', category: 'Living Spaces', year: '2022', area: '1,800 sq ft', src: 'https://picsum.photos/seed/marbleloft/900/1100', featured: true },
  { id: 8, slug: 'studio-black', slotId: 'portfolio_8', title: 'Studio Black', client: 'Pune CBD', category: 'Commercial', year: '2022', area: '950 sq ft', src: 'https://picsum.photos/seed/studioblk/800/700', featured: false },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [activeGalleryProject, setActiveGalleryProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <main className="bg-charcoal text-alabaster overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-end px-6 md:px-12 pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, #C8A97E 0px, #C8A97E 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #C8A97E 0px, #C8A97E 1px, transparent 1px, transparent 80px)' }} />
        </div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brass/8 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-brass mb-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            200+ Projects Delivered
          </motion.p>
          <motion.h1
            className="text-[clamp(3.5rem,10vw,8rem)] font-serif italic tracking-tighter leading-none"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            The<br />Vault.
          </motion.h1>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="sticky top-[72px] z-40 bg-charcoal/90 backdrop-blur-md border-b border-alabaster/10 px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`magnetic-target cursor-none shrink-0 text-xs uppercase tracking-widest pb-1 transition-all duration-300 border-b ${
                active === cat
                  ? 'text-brass border-brass'
                  : 'text-alabaster/40 border-transparent hover:text-alabaster/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                style={{ marginTop: i % 3 === 1 ? '3rem' : 0 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <button
                  onClick={() => {
                    setActiveGalleryProject(project);
                    setCurrentImageIndex(0);
                  }}
                  className="w-full block relative group overflow-hidden cursor-none text-left magnetic-target"
                >
                  <div className={`relative overflow-hidden ${project.featured ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                    <ManagedImage
                      slotId={project.slotId} defaultSrc={project.src} alt={project.title} fill
                      className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-brass text-charcoal text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Info — always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-brass mb-2">{project.category} · {project.year}</p>
                        <h3 className="text-xl md:text-2xl font-serif italic">{project.title}</h3>
                        <p className="text-xs opacity-50 mt-1 font-sans tracking-wider">{project.client}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brass transition-all duration-500 pb-1">
                        View Gallery →
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-32 opacity-30">
              <p className="font-serif italic text-4xl">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PROCESS TEASER ── */}
      <section className="py-24 px-6 md:px-12 border-t border-alabaster/10 bg-alabaster text-charcoal">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Start Your Project</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">
              Your Space<br />Could Be Next.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="magnetic-target cursor-none px-10 py-5 bg-charcoal text-alabaster font-sans uppercase tracking-widest text-xs font-bold hover:bg-brass hover:text-charcoal transition-colors duration-500"
            >
              WhatsApp Us →
            </a>
            <Link href="/contact"
              className="magnetic-target cursor-none px-10 py-5 border border-charcoal/20 font-sans uppercase tracking-widest text-xs hover:bg-charcoal hover:text-alabaster transition-colors duration-500"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY MODAL ── */}
      <AnimatePresence>
        {activeGalleryProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-charcoal/95 backdrop-blur-md flex flex-col justify-between p-6 md:p-12 cursor-none magnetic-target"
            onClick={() => setActiveGalleryProject(null)}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center z-10 w-full" onClick={(e) => e.stopPropagation()}>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brass mb-1">
                  Project Gallery
                </p>
                <h2 className="font-serif italic text-xl md:text-2xl text-alabaster">
                  {activeGalleryProject.title}
                </h2>
              </div>
              <button 
                onClick={() => setActiveGalleryProject(null)}
                className="text-alabaster uppercase tracking-widest text-xs font-sans opacity-60 hover:opacity-100 transition-opacity"
              >
                Close ✕
              </button>
            </div>

            {/* Slider Container */}
            <div 
              className="relative w-full max-w-5xl mx-auto aspect-[16/10] md:aspect-[16/9] flex items-center justify-center overflow-hidden border border-brass/10 my-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ManagedImage
                    slotId={`project_${activeGalleryProject.slug}_gallery_${currentImageIndex + 1}`}
                    defaultSrc={`https://picsum.photos/seed/${activeGalleryProject.slug}-gal${currentImageIndex + 1}/1200/900`}
                    alt={`${activeGalleryProject.title} Gallery ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === 0 ? 4 : prev - 1));
                }}
                className="absolute left-4 w-12 h-12 rounded-full bg-charcoal/80 border border-alabaster/10 flex items-center justify-center text-alabaster hover:border-brass hover:text-brass transition-all duration-300 z-10"
              >
                ←
              </button>

              {/* Next Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === 4 ? 0 : prev + 1));
                }}
                className="absolute right-4 w-12 h-12 rounded-full bg-charcoal/80 border border-alabaster/10 flex items-center justify-center text-alabaster hover:border-brass hover:text-brass transition-all duration-300 z-10"
              >
                →
              </button>

              {/* Counter Indicator */}
              <div className="absolute top-4 right-4 bg-charcoal/70 border border-alabaster/10 px-3 py-1.5 text-[10px] tracking-widest uppercase z-10 text-alabaster">
                {currentImageIndex + 1} / 5
              </div>
            </div>

            {/* Bottom Bar: Indicators & Details */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 z-10" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === idx ? 'bg-brass scale-110' : 'bg-alabaster/20 hover:bg-alabaster/40'
                    }`}
                  />
                ))}
              </div>

              {/* Metadata */}
              <div className="text-center md:text-right text-alabaster/60 font-sans text-xs flex gap-6">
                <div>
                  <span className="text-brass uppercase text-[9px] tracking-widest block mb-1">Client / Loc</span>
                  <span className="text-alabaster">{activeGalleryProject.client}</span>
                </div>
                <div>
                  <span className="text-brass uppercase text-[9px] tracking-widest block mb-1">Category</span>
                  <span className="text-alabaster">{activeGalleryProject.category}</span>
                </div>
                <div>
                  <span className="text-brass uppercase text-[9px] tracking-widest block mb-1">Year</span>
                  <span className="text-alabaster">{activeGalleryProject.year}</span>
                </div>
                <div>
                  <span className="text-brass uppercase text-[9px] tracking-widest block mb-1">Area</span>
                  <span className="text-alabaster">{activeGalleryProject.area}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
