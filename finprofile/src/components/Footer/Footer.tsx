'use client';

import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

interface FooterProps {
  dict: {
    nav: {
      whyFinProfile: string;
      solutions: string;
      testimonial: string;
      team: string;
      requestDemo: string;
    };
    footer: {
      contact: string;
      email: string;
      address: string;
      ceo: string;
      copyright: string;
      explore: string;
      privacy: string;
      terms: string;
    };
  };
}

export default function Footer({ dict }: FooterProps) {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full px-4 py-16 md:px-8 lg:px-[220px] bg-[#2d3049] text-white">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Section - Logo & Contact */}
          <div>
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold mb-6 hover:opacity-80 transition-opacity"
            >
              FinProfile
            </button>

            <div className="space-y-3 text-sm text-gray-300">
              <p>
                {dict.footer.contact}{' '}
                <a href={`mailto:${dict.footer.email}`} className="hover:text-white transition-colors">
                  {dict.footer.email}
                </a>
              </p>
              <p>{dict.footer.address}</p>
              <p>{dict.footer.ceo}</p>
              <p className="mt-6 text-xs">{dict.footer.copyright}</p>
            </div>
          </div>

          {/* Right Section - Navigation */}
          <div>
            <h3 className="font-bold mb-6 text-sm tracking-wider">{dict.footer.explore}</h3>
            <nav className="space-y-3 text-sm text-gray-300 mb-8">
              <button
                onClick={() => scrollToSection('why-finprofile')}
                className="block hover:text-white transition-colors"
              >
                {dict.nav.whyFinProfile}
              </button>
              <button
                onClick={() => scrollToSection('solutions')}
                className="block hover:text-white transition-colors"
              >
                {dict.nav.solutions}
              </button>
              <button
                onClick={() => scrollToSection('testimonial')}
                className="block hover:text-white transition-colors"
              >
                {dict.nav.testimonial}
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className="block hover:text-white transition-colors"
              >
                {dict.nav.team}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block hover:text-white transition-colors"
              >
                {dict.nav.requestDemo}
              </button>
            </nav>

            <div className="space-y-3 text-sm text-gray-300 mb-8">
              <button className="block hover:text-white transition-colors">
                {dict.footer.privacy}
              </button>
              <button className="block hover:text-white transition-colors">
                {dict.footer.terms}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="inline-block">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
