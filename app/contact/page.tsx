'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { sendContactEmail } from '@/lib/emailjs';
import { useConfigSetting } from '@/hooks/useConfigStore';

const projectTypes = [
  'Modular Kitchen',
  'Bedroom Furniture',
  'Living Room Design',
  'Entrance Design',
  'Fall & Ceiling',
  'Wallpapers',
  'Tiles',
  'Lighting Design',
  'Civil Work (Painting / Plumbing)',
  'Commercial Space (Office / Shop / Mall)',
  'Full Home Renovation',
  'Balcony',
  'Other',
];
const budgetRanges = ['₹5L – ₹15L', '₹15L – ₹30L', '₹30L – ₹60L', '₹60L – ₹1Cr', '₹1Cr+'];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Jay Interiors guarantees a 45-day handover for all standard residential projects. Modular kitchens are typically completed in 21–30 days. Full home renovations may take 45–90 days depending on scope. You receive a fixed timeline commitment at the time of signing.' },
  { q: 'What warranty do you offer on furniture?', a: 'All furniture manufactured by Jay Interiors comes with a 10-Year Furniture Warranty — covering structural integrity, hardware function, and finish quality. This is our promise to every client.' },
  { q: 'What hardware brands do you use?', a: 'We exclusively use European-standard hardware brands: Hettich (Germany), Blum (Austria), Grass (Austria), Hafele (Germany), and Ebco for accessories. These are the same brands used in luxury European kitchens.' },
  { q: 'Do you work outside Pune?', a: 'Our primary focus is Pune — Baner, Koregaon Park, Aundh, Kalyani Nagar, Wakad. For exceptional projects, we consider select outstation commissions. Contact us to discuss.' },
  { q: 'What is the minimum project budget?', a: 'Our services start at ₹5 Lakhs for focused single-room projects. Modular kitchens start at ₹3.5L. Full home renovations typically range from ₹25L to ₹1Cr+ depending on finishes and area.' },
  { q: 'Do you provide 3D renders before execution?', a: 'Absolutely. Every project receives a complete 3D render package, material sample presentation, and finish mock-ups before any fabrication or civil work begins. You approve everything first — zero surprises.' },
];

