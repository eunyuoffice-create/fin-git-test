import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const poppins = localFont({
  src: [
    { path: '../../public/fonts/poppins-light-webfont.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/poppins-regular-webfont.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/poppins-medium-webfont.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/poppins-semibold-webfont.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/poppins-bold-webfont.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

const lato = localFont({
  src: [
    { path: '../../public/fonts/Lato-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Lato-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Lato-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-lato',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'FinProfile - Financial Profile Management',
  description: 'Professional financial profile management solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${lato.variable} font-poppins`}>{children}</body>
    </html>
  );
}
