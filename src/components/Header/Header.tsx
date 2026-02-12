'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'En' },
  { code: 'ko', label: 'Ko' },
  { code: 'id', label: 'Id' },
] as const;

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
  lang: string;
}

export default function Header({ dict, lang }: HeaderProps) {
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    if (langOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [langOpen]);

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

  const switchLanguage = (targetLang: string) => {
    setLangOpen(false);
    if (targetLang === lang) return;
    router.push(`/${targetLang}`);
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
          href={`/${lang}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/${lang}`);
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
            priority
            quality={100}
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

          {/* Divider */}
          <div className="w-px h-5 bg-[#dedfe9]" aria-hidden="true" />

          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className={cn(
                'flex items-center gap-1 rounded-full',
                'hover:opacity-80 transition-opacity',
                'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2'
              )}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <Image
                src="/images/common/icons/icon-language.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
              <span className="text-[#363a5b] text-base font-medium tracking-[-0.08px]">
                {currentLang.label}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={cn(
                  'transition-transform duration-200',
                  langOpen && 'rotate-180'
                )}
                aria-hidden="true"
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="#363a5b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {langOpen && (
              <ul
                role="listbox"
                aria-label="Language options"
                className={cn(
                  'absolute top-full right-0 mt-2',
                  'bg-white rounded-xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]',
                  'py-2 min-w-[100px] z-50',
                  'animate-in fade-in slide-in-from-top-2 duration-150'
                )}
              >
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={l.code === lang}
                      onClick={() => switchLanguage(l.code)}
                      className={cn(
                        'w-full px-4 py-2 text-left text-sm font-medium tracking-[-0.08px]',
                        'transition-colors',
                        l.code === lang
                          ? 'text-[#3e14b4] bg-[#f0f5ff]'
                          : 'text-[#363a5b] hover:bg-[#f5f5f5]'
                      )}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
