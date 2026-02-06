'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface TestimonialsProps {
  dict: {
    testimonials: {
      title: string;
      items: Array<{
        company: string;
        industry?: string;
        name?: string;
        initial?: string;
        quotes: string[];
      }>;
    };
  };
}

export default function Testimonials({ dict }: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const items = dict?.testimonials?.items ?? [];

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

  if (items.length === 0) return null;

  return (
    <section
      id="testimonial"
      className={cn('w-full py-20 relative overflow-hidden')}
    >
      <div className="w-[420px] h-[420px] rounded-full blur-[100px] bg-[#D2F9EACC] opacity-80 absolute top-[-211px] left-[50%] -translate-x-1/2"></div>
      {/* Title */}
      <div className="max-w-[1440px] mx-auto px-[120px] mb-16 relative z-10">
        <h2
          className={cn(
            'text-[40px] font-medium text-[#363a5b] text-center',
            'leading-[1.3] tracking-[-0.6px] font-poppins whitespace-pre-line'
          )}
        >
          {dict.testimonials.title}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative z-10 max-w-[1000px] mx-auto overflow-visible">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
          }}
          className="w-[1440px] test"
        >
          <CarouselContent overflowVisible className="-ml-6">
            {items.map((item, index) => (
              <CarouselItem key={index} className="ml-6 basis-[480px]">
                <div
                  className={cn(
                    'w-[480px] h-auto bg-white rounded-3xl p-10 pb-[48px]',
                    'relative flex flex-col',
                    'transition-all duration-300 cursor-pointer',
                    'bg-[#F0F5FF]',
                    'before:content-[""] before:w-[56px] before:h-[36px] before:absolute before:right-[24px] before:bottom-0',
                    'before:bg-[url("/images/icons/icon-quotes.png")] before:bg-center before:bg-no-repeat'
                  )}
                  onClick={() => scrollTo(index)}
                >
                  {/* Header - Profile */}
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className={cn(
                        'w-12 h-12 bg-[#56C7B9] rounded-full flex-shrink-0',
                        'flex items-center justify-center',
                        'text-white text-xl font-semibold'
                      )}
                      aria-hidden="true"
                    >
                      {item.initial ||
                        (item.name
                          ? item.name.charAt(0)
                          : item.company.charAt(0))}
                    </div>
                    <h3
                      className={cn(
                        'text-lg font-medium text-[#363a5b]',
                        'leading-[1.3] tracking-[-0.27px] font-poppins'
                      )}
                    >
                      {item.name || item.company}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-5 flex-1">
                    {/* Industry / Company */}
                    <p
                      className={cn(
                        'text-2xl font-semibold text-[#363a5b]',
                        'leading-[1.3] tracking-[-0.36px] font-poppins break-normal'
                      )}
                    >
                      {item.industry || item.company}
                    </p>

                    {/* Quotes */}
                    <blockquote
                      className={cn(
                        'relative pl-5',
                        'flex flex-col gap-3',
                        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px]',
                        'before:bg-gradient-to-b before:from-[#3E14B4] before:to-[#77FFB5]',
                        'before:rounded-full',
                        'break-normal'
                      )}
                    >
                      {(item.quotes ?? []).map((quote, qIndex) => (
                        <p
                          key={qIndex}
                          className="text-base text-[#363a5b] leading-[1.5] font-poppins"
                        >
                          {quote}
                        </p>
                      ))}
                    </blockquote>
                  </div>
                </div>
              </CarouselItem>
            ))}
            {/* Spacer to allow last card to scroll to center */}
            <CarouselItem className="pl-6 basis-[504px]" aria-hidden="true" />
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
