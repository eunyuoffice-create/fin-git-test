'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';
import Image from 'next/image';
function CountUp({
  target,
  suffix,
  delay = 0,
  duration = 800,
  numberClassName = '',
  suffixClassName = '',
}: {
  target: number;
  suffix: string;
  delay?: number;
  duration?: number;
  numberClassName?: string;
  suffixClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setCount(target);
      setShowSuffix(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
          setCount(0);
          setShowSuffix(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!visible) return;

    let rafId: number;
    let startTime: number | null = null;

    const delayTimeout = setTimeout(() => {
      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(target * eased));

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setTimeout(() => setShowSuffix(true), 200);
        }
      };
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [visible, delay, duration, target]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <span className={numberClassName}>{count > 0 ? count : '\u00A0'}</span>
      <span
        className={suffixClassName}
        style={{
          opacity: showSuffix ? 1 : 0,
          transform: showSuffix ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        }}
      >
        {suffix}
      </span>
    </span>
  );
}

interface Section2Props {
  dict: {
    section2: {
      title: string;
      finsightAI: string;
      manual: {
        perLoan: string;
        timeValue: string;
        timeUnit: string;
        timeDetail: string;
        descriptions: string[];
      };
      ai: {
        perLoan: string;
        timeValue: string;
        timeUnit: string;
        description: string;
      };
    };
  };
}

