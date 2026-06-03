import type {Metadata} from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css'; // Global styles
import { Providers } from '@/components/Providers';
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Jay Interiors | High-End Architectural & Interior Design',
  description: 'Pune\'s premier architectural and interior design firm, creating bespoke, avant-garde spaces for luxury living.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-alabaster text-charcoal selection:bg-brass selection:text-alabaster">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
