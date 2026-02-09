'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Section3Props {
  dict: {
    section3: {
      items: Array<{ badge: string; title: string; description: string }>;
    };
  };
}

const IMAGES = [
  '/images/sections/section3/ai-01.webp',
  '/images/sections/section3/ai-02.webp',
  '/images/sections/section3/ai-03.webp',
  '/images/sections/section3/ai-04.webp',
];

export default function Section3Features({ dict }: Section3Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    if (!wrapper || !text) return;

    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = wrapper.offsetHeight - vh;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    // Text scrolls up
    const maxTranslate = text.scrollHeight - vh;
    text.style.transform = `translate3d(0,${-progress * maxTranslate}px,0)`;

    // Active image
    const idx = Math.min(
      IMAGES.length - 1,
      Math.floor(progress * IMAGES.length)
    );
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActiveIndex(idx);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [onScroll]);

  return (
    <div className="w-full px-[220px]">
      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `${IMAGES.length * 100}vh` }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="w-[1000px] mx-auto flex gap-[80px] items-center">
            {/* Left - scrolling text */}
            <div className="flex-1 overflow-hidden h-screen">
              <div
                ref={textRef}
                className="will-change-transform"
                style={{ paddingTop: '30vh', paddingBottom: '30vh' }}
              >
                {dict.section3.items.map((item, index) => (
                  <article
                    key={index}
                    className="py-[40vh] flex flex-col gap-[40px]"
                  >
                    <div className="flex flex-col gap-[24px]">
                      <div
                        className={cn(
                          'inline-flex items-center gap-[8px]',
                          'bg-[#3e14b4] px-[16px] py-[8px] rounded-[8px] w-fit'
                        )}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                            fill="white"
                          />
                        </svg>
                        <span
                          className={cn(
                            'text-[16px] font-medium text-white',
                            'tracking-[-0.24px] font-poppins whitespace-pre-wrap'
                          )}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          'text-[40px] font-medium text-[#363a5b]',
                          'leading-[1.3] tracking-[-0.6px] font-poppins whitespace-pre-wrap'
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className={cn(
                        'text-[18px] text-[#7a7a7a]',
                        'leading-[1.4] tracking-[-0.27px] font-poppins whitespace-pre-wrap'
                      )}
                    >
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Right - fixed image with cross-fade */}
            <div className="w-[320px] h-[400px] flex-shrink-0 relative rounded-[24px] overflow-hidden">
              {IMAGES.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={dict.section3.items[index]?.title || ''}
                  width={320}
                  height={400}
                  quality={90}
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-out',
                  }}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <nav
            className="absolute right-[calc(50%-560px)] top-1/2 -translate-y-1/2 flex flex-col gap-3"
            aria-label="Feature navigation"
          >
            {IMAGES.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  activeIndex === index
                    ? 'bg-[#3e14b4] scale-150'
                    : 'bg-[#b9bfef]'
                )}
                aria-hidden="true"
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
