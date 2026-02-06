'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FooterProps {
  dict: {
    footer: {
      termsOfUse: string;
      privacyPolicy: string;
      contact: string;
      email: string;
      address: string;
      ceo: string;
      copyright: string;
    };
  };
}

export default function Footer({ dict }: FooterProps) {
  const linkClass = cn(
    'font-bold px-1 rounded',
    'hover:text-white transition-colors duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[#363a5b]'
  );

  return (
    <footer
      className="w-full bg-[#363a5b] px-5 md:px-[220px] py-10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div
        className={cn(
          'max-w-[1440px] mx-auto',
          'flex flex-col md:flex-row items-center md:items-start',
          'justify-between gap-8 md:gap-0'
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            'shrink-0 rounded',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-[#363a5b]'
          )}
          aria-label="FinProfile - Go to homepage"
        >
          <Image
            src="/images/logos/logo-white.svg"
            alt=""
            width={170}
            height={36}
            className="h-9 w-auto"
            aria-hidden="true"
          />
        </Link>

        {/* Right Section */}
        <div className="flex flex-col gap-6 items-center md:items-end">
          {/* Navigation Links */}
          <nav aria-label="Legal and contact links">
            <ul
              className={cn(
                'flex flex-wrap items-center justify-center gap-6',
                'text-base text-white/65 font-poppins leading-[1.4]'
              )}
            >
              <li>
                <Link href="/terms" className={linkClass}>
                  {dict.footer.termsOfUse}
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="block w-px h-3.5 bg-white/65" />
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="block w-px h-3.5 bg-white/65" />
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold">{dict.footer.contact}</span>
                <a
                  href={`mailto:${dict.footer.email}`}
                  className={cn(
                    'underline font-medium px-1 rounded',
                    'hover:text-white transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
                    'focus-visible:ring-offset-2 focus-visible:ring-offset-[#363a5b]'
                  )}
                >
                  <span className="sr-only">Send email to </span>
                  {dict.footer.email}
                </a>
              </li>
            </ul>
          </nav>

          {/* Company Information */}
          <div
            className={cn(
              'flex flex-col gap-2 items-center md:items-end',
              'text-base text-white/65 font-poppins leading-[1.4]'
            )}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <address className="not-italic font-medium">
                {dict.footer.address}
              </address>
              <span
                className="block w-px h-3.5 bg-white/65"
                aria-hidden="true"
              />
              <span className="font-bold">{dict.footer.ceo}</span>
            </div>
            <p className="text-sm font-medium">
              <small>{dict.footer.copyright}</small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
