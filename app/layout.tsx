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
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Jay Interiors | High-End Architectural & Interior Design Pune',
    template: '%s | Jay Interiors'
  },
  description: "Pune's premier interior design studio. Specializing in high-end modular kitchens, luxury residential spaces, home renovations, and bespoke architectural interiors in Baner, Pune.",
  keywords: [
    'interior designer near me',
    'interior designer in Pune',
    'best interior designers in Baner',
    'interior decorators in Pune',
    'modular kitchen Pune',
    'home renovation Pune',
    'Jay Interiors Pune',
    'luxury interior designers',
    'architects in Pune',
    'house interior design'
  ],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Jay Interiors | High-End Architectural & Interior Design Pune',
    description: "Pune's premier interior design studio. Specializing in high-end modular kitchens, luxury residential spaces, home renovations, and bespoke architectural interiors in Baner, Pune.",
    url: 'https://yourdomain.com',
    siteName: 'Jay Interiors',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jay Interiors | High-End Architectural & Interior Design Pune',
    description: "Pune's premier interior design studio. Specializing in modular kitchens and luxury interiors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-alabaster text-charcoal selection:bg-brass selection:text-alabaster">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'InteriorDesign',
              'name': 'Jay Interiors',
              'image': 'https://yourdomain.com/logo.png',
              '@id': 'https://yourdomain.com/#interior-design',
              'url': 'https://yourdomain.com',
              'telephone': '+91 98765 43210',
              'priceRange': '₹₹₹',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Baner',
                'addressLocality': 'Pune',
                'addressRegion': 'Maharashtra',
                'postalCode': '411045',
                'addressCountry': 'IN'
              },
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': 18.5590,
                'longitude': 73.7797
              },
              'openingHoursSpecification': [
                {
                  '@type': 'OpeningHoursSpecification',
                  'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  'opens': '10:00',
                  'closes': '18:00'
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  'dayOfWeek': 'Saturday',
                  'opens': '10:00',
                  'closes': '14:00'
                }
              ],
              'sameAs': [
                'https://wa.me/919876543210'
              ]
            })
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
