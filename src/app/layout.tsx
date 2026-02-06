import type { Metadata } from 'next';
import './globals.css';

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
      <body className="font-poppins">{children}</body>
    </html>
  );
}
