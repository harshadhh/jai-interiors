'use client';

import { motion } from 'motion/react';
import { ManagedImage } from '@/components/ManagedImage';
import Link from 'next/link';
import { useState } from 'react';

const finishes = [
  {
    name: 'Acrylic',
    desc: 'High-gloss mirror finish that reflects light beautifully. Scratch-resistant, easy-to-clean, and available in 200+ colours. The premium choice for modern kitchens.',
    img: 'https://picsum.photos/seed/acrylic-finish/600/400',
    slotId: 'kitchen_finish_acrylic',
    badge: 'Most Popular',
  },
  {
    name: 'Laminate',
    desc: 'Durable, versatile and cost-effective. Available in wood grain, solid colour and textured finishes. Excellent scratch and heat resistance for everyday Indian cooking.',
    img: 'https://picsum.photos/seed/laminate-finish/600/400',
    slotId: 'kitchen_finish_laminate',
    badge: 'Best Value',
  },
  {
    name: 'PU + Deco Finish',
    desc: 'Polyurethane finish offers a silky-smooth, paint-like surface with superior depth and sheen. Deco profiles add dimension and a European design sensibility.',
    img: 'https://picsum.photos/seed/pu-finish/600/400',
    slotId: 'kitchen_finish_pu',
    badge: 'Ultra Premium',
  },
];

const kitchenItems = [
  { icon: '🗄️', name: 'Tandems (Drawer Systems)', detail: 'Soft-close tandem box drawers — Acrylic, Laminate or PU + Deco Finish. Hettich / Blum runners.' },
  { icon: '🥄', name: 'SS Stainless Trollies', detail: 'Wire and plate trollies in stainless steel or powder-coated variants. Available in Acrylic, Laminate & PU finishes.' },
  { icon: '🧺', name: 'Wicker Baskets', detail: 'Natural woven wicker inserts for vegetable and fruit storage — breathable and organic.' },
  { icon: '🏪', name: 'Pantry Unit', detail: 'Tall pantry column with full-extension pull-out larder system. Maximum storage, minimum footprint.' },
  { icon: '🔄', name: 'Rolling Shutter', detail: 'Aluminium tambour rolling shutters for appliance garage areas — smooth, silent operation.' },
  { icon: '📦', name: 'Tall Unit', detail: 'Floor-to-ceiling storage tower — oven housing, microwave shelf, pantry or broom cupboard.' },
  { icon: '🫙', name: 'Crockery Cabinet with Glass', detail: 'Fluted Glass · Clear Glass · Black Tinted · Frosted. With hydraulic bar hinges for easy opening.' },
  { icon: '⬆️', name: 'Loft', detail: 'Overhead loft storage above upper cabinets. Soft-close hydraulic lift mechanism available.' },
  { icon: '🪨', name: 'Platform Tops', detail: 'Quartz and Granite countertops — imported Italian, Indian quarried & custom edge profiles.' },
];

const accessories = [
  { icon: '🔧', name: 'Handles', detail: 'Profile, bow, bar, flush & edge-pull. Finishes: Matte Black, Brushed Gold, Chrome, Rose Gold & Gunmetal.' },
  { icon: '✨', name: 'Magic Corner', detail: 'Full-extension magic corner with anti-slam for corner cabinets — maximises every inch.' },
  { icon: '🥫', name: 'Pantry Pull-Out Larder', detail: 'Full-height pull-out with adjustable wire shelves — for 600mm tall units.' },
  { icon: '🌶️', name: 'Masala Pull-Out', detail: 'Dedicated spice rack with 20+ jar capacity. Available in SS wire and acrylic variants.' },
  { icon: '⬇️', name: 'DBR Pull-Down Basket Elevator', detail: 'Lift-up swing-down basket system for overhead wall cabinets — ergonomic and effortless.' },
];

const brands = [
  { name: 'Hettich', country: 'Germany 🇩🇪', spec: 'Drawer systems, hinges & sliding fittings' },
  { name: 'Blum', country: 'Austria 🇦🇹', spec: 'Tandem runners, Legrabox & Aventos lift systems' },
  { name: 'Grass', country: 'Austria 🇦🇹', spec: 'Nova Pro runners & Kinvaro door systems' },
  { name: 'Hafele', country: 'Germany 🇩🇪', spec: 'Accessories, handles & functional hardware' },
  { name: 'Ebco', country: 'India 🇮🇳', spec: 'Channel runners, baskets & wire accessories' },
];

const stats = [
  { value: '10 Years', label: 'Furniture Warranty' },
  { value: '45 Days', label: 'Delivery' },
  { value: '5.0 ★', label: 'Google Rating' },
  { value: '200+', label: 'Kitchens Built' },
];

