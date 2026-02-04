'use client';

import { useState, useRef, useEffect } from 'react';

interface HeroBannerProps {
  dict: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
}

export default function HeroBanner({ dict }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const slides = [1, 2, 3]; // 3 slides

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // 다음 슬라이드로 이동
  const goToNextSlide = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const nextSlide = (currentSlide + 1) % slides.length;
    container.scrollLeft = nextSlide * container.offsetWidth;
  };

  // 자동 재생 시작
  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      goToNextSlide();
    }, 3000); // 3초마다
  };

  // 자동 재생 중지
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // 스크롤 감지
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // 자동 재생 관리
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    // Cleanup: 컴포넌트 언마운트 시 타이머 정리
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlaying, currentSlide]);

  return (
    <section id="hero" className="w-full px-4 py-12 md:px-8 lg:px-[220px] overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-12">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#363a5b] leading-[1.2] whitespace-pre-line">
            {dict.hero.title}
          </h1>
          <p className="text-lg text-[#7a7a7a] leading-relaxed">
            {dict.hero.subtitle}
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#393d5f] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2d3049] transition-colors shadow-lg w-fit flex items-center gap-2"
          >
            {dict.hero.cta}
            <span>→</span>
          </button>
        </div>

        {/* Right Content - Image Swiper */}
        <div className="flex-1 flex flex-col gap-6 items-center w-full">
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={() => {
              // 사용자가 터치하면 자동 재생 일시정지
              stopAutoPlay();
              setTimeout(() => setIsAutoPlaying(true), 5000); // 5초 후 재개
            }}
            className="w-full max-w-[488px] h-[651px] rounded-3xl overflow-x-auto overflow-y-hidden bg-gradient-to-br from-[#b1cdff] via-[#d4e2ff] to-[#f0f4ff] scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide}
                className="w-full h-full flex-shrink-0 flex items-center justify-center"
                style={{
                  scrollSnapAlign: 'center',
                  minWidth: '100%'
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-[#363a5b] text-2xl font-bold">
                  Slide {slide}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    container.scrollLeft = index * container.offsetWidth;
                    // 수동 클릭 시 자동 재생 일시정지 후 재개
                    stopAutoPlay();
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'w-10 bg-[#3b3f61]' : 'w-2 bg-[#b9bfef]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
