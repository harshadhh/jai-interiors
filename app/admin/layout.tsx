import './admin.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel — Jay Interiors',
  description: 'Image management admin panel for Jay Interiors website.',
  robots: { index: false, follow: false },
};

/**
 * Admin layout — intentionally excludes the main site Navigation and Footer.
 * The admin panel has its own self-contained UI.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {children}
    </div>
  );
}