export default function Section2CreditReview({ dict }: Section2Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const leftEl = leftRef.current;
    const rightEl = rightRef.current;
    if (!el || !leftEl || !rightEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      leftEl.classList.add('scroll-revealed');
      rightEl.classList.add('scroll-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          leftEl.style.transitionDelay = '0ms';
          leftEl.classList.add('scroll-revealed');
          rightEl.style.transitionDelay = '270ms';
          rightEl.classList.add('scroll-revealed');
        } else {
          // Instant reset: disable transition → remove class → double-rAF re-enable
          [leftEl, rightEl].forEach((panel) => {
            panel.style.transition = 'none';
            panel.classList.remove('scroll-revealed');
            panel.style.transitionDelay = '0ms';
          });
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (sectionRef.current) {
                [leftEl, rightEl].forEach((panel) => {
                  panel.style.transition = '';
                });
              }
            });
          });
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className={cn(
        'w-full pt-[80px] pb-[100px]',
        'relative overflow-hidden'
      )}
      style={{
        background: 'linear-gradient(180deg, #F2F6FF 0%, #E6EEFF 100%)',
      }}
      aria-labelledby="section2-title"
    >
      {/* Decorative gradient orbs (replaces expensive blur filter) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: '620px',
            height: '620px',
            top: '-521px',
            background: 'radial-gradient(circle, rgba(192,221,255,0.8) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: '620px',
            height: '620px',
            bottom: '-521px',
            background: 'radial-gradient(circle, rgba(219,218,255,0.8) 0%, transparent 70%)',
          }}
        />
      </div>
      <div className={cn('flex flex-col', 'items-center relative z-10')}>
        {/* Title */}
        <ScrollReveal>
          <h2
            id="section2-title"
            className={cn(
              'text-[32px] font-medium text-[#363a5b] text-center',
              'leading-[1.3] tracking-[-0.48px] font-poppins whitespace-pre-wrap'
            )}
          >
            {dict.section2.title}
          </h2>
        </ScrollReveal>
        {/* Spacer for background image height */}
        <div
          className={cn(
            'w-[1000px] mx-auto relative',
            "before:content-[''] before:flex before:items-center before:justify-center  before:h-[573px] before:inset-0 before:ml-[-220px] before:mt-[-20px]",
            "before:bg-[url('/images/sections/section2/bg_solutions.webp')] before:bg-[length:1228px_573px] before:bg-center before:bg-no-repeat",
            'before:absolute before:top-0 before:left-0'
          )}
          aria-hidden="true"
        >
          <div className={cn('flex justify-between relative z-10')}>
            {/* Left - Manual (5day+) : 섹션 90% 보일 때 등장 */}
            <div ref={leftRef} className="scroll-reveal-left w-[360px]">
              <div className="flex flex-col text-[#363a5b] whitespace-pre-wrap">
                <div className="relative h-[573px] pt-[190px] border-box">
                  <p className="text-center text-[18px] font-medium font-poppins tracking-[-0.27px]">
                    {dict.section2.manual.perLoan}
                  </p>
                  <p className="mt-[30px] flex items-end justify-center text-center font-extrabold font-poppins tracking-[-1.62px]">
                    <span className="block text-[124px] leading-[96px]">
                      {dict.section2.manual.timeValue}
                    </span>
                    <span className="block text-[56px] leading-[96px]">
                      {dict.section2.manual.timeUnit}
                    </span>
                  </p>
                  <p className="text-center text-[20px] font-semibold font-poppins tracking-[-0.3px]">
                    {dict.section2.manual.timeDetail}
                  </p>
                </div>

                <ScrollReveal delay={200}>
                  <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4 w-[360px] mt-6">
                    {dict.section2.manual.descriptions.map((desc, i) => (
                      <ul
                        key={i}
                        className="list-disc ml-[27px] text-[18px] font-medium text-[#7a7a7a] font-poppins leading-normal tracking-[-0.27px] break-words"
                      >
                        <li>{desc}</li>
                      </ul>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right - AI (5min) : 5day 등장 후 등장 */}
            <div ref={rightRef} className="scroll-reveal-right w-[360px]">
              <div className="flex flex-col text-[#363a5b] whitespace-pre-wrap">
                <div className="relative h-[573px] pt-[310px] w-full border-box z-10">
                  <ScrollReveal
                    delay={600}
                    className="z-10 w-full relative z-10"
                  >
                    <p className="text-[18px] font-medium font-poppins tracking-[-0.27px] text-center">
                      {dict.section2.ai.perLoan}
                    </p>
                  </ScrollReveal>
                  {/* 5min - 숫자 카운트업 → min 페이드인 */}
                  <p className="relative z-10 mt-[33px] font-extrabold font-poppins leading-[160px] tracking-[-2.7px] text-[#363a5b] z-10 text-center">
                    <CountUp
                      target={5}
                      suffix={dict.section2.ai.timeUnit}
                      delay={500}
                      duration={600}
                      numberClassName="text-[180px]"
                      suffixClassName="text-[80px]"
                    />
                  </p>

                  <i
                    className="absolute top-[282px] right-[285px] s2-icon-rise"
                    style={
                      { '--s2-icon-delay': '800ms' } as React.CSSProperties
                    }
                  >
                    <Image
                      src="/images/sections/section2/icon-arrow-up.webp"
                      alt=""
                      width={45}
                      height={32}
                      className="object-contain"
                    />
                  </i>
                  <i className="absolute top-[359px] right-[157px]">
                    <Image
                      src="/images/sections/section2/icon-pencil.webp"
                      alt=""
                      width={38}
                      height={47}
                      className="object-contain"
                    />
                  </i>
                  <i className="absolute top-[365px] right-[40px]">
                    <Image
                      src="/images/sections/section2/icon-calculator.webp"
                      alt=""
                      width={86}
                      height={110}
                      className="object-contain"
                    />
                  </i>
                  <i className="absolute top-[316px] right-[11px]">
                    <Image
                      src="/images/sections/section2/icon-chart.webp"
                      alt=""
                      width={63}
                      height={63}
                      className="object-contain"
                    />
                  </i>
                </div>

                <ScrollReveal delay={800}>
                  <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4 w-[360px] mt-6">
                    <ul className="list-disc ml-[27px] text-[18px] font-medium text-[#7a7a7a] font-poppins leading-normal tracking-[-0.27px] break-words">
                      <li>{dict.section2.ai.description}</li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
