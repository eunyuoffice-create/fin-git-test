'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface TestimonialsProps {
  dict: {
    section4: {
      title: string;
      items: Array<{
        company: string;
        industry?: string;
        name?: string;
        initial?: string;
        icon?: string;
        color?: string;
        quotes: string[];
      }>;
    };
  };
}

export default function Testimonials({ dict }: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);

  const items = dict?.section4?.items ?? [];

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
      className={cn('w-full pt-20 pb-[100px] relative overflow-hidden')}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '620px',
          height: '620px',
          top: '-521px',
          background: 'radial-gradient(circle, rgba(210,249,234,0.8) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Title */}
      <ScrollReveal className="max-w-[1440px] mx-auto px-[120px] mb-[84px] relative z-10">
        <h2
          className={cn(
            'text-[40px] font-medium text-[#363a5b] text-center',
            'leading-[1.3] tracking-[-0.6px] font-poppins whitespace-pre-line'
          )}
        >
          {dict.section4.title}
        </h2>
      </ScrollReveal>

      {/* Carousel Container */}
      <ScrollReveal
        delay={200}
        className="relative z-10 max-w-[1000px] mx-auto overflow-visible"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
          }}
          className="w-[1440px] test"
        >
          <CarouselContent overflowVisible className="-ml-10 select-none">
            {items.map((item, index) => (
              <CarouselItem key={index} className="ml-10 basis-[480px]">
                <div
                  className={cn(
                    'w-[480px] h-auto bg-white rounded-3xl p-10 pb-[48px]',
                    'relative flex flex-col',
                    'transition-all duration-300 cursor-pointer',
                    'bg-[#F0F5FF]',
                    'before:content-[""] before:w-[56px] before:h-[36px] before:absolute before:right-[24px] before:bottom-0',
                    'before:bg-[url("/images/common/icons/icon-quotes.webp")] before:bg-center before:bg-no-repeat'
                  )}
                  onClick={() => scrollTo(index)}
                >
                  {/* Header - Profile */}
                  <div className="flex items-center gap-2 mb-8">
                    <div
                      className={cn(
                        'w-16 h-16 rounded-full flex-shrink-0',
                        'flex items-center justify-center',
                        'text-white text-[32px] font-semibold',
                        !item?.icon && !item?.color && 'bg-[#56C7B9]',
                        !item?.icon && 'border-2 border-white'
                      )}
                      style={
                        item?.color
                          ? { backgroundColor: item.color }
                          : undefined
                      }
                      aria-hidden="true"
                    >
                      {item?.icon ? (
                        <Image
                          src={item?.icon}
                          alt="Hana"
                          width={64}
                          height={64}

                        quality={100}

                        />
                      ) : (
                        item.initial ||
                        (item.name
                          ? item.name.charAt(0)
                          : item.company.charAt(0))
                      )}
                    </div>
                    <h3
                      className={cn(
                        'text-[20px] font-medium text-[#363a5b]',
                        'leading-[1.3] tracking-[-0.3px] font-poppins whitespace-pre-line"'
                      )}
                    >
                      {item.name || item.company}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-5 flex-1 pre-wrap">
                    {/* Industry / Company */}
                    <p
                      className={cn(
                        'text-2xl font-semibold text-[#363a5b]',
                        'leading-[1.3] tracking-[-0.36px] font-poppins break-normal whitespace-pre-line'
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
                        'break-normal '
                      )}
                    >
                      {(item.quotes ?? []).map((quote, qIndex) => (
                        <p
                          key={qIndex}
                          className="text-[18px] text-[#363a5b] leading-[1.5] font-poppins line-height-[1.3] whitespace-pre-line"
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
      </ScrollReveal>
    </section>
  );
}
