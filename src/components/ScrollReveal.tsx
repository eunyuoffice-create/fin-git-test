'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'emphasis';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

const directionClass: Record<Direction, string> = {
  up: 'scroll-reveal-up',
  left: 'scroll-reveal-left',
  right: 'scroll-reveal-right',
  emphasis: 'emphasis-5min',
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('scroll-revealed');
        } else {
          el.classList.remove('scroll-revealed');
          el.style.transitionDelay = '0ms';
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${directionClass[direction]} ${className}`}>
      {children}
    </div>
  );
}
