'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  threshold?: number;
}

const directionClass: Record<Direction, string> = {
  up: 'scroll-reveal-up',
  left: 'scroll-reveal-left',
  right: 'scroll-reveal-right',
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.15,
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
          // Instant reset: disable transition → remove class → force reflow → re-enable
          el.style.transition = 'none';
          el.classList.remove('scroll-revealed');
          el.style.transitionDelay = '0ms';
          void el.offsetHeight; // force reflow
          el.style.transition = '';
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`${directionClass[direction]} ${className}`}>
      {children}
    </div>
  );
}
