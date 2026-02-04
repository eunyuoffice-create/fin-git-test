'use client';

import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

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
      const offset = 96; // header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-6 md:px-8 lg:px-[220px]">
      <div className="backdrop-blur-[35px] bg-white/90 rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => router.push(pathname.split('/').slice(0, 2).join('/') || '/')}
            className="text-xl font-bold text-[#363a5b] hover:opacity-80 transition-opacity"
          >
            FinProfile
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-[#363a5b] font-medium">
          <button
            onClick={() => scrollToSection('why-finprofile')}
            className="hover:text-[#3b3f61] transition-colors"
          >
            {dict.nav.whyFinProfile}
          </button>
          <button
            onClick={() => scrollToSection('solutions')}
            className="hover:text-[#3b3f61] transition-colors"
          >
            {dict.nav.solutions}
          </button>
          <button
            onClick={() => scrollToSection('testimonial')}
            className="hover:text-[#3b3f61] transition-colors"
          >
            {dict.nav.testimonial}
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="hover:text-[#3b3f61] transition-colors"
          >
            {dict.nav.team}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#3b3f61] transition-colors"
          >
            {dict.nav.requestDemo}
          </button>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
