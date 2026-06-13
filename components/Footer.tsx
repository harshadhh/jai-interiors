'use client';

import Link from 'next/link';
import { useConfigSetting } from '@/hooks/useConfigStore';
import { useImageUrl } from '@/hooks/useImageStore';

const serviceCategories = [
  'Modular Kitchen',
  'Bedroom Furniture',
  'Living Room',
  'Entrance Design',
  'Balcony',
  'Wallpapers',
  'Tiles',
  'Lighting',
  'Civil Work',
  'Commercial Spaces',
  'Fall & Ceiling',
  'Renovation',
];

export function Footer() {
  const googleRatingValue = useConfigSetting('google_rating_value', '5.0');
  const contactPhone = useConfigSetting('contact_phone', '+91 79 7692 9913');
  const contactWhatsapp = useConfigSetting('contact_whatsapp', '917976929913');
  const contactEmail = useConfigSetting('contact_email', 'hello@jayinteriors.in');
  const logoUrl = useImageUrl('site_logo', '');

  const trustBadges = [
    { value: '45-60 Days', label: 'Delivery' },
    { value: '9 Years', label: 'Experience' },
    { value: `${googleRatingValue} ★`, label: 'Google Rating' },
    { value: '207+', label: 'Projects Delivered' },
  ];
  return (
    <footer className="bg-charcoal text-alabaster border-t border-alabaster/10 pt-24 pb-8 px-6 relative z-10 w-full overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brass/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── TRUST BADGES STRIP ── */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-alabaster/10">
          {trustBadges.map((b) => (
            <div key={b.label} className="bg-charcoal px-8 py-6 text-center flex flex-col gap-1 group hover:bg-brass/10 transition-colors duration-500">
              <span className="text-3xl md:text-4xl font-serif italic text-brass">{b.value}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] opacity-50">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

        {/* Brand Block */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Link href="/" className="magnetic-target cursor-none w-fit flex items-center gap-3 group">
            {logoUrl ? (
              <div className="w-10 h-10 relative overflow-hidden flex items-center justify-center bg-transparent shrink-0">
                <img key={logoUrl} src={logoUrl} alt="Jay Interiors" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-brass flex items-center justify-center shrink-0">
                <span className="text-charcoal font-serif font-bold text-sm">JI</span>
              </div>
            )}
            <h3 className="text-2xl font-serif italic hover:text-brass transition-colors duration-500">
              Jay Interiors
            </h3>
          </Link>
          <p className="text-xs font-sans leading-relaxed opacity-60">
            Pune&apos;s premier end-to-end interior design studio. One-stop solution for all interior works — from modular kitchens to complete home renovation.
          </p>
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-brass opacity-80">Est. 2012 · Baner, Pune</p>
            <a href="https://www.google.com/maps/place/Jay+interior+and+design/@18.5609978,73.6930585,13z/data=!4m10!1m2!2m1!1sjay+interiors!3m6!1s0x3bc2bf14d03b8f8f:0x404787ea84d05434!8m2!3d18.5609978!4d73.7692762!15sCg1qYXkgaW50ZXJpb3JzWg8iDWpheSBpbnRlcmlvcnOSARFpbnRlcmlvcl9kZXNpZ25lcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMXNNMXBIYkVaU1IzUkpVMVpHZWxKWFNuTmpSWEJ0WkRKc1RGVkZSUkFC4AEA-gEECA4QQQ!16s%2Fg%2F11yqzsfbct?entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="magnetic-target cursor-none px-4 py-2 bg-brass/10 text-brass font-sans uppercase tracking-widest text-[9px] font-bold border border-brass/20 w-fit hover:bg-brass hover:text-charcoal transition-colors duration-500">
              📍 Get Directions
            </a>
          </div>

          {/* Hardware Partners */}
          <div className="border-t border-alabaster/10 pt-5">
            <p className="text-[9px] uppercase tracking-widest opacity-40 mb-3">Trusted Hardware Partners</p>
            <div className="flex flex-wrap gap-2">
              {['Hettich', 'Blum', 'Grass', 'Hafele'].map((brand) => (
                <span key={brand} className="text-[10px] uppercase tracking-widest border border-brass/30 text-brass px-3 py-1">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Services — col 1 */}
        <div className="flex flex-col gap-5">
          <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1">Our Services</span>
          {serviceCategories.slice(0, 6).map((s) => (
            <Link
              key={s}
              href="/services"
              className="text-xs font-sans tracking-wider opacity-60 hover:opacity-100 hover:text-brass transition-all duration-300 magnetic-target cursor-none"
            >
              {s}
            </Link>
          ))}
        </div>

        {/* Services — col 2 */}
        <div className="flex flex-col gap-5">
          <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1">More Services</span>
          {serviceCategories.slice(6).map((s) => (
            <Link
              key={s}
              href="/services"
              className="text-xs font-sans tracking-wider opacity-60 hover:opacity-100 hover:text-brass transition-all duration-300 magnetic-target cursor-none"
            >
              {s}
            </Link>
          ))}
        </div>

        {/* Navigation + Contact */}
        <div className="flex flex-col gap-5">
          <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1">Navigate</span>
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About Us' },
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/services', label: 'Services' },
            { href: '/contact', label: 'Contact' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-sans tracking-wider opacity-60 hover:opacity-100 hover:text-brass transition-all duration-300 magnetic-target cursor-none"
            >
              {l.label}
            </Link>
          ))}

          <div className="border-t border-alabaster/10 pt-5 mt-2 flex flex-col gap-3">
            <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1">Connect</span>
            <a
              href={`https://wa.me/${contactWhatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-sans tracking-wider opacity-60 hover:opacity-100 hover:text-brass transition-all duration-300 magnetic-target cursor-none"
            >
              💬 WhatsApp Us
            </a>
            <a
              href={`tel:${contactPhone.replace(/\s+/g, '')}`}
              className="text-xs font-sans tracking-wider opacity-60 hover:opacity-100 hover:text-brass transition-all duration-300 magnetic-target cursor-none"
            >
              📞 {contactPhone}
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="text-xs font-sans tracking-wider opacity-60 hover:opacity-100 hover:text-brass transition-all duration-300 magnetic-target cursor-none"
            >
              ✉️ {contactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="max-w-7xl mx-auto border-t border-alabaster/10 pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-[10px] tracking-widest uppercase">
        <p className="opacity-40 text-center md:text-left">
          © {new Date().getFullYear()} Jay Interiors. All Rights Reserved. · Baner, Pune
        </p>

        {/* Center: Designed By with Glow Effect */}
        <div className="flex items-center justify-center">
          <a
            href="https://peakmediastudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-target cursor-none relative font-medium group tracking-[0.25em] transition-all duration-500"
            style={{
              animation: 'peak-glow 3s ease-in-out infinite alternate',
            }}
          >
            Designed by PEAKMEDIASTUDIO
            {/* Glowing underscore line */}
            <span
              className="absolute bottom-[-6px] left-0 w-full h-[1px] bg-brass/50 scale-x-50 group-hover:scale-x-100 transition-transform duration-500 origin-center"
              style={{
                boxShadow: '0 0 8px #C8A97E, 0 0 15px #C8A97E',
              }}
            />
          </a>
        </div>

        {/* Right: Site Links */}
        <div className="flex items-center justify-center md:justify-end gap-8">
          <Link href="/privacy-policy" className="opacity-40 hover:opacity-70 hover:text-alabaster transition-all magnetic-target cursor-none">Privacy Policy</Link>
          <Link href="/terms-conditions" className="opacity-40 hover:opacity-70 hover:text-alabaster transition-all magnetic-target cursor-none">Terms & Conditions</Link>
          <Link
            href="/admin"
            className="opacity-10 hover:opacity-40 hover:text-brass transition-all duration-500 magnetic-target cursor-none flex items-center gap-1.5 group"
            title="Admin Portal"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-brass transition-colors duration-500">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin
          </Link>
        </div>

        {/* Custom Glow Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes peak-glow {
            0% {
              text-shadow: 0 0 6px rgba(200, 169, 126, 0.4), 0 0 15px rgba(200, 169, 126, 0.2);
              color: rgba(200, 169, 126, 0.85);
            }
            100% {
              text-shadow: 0 0 14px rgba(200, 169, 126, 0.9), 0 0 30px rgba(200, 169, 126, 0.5);
              color: #ffffff;
            }
          }
        `}} />
      </div>
    </footer>
  );
}
