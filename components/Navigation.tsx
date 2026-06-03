'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useConfigSetting } from '@/hooks/useConfigStore';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const googleRatingValue = useConfigSetting('google_rating_value', '5.0');
  const contactWhatsapp = useConfigSetting('contact_whatsapp', '919876543210');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled ? 'py-4' : 'py-8',
        'mix-blend-difference text-white'
      )}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-3 magnetic-target cursor-none z-[60] relative group"
          >
            {/* Logo Space */}
            <div className="w-9 h-9 bg-brass flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <span className="text-charcoal font-serif font-bold text-sm tracking-tighter">JI</span>
            </div>
            <span className="text-xl md:text-2xl font-serif tracking-tighter uppercase font-medium">
              Jay Interiors
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-sans tracking-widest uppercase py-2 magnetic-target cursor-none"
              >
                <span className={cn(
                  'relative z-10 transition-colors duration-300',
                  pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                )}>
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] magnetic-target cursor-none z-[60] relative w-8 h-8 justify-center items-end"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-px bg-white origin-center"
              animate={{ width: menuOpen ? '100%' : '100%', rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block h-px bg-white"
              animate={{ width: menuOpen ? '0%' : '75%', opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px bg-white origin-center"
              animate={{ width: '100%', rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        </div>
      </header>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-charcoal flex flex-col justify-between px-8 py-32 md:hidden overflow-hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brass/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Nav Links */}
            <nav className="flex flex-col gap-2 relative z-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block font-serif italic tracking-tighter leading-none py-3 border-b border-alabaster/10 transition-colors duration-300',
                      'text-[clamp(2.5rem,10vw,4rem)]',
                      pathname === link.href ? 'text-brass' : 'text-alabaster hover:text-brass'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Badges + CTA */}
            <motion.div
              className="relative z-10 flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '45 Days', label: 'Handover' },
                  { val: '10 Yrs', label: 'Warranty' },
                  { val: `${googleRatingValue} ★`, label: 'Google Rating' },
                  { val: '200+', label: 'Projects Done' },
                ].map((b) => (
                  <div key={b.label} className="bg-alabaster/5 border border-alabaster/10 p-3 text-center">
                    <p className="text-brass font-serif italic text-lg">{b.val}</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-50 mt-1">{b.label}</p>
                  </div>
                ))}
              </div>
              <a
                href={`https://wa.me/${contactWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold text-center hover:bg-alabaster transition-colors duration-500"
              >
                WhatsApp Us →
              </a>
              <p className="text-[10px] uppercase tracking-widest opacity-30 text-alabaster">
                Baner, Pune · One-Stop Solution for All Interior Works
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
