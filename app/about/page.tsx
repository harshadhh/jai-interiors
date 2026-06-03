'use client';

import { motion } from 'motion/react';
import { ManagedImage } from '@/components/ManagedImage';
import Link from 'next/link';
import { useConfigSetting } from '@/hooks/useConfigStore';

const values = [
  {
    number: '01',
    title: 'Precision Over Speed',
    desc: 'We refuse to rush craft. Every project is given the time it deserves, because excellence cannot be manufactured on a deadline.',
  },
  {
    number: '02',
    title: 'Emotion Before Function',
    desc: 'A space must make you feel something before it serves a purpose. We design for the soul, then engineer for the body.',
  },
  {
    number: '03',
    title: 'Material Integrity',
    desc: 'We source only what is authentic. Natural stone, solid wood, hand-forged metal. No substitutes. No compromises.',
  },
  {
    number: '04',
    title: 'Client Partnership',
    desc: 'Your vision is the brief. We listen with the patience of architects and the intuition of artists to bring it to life.',
  },
];

const milestones = [
  { year: '2012', event: 'Jay Interiors founded in Baner, Pune by Dev & Suresh — a one-stop solution for all interior works.' },
  { year: '2015', event: 'Completed our 50th project — The Skyline Penthouse, Koregaon Park. Introduced 45-day handover guarantee.' },
  { year: '2018', event: 'Launched dedicated modular kitchen & end-to-end furniture division with European hardware partners.' },
  { year: '2021', event: 'Achieved 5.0 Google Rating. Introduced 10-Year Furniture Warranty — a Pune first. 100+ projects delivered.' },
  { year: '2024', event: 'Over 200 projects completed across residential, commercial & renovation. Pune\'s most trusted interior studio.' },
];

const reviews = [
  { author: 'Ananya Desai', stars: 5, text: 'Absolutely world-class. Dev personally visited every week to ensure quality. The kitchen they built for us is better than anything I\'ve seen in a 5-star hotel.' },
  { author: 'Rajesh Kulkarni', stars: 5, text: 'Suresh has an incredible eye. He transformed a dark, cramped flat in Kalyani Nagar into the most open, luminous space you can imagine. Pure magic.' },
  { author: 'Meera & Sachin Joshi', stars: 5, text: 'From the first concept meeting to final handover — seamless, professional, breathtaking. Jay Interiors is the gold standard.' },
];

