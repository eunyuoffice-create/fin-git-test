'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  dict: {
    nav: {
      whyFinProfile: string;
      solutions: string;
      testimonial: string;
      team: string;
      requestDemo: string;
    };
  };
}

export default function Header({ dict }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  const navButtonClass = cn(
    'leading-[23px] rounded',
    'hover:text-[#3b3f61] transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2'
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'flex items-center justify-center',
        'px-[220px] py-6'
      )}
      role="banner"
    >
      <div
        className={cn(
          'flex-1 max-w-[1000px]',
          'backdrop-blur-[35px] bg-white/90',
          'rounded-2xl shadow-[0px_4px_12px_0px_rgba(62,20,180,0.08)]',
          'px-10 py-6 flex items-center justify-between'
        )}
      >
        {/* Logo */}
        <a
          href={pathname.split('/').slice(0, 2).join('/') || '/'}
          onClick={(e) => {
            e.preventDefault();
            router.push(pathname.split('/').slice(0, 2).join('/') || '/');
          }}
          className={cn(
            'flex items-center rounded',
            'hover:opacity-80 transition-opacity',
            'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2'
          )}
          aria-label="FinProfile Home"
        >
          <Image
            src="/images/common/logos/logo.svg"
            alt="FinProfile"
            width={113}
            height={24}
            quality={90}
            priority
          />
        </a>

        {/* Navigation */}
        <nav
          className={cn(
            'flex items-center gap-6',
            'text-[#363a5b] text-base font-medium',
            'tracking-[-0.08px] font-poppins'
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          <button
            onClick={() => scrollToSection('why-finprofile')}
            onKeyDown={(e) => handleKeyDown(e, 'why-finprofile')}
            className={navButtonClass}
            type="button"
          >
            {dict.nav.whyFinProfile}
          </button>
          <button
            onClick={() => scrollToSection('solutions')}
            onKeyDown={(e) => handleKeyDown(e, 'solutions')}
            className={navButtonClass}
            type="button"
          >
            {dict.nav.solutions}
          </button>
          <button
            onClick={() => scrollToSection('testimonial')}
            onKeyDown={(e) => handleKeyDown(e, 'testimonial')}
            className={navButtonClass}
            type="button"
          >
            {dict.nav.testimonial}
          </button>
          <button
            onClick={() => scrollToSection('team')}
            onKeyDown={(e) => handleKeyDown(e, 'team')}
            className={navButtonClass}
            type="button"
          >
            {dict.nav.team}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            onKeyDown={(e) => handleKeyDown(e, 'contact')}
            className={navButtonClass}
            type="button"
          >
            {dict.nav.requestDemo}
          </button>
        </nav>
      </div>
    </header>
  );
}
