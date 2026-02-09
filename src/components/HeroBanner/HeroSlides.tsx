'use client';

import { cn } from '@/lib/utils';

interface SlideProps {
  active: boolean;
}

const BG_PATTERN = '/images/hero/elements/bg-pattern.png';

/** Reusable element wrapper with gather animation */
function El({
  active,
  className,
  style,
  children,
  gx = 0,
  gy = 0,
  gr = 0,
  delay = 0,
}: {
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Gather offset X (px) */
  gx?: number;
  /** Gather offset Y (px) */
  gy?: number;
  /** Gather rotation (deg) */
  gr?: number;
  /** Animation delay (ms) */
  delay?: number;
}) {
  return (
    <div
      className={cn(
        'absolute slide-el',
        active && 'slide-el-active',
        className
      )}
      style={
        {
          '--gx': `${gx}px`,
          '--gy': `${gy}px`,
          '--gr': `${gr}deg`,
          '--delay': `${delay}ms`,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ============================================================
   Slide 1 - Fraud & Submission validation in 30 seconds
   Elements use pre-rendered PNGs from Figma (rotation baked in)
   ============================================================ */
export function HeroSlide1({ active }: SlideProps) {
  const s1 = '/images/hero/elements/s1';

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#7dabff] to-[#d4e2ff] overflow-hidden">
      {/* Background dot pattern */}
      <El active={active} className="inset-0 opacity-30" delay={0}>
        <img
          src={BG_PATTERN}
          alt=""
          width={2878}
          height={1920}
          decoding="async"
          className="w-full h-full object-cover"
        />
      </El>

      {/* Doc card (bottom-left, partially clipped) */}
      <El
        active={active}
        className="left-[-3%] top-[69%]"
        gx={-80}
        gy={60}
        gr={-8}
        delay={150}
      >
        <img src={`${s1}/doc-card.webp`} alt="" width={122} height={166} decoding="async" className="w-[120px]" />
      </El>

      {/* Dark blue card (behind center cards) */}
      <El
        active={active}
        className="left-[31%] top-[40%]"
        gx={20}
        gy={40}
        delay={100}
      >
        <img src={`${s1}/dark-card.webp`} alt="" width={172} height={221} decoding="async" className="w-[172px]" />
      </El>

      {/* Light gradient card (center, behind bar chart card) */}
      <El
        active={active}
        className="left-[38%] top-[33%]"
        gx={20}
        gy={30}
        delay={60}
      >
        <img src={`${s1}/light-card.webp`} alt="" width={166} height={217} decoding="async" className="w-[166px]" />
      </El>

      {/* Line chart card (top-right) */}
      <El
        active={active}
        className="left-[285px] top-[18px]"
        gx={70}
        gy={-50}
        gr={8}
        delay={180}
      >
        <img src={`${s1}/line-chart-card.webp`} alt="" width={152} height={189} decoding="async" className="w-[152px]" />
      </El>
      {/* Confetti dots */}
      <El
        active={active}
        className="left-[28%] top-[27%]"
        gx={-25}
        gy={-20}
        delay={350}
      >
        <div className="w-[6px] h-[13px] bg-[#d0dffe] rounded-full -rotate-15" />
      </El>
      <El
        active={active}
        className="left-[42%] top-[35%]"
        gx={20}
        gy={-30}
        delay={380}
      >
        <div className="w-[13px] h-[6px] bg-[#d0dffe] rounded-full" />
      </El>
      <El
        active={active}
        className="left-[19%] top-[41%]"
        gx={-30}
        gy={15}
        delay={360}
      >
        <div className="w-[13px] h-[6px] bg-[#d0dffe] rounded-full" />
      </El>
      <El
        active={active}
        className="left-[34%] top-[49%]"
        gx={15}
        gy={25}
        delay={370}
      >
        <div className="w-[6px] h-[13px] bg-[#d0dffe] rounded-full -rotate-15" />
      </El>

      {/* Stopwatch 30" (main hero element) */}
      <El
        active={active}
        className="left-[13px] top-[45px]"
        gx={-60}
        gy={-45}
        delay={250}
      >
        <img src={`${s1}/stopwatch.webp`} alt="" width={273} height={310} decoding="async" className="w-[273px]" />
      </El>

      {/* Bar chart card (center-right, in front of stopwatch) */}
      <El
        active={active}
        className="left-[194px] top-[115px]"
        gx={45}
        gy={-25}
        delay={200}
      >
        <img src={`${s1}/bar-chart-card.webp`} alt="" width={172} height={221} decoding="async" className="w-[172px]" />
      </El>

      {/* Shield (bottom-right) */}
      <El
        active={active}
        className="left-[62%] top-[51%]"
        gx={65}
        gy={50}
        gr={12}
        delay={300}
      >
        <img src={`${s1}/shield.webp`} alt="" width={162} height={162} decoding="async" className="w-[172px]" />
      </El>
    </div>
  );
}

/* ============================================================
   Slide 2 - Income Statement Level Financial Report
   Elements use pre-rendered PNGs from Figma (rotation baked in)
   ============================================================ */
export function HeroSlide2({ active }: SlideProps) {
  const s2 = '/images/hero/elements/s2';

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#d4e2ff] to-[#b1cdff] overflow-hidden">
      {/* Background dot pattern */}
      <El active={active} className="inset-0 opacity-30" delay={0}>
        <img
          src={BG_PATTERN}
          alt=""
          width={2878}
          height={1920}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </El>

      {/* Phone frame (background layer) */}
      <El
        active={active}
        className="left-[25%] top-[0]"
        gx={80}
        gy={-40}
        delay={80}
      >
        <img src={`${s2}/phone-frame.webp`} alt="" width={433} height={500} loading="lazy" decoding="async" className="w-[433px]" />
      </El>

      {/* Decorative circles (top-left) */}
      <El
        active={active}
        className="left-[-12%] top-[-4%]"
        gx={-80}
        gy={-60}
        gr={-15}
        delay={100}
      >
        <img src={`${s2}/circles-decorative.webp`} alt="" width={177} height={214} loading="lazy" decoding="async" className="w-[180px]" />
      </El>

      {/* Line chart (bottom-left) */}
      <El
        active={active}
        className="left-[-5%] top-[57%]"
        gx={-70}
        gy={50}
        delay={200}
      >
        <img src={`${s2}/line-chart.webp`} alt="" width={134} height={73} loading="lazy" decoding="async" className="w-[130px]" />
      </El>

      {/* Main phone with 00:05 (center) */}
      <El
        active={active}
        className="left-[12%] top-[61px]"
        gx={-50}
        gy={-40}
        delay={250}
      >
        <img src={`${s2}/phone-main.webp`} alt="" width={448} height={479} loading="lazy" decoding="async" className="w-[310px]" />
      </El>

      {/* Calculator (bottom-right) */}
      <El
        active={active}
        className="left-[72%] top-[45%]"
        gx={75}
        gy={40}
        gr={10}
        delay={280}
      >
        <img src={`${s2}/calculator.webp`} alt="" width={119} height={133} loading="lazy" decoding="async" className="w-[95px]" />
      </El>
    </div>
  );
}

/* ============================================================
   Slide 3 - Supply Chain Financing Evidence reconciliation
   Elements use pre-rendered PNGs from Figma (rotation baked in)
   ============================================================ */
export function HeroSlide3({ active }: SlideProps) {
  const s3 = '/images/hero/elements/s3';

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#7dabff] to-[#d4e2ff] overflow-hidden">
      {/* Background dot pattern */}
      <El active={active} className="inset-0 opacity-30" delay={0}>
        <img
          src={BG_PATTERN}
          alt=""
          width={2878}
          height={1920}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </El>

      {/* Coin 1 (top area) */}
      <El
        active={active}
        className="left-[15%] top-[8%]"
        gx={-40}
        gy={-70}
        gr={-15}
        delay={220}
      >
        <img src={`${s3}/coin-1.webp`} alt="" width={45} height={56} loading="lazy" decoding="async" className="w-[45px]" />
      </El>

      {/* Coin 2 (top area) */}
      <El
        active={active}
        className="left-[27%] top-[11%]"
        gx={10}
        gy={-60}
        gr={10}
        delay={260}
      >
        <img src={`${s3}/coin-2.webp`} alt="" width={40} height={25} loading="lazy" decoding="async" className="w-[40px]" />
      </El>

      {/* Folder with Transaction statement (main left element) */}
      <El
        active={active}
        className="left-[-5%] top-[18%]"
        gx={-70}
        gy={-30}
        delay={180}
      >
        <img src={`${s3}/folder.webp`} alt="" width={451} height={460} loading="lazy" decoding="async" className="w-[320px]" />
      </El>

      {/* Laptop with invoice (top-right) */}
      <El
        active={active}
        className="left-[47%] top-[5%]"
        gx={70}
        gy={-50}
        gr={8}
        delay={150}
      >
        <img src={`${s3}/laptop.webp`} alt="" width={233} height={204} loading="lazy" decoding="async" className="w-[200px]" />
      </El>

      {/* Magnifying glass (bottom-right) */}
      <El
        active={active}
        className="left-[58%] top-[47%]"
        gx={65}
        gy={50}
        gr={12}
        delay={300}
      >
        <img src={`${s3}/magnifier.webp`} alt="" width={126} height={126} loading="lazy" decoding="async" className="w-[110px]" />
      </El>
    </div>
  );
}
