'use client';

import { motion } from 'motion/react';

export default function TermsConditions() {
  return (
    <main className="bg-charcoal text-alabaster overflow-hidden min-h-screen pt-40 pb-24 px-6 md:px-12">
      <motion.div 
        className="max-w-4xl mx-auto font-sans leading-relaxed text-alabaster/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-serif italic mb-12 text-alabaster">Terms & Conditions</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">1. Introduction</h2>
            <p>Welcome to our website. These Terms & Conditions govern your use of our website and services. By accessing our website, submitting an inquiry, or engaging our services, you agree to comply with and be bound by these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Company:</strong> We / Us</li>
              <li><strong>Client:</strong> Any individual or entity availing our services</li>
              <li><strong>Services:</strong> Interior design, renovation, and turnkey project execution</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">3. Scope of Services</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We provide end-to-end interior and construction solutions as per the agreed design, specifications, and Bill of Quantities (BOQ).</li>
              <li>Any work beyond the finalized scope will be treated as additional work and charged accordingly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">4. Design & Approval</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Design concepts and layouts will be shared for approval prior to execution.</li>
              <li>Up to 2 revisions are included.</li>
              <li>Any changes after approval details will incur additional costs and may impact project timelines.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">5. Pricing & Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>20% advance before project commencement.</li>
              <li>Stage-wise payments linked to predefined milestones.</li>
              <li>Full and final payment must be cleared before project handover.</li>
              <li><strong>Late Payment Policy:</strong> Delayed payments may attract interest of up to 1.5% per month and may result in temporary suspension of services or delayed timeline of project.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">6. Material Procurement & Pricing</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Materials will be sourced as per approved selections.</li>
              <li>Prices are subject to market fluctuations.</li>
              <li>Any significant increase in costs may lead to revised pricing with prior intimation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">7. Project Timeline</h2>
            <p className="mb-2">Project timelines are indicative and depend on:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Timely client approvals</li>
              <li>Site readiness</li>
              <li>Availability of materials</li>
              <li>Act of God</li>
              <li>Strike and Holidays</li>
            </ul>
            <p>Delays arising from these factors or unforeseen circumstances shall not constitute a breach of contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">8. Site Readiness & Client Responsibilities</h2>
            <p className="mb-2">The Client is responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Providing uninterrupted access to the site</li>
              <li>Ensuring availability of electricity and water</li>
              <li>Giving timely approvals and decisions</li>
              <li>Any Govt approval or complaints</li>
            </ul>
            <p>Any delay caused due to the above may impact delivery timelines.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">9. Third-Party Services</h2>
            <p>Certain services may involve third-party vendors. While we ensure quality standards, we shall not be liable for delays or issues arising from third-party services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">10. Cancellation & Termination</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Advance payments are non-refundable.</li>
              <li>In case of project cancellation: Work completed will be billed proportionately and materials procured will be chargeable.</li>
              <li>We reserve the right to suspend or terminate services in case of non-payment or breach of terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">11. Intellectual Property</h2>
            <p>All designs, drawings, concepts, and creatives remain our intellectual property and may not be reused or reproduced without prior written consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">12. Limitation of Liability</h2>
            <p className="mb-2">We shall not be liable for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Prior structural defects of the property</li>
              <li>Delays caused by external or uncontrollable factors</li>
            </ul>
            <p>Total liability shall be limited to the amount paid by the Client.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">13. Force Majeure</h2>
            <p>We shall not be held responsible for delays or failure in performance due to events beyond our control, including but not limited to natural disasters, labor strikes, government restrictions, or supply chain disruptions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">14. Portfolio & Marketing Rights</h2>
            <p>We reserve the right to use images, videos, and details of completed projects for marketing, promotional, and portfolio purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">15. Governing Law & Jurisdiction</h2>
            <p>These Terms & Conditions shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Delhi/NCR or Pune/Maharashtra area.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic text-brass mb-4">16. Digital Acceptance</h2>
            <p>By using our website, submitting inquiries, or making any payment, you confirm that you have read, understood, and agreed to these Terms & Conditions.</p>
          </section>
        </div>

        <p className="mt-16 text-sm opacity-50 uppercase tracking-widest">Last updated: June 2026</p>
      </motion.div>
    </main>
  );
}