export default function ModularKitchenPage() {
  const [activeFinish, setActiveFinish] = useState(finishes[0]);

  return (
    <main className="bg-charcoal text-alabaster overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <ManagedImage
            slotId="kitchen_hero_mk"
            defaultSrc="https://picsum.photos/seed/kitchen-hero-mk/1920/1080"
            alt="Modular Kitchen by Jay Interiors"
            fill priority className="object-cover opacity-40"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brass/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-brass mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          >
            Jay Interiors · Modular Kitchen Specialists
          </motion.p>
          <motion.h1
            className="text-[clamp(3rem,9vw,7rem)] font-serif italic tracking-tighter leading-none mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Kitchens That<br />Tell a <span className="text-brass">Story.</span>
          </motion.h1>

          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          >
            {['10-Year Warranty', 'European Hardware', 'Hettich · Blum · Grass', '45-Day Delivery', 'Acrylic · Laminate · PU'].map((b) => (
              <span key={b} className="text-[9px] uppercase tracking-widest border border-brass/40 text-brass px-3 py-1.5">
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          >
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="magnetic-target cursor-none px-10 py-5 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
            >
              Get Free Kitchen Design →
            </a>
            <Link href="/portfolio"
              className="magnetic-target cursor-none px-10 py-5 border border-alabaster/30 font-sans uppercase tracking-widest text-xs hover:border-brass hover:text-brass transition-colors duration-500"
            >
              View Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-b border-alabaster/10 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-alabaster/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center text-center py-6 px-8"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <span className="text-4xl font-serif italic text-brass mb-2">{s.value}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINISH SELECTOR ── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Choose Your Finish</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">The Right<br />Material.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-alabaster/10 mb-12">
            {finishes.map((f) => (
              <button
                key={f.name}
                onClick={() => setActiveFinish(f)}
                className={`p-8 text-left flex flex-col gap-3 transition-all duration-300 magnetic-target cursor-none ${activeFinish.name === f.name ? 'bg-brass/15 border border-brass/30' : 'bg-charcoal hover:bg-alabaster/5'}`}
              >
                {f.badge && (
                  <span className="text-[9px] uppercase tracking-widest text-brass border border-brass/40 px-2 py-0.5 w-fit">
                    {f.badge}
                  </span>
                )}
                <h3 className="text-2xl font-serif italic">{f.name}</h3>
                <p className="text-xs font-sans opacity-50 leading-relaxed">{f.desc}</p>
              </button>
            ))}
          </div>

          <motion.div
            key={activeFinish.name}
            className="relative aspect-[16/7] overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          >
            <ManagedImage
              slotId={activeFinish.slotId}
              defaultSrc={activeFinish.img} alt={activeFinish.name} fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent flex items-end p-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brass mb-2">Selected Finish</p>
                <p className="text-4xl font-serif italic">{activeFinish.name}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── KITCHEN ITEMS ── */}
      <section className="py-24 px-6 md:px-12 bg-alabaster text-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">What We Build</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">Every Detail.<br />Accounted For.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kitchenItems.map((item, i) => (
              <motion.div
                key={item.name}
                className="border border-charcoal/10 p-6 flex gap-4 hover:border-brass/50 hover:bg-brass/5 transition-all duration-400 group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <span className="text-2xl shrink-0 mt-1">{item.icon}</span>
                <div>
                  <h3 className="font-serif text-lg mb-1 group-hover:text-brass transition-colors duration-300">{item.name}</h3>
                  <p className="text-xs font-sans opacity-60 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESSORIES ── */}
      <section className="py-24 px-6 md:px-12 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Smart Storage Solutions</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">Accessories<br />That Work.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessories.map((acc, i) => (
              <motion.div
                key={acc.name}
                className="bg-alabaster/5 border border-alabaster/10 p-6 flex gap-4 hover:border-brass/40 hover:bg-brass/5 transition-all duration-400 group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <span className="text-2xl shrink-0 mt-1">{acc.icon}</span>
                <div>
                  <h3 className="font-serif text-lg mb-1 group-hover:text-brass transition-colors duration-300">{acc.name}</h3>
                  <p className="text-xs font-sans text-alabaster/50 leading-relaxed">{acc.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HARDWARE BRANDS ── */}
      <section className="py-24 px-6 md:px-12 bg-alabaster text-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Europe & Kitchen Standard</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">Hardware We<br />Trust.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                className="border-t-2 border-brass pt-6 flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif">{brand.name}</h3>
                  <span className="text-xs font-sans opacity-40">{brand.country}</span>
                </div>
                <p className="text-sm font-sans opacity-60">{brand.spec}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-12 bg-charcoal text-center">
        <motion.p className="text-xs uppercase tracking-[0.4em] text-brass mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Your Dream Kitchen Awaits
        </motion.p>
        <motion.h2
          className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
        >
          Let&apos;s Design<br />Your Kitchen.
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="magnetic-target cursor-none px-12 py-6 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
          >
            WhatsApp for Free Design →
          </a>
          <Link href="/services"
            className="magnetic-target cursor-none px-12 py-6 border border-alabaster/20 font-sans uppercase tracking-widest text-xs hover:border-brass hover:text-brass transition-colors duration-500"
          >
            All Services
          </Link>
        </div>
      </section>

    </main>
  );
}
