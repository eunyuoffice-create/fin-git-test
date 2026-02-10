'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { HeroSlide1, HeroSlide2, HeroSlide3 } from './HeroSlides';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

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

const SLIDE_COMPONENTS = [HeroSlide1, HeroSlide2, HeroSlide3];

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

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const goToSlide = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section
      id="hero"
      className="w-full h-[580px] py-6 relative"
      aria-labelledby="hero-title"
    >
      {/* Background blur elements */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          'before:content-[""] before:w-[512px] before:h-[512px] before:rounded-full',
          'before:blur-[200px] before:bg-[#D2F9EA] before:absolute',
          'before:left-[-256px] before:top-[-256px]',
          'after:content-[""] after:w-[512px] after:h-[512px] after:rounded-full',
          'after:blur-[200px] after:bg-[#C3C2FF] after:absolute',
          'after:right-0 after:bottom-[-87px]'
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          'w-[1000px] mx-auto h-full relative z-10',
          'flex gap-20 items-center'
        )}
      >
        {/* Left Content */}
        <article className="flex-1 flex flex-col gap-12 min-w-[460px] relative z-10">
          <h1
            id="hero-title"
            className={cn(
              'text-5xl font-medium text-[#363a5b]',
              'leading-[1.2] tracking-[-0.96px]',
              'font-poppins whitespace-pre-wrap',
              'hero-animate hero-delay-1'
            )}
          >
            {dict.hero.title}
          </h1>
          <p
            className={cn(
              'text-lg text-[#7a7a7a]',
              'leading-[1.4] tracking-[-0.27px] font-poppins font-normal whitespace-pre-wrap',
              'hero-animate hero-delay-2'
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
              'hover:bg-[#2d3049] hover:shadow-[0px_12px_32px_0px_rgba(62,20,180,0.3)]',
              'active:scale-[0.97]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2',
              'flex items-center justify-center',
              'relative',
              'after:content-[""] after:w-6 after:h-6 after:ml-2',
              'after:bg-[url("/images/common/icons/icon-arrow.svg")]',
              'after:bg-no-repeat after:bg-center after:bg-contain',
              'hero-animate hero-delay-3'
            )}
            type="button"
            aria-label="Go to demo request form"
          >
            <span className="text-[15px] font-bold font-poppins whitespace-nowrap leading-[1.4] tracking-[-0.21px]">
              {dict.hero.cta}
            </span>
          </button>
        </article>

        {/* Right Content - shadcn/ui Carousel */}
        <div className="flex-1 flex flex-col gap-6 items-center min-w-[460px] hero-animate-carousel hero-delay-4">
          <Carousel
            setApi={setApi}
            // opts={{ loop: true }}
            // plugins={[
            //   Autoplay({ delay: 4000, stopOnInteraction: false }),
            // ]}
            className="w-[460px]"
          >
            <CarouselContent className="-ml-0">
              {dict.hero.slides.map((slide, index) => {
                const SlideComponent = SLIDE_COMPONENTS[index];
                const isActive = currentSlide === index;

                return (
                  <CarouselItem key={index} className="pl-0">
                    <figure
                      className="w-[460px] h-[500px] rounded-3xl overflow-hidden relative pointer-events-none"
                      aria-label={slide.alt}
                    >
                      <SlideComponent active={isActive} />
                      {/* Bottom text overlay */}
                      <div
                        className={cn(
                          'absolute bottom-0 left-0 right-0 p-6 z-10',
                          isActive ? 'slide-text-active' : 'opacity-0'
                        )}
                      >
                        <div
                          className={cn(
                            'backdrop-blur-[6px] bg-[rgba(72,70,214,0.8)]',
                            'rounded-2xl px-6 py-4'
                          )}
                        >
                          <p
                            className={cn(
                              'text-xl font-medium text-white text-center',
                              'leading-[1.3] tracking-[-0.3px] font-poppins'
                            )}
                          >
                            {slide.text}
                          </p>
                        </div>
                      </div>
                    </figure>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <nav
            className="flex gap-2 items-center"
            role="tablist"
            aria-label="Slide navigation"
          >
            {SLIDE_COMPONENTS.map((_, index) => (
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
