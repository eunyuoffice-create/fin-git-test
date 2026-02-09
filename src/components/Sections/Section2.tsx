'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!visible) return;

    const step = duration / target;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= target; i++) {
      timeouts.push(setTimeout(() => setCount(i), delay + step * i));
    }

    timeouts.push(
      setTimeout(() => setShowSuffix(true), delay + duration + 200)
    );

    return () => timeouts.forEach(clearTimeout);
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
  return (
    <section
      id="solutions"
      className={cn(
        'w-full pt-[80px] pb-[100px]',
        'relative overflow-hidden',
        'before:content-[""] before:w-[420px] before:h-[420px] before:rounded-full',
        'before:blur-[100px] before:bg-[#C0DDFFCC] before:opacity-80',
        'before:absolute before:top-[-211px] before:left-1/2 before:-translate-x-1/2',
        'after:content-[""] after:w-[420px] after:h-[420px] after:rounded-full',
        'after:blur-[100px] after:bg-[#DBDAFFCC] after:opacity-80',
        'after:absolute after:bottom-[-211px] after:left-1/2 after:-translate-x-1/2'
      )}
      style={{
        background: 'linear-gradient(180deg, #F2F6FF 0%, #E6EEFF 100%)',
      }}
      aria-labelledby="section2-title"
    >
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
            {/* Left - Manual (5day+) : 먼저 등장 */}
            <ScrollReveal direction="left" delay={100}>
              <div className="flex flex-col text-[#363a5b] whitespace-pre-wrap">
                <div className="relative h-[573px]">
                  <p className="absolute top-[181px] left-[62px] text-[18px] font-medium font-poppins tracking-[-0.27px]">
                    {dict.section2.manual.perLoan}
                  </p>
                  <p className="absolute top-[240px] left-[54px] font-extrabold font-poppins leading-[96px] tracking-[-1.62px]">
                    <span className="text-[124px]">
                      {dict.section2.manual.timeValue}
                    </span>
                    <span className="text-[56px]">
                      {dict.section2.manual.timeUnit}
                    </span>
                  </p>
                  <p className="absolute top-[342px] left-[62px] text-[20px] font-semibold font-poppins tracking-[-0.3px]">
                    {dict.section2.manual.timeDetail}
                  </p>
                </div>

                <ScrollReveal delay={400}>
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
            </ScrollReveal>

            {/* Right - AI (5min) : 5day 다 나온 뒤 등장 */}
            <ScrollReveal direction="right" delay={900}>
              <div className="flex flex-col text-[#363a5b] whitespace-pre-wrap">
                <div className="relative h-[573px] w-full">
                  <ScrollReveal
                    delay={2700}
                    className="absolute top-[315px] right-[53px]"
                  >
                    <p className="text-[18px] font-medium font-poppins tracking-[-0.27px]">
                      {dict.section2.ai.perLoan}
                    </p>
                  </ScrollReveal>
                  {/* 5min - 숫자 카운트업 → min 페이드인 */}
                  <p className="absolute top-[365px] right-[52px] font-extrabold font-poppins leading-[160px] tracking-[-2.7px] text-[#363a5b]">
                    <CountUp
                      target={5}
                      suffix={dict.section2.ai.timeUnit}
                      delay={1000}
                      duration={800}
                      numberClassName="text-[180px]"
                      suffixClassName="text-[80px]"
                    />
                  </p>
                </div>

                <ScrollReveal delay={2700}>
                  <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4 w-[360px] mt-6">
                    <ul className="list-disc ml-[27px] text-[18px] font-medium text-[#7a7a7a] font-poppins leading-normal tracking-[-0.27px] break-words">
                      <li>{dict.section2.ai.description}</li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
