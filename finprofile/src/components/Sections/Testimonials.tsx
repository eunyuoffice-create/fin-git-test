'use client';

import { useState, useRef, useEffect } from 'react';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 감지
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = 520; // 480px card + 40px gap
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="testimonial" className="w-full py-20 bg-white relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20" />

      {/* Title */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 lg:px-[220px] mb-16 relative z-10">
        <h2 className="text-[40px] font-medium text-[#363a5b] text-center leading-[1.3] tracking-[-0.6px]">
          How Companies Are<br />
          Transforming Workflows<br />
          with FinSight AI
        </h2>
      </div>

      {/* Swiper Container - 가로 풀로 나옴 */}
      <div className="relative z-10">
        <div
          ref={scrollContainerRef}
          className="flex gap-10 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingLeft: 'calc(50% - 240px)', // 첫 카드 중앙 정렬 (50% - 카드 너비 절반)
            paddingRight: 'calc(50% - 240px)'
          }}
        >
          {dict.testimonials.items.map((item, index) => (
            <div
              key={index}
              className="w-[480px] flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
            >
              <div className="bg-[#f0f5ff] rounded-[24px] p-10 relative overflow-hidden h-full flex flex-col gap-10">
                {/* Header - Profile */}
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3b3f61] to-[#5a5e80] rounded-full flex items-center justify-center text-white text-[32px] font-medium flex-shrink-0">
                    {item.name ? item.name.charAt(0) : item.company.charAt(0)}
                  </div>
                  <h3 className="text-[20px] font-medium text-[#363a5b] leading-[1.3] tracking-[-0.3px]">
                    {item.name || item.company}
                  </h3>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  {/* Industry / Company - 큰 텍스트 */}
                  <p className="text-[28px] font-medium text-[#363a5b] leading-[1.3] tracking-[-0.42px]">
                    {item.industry || item.company}
                  </p>

                  {/* Quote - 왼쪽 보라색 라인 */}
                  <div className="border-l-2 border-[#3e14b4] pl-6 flex flex-col gap-4">
                    {item.quote.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-[18px] text-[#363a5b] leading-[1.3] tracking-[-0.27px]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Quote Icon - 우측 하단 */}
                <div className="absolute bottom-12 right-6">
                  <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
                    <path d="M12 0C5.37258 0 0 5.37258 0 12v12c0 6.6274 5.37258 12 12 12h4V24H8c0-4.4183 3.58172-8 8-8V0zm32 0c-6.6274 0-12 5.37258-12 12v12c0 6.6274 5.3726 12 12 12h4V24h-8c0-4.4183 3.5817-8 8-8V0z" fill="#7DD3FC" fillOpacity="0.3"/>
                    <path d="M12 0C5.37258 0 0 5.37258 0 12v12c0 6.6274 5.37258 12 12 12h4V24H8c0-4.4183 3.58172-8 8-8V0zm32 0c-6.6274 0-12 5.37258-12 12v12c0 6.6274 5.3726 12 12 12h4V24h-8c0-4.4183 3.5817-8 8-8V0z" fill="#5EEAD4" fillOpacity="0.3"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {dict.testimonials.items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollLeft = index * 520; // 480px + 40px gap
                }
              }}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? 'w-10 bg-[#3b3f61]' : 'w-2 bg-[#b9bfef]'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
