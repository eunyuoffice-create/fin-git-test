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

  // Measured translate values to center each article in viewport
  const centersRef = useRef<number[]>([]);

  // Measure article positions once (mount + resize)
  const measure = useCallback(() => {
    const text = textRef.current;
    if (!text) return;

    const vh = window.innerHeight;
    const textRect = text.getBoundingClientRect();
    const contentEls = text.querySelectorAll('[data-content]');
    const centers: number[] = [];

    contentEls.forEach((el) => {
      const elRect = el.getBoundingClientRect();
      // Position of content center relative to text container top
      const relCenter = elRect.top - textRect.top + elRect.height / 2;
      // Translate needed to put this center at viewport center
      centers.push(relCenter - vh / 2);
    });

    centersRef.current = centers;
  }, []);

  const onScroll = useCallback(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    const centers = centersRef.current;
    if (!wrapper || !text || centers.length === 0) return;

    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = wrapper.offsetHeight - vh;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

    const count = centers.length;

    // Stepped progress with smootherstep (Perlin)
    // → zero 1st & 2nd derivative at endpoints → strong pause at each item
    const expanded = progress * (count - 1);
    const seg = Math.min(Math.floor(expanded), count - 2);
    const f = Math.min(expanded - seg, 1);
    const eased = f * f * f * (f * (f * 6 - 15) + 10);

    // Interpolate between measured center positions
    const from = centers[seg];
    const to = centers[Math.min(seg + 1, count - 1)];
    const translate = from + (to - from) * eased;

    text.style.transform = `translate3d(0,${-translate}px,0)`;

    // Active image (snap to nearest item)
    const idx = Math.min(count - 1, Math.round(seg + eased));
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

    // Measure on mount and apply initial position immediately (no rAF delay)
    measure();
    onScroll();

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    const handleResize = () => {
      measure();
      onScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [onScroll, measure]);

  return (
    <div className="w-full px-[220px]">
      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `${(IMAGES.length + 1) * 100}vh` }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div className="w-[1000px] mx-auto flex gap-[80px] items-center">
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
            {/* Left - scrolling text */}
            <div className="flex-1 overflow-hidden h-screen">
              <div
                ref={textRef}
                className="will-change-transform"
                style={{
                  paddingTop: 'calc(50vh - 120px)',
                  paddingBottom: 'calc(50vh - 120px)',
                }}
              >
                {dict.section3.items.map((item, index) => (
                  <article
                    key={index}
                    className={cn('pb-[40vh]', index !== 0 ? 'pt-[40vh]' : '')}
                  >
                    <div data-content className="flex flex-col gap-[40px]">
                      <div className="flex flex-col gap-[24px]">
                        <div
                          className={cn(
                            'inline-flex items-center gap-[8px]',
                            'bg-[#3e14b4] px-[16px] py-[8px] rounded-[8px] w-fit',
                            'before:content-[""] before:w-6 before:h-6 before:flex-shrink-0',
                            'before:bg-no-repeat before:bg-center before:bg-contain',
                            index === 0 || index === 2
                              ? "before:bg-[url('/images/sections/section3/icon-badge_1.webp')]"
                              : "before:bg-[url('/images/sections/section3/icon-badge_2.webp')]"
                          )}
                        >
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
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
