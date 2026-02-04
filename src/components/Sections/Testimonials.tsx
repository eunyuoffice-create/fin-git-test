'use client';

import { useCallback, useEffect, useState } from 'react';
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
        quote: string;
      }>;
    };
  };
}

export default function Testimonials({ dict }: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    <section id="testimonial" className="w-full py-[80px] bg-white relative">
      {/* Background */}
      <div className="absolute top-[-248px] left-1/2 -translate-x-1/2 w-[422px] h-[422px] bg-[#e8e3fc] rounded-full blur-[100px] opacity-30" />

      {/* Title */}
      <div className="max-w-[1000px] mx-auto px-[220px] mb-[64px] relative z-10">
        <h2 className="text-[40px] font-medium text-[#363a5b] text-center leading-[1.3] tracking-[-0.6px] font-['Poppins',sans-serif]">
          How Companies Are Transforming Workflows with FinSight AI
        </h2>
      </div>

      {/* Carousel Container - Full Width */}
      <div className="relative z-10 w-full">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: false,
            containScroll: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-[40px]" overflowVisible>
            {dict.testimonials.items.map((item, index) => (
              <CarouselItem
                key={index}
                className="p-[0] ml-[40px] :first:ml-0 basis-[480px]"
              >
                <div className="w-[480px] bg-[#f0f5ff] rounded-[24px] p-[40px] relative overflow-hidden flex flex-col">
                  {/* Header - Profile */}
                  <div className="flex items-center gap-[8px] mb-[40px]">
                    <div className="w-[64PX] h-[64PX] bg-gradient-to-br from-[#3b3f61] to-[#5a5e80] rounded-full flex items-center justify-center text-white text-[28px] font-medium flex-shrink-0">
                      {item.name ? item.name.charAt(0) : item.company.charAt(0)}
                    </div>
                    <h3 className="text-[20px] font-medium text-[#363a5b] leading-[1.3] tracking-[-0.3px]">
                      {item.name || item.company}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-[24px] flex-1">
                    {/* Industry / Company */}
                    <p className="text-[28px] font-medium text-[#363a5b] leading-[1.3] tracking-[-0.42px]">
                      {item.industry || item.company}
                    </p>

                    {/* Quote */}
                    <div className="border-l-[2px] border-[#3e14b4] pl-[24px] flex flex-col gap-[16px]">
                      {item.quote.split('\n\n').map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-[18px] text-[#363a5b] leading-[1.4] tracking-[-0.27px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Quote Icon */}
                  <div className="absolute bottom-[40px] right-[24px]">
                    <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
                      <path
                        d="M12 0C5.37258 0 0 5.37258 0 12v12c0 6.6274 5.37258 12 12 12h4V24H8c0-4.4183 3.58172-8 8-8V0zm32 0c-6.6274 0-12 5.37258-12 12v12c0 6.6274 5.3726 12 12 12h4V24h-8c0-4.4183 3.5817-8 8-8V0z"
                        fill="#7DD3FC"
                        fillOpacity="0.3"
                      />
                      <path
                        d="M12 0C5.37258 0 0 5.37258 0 12v12c0 6.6274 5.37258 12 12 12h4V24H8c0-4.4183 3.58172-8 8-8V0zm32 0c-6.6274 0-12 5.37258-12 12v12c0 6.6274 5.3726 12 12 12h4V24h-8c0-4.4183 3.5817-8 8-8V0z"
                        fill="#5EEAD4"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-[8px] mt-[40px]">
          {dict.testimonials.items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-[8px] rounded-full transition-all ${
                current === index
                  ? 'w-[40px] bg-[#3b3f61]'
                  : 'w-[8px] bg-[#b9bfef]'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
