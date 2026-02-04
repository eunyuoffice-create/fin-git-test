'use client';

import { usePathname, useRouter } from 'next/navigation';

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

  return (
    <header className="sticky top-0 z-50 w-full min-w-[1000px] max-w-[1440px] mx-auto py-[24px]">
      <div className="min-w[1000px] backdrop-blur-[35px] bg-white/90 rounded-[16px] shadow-[0px_4px_12px_0px_rgba(62,20,180,0.08)] px-[16px] py-[12px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() =>
            router.push(pathname.split('/').slice(0, 2).join('/') || '/')
          }
          className="text-[20px] font-bold text-[#363a5b] hover:opacity-80 transition-opacity font-['Poppins',sans-serif]"
        >
          FinProfile
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-[24px] text-[#363a5b] text-[16px] font-medium tracking-[-0.08px] font-['Poppins',sans-serif]">
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
      </div>
    </header>
  );
}
