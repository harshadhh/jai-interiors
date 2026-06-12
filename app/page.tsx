'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ManagedImage } from '@/components/ManagedImage';
import Link from 'next/link';
import { useRef } from 'react';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { useConfigSetting } from '@/hooks/useConfigStore';

const stats = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '45 Days', label: 'Handover Guarantee' },
  { value: '10 Yrs', label: 'Furniture Warranty' },
];

const featuredProjects = [
  { id: 1, slotId: 'featured_1', title: 'The Penthouse', category: 'Luxury Residential', location: 'Baner Enclave, Pune', src: '', year: '2024' },
  { id: 2, slotId: 'featured_2', title: 'Villa 74', category: 'Modular Kitchen', location: 'Koregaon Park, Pune', src: '', year: '2024' },
  { id: 3, slotId: 'featured_3', title: 'Glass Pavilion', category: 'Fall & Ceiling', location: 'Aundh, Pune', src: '', year: '2023' },
];

const testimonials = [
  {
    quote: "Jay Interiors transformed our Baner apartment into a masterpiece. Every corner feels intentional, every material feels flawless. We get compliments every single day.",
    author: "Priya & Rohit Sharma",
    project: "The Whitefield Residence, Baner",
  },
  {
    quote: "Dev and Suresh have an extraordinary eye for detail. They understood our vision better than we did. The modular kitchen they designed is simply unparalleled.",
    author: "Ankur Mehta",
    project: "Villa 74, Koregaon Park",
  },
  {
    quote: "Working with Jay Interiors was the best decision we made for our home. Their craftsmanship is world-class and the result is beyond anything we imagined.",
    author: "Sneha & Vikram Kulkarni",
    project: "The Terrace Penthouse, Kalyani Nagar",
  },
];

const serviceCategories = [
  { icon: '🍳', title: 'Modular Kitchen', desc: 'Acrylic, Laminate & PU Deco finishes. SS trollies, pantry units & crockery cabinets.', color: 'from-amber-900/20' },
  { icon: '🛏️', title: 'Bedroom', desc: 'Hydraulic beds, wardrobes with organisers, study tables, wall décor & lofts.', color: 'from-slate-800/20' },
  { icon: '🛋️', title: 'Living Room', desc: 'TV units with louvers, mandir, false ceiling, partition & dining setups.', color: 'from-stone-800/20' },
  { icon: '🚪', title: 'Entrance Design', desc: 'Wall panelling, safety doors with digital locks, CNC jali & custom name plates.', color: 'from-zinc-800/20' },
  { icon: '🌿', title: 'Balcony', desc: 'Premium PVC ceiling & outdoor finishing for your private outdoor retreat.', color: 'from-green-900/20' },
  { icon: '🎨', title: 'Wallpapers', desc: 'Custom designed wallpapers tailored to your unique aesthetic vision.', color: 'from-purple-900/20' },
  { icon: '⬜', title: 'Tiles', desc: 'Full body tiles, ceramic tiles & marble — imported and premium domestic.', color: 'from-gray-800/20' },
  { icon: '💡', title: 'Lighting', desc: 'Panel, profile, magnetic, spot, track & cove lights — layered atmospheres.', color: 'from-yellow-900/20' },
  { icon: '🔨', title: 'Civil Work', desc: 'Professional painting & plumbing services integrated into every project.', color: 'from-orange-900/20' },
  { icon: '🏢', title: 'Commercial', desc: 'Office fit-outs, shop interiors & mall spaces designed to impress.', color: 'from-blue-900/20' },
  { icon: '📐', title: 'Fall & Ceiling', desc: 'Engineered false ceilings, cove lighting grids & volumetric space planning.', color: 'from-indigo-900/20' },
  { icon: '🔧', title: 'Renovation', desc: 'Full home & room renovation — from concept to completion in 45 days.', color: 'from-red-900/20' },
];

const hardwareBrands = ['Hettich', 'Blum', 'Grass', 'Hafele', 'Ebco'];


