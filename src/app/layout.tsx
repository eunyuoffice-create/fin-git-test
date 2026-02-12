import type { Metadata, Viewport } from 'next';
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
  display: 'optional',
  preload: false,
});

export const viewport: Viewport = {
  width: 1440,
};

export const metadata: Metadata = {
  title: 'FinSight AI: Agentic AI for Precise MSME Credit Underwriting',
  description: 'Beyond OCR. FinSight AI uses Agentic AI to deliver autonomous bank statement analysis and forgery detection for MSMEs and thin-filers in just 5 minutes.',
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