export default function About() {
  const googleRatingValue = useConfigSetting('google_rating_value', '5.0');
  const googleRatingCount = useConfigSetting('google_rating_count', '80+');
  const contactWhatsapp = useConfigSetting('contact_whatsapp', '919876543210');

  return (
    <main className="bg-charcoal text-alabaster overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24 px-6 md:px-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brass/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.p
              className="text-xs uppercase tracking-[0.4em] text-brass mb-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Est. 2012 · Baner, Pune
            </motion.p>
            <motion.h1
              className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none mb-8"
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              The<br />Architects<br />of <span className="text-brass">Awe.</span>
            </motion.h1>
            <motion.p
              className="text-lg font-sans text-alabaster/70 max-w-md leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Jay Interiors are not decorators. We are spatial visionaries redefining luxury in Pune — combining raw architectural precision with soft, sensual interior details.
            </motion.p>

            {/* Trust Pillar */}
            <motion.div
              className="inline-flex items-center gap-4 bg-alabaster/10 backdrop-blur-md border border-alabaster/20 p-6 cursor-none magnetic-target"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="text-4xl">⭐</span>
              <div>
                <span className="text-3xl font-serif block">{googleRatingValue}</span>
                <span className="text-xs uppercase tracking-widest text-brass">Google Rating · {googleRatingCount} Reviews</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative aspect-[3/4] w-full overflow-hidden group magnetic-target cursor-none"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <ManagedImage
              slotId="about_hero_founders"
              defaultSrc="https://picsum.photos/seed/founders-team/800/1000"
              alt="Jay Interiors — Dev & Suresh, Founders"
              fill
              priority
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-serif italic text-2xl mb-1">Dev & Suresh</p>
              <p className="text-xs tracking-widest uppercase text-brass">Co-Founders, Jay Interiors</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-24 px-6 md:px-12 border-t border-alabaster/10">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-brass mb-16"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            The Minds Behind the Vision
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Dev */}
            <motion.div
              className="flex flex-col gap-6 group"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ManagedImage
                  slotId="about_dev_portrait"
                  defaultSrc="https://picsum.photos/seed/dev-founder/900/700"
                  alt="Dev — Principal Architect & Creative Director"
                  fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              </div>
              <div>
                <h2 className="text-3xl font-serif italic mb-1">Dev</h2>
                <p className="text-xs uppercase tracking-widest text-brass mb-4">Principal Architect & Creative Director</p>
                <p className="font-sans text-alabaster/70 leading-relaxed text-sm">
                  With over 15 years in high-end residential design, Dev brings an architect&apos;s structural rigour to every project. He personally oversees every Jay Interiors project from brief to 45-day handover — ensuring each space reflects the studio&apos;s commitment to precision, emotion, and lasting quality.
                </p>
              </div>
            </motion.div>

            {/* Suresh */}
            <motion.div
              className="flex flex-col gap-6 group md:mt-16"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ManagedImage
                  slotId="about_suresh_portrait"
                  defaultSrc="https://picsum.photos/seed/suresh-founder/900/700"
                  alt="Suresh — Senior Interior Designer & Project Director"
                  fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              </div>
              <div>
                <h2 className="text-3xl font-serif italic mb-1">Suresh</h2>
                <p className="text-xs uppercase tracking-widest text-brass mb-4">Senior Interior Designer & Project Director</p>
                <p className="font-sans text-alabaster/70 leading-relaxed text-sm">
                  Suresh is the master of material storytelling. From Italian marble to modular kitchens with European hardware (Hettich, Blum, Grass), he curates every surface with the precision of a sculptor. His expertise in end-to-end furniture and cabinetry has made Jay Interiors the first call for homeowners across Pune.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Hettich', 'Blum', 'Grass', 'Hafele'].map((b) => (
                    <span key={b} className="text-[9px] uppercase tracking-widest border border-brass/40 text-brass px-2 py-1">{b}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-24 px-6 md:px-12 bg-alabaster text-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-brass mb-6">Our Philosophy</p>
              <blockquote className="text-4xl md:text-5xl font-serif italic leading-snug tracking-tighter">
                &ldquo;Function follows emotion. A space must first make you <span className="text-brass">feel</span>, before it serves a purpose.&rdquo;
              </blockquote>
              <p className="mt-6 text-xs uppercase tracking-widest opacity-50">— Dev & Suresh, Founders</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
            >
              {values.map((v, i) => (
                <div key={v.number} className="border border-charcoal/10 p-6 flex flex-col gap-3 hover:border-brass/50 transition-colors duration-500">
                  <span className="text-3xl font-serif italic text-brass">{v.number}</span>
                  <h3 className="font-serif text-lg">{v.title}</h3>
                  <p className="text-xs font-sans leading-relaxed opacity-60">{v.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Our Journey</p>
            <h2 className="text-5xl font-serif italic tracking-tighter leading-none">A Decade of<br />Extraordinary</h2>
          </motion.div>

          <div className="flex flex-col gap-0 relative">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-alabaster/10 hidden md:block" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="flex gap-8 md:gap-16 items-start py-8 border-b border-alabaster/10 group"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <span className="text-xl font-serif italic text-brass shrink-0 w-16 md:w-20 group-hover:text-alabaster transition-colors duration-500">{m.year}</span>
                <p className="font-sans text-alabaster/70 leading-relaxed group-hover:text-alabaster transition-colors duration-500">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE WORKSHOP ── */}
      <section className="py-24 px-6 md:px-12 bg-charcoal text-alabaster">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
            <ManagedImage 
              slotId="about_workshop"
              defaultSrc="https://picsum.photos/seed/workshop1/800/1000"
              alt="Jay Interiors Workshop" 
              fill className="object-cover" 
            />
            <div className="absolute inset-0 border border-brass/30 m-4 pointer-events-none" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-6">Crafted In-House</p>
            <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter leading-none mb-8">
              The Artisan&apos;s <br />Sanctuary.
            </h2>
            <p className="font-sans text-alabaster/70 leading-relaxed mb-6">
              Unlike many design firms that outsource production, we operate our own state-of-the-art manufacturing facility. This allows us absolute control over quality, timelines, and precision.
            </p>
            <p className="font-sans text-alabaster/70 leading-relaxed mb-8">
              Our master craftsmen combine traditional woodworking techniques with modern German machinery to create modular kitchens, wardrobes, and bespoke furniture that stand the test of time.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-alabaster/10">
              <div>
                <span className="block text-3xl font-serif italic text-brass mb-2">10k+</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">Sq.Ft Factory Floor</span>
              </div>
              <div>
                <span className="block text-3xl font-serif italic text-brass mb-2">100%</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">In-House Production</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MATERIALS & SUSTAINABILITY ── */}
      <section className="py-24 px-6 md:px-12 bg-alabaster text-charcoal border-t border-alabaster/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Our Standards</p>
            <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter leading-none">
              Uncompromising Quality.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Core Materials', desc: 'We strictly use BWP (Boiling Water Proof) and MR (Moisture Resistant) grade plywood for all structural frameworks, ensuring decades of durability against Indian weather conditions.' },
              { title: 'Premium Finishes', desc: 'From high-gloss PU (Polyurethane) coating to anti-scratch Acrylic and edge-banded laminates, our surface finishes are sourced from top European and domestic manufacturers.' },
              { title: 'German Hardware', desc: 'A kitchen is only as good as its hinges. We exclusively partner with brands like Hettich, Blum, and Hafele for soft-close channels, lift-ups, and hinges with lifetime warranties.' },
            ].map((item, i) => (
              <div key={i} className="border border-charcoal/10 p-8 hover:border-brass/50 transition-colors">
                <h3 className="text-xl font-serif italic mb-4">{item.title}</h3>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section className="py-24 px-6 md:px-12 border-t border-alabaster/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Verified Reviews</p>
              <h2 className="text-5xl font-serif italic tracking-tighter leading-none">What Pune<br />Says About Us</h2>
            </div>
            <div className="flex items-center gap-4 bg-alabaster/5 border border-alabaster/10 px-8 py-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-brass text-xl">★</span>
                ))}
              </div>
              <div>
                <p className="text-2xl font-serif">{googleRatingValue} / 5.0</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Based on {googleRatingCount} Google Reviews</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                className="bg-alabaster/5 border border-alabaster/10 p-8 flex flex-col gap-5"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-brass text-sm">★</span>
                  ))}
                </div>
                <p className="font-sans text-alabaster/70 text-sm leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                <p className="font-serif text-alabaster mt-auto">{r.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT CTA ── */}
      <section className="py-24 px-6 md:px-12 border-t border-alabaster/10 text-center">
        <motion.p
          className="text-xs uppercase tracking-[0.4em] text-brass mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          Let&apos;s Build Together
        </motion.p>
        <motion.h2
          className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none mb-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
        >
          Your Dream Space<br />Awaits.
        </motion.h2>
        <motion.p
          className="font-sans text-alabaster/60 mb-12 text-sm tracking-wide"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
        >
          45-Day Handover · 10-Year Warranty · One-Stop Solution for All Interior Works
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href={`https://wa.me/${contactWhatsapp}`} target="_blank" rel="noopener noreferrer"
            className="magnetic-target cursor-none px-12 py-6 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500"
          >
            Start on WhatsApp →
          </a>
          <Link href="/portfolio"
            className="magnetic-target cursor-none px-12 py-6 border border-alabaster/20 font-sans uppercase tracking-widest text-xs hover:border-brass hover:text-brass transition-colors duration-500"
          >
            View Our Portfolio
          </Link>
        </div>
      </section>

    </main>
  );
}