function FeaturedProjectCard({
  project,
  index,
}: {
  project: { id: number; slotId: string; title: string; category: string; location: string; src: string; year: string };
  index: number;
}) {
  const slugMap: Record<number, string> = {
    1: 'the-penthouse',
    2: 'villa-74',
    3: 'glass-pavilion',
  };
  const slug = slugMap[project.id];
  const title = useConfigSetting(`project_${slug}_title`, project.title);
  const category = useConfigSetting(`project_${slug}_category`, project.category);
  const client = useConfigSetting(`project_${slug}_client`, project.location);
  const year = useConfigSetting(`project_${slug}_year`, project.year);

  return (
    <motion.div
      className="relative group overflow-hidden cursor-none magnetic-target"
      style={{ marginTop: index === 1 ? '3rem' : 0 }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.9, delay: index * 0.15 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <ManagedImage
          slotId={project.slotId} defaultSrc={project.src} alt={title} fill
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-6">
        <p className="text-[10px] uppercase tracking-widest text-brass mb-2">{category} · {year}</p>
        <h3 className="text-2xl font-serif italic">{title}</h3>
        <p className="text-xs opacity-50 mt-1 font-sans tracking-wider">{client}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const googleRatingValue = useConfigSetting('google_rating_value', '5.0');
  const googleRatingCount = useConfigSetting('google_rating_count', '80+');
  const contactPhone = useConfigSetting('contact_phone', '+91 98765 43210');
  const contactWhatsapp = useConfigSetting('contact_whatsapp', '919876543210');

  return (
    <main className="bg-charcoal text-alabaster overflow-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          <ManagedImage
            slotId="hero_bg"
            defaultSrc=''
            alt="Jay Interiors — Luxury Interior Design Pune"
            fill priority
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        </motion.div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brass/10 rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-brass mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Baner, Pune · Est. 2012 · One-Stop Solution for All Interior Works
          </motion.p>

          <motion.h1
            className="text-[clamp(3rem,10vw,8rem)] font-serif italic tracking-tighter leading-none mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Where Space<br />Becomes<br /><span className="text-brass">Sculpture.</span>
          </motion.h1>

          {/* Mini badges */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {['45-Day Handover', '10-Year Warranty', 'Europe Hardware', `${googleRatingValue} Google Rating`].map((b) => (
              <span key={b} className="text-[9px] uppercase tracking-widest border border-brass/40 text-brass px-3 py-1">
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 items-start"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <a
              href={`https://wa.me/${contactWhatsapp}`} target="_blank" rel="noopener noreferrer"
              className="magnetic-target cursor-none px-10 py-5 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
            >
              Start Your Project →
            </a>
            <Link href="/portfolio"
              className="magnetic-target cursor-none px-10 py-5 border border-alabaster/30 font-sans uppercase tracking-widest text-xs hover:border-brass hover:text-brass transition-colors duration-500"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 right-12 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-16 bg-alabaster/40 overflow-hidden mt-2">
            <motion.div
              className="w-full h-full bg-brass origin-top"
              animate={{ scaleY: [0, 1, 0], y: ['0%', '0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP (PARTNERS & HARDWARE) ── */}
      <section className="bg-charcoal/50 border-y border-alabaster/10 py-8 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="text-[10px] uppercase tracking-widest font-sans whitespace-nowrap hidden md:block">
            Engineered With The World&apos;s Best
          </p>
          <div className="flex gap-8 md:gap-16 items-center overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
            {['Hettich', 'Blum', 'Grass', 'Hafele', 'Ebco', 'Saint-Gobain'].map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-serif italic whitespace-nowrap">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-t border-b border-alabaster/10 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-alabaster/10 md:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center px-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <span className="text-4xl md:text-5xl font-serif italic text-brass mb-2">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-50">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>



      {/* ── SERVICES GRID ── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">What We Do</p>
              <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">Our Disciplines</h2>
            </div>
            <Link href="/services" className="magnetic-target cursor-none hidden md:block text-xs uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-brass transition-all duration-300">
              Explore All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceCategories.map((svc, i) => (
              <motion.div
                key={svc.title}
                className={`relative group bg-gradient-to-br ${svc.color} to-charcoal border border-alabaster/10 p-6 flex flex-col gap-3 hover:border-brass/50 transition-all duration-500 cursor-none magnetic-target overflow-hidden`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <span className="text-3xl">{svc.icon}</span>
                <h3 className="text-lg font-serif tracking-tight">{svc.title}</h3>
                <p className="text-xs font-sans leading-relaxed opacity-50 group-hover:opacity-80 transition-opacity duration-500">{svc.desc}</p>
                <Link href="/services" className="text-[9px] uppercase tracking-widest text-brass opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-auto">
                  Learn More →
                </Link>
                {/* corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-brass/20 group-hover:border-t-brass/40 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/services"
              className="magnetic-target cursor-none px-10 py-5 border border-alabaster/20 font-sans uppercase tracking-widest text-xs hover:border-brass hover:text-brass transition-colors duration-500"
            >
              Explore All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section className="py-32 px-6 md:px-12 bg-alabaster text-charcoal">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-6">Who We Are</p>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none">
              We Don&apos;t<br />Decorate.<br /><span className="opacity-30">We Envision.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-lg font-sans text-charcoal/70 leading-relaxed">
              Jay Interiors is Pune&apos;s foremost end-to-end furniture & interior design studio. Founded by <strong className="text-charcoal">Dev</strong> and <strong className="text-charcoal">Suresh</strong>, we have spent over a decade crafting spaces that transcend the ordinary.
            </p>
            <p className="text-lg font-sans text-charcoal/70 leading-relaxed">
              From modular kitchens in Baner to bespoke penthouse interiors in Koregaon Park — every project delivered in <strong className="text-charcoal">45 days</strong> with a <strong className="text-charcoal">10-year furniture warranty</strong>.
            </p>

            {/* Hardware brands */}
            <div className="bg-charcoal/5 border border-charcoal/10 p-6">
              <p className="text-[9px] uppercase tracking-widest opacity-40 mb-3">Hardware We Trust</p>
              <div className="flex flex-wrap gap-3">
                {hardwareBrands.map((b) => (
                  <span key={b} className="text-xs uppercase tracking-widest border border-brass/50 text-brass px-4 py-2 font-sans font-medium">{b}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 bg-charcoal/5 border border-charcoal/10 p-6">
              <span className="text-3xl">⭐</span>
              <div>
                <p className="text-2xl font-serif">{googleRatingValue} Google Rating</p>
                <p className="text-xs uppercase tracking-widest text-brass mt-1">Verified by {googleRatingCount} Satisfied Clients</p>
              </div>
            </div>
            <Link href="/about" className="magnetic-target cursor-none text-xs uppercase tracking-widest text-brass hover:opacity-60 transition-opacity w-fit mt-2">
              Our Full Story →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE & AFTER TRANSFORMATIONS ── */}
      <section className="py-24 px-6 md:px-12 bg-charcoal text-alabaster border-t border-alabaster/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">The Jay Interiors Transformation</p>
            <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter leading-none mb-6">
              Vision to Reality.
            </h2>
            <p className="font-sans text-alabaster/60 max-w-2xl mx-auto">
              Swipe to see how we turn raw, uninspired spaces into breathtaking architectural sculptures. Every detail planned, every inch perfected.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-alabaster/5 p-2 border border-alabaster/10 rounded-sm">
            <BeforeAfterSlider 
              beforeImage=''
              afterImage=''
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-serif italic mb-2">The Noir Kitchen Remodel</h3>
              <p className="text-xs uppercase tracking-widest text-brass opacity-80">Baner, Pune · Delivered in 28 Days</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RENOVATION BANNER ── */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brass/20 via-brass/10 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
          <ManagedImage slotId="renovation_banner" defaultSrc='' alt="Renovation" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Complete Home Makeover</p>
            <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter leading-none mb-6">
              Renovation<br />Done <span className="text-brass">Right.</span>
            </h2>
            <p className="font-sans text-alabaster/70 leading-relaxed mb-8">
              From old to extraordinary — full home renovation services delivered in 45 days. Civil work, painting, plumbing, furniture and lighting. All under one roof.
            </p>
            <a
              href={`https://wa.me/${contactWhatsapp}`} target="_blank" rel="noopener noreferrer"
              className="magnetic-target cursor-none inline-flex px-10 py-5 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
            >
              Plan My Renovation →
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="py-24 px-6 md:px-12 border-t border-alabaster/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Selected Work</p>
              <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">The Vault</h2>
            </div>
            <Link href="/portfolio" className="magnetic-target cursor-none hidden md:block text-xs uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-brass transition-all duration-300">
              View All Projects →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {featuredProjects.map((project, i) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={i}
              />
            ))}
          </div>

          <div className="mt-8 flex md:hidden justify-center">
            <Link href="/portfolio" className="magnetic-target cursor-none text-xs uppercase tracking-widest opacity-60 hover:text-brass transition-all">
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 md:px-12 bg-charcoal relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brass/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Client Stories</p>
            <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none">
              Voices of<br /><span className="opacity-30">Satisfaction</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-alabaster/5 border border-alabaster/10 backdrop-blur-sm p-8 flex flex-col gap-6"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-brass text-sm">★</span>
                  ))}
                </div>
                <p className="font-sans text-alabaster/70 leading-relaxed text-sm italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto border-t border-alabaster/10 pt-6">
                  <p className="font-serif text-alabaster">{t.author}</p>
                  <p className="text-xs uppercase tracking-widest text-brass mt-1 opacity-70">{t.project}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden border-t border-alabaster/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-brass mb-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-none mb-12"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1 }}
          >
            Ready to Build<br />Something<br /><span className="text-brass">Extraordinary?</span>
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href={`https://wa.me/${contactWhatsapp}`} target="_blank" rel="noopener noreferrer"
              className="magnetic-target cursor-none px-12 py-6 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
            >
              WhatsApp Us Now →
            </a>
            <a href={`tel:${contactPhone.replace(/\s+/g, '')}`}
              className="magnetic-target cursor-none px-12 py-6 border border-alabaster/20 font-sans uppercase tracking-widest text-xs hover:border-brass hover:text-brass transition-colors duration-500"
            >
              Call {contactPhone}
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
