'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ManagedImage } from '@/components/ManagedImage';
import { getImage } from '@/lib/imageStore';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

const services = [
  {
    id: '01',
    title: 'Modular Kitchen',
    tagline: 'Europe-grade kitchens. 10-year warranty.',
    image: '',
    desc: 'Our modular kitchen division is the crown of Jay Interiors. We offer fully customised kitchen solutions using European hardware (Hettich, Blum, Grass) with a 10-year furniture warranty. From Acrylic to Lacquered PU finishes — every kitchen is engineered for Indian cooking and designed for luxury living.',
    items: [
      { name: 'Tandems', detail: 'Acrylic Sheets · Laminate Sheets · PU + Deco Finish' },
      { name: 'SS Stainless Trollies', detail: 'Acrylic · Laminate · PU + Deco Finish' },
      { name: 'Wicker Baskets', detail: 'Premium natural wicker storage inserts' },
      { name: 'Pantry Unit', detail: 'Pull-out larder with full-extension soft-close runners' },
      { name: 'Rolling Shutter', detail: 'Aluminium tambour rolling shutters for tall units' },
      { name: 'Tall Unit', detail: 'Floor-to-ceiling storage towers' },
      { name: 'Crockery Cabinet with Glass', detail: 'Fluted · Clear · Black Tinted · Frosted — with hydraulic bar / hinges' },
      { name: 'Loft', detail: 'Overhead storage with soft-close hydraulic lift' },
      { name: 'Platform Tops', detail: 'Quartz · Granite — imported & premium domestic' },
    ],
    includes: ['10-Year Furniture Warranty', 'European hardware (Hettich / Blum / Grass)', 'Full 3D design before fabrication', '45-Day delivery guarantee', 'On-site installation & handover'],
  },
  {
    id: '02',
    title: 'Kitchen Accessories',
    tagline: 'Smart storage. Effortless organisation.',
    image: '',
    desc: 'The difference between a good kitchen and a great one lies in the accessories. We source and install the finest functional hardware — from magic corners to pull-down basket elevators — making every inch of your kitchen work smarter.',
    items: [
      { name: 'Handles', detail: 'Profile, bow, bar, flush & edge-pull in matte black, gold & SS' },
      { name: 'Magic Corner', detail: 'Full-extension magic corner with soft-stop mechanism' },
      { name: 'Pantry Pull-Out Larder', detail: 'Tall pull-out with adjustable shelves & wire baskets' },
      { name: 'Masala Pull-Out', detail: 'Spice drawer system with 20+ jars capacity' },
      { name: 'DBR Pull-Down Basket Elevator', detail: 'Lift-up basket system for overhead cabinets' },
    ],
    includes: ['Brand: Hettich / Blum / Ebco / Hafele', 'Soft-close on all drawers', 'Anti-slam mechanisms', 'Lifetime mechanism warranty'],
  },
  {
    id: '03',
    title: 'Bedroom',
    tagline: 'Rest. Restore. Reimagine your sanctuary.',
    image: '',
    desc: 'Your bedroom is your most personal space. We design complete bedroom solutions — from custom beds and wardrobes to study nooks and wall décor — ensuring every element is tailored to your lifestyle and aesthetic. With our end-to-end furniture approach and 10-year warranty, your bedroom is built to last.',
    items: [
      { name: 'Hydraulic Bed', detail: 'Storage bed with gas-lift mechanism — Queen & King sizes' },
      { name: 'Drawer Bed', detail: 'Under-bed drawer storage system in laminate & lacquer finishes' },
      { name: 'Wall Mounted Bed', detail: 'Floating bed frames with integrated headboard lighting' },
      { name: 'Side Tables', detail: 'Matching bedside tables — floating or freestanding' },
      { name: 'Foam Headboard', detail: 'Custom upholstered foam headboards in fabric / leatherette' },
      { name: 'Wardrobe', detail: 'Drawers · Cloth hanging · Inbuilt dressing mirror · Organisers · Iron board compartment' },
      { name: 'Wall Décor', detail: 'Panelling, fluted panels, PU wall art & custom murals' },
      { name: 'Study Table', detail: 'Integrated study unit with bookshelf & cable management' },
      { name: 'Loft', detail: 'Overhead loft storage with flush shutters' },
      { name: 'Book Rack', detail: 'Open shelving unit — wall mounted or freestanding' },
    ],
    includes: ['10-Year Furniture Warranty', 'Custom size manufacturing', 'In-house upholstery team', 'Complete room coordination'],
  },
  {
    id: '04',
    title: 'Living Room',
    tagline: 'The heart of your home. Reimagined.',
    image: '',
    desc: 'The living room is where life unfolds — family gatherings, quiet evenings, first impressions. We design every element of this space with cinematic attention to detail, from the TV wall to the ceiling, creating a space that feels alive at every hour.',
    items: [
      { name: 'TV Unit', detail: 'With louvers, back-lit panels, fluted glass inserts & cove lighting' },
      { name: 'Mandir', detail: 'Traditional & contemporary pooja units — wood, CNC jali & marble' },
      { name: 'Sofa Set', detail: 'Custom L-shaped, sectional & modular sofas in fabric / leatherette' },
      { name: 'Back Wall Décor', detail: 'Feature wall — panelling, wallpaper, stone cladding & lighting' },
      { name: 'False Ceiling', detail: 'Gypsum false ceiling with cove lighting, POP & profiles' },
      { name: 'Partition', detail: 'CNC jali, glass, wooden slat & fluted partitions' },
      { name: 'Dining Table', detail: 'Folding dining table · Wall-mounted drop-leaf · Fixed custom' },
    ],
    includes: ['Complete room 3D design', 'Lighting plan included', 'Soft furnishings coordination', 'Fall & ceiling integration'],
  },
  {
    id: '05',
    title: 'Entrance Design',
    tagline: 'First impressions are everything.',
    image: '',
    desc: 'The entrance to your home is your personal statement to the world. We design entrance areas that are dramatic, functional, and unmistakably curated — from the main door to the foyer wall and beyond.',
    items: [
      { name: 'Wall Panelling', detail: 'Fluted, ribbed, leather-look & stone-effect panels' },
      { name: 'Shoe Rack', detail: 'Built-in shoe storage — concealed, open & turnstile designs' },
      { name: 'Safety Door with Digital Lock', detail: 'Mild steel safety doors with smart digital lock systems' },
      { name: 'CNC Jali', detail: 'Laser-cut MDF & MS jali screens — custom patterns' },
      { name: 'Name Plates', detail: 'Backlit acrylic, SS & brass name plates — custom designed' },
      { name: 'Main Door', detail: 'Solid wood, fibre, steel & composite main doors — custom crafted' },
    ],
    includes: ['Concept to installation', 'Custom design options', 'Digital lock integration', 'Branded hardware'],
  },
  {
    id: '06',
    title: 'Balcony',
    tagline: 'Your outdoor escape. Designed with care.',
    image: '',
    desc: 'Balconies are often the most neglected space in Indian homes. We transform them into premium outdoor retreats — weather-resistant, stylish, and functional — with PVC ceiling systems that are both beautiful and durable.',
    items: [
      { name: 'PVC Ceiling', detail: 'Premium PVC false ceiling — weather-resistant, anti-fungal, easy-clean' },
    ],
    includes: ['Waterproofing consultation', 'Weather-resistant materials', 'Concealed lighting integration', 'Low-maintenance finishes'],
  },
  {
    id: '07',
    title: 'Wallpapers',
    tagline: 'Your walls, your story.',
    image: '',
    desc: 'Wallpapers are the quickest way to transform a room. We offer fully custom-designed wallpapers — from photomurals and geometric prints to textured and metallic finishes — printed and installed to perfection.',
    items: [
      { name: 'Custom Designed Wallpapers', detail: 'Photomural · Geometric · Floral · Abstract · Textured · Metallic' },
    ],
    includes: ['Custom design service', 'Premium imported materials', 'Professional installation', 'Free samples before order'],
  },
  {
    id: '08',
    title: 'Tiles',
    tagline: 'Surfaces that define the space.',
    image: '',
    desc: 'The right tile can transform a bathroom, kitchen, or living space from ordinary to extraordinary. We source and supply premium tiles — from large-format full body to handcrafted marble — and handle installation with millimetre precision.',
    items: [
      { name: 'Full Body Tiles', detail: 'Large format 800×1600, 1200×2400 — matte, glossy, textured' },
      { name: 'Ceramic Tiles', detail: 'Wall & floor ceramics for kitchens, bathrooms & balconies' },
      { name: 'Marbles', detail: 'Italian & Indian marble — Statuario, Carrara, Makrana & more' },
    ],
    includes: ['Supply & installation', 'Waterproofing included', 'Grout colour selection', 'Surplus management'],
  },
  {
    id: '09',
    title: 'Lighting Design',
    tagline: 'Light is the most powerful design element.',
    image: '',
    desc: 'We treat lighting as a living material. Our lighting design service creates layered systems — ambient, accent, task, and dramatic — that sculpt the mood of every space at every hour. We specify, source, and install complete lighting ecosystems tailored to your lifestyle.',
    items: [
      { name: 'Panel Lights', detail: 'Surface-mounted panels · Recessed rectangle panels' },
      { name: 'Profile Lights', detail: 'Aluminium LED profile strips — warm white & CCT tunable' },
      { name: 'Magnetic Lights', detail: 'Modular magnetic track-based adjustable spotlights' },
      { name: 'Spot Lights', detail: 'Recessed & surface spots in fixed and gimbal designs' },
      { name: 'Track Lights', detail: 'Single & three-circuit tracks for kitchen & feature areas' },
      { name: 'Cove Lights', detail: 'Concealed LED cove lighting for false ceiling ambiance' },
    ],
    includes: ['Full lighting plan & zoning', 'Ambient, accent & task layers', 'Smart dimmer integration', 'Chandelier & statement fixture sourcing'],
  },
  {
    id: '10',
    title: 'Civil Work',
    tagline: 'Solid foundations. Flawless finishes.',
    image: '',
    desc: 'Great interiors demand great civil work underneath. Our civil team handles all structural and finishing work in-house — ensuring seamless integration with the interior design. No subcontracting, no surprises.',
    items: [
      { name: 'Painting', detail: 'Interior & exterior — textured, smooth, luxury emulsion & enamel' },
      { name: 'Plumbing', detail: 'New installations, repairs & upgrades — CP fittings to concealed systems' },
    ],
    includes: ['In-house civil team', 'Premium paint brands', 'Waterproofing treatments', 'Snagging & touch-up included'],
  },
  {
    id: '11',
    title: 'Commercial Spaces',
    tagline: 'Spaces that work as hard as you do.',
    image: '',
    desc: 'Commercial interiors require a different lens — function-first, brand-aligned, and built to impress clients. We design offices, shops, and mall spaces that boost productivity, attract customers, and reflect your brand identity.',
    items: [
      { name: 'Office Work', detail: 'Workstations, cabins, reception, conference rooms & pantries' },
      { name: 'Shop', detail: 'Retail fit-outs — display systems, billing counters & signage' },
      { name: 'Mall', detail: 'Large-scale commercial kiosks, brand stores & food courts' },
    ],
    includes: ['Brand identity integration', 'Ergonomic workspace planning', 'Commercial-grade materials', 'Fast-track delivery'],
  },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'A deep-dive consultation at your space. We understand your lifestyle, aspirations, and the emotion you want your home to evoke.' },
  { step: '02', title: 'Design', desc: 'We create a complete design concept — mood boards, 3D renders, material palettes — for your approval before a single nail is placed.' },
  { step: '03', title: 'Execution', desc: 'Our in-house craftsmen and verified contractors bring the design to life under meticulous supervision. Daily updates, zero surprises.' },
  { step: '04', title: 'Handover', desc: 'A final walkthrough, punch-list sign-off, and 10-year furniture warranty. Your extraordinary space is yours in 45 days.' },
];