export default function Contact() {
  const contactPhone = useConfigSetting('contact_phone', '+91 98765 43210');
  const contactWhatsapp = useConfigSetting('contact_whatsapp', '919876543210');
  const contactEmail = useConfigSetting('contact_email', 'hello@jayinteriors.in');
  const contactAddress = useConfigSetting('contact_address', 'Baner, Pune — 411045');
  const studioHoursWeekdays = useConfigSetting('studio_hours_weekdays', '10:00 – 18:00');
  const studioHoursSaturday = useConfigSetting('studio_hours_saturday', '10:00 – 14:00');

  const contactInfo = [
    { label: 'WhatsApp', value: contactPhone, href: `https://wa.me/${contactWhatsapp}`, icon: '💬' },
    { label: 'Call Us', value: contactPhone, href: `tel:${contactPhone.replace(/\s+/g, '')}`, icon: '📞' },
    { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}`, icon: '✉️' },
    { label: 'Studio', value: contactAddress, href: 'https://maps.google.com', icon: '📍' },
  ];

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', projectType: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitError('');
    try {
      await sendContactEmail(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to send your inquiry. Please try again.';
      setSubmitError(msg);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="bg-charcoal text-alabaster overflow-hidden">

      {/* ── GLOW ORBS ── */}
      <div className="fixed top-1/3 left-1/4 w-[500px] h-[500px] bg-brass/8 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brass/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* ── HERO ── */}
      <section className="relative z-10 pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-xs uppercase tracking-[0.4em] text-brass mb-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          >
            Initiate Your Project
          </motion.p>
          <motion.h1
            className="text-[clamp(3rem,10vw,8rem)] font-serif italic tracking-tighter leading-none mb-6"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s Shape<br />Reality.
          </motion.h1>
          <motion.p
            className="font-sans text-alabaster/60 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
          >
            Tell us about your project. We respond within 4 business hours and offer a complimentary first consultation at your space.
          </motion.p>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 lg:gap-20">

          {/* ── CONTACT FORM (3 cols) ── */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center py-24 border border-alabaster/10 bg-alabaster/5 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-5xl mb-6">✦</span>
                <h2 className="text-3xl font-serif italic mb-4">Message Received.</h2>
                <p className="font-sans text-alabaster/60 max-w-sm leading-relaxed">
                  Thank you for reaching out. Dev or Suresh will personally contact you within 4 business hours.
                </p>
                <p className="text-xs uppercase tracking-widest text-brass mt-6">Jay Interiors · Baner, Pune</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Full Name *</label>
                    <input
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="bg-transparent border border-alabaster/20 px-5 py-4 font-sans text-sm text-alabaster placeholder:opacity-30 focus:border-brass focus:outline-none transition-colors duration-300 cursor-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Phone Number *</label>
                    <input
                      type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-transparent border border-alabaster/20 px-5 py-4 font-sans text-sm text-alabaster placeholder:opacity-30 focus:border-brass focus:outline-none transition-colors duration-300 cursor-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="bg-transparent border border-alabaster/20 px-5 py-4 font-sans text-sm text-alabaster placeholder:opacity-30 focus:border-brass focus:outline-none transition-colors duration-300 cursor-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Project Type *</label>
                    <select
                      name="projectType" required value={formData.projectType} onChange={handleChange}
                      className="bg-charcoal border border-alabaster/20 px-5 py-4 font-sans text-sm text-alabaster focus:border-brass focus:outline-none transition-colors duration-300 cursor-none appearance-none"
                    >
                      <option value="" disabled>Select a type</option>
                      {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Budget Range</label>
                    <select
                      name="budget" value={formData.budget} onChange={handleChange}
                      className="bg-charcoal border border-alabaster/20 px-5 py-4 font-sans text-sm text-alabaster focus:border-brass focus:outline-none transition-colors duration-300 cursor-none appearance-none"
                    >
                      <option value="" disabled>Select budget</option>
                      {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">Tell Us About Your Project</label>
                  <textarea
                    name="message" rows={5} value={formData.message} onChange={handleChange}
                    placeholder="Describe your space, your vision, and what you hope to achieve..."
                    className="bg-transparent border border-alabaster/20 px-5 py-4 font-sans text-sm text-alabaster placeholder:opacity-30 focus:border-brass focus:outline-none transition-colors duration-300 resize-none cursor-none"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-400 font-sans tracking-wide">
                    ⚠️ {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="magnetic-target cursor-none px-10 py-5 bg-brass text-charcoal font-sans uppercase tracking-widest text-xs font-bold hover:bg-alabaster transition-colors duration-500 w-full md:w-auto md:self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Sending...' : 'Submit Enquiry →'}
                </button>
                <p className="text-[10px] uppercase tracking-widest opacity-30">We respect your privacy. No spam, ever.</p>
              </form>
            )}
          </div>

          {/* ── CONTACT INFO (2 cols) ── */}
          <div className="md:col-span-2 flex flex-col gap-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brass mb-6">Reach Us Directly</p>
              <div className="flex flex-col gap-4">
                {contactInfo.map((c) => (
                  <a
                    key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                    className="magnetic-target cursor-none flex items-center gap-5 border border-alabaster/10 p-5 hover:border-brass/50 hover:bg-alabaster/5 transition-all duration-300 group"
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest opacity-40 mb-1">{c.label}</p>
                      <p className="font-sans text-sm group-hover:text-brass transition-colors duration-300">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-alabaster/10 pt-10">
              <p className="text-[10px] uppercase tracking-widest text-brass mb-4">Studio Hours</p>
              <div className="flex flex-col gap-3 font-sans text-sm">
                <div className="flex justify-between opacity-70">
                  <span>Monday – Friday</span>
                  <span>{studioHoursWeekdays}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>Saturday</span>
                  <span>{studioHoursSaturday}</span>
                </div>
                <div className="flex justify-between opacity-40">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="border-t border-alabaster/10 pt-10">
              <p className="text-[10px] uppercase tracking-widest text-brass mb-6">Quick Connect</p>
              <a
                href={`https://wa.me/${contactWhatsapp}`} target="_blank" rel="noopener noreferrer"
                className="magnetic-target cursor-none w-full flex items-center justify-center gap-3 px-6 py-5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-sans uppercase tracking-widest text-xs font-bold hover:bg-[#25D366]/20 transition-colors duration-500"
              >
                <span className="text-lg">💬</span> WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 border-t border-alabaster/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-brass mb-4">Common Questions</p>
            <h2 className="text-5xl font-serif italic tracking-tighter leading-none">FAQ</h2>
          </div>

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border-b border-alabaster/10"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <button
                  className="magnetic-target cursor-none w-full flex justify-between items-center py-7 text-left gap-6"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <span className="font-serif text-lg md:text-xl">{faq.q}</span>
                  <span className={`text-brass text-xl shrink-0 transition-transform duration-300 ${expandedFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <motion.div
                  animate={{ height: expandedFaq === i ? 'auto' : 0, opacity: expandedFaq === i ? 1 : 0 }}
                  initial={false}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 font-sans text-alabaster/60 leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
