'use client';

import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <main className="bg-charcoal text-alabaster overflow-hidden min-h-screen pt-40 pb-24 px-6 md:px-12">
      <motion.div 
        className="max-w-4xl mx-auto font-sans leading-relaxed text-alabaster/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-serif italic mb-12 text-alabaster">Privacy Policy</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">1. Introduction</h2>
            <p>We respect your privacy and are committed to protecting your personal data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">2. Information We Collect</h2>
            <p className="mb-2">We may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, phone number, email address</li>
              <li>Project requirements and preferences</li>
              <li>Location and property details</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">3. How We Use Information</h2>
            <p className="mb-2">Your information is used to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide design consultation and services</li>
              <li>Contact you regarding your inquiry</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">4. Data Sharing</h2>
            <p className="mb-2">We do not sell or rent your personal data. Data may be shared with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Internal team members</li>
              <li>Trusted vendors (for project execution only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">5. Data Security</h2>
            <p>We implement reasonable security measures to protect your data from unauthorized access.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">6. Cookies</h2>
            <p>Our website may use cookies to enhance user experience and track website performance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">7. Your Rights</h2>
            <p className="mb-2">You may request:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to your data</li>
              <li>Correction or deletion of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">8. Updates</h2>
            <p>This policy may be updated periodically.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">9. Contact</h2>
            <p>For privacy concerns, contact us at:<br/>Email: bishnoimsuresh@gmail.com</p>
          </section>
        </div>

        <hr className="border-alabaster/10 my-16" />

        <h1 className="text-4xl md:text-6xl font-serif italic mb-12 text-alabaster">Refund & Cancellation Policy</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">1. Booking Amount</h2>
            <p>All advance payments made to us are non-refundable.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">2. Project Cancellation</h2>
            <p className="mb-2">In case of cancellation:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Work completed will be billed proportionately</li>
              <li>Materials procured will be charged</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">3. Refund Eligibility</h2>
            <p className="mb-2">Refunds (if any) are applicable only if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We fail to initiate work within agreed timelines without valid reason</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">4. Timeline for Refund</h2>
            <p>Eligible refunds will be processed within 7–15 business days.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">5. Mode of Refund</h2>
            <p>Refunds will be processed via the original payment method.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">6. Non-Refundable Cases</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Change of mind after booking</li>
              <li>Delay caused by client</li>
              <li>Design approval given and work started</li>
            </ul>
          </section>
        </div>

        <p className="mt-16 text-sm opacity-50 uppercase tracking-widest">Last updated: June 2026</p>
      </motion.div>
    </main>
  );
}