const differentiators = [
  { title: 'In-House Craftsmen', desc: 'We do not outsource fabrication. Our workshop team ensures every joint, finish, and detail meets our exacting standards.' },
  { title: 'Fixed-Price Contracts', desc: 'No hidden costs, no scope creep. Your agreed budget is your final budget. This is our non-negotiable promise.' },
  { title: '5.0 Google Rating', desc: "Over 80 verified five-star reviews from Pune's most discerning homeowners. Our reputation is our greatest asset." },
  { title: '10-Year Warranty', desc: 'Every furniture piece comes with a full 10-year warranty. We stand behind our work, unconditionally.' },
];

export default function Services() {
  const [activeService, setActiveService] = useState(services[0]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ src: string, alt: string, detail: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-alabaster text-charcoal overflow-hidden">

      {/* ── BACKGROUND IMAGE REVEAL ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {services.map((s) => (
          <div key={s.id} className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: activeService.id === s.id ? 1 : 0 }}>
            <ManagedImage slotId={`service_bg_${s.id}`} defaultSrc={s.image} alt={s.title} fill className="object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-alabaster/88 backdrop-blur-[3px]" />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-7xl mx-auto pt-40 px-6 md:px-12 pb-4">
        <motion.p
          className="text-xs uppercase tracking-[0.4em] text-brass mb-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
        >
          One-Stop Solution for All Interior Works
        </motion.p>
        <motion.h1
          className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none mb-6"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Our<br /><span className="text-brass">Disciplines</span>
        </motion.h1>

        {/* Trust strip */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
        >
          {['45-Day Handover', '10-Year Furniture Warranty', 'European Hardware', 'Hettich · Blum · Grass'].map((b) => (
            <span key={b} className="text-[9px] uppercase tracking-widest border border-brass/50 text-brass px-3 py-1.5 bg-brass/5">
              {b}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── SERVICE ACCORDION LIST ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <div className="flex flex-col w-full border-t border-charcoal/15">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="border-b border-charcoal/15"
              onMouseEnter={() => setActiveService(service)}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              {/* Header row */}
              <button
                className="w-full flex flex-col md:flex-row md:items-center justify-between py-8 text-left relative overflow-hidden group cursor-none magnetic-target"
                onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
              >
                <div className="flex items-start gap-8 z-10 transition-colors duration-500">
                  <span className="text-lg font-serif text-charcoal/40 transition-colors mt-1">{service.id}</span>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-serif italic tracking-tighter transition-colors duration-300 group-hover:text-brass">{service.title}</h2>
                    <p className="text-sm font-sans opacity-60 mt-1 tracking-wide">{service.tagline}</p>
                  </div>
                </div>
                <span className="mt-4 md:mt-0 z-10 text-sm uppercase tracking-widest transition-all duration-500 group-hover:text-brass">
                  {expandedId === service.id ? 'Close ↑' : 'Details →'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {expandedId === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-16">
                      {/* Description */}
                      <p className="font-sans text-charcoal/60 leading-relaxed mb-10 text-sm max-w-2xl">{service.desc}</p>

                      {/* ── PROFESSIONAL SUB-ITEM CARD GRID ── */}
                      <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="w-6 h-px bg-brass" />
                          <p className="text-[10px] uppercase tracking-[0.3em] text-brass">What&apos;s Included</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {service.items.map((item, j) => {
                            const slotId = `service_item_${service.id}_${j}`;
                            const defaultLightboxSrc = '';
                            const defaultCardSrc = '';

                            return (
                              <button
                                key={j}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const activeUrl = getImage(slotId, defaultLightboxSrc);
                                  setLightboxImg({ src: activeUrl, alt: item.name, detail: item.detail });
                                }}
                                className="relative block w-full text-left aspect-[4/3] overflow-hidden group cursor-none magnetic-target"
                              >
                                {/* Image */}
                                <ManagedImage
                                  slotId={slotId}
                                  defaultSrc={defaultCardSrc}
                                  alt={item.name}
                                  fill
                                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                {/* Permanent dark gradient — always readable */}
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                                {/* Hover brass tint */}
                                <div className="absolute inset-0 bg-brass/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Number badge */}
                                <div className="absolute top-3 left-3 w-7 h-7 bg-charcoal/70 border border-alabaster/20 flex items-center justify-center">
                                  <span className="text-[9px] text-brass font-serif">{String(j + 1).padStart(2, '0')}</span>
                                </div>

                                {/* Brass corner bracket on hover */}
                                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-brass opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                {/* Text — always visible at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <p className="font-serif italic text-alabaster text-base leading-tight mb-1">
                                    {item.name}
                                  </p>
                                  <p className="font-sans text-alabaster/60 text-[10px] uppercase tracking-wider leading-snug">
                                    {item.detail}
                                  </p>
                                  {/* Enquire link hint */}
                                  <p className="text-brass text-[9px] uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    View Details →
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ── PROMISE + IMAGE + CTA ── */}
                      <div className="grid md:grid-cols-2 gap-10 items-start border-t border-charcoal/10 pt-10">
                        {/* Promise list */}
                        <div>
                          <div className="flex items-center gap-4 mb-5">
                            <span className="w-6 h-px bg-brass" />
                            <p className="text-[10px] uppercase tracking-[0.3em] text-brass">Our Promise</p>
                          </div>
                          <div className="flex flex-col gap-4">
                            {service.includes.map((inc, j) => (
                              <div key={j} className="flex items-start gap-4 group">
                                <span className="text-brass font-serif text-lg leading-none shrink-0 mt-0.5">✦</span>
                                <span className="text-sm font-sans text-charcoal/70 leading-relaxed group-hover:text-charcoal transition-colors duration-300">{inc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Service image + CTA */}
                        <div className="flex flex-col gap-4">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <ManagedImage
                              slotId={`service_bg_${service.id}`}
                              defaultSrc={service.image}
                              alt={service.title} fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <p className="text-[10px] uppercase tracking-widest text-brass mb-1">Jay Interiors</p>
                              <p className="font-serif italic text-alabaster text-lg">{service.title}</p>
                            </div>
                          </div>
                          <a
                            href={`https://wa.me/919876543210?text=Hi, I'm interested in ${encodeURIComponent(service.title)} services`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-alabaster font-sans uppercase tracking-widest text-xs font-medium hover:bg-brass hover:text-charcoal transition-colors duration-400 group"
                          >
                            <span>Enquire About {service.title}</span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MATERIAL & FINISH LIBRARY ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-alabaster text-charcoal border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">The Finishes</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">Material Library</h2>
            <p className="mt-4 font-sans text-charcoal/60 max-w-2xl">
              Experience our curated selection of premium finishes for modular kitchens and wardrobes. Sourced globally, engineered for Indian homes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'PU Lacquer', desc: 'High-gloss & Matte Polyurethane', color: 'bg-stone-300' },
              { name: 'Acrylic', desc: 'Scratch-resistant solid colors', color: 'bg-zinc-800 text-alabaster' },
              { name: 'Fluted Glass', desc: 'Textured translucent panels', color: 'bg-teal-900/20 backdrop-blur-md' },
              { name: 'Walnut Veneer', desc: 'Natural wood grain finishes', color: 'bg-amber-900/80 text-alabaster' },
              { name: 'Statuario Quartz', desc: 'Premium countertop surfaces', color: 'bg-gray-100' },
              { name: 'Brushed Brass', desc: 'European hardware accents', color: 'bg-[#C8A97E]' },
              { name: 'Laminate', desc: 'Textured & suede edge-banded', color: 'bg-stone-600 text-alabaster' },
              { name: 'Mild Steel', desc: 'Powder-coated frame structures', color: 'bg-charcoal text-alabaster' },
            ].map((mat, i) => (
              <div key={i} className={`aspect-square p-6 flex flex-col justify-end group cursor-none magnetic-target transition-transform hover:scale-95 ${mat.color}`}>
                <h3 className="font-serif italic text-xl mb-1">{mat.name}</h3>
                <p className="font-sans text-[10px] uppercase tracking-widest opacity-70">{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT THE STUDIO CTA ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-charcoal text-alabaster overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <ManagedImage slotId="service_studio_cta" defaultSrc='' alt="Jay Interiors Studio" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-6">Experience It Live</p>
            <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter leading-none mb-6">
              Touch. Feel.<br />Believe.
            </h2>
            <p className="font-sans text-alabaster/70 leading-relaxed mb-8">
              Words and pictures can only say so much. We invite you to our Baner studio to experience the smooth glide of a Hettich drawer, the flawless finish of PU paint, and the sturdy build of our modular units firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="https://wa.me/919876543210?text=I'd like to book a studio visit" target="_blank" rel="noopener noreferrer"
                className="magnetic-target cursor-none px-10 py-5 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
              >
                Book a Studio Visit →
              </a>
              <div className="flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest text-brass">Baner, Pune</p>
                <p className="text-sm font-sans opacity-60 mt-1">Open Mon-Sat, 10 AM - 7 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-charcoal text-alabaster">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">How We Work</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">The Process</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-alabaster/10">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                className="bg-charcoal p-8 flex flex-col gap-4 group hover:bg-brass/10 transition-colors duration-500"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <span className="text-4xl font-serif italic text-brass">{p.step}</span>
                <h3 className="text-xl font-serif">{p.title}</h3>
                <p className="text-sm font-sans text-alabaster/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JAY INTERIORS ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-alabaster text-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Why Choose Us</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">The Jay<br />Difference</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                className="flex flex-col gap-4 border-t-2 border-brass pt-6"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <h3 className="text-xl font-serif">{d.title}</h3>
                <p className="text-sm font-sans opacity-60 leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-charcoal text-alabaster text-center">
        <motion.p className="text-xs uppercase tracking-[0.4em] text-brass mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Ready to Begin?
        </motion.p>
        <motion.h2
          className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
        >
          Let&apos;s Design<br />Your World.
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            className="magnetic-target cursor-none px-12 py-6 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
          >
            WhatsApp Us →
          </a>
          <Link href="/portfolio"
            className="magnetic-target cursor-none px-12 py-6 border border-alabaster/20 font-sans uppercase tracking-widest text-xs hover:border-brass hover:text-brass transition-colors duration-500"
          >
            See Our Work
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {mounted && createPortal(
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-4 md:p-8"
              onClick={() => setLightboxImg(null)}
            >
              {/* Close button hint */}
              <div className="absolute top-6 right-6 z-[10000] text-alabaster uppercase tracking-widest text-xs font-sans opacity-60 hover:opacity-100 cursor-pointer">
                Close ✕
              </div>
              
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-md overflow-hidden shadow-2xl border border-brass/20"
                style={{ display: 'inline-block' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.alt}
                  className="block w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay for text */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                  <p className="font-serif italic text-alabaster text-2xl md:text-4xl leading-tight mb-2 drop-shadow-lg">
                    {lightboxImg.alt}
                  </p>
                  <p className="font-sans text-brass text-[10px] md:text-xs uppercase tracking-widest leading-snug drop-shadow-md">
                    {lightboxImg.detail}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </main>
  );
}
