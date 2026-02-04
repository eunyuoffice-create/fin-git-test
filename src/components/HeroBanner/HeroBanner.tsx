'use client';

import { useCallback, useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const slides = [1, 2, 3];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section id="hero" className="w-full px-[220px] py-[24px] relative">
      {/* Background Gradients */}
      <div className="absolute top-[-225px] left-[-90px] w-[512px] h-[512px] bg-[#e8e3fc] rounded-full blur-[100px] opacity-50" />
      <div className="absolute top-[155px] right-[-90px] w-[512px] h-[512px] bg-[#e3ecfc] rounded-full blur-[100px] opacity-50" />

      <div className="flex gap-[80px] items-center relative z-10">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-[48px]">
          <h1 className="text-[48px] font-bold text-[#363a5b] leading-[1.2] tracking-[-0.96px] whitespace-pre-line font-['Poppins',sans-serif]">
            Focus on{'\n'}credit decisions,{'\n'}Not data processing
          </h1>
          <p className="text-[18px] text-[#7a7a7a] leading-[1.4] tracking-[-0.27px] font-['Poppins',sans-serif]">
            {dict.hero.subtitle}
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#363a5b] text-white h-[56px] pl-[32px] pr-[24px] rounded-full font-bold shadow-[0px_8px_24px_0px_rgba(62,20,180,0.2)] w-fit flex items-center gap-[8px] hover:bg-[#2d3049] transition-colors"
          >
            <span className="text-[15px] font-bold font-['Poppins',sans-serif]">
              {dict.hero.cta}
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Right Content - Image Carousel */}
        <div className="flex-1 flex flex-col gap-[24px] items-center">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
              //watchDrag: false, // PC 전용: 드래그 비활성화
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-[460px]"
          >
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide} className="pl-0">
                  <div className="w-[460px] h-[500px] rounded-[24px] bg-gradient-to-b from-[#7dabff] to-[#d4e2ff] flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={`/images/hero/hero-slide-${slide}.webp`}
                      alt={`Slide ${slide}`}
                      width={460}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex gap-[8px]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-[8px] rounded-full transition-all ${
                  current === index
                    ? 'w-[40px] bg-[#3b3f61]'
                    : 'w-[8px] bg-[#b9bfef]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
