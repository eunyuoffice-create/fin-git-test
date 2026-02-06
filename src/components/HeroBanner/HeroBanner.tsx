'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
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
      slides: Array<{
        text: string;
        alt: string;
      }>;
    };
  };
}

const SLIDE_COUNT = 3;

export default function HeroBanner({ dict }: HeroBannerProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

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
    setCurrentSlide(api.selectedScrollSnap());
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

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  const slideImages = [
    '/images/hero/hero-slide-1.png',
    '/images/hero/hero-slide-2.png',
    '/images/hero/hero-slide-3.png',
  ];

  return (
    <section
      id="hero"
      className="w-full h-[580px] py-6 relative"
      aria-labelledby="hero-title"
    >
      <div className="w-[512px] h-[512px] rounded-full blur-[200px] bg-[#D2F9EA] absolute left-[-256px] top-[-256px]"></div>
      <div className="w-[512px] h-[512px] rounded-full blur-[200px] bg-[#C3C2FF] absolute right-[-256px] bottom-[-256px]"></div>
      <div
        className={cn(
          'w-[1000px] mx-auto h-full',
          'flex gap-20 items-center relative z-10'
        )}
      >
        {/* Left Content */}
        <article className="flex-1 flex flex-col gap-12 min-w-[460px]">
          <h1
            id="hero-title"
            className={cn(
              'text-5xl font-medium text-[#363a5b]',
              'leading-[1.2] tracking-[-0.96px]',
              'font-poppins whitespace-pre-wrap'
            )}
          >
            {dict.hero.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < dict.hero.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p
            className={cn(
              'text-lg text-[#7a7a7a]',
              'leading-[1.4] tracking-[-0.27px] font-poppins font-normal'
            )}
          >
            {dict.hero.subtitle}
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className={cn(
              'bg-[#363a5b] text-white h-14 pl-8 pr-6 rounded-full',
              'font-bold shadow-[0px_8px_24px_0px_rgba(62,20,180,0.2)]',
              'w-fit flex items-center gap-2',
              'hover:bg-[#2d3049] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2',
              'flex items-center justify-center'
            )}
            type="button"
            aria-label="Go to demo request form"
          >
            <span className="text-[15px] font-bold font-poppins whitespace-nowrap">
              {dict.hero.cta}
            </span>
            <Image
              src="/images/icons/icon-arrow.svg"
              alt="Arrow Right"
              width={24}
              height={24}
              className="rounded"
            />
          </button>
        </article>

        {/* Right Content - Hero Carousel */}
        <div className="flex-1 flex flex-col gap-6 items-center min-w-[460px]">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-[460px]"
          >
            <CarouselContent className="-ml-0">
              {slideImages.map((src, index) => (
                <CarouselItem key={index} className="pl-0">
                  <figure
                    className={cn(
                      'w-[460px] h-[500px] rounded-3xl overflow-hidden relative',
                      'bg-gradient-to-b from-[#7dabff] to-[#d4e2ff]'
                    )}
                  >
                    <Image
                      src={src}
                      alt={
                        dict.hero.slides[index]?.alt ||
                        `FinProfile AI Feature ${index + 1}`
                      }
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Bottom Overlay - Slide Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <div
                        className={cn(
                          'backdrop-blur-[6px] bg-[rgba(72,70,214,0.8)]',
                          'flex items-center justify-center',
                          'px-6 py-4 rounded-2xl w-full'
                        )}
                      >
                        <p
                          className={cn(
                            'font-poppins font-medium text-xl text-white',
                            'leading-[1.3] text-center tracking-[-0.3px]'
                          )}
                        >
                          {dict.hero.slides[index]?.text}
                        </p>
                      </div>
                    </div>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <nav
            className="flex gap-2 items-center"
            role="tablist"
            aria-label="Slide navigation"
          >
            {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2',
                  currentSlide === index
                    ? 'w-10 bg-[#3b3f61]'
                    : 'w-2 bg-[#b9bfef] hover:bg-[#9aa0d4]'
                )}
                role="tab"
                aria-selected={currentSlide === index}
                aria-label={`Go to slide ${index + 1}${currentSlide === index ? ' (current)' : ''}`}
                tabIndex={currentSlide === index ? 0 : -1}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
