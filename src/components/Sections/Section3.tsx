import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Section3to6Props {
  dict: {
    section3: { badge: string; title: string; description: string };
    section4: { badge: string; title: string; description: string };
    section5: { badge: string; title: string; description: string };
    section6: { badge: string; title: string; description: string };
  };
}

export default function Section3to6Features({ dict }: Section3to6Props) {
  return (
    <div className="w-full px-[220px]">
      <div className="w-[1000px] mx-auto">
        {[
          {
            section: dict.section3,
            id: 'section3',
            image: '/images/ai-01.png',
            imagePosition: 'left',
          },
          {
            section: dict.section4,
            id: 'section4',
            image: '/images/ai-02.png',
            imagePosition: 'right',
          },
          {
            section: dict.section5,
            id: 'section5',
            image: '/images/ai-03.png',
            imagePosition: 'left',
          },
          {
            section: dict.section6,
            id: 'section6',
            image: '/images/ai-04.png',
            imagePosition: 'right',
          },
        ].map((item) => (
          <section
            key={item.id}
            id={item.id}
            className="pt-[80px] pb-[100px] overflow-hidden"
            aria-labelledby={`${item.id}-title`}
          >
            <div className="flex gap-[80px] items-center">
              {/* Image - left side */}
              {item.imagePosition === 'left' && (
                <figure
                  className={cn(
                    'w-[320px] h-[400px] flex-shrink-0',
                    'overflow-hidden rounded-[24px] relative'
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.section.title}
                    fill
                    className="object-cover"
                  />
                </figure>
              )}

              {/* Content */}
              <article className="flex-1 flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[24px]">
                  {/* Badge */}
                  <div
                    className={cn(
                      'inline-flex items-center gap-[8px]',
                      'bg-[#3e14b4] px-[16px] py-[8px] rounded-[8px] w-fit'
                    )}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                        fill="white"
                      />
                    </svg>
                    <span
                      className={cn(
                        'text-[16px] font-medium text-white',
                        'tracking-[-0.24px] font-poppins'
                      )}
                    >
                      {item.section.badge}
                    </span>
                  </div>
                  {/* Title */}
                  <h3
                    id={`${item.id}-title`}
                    className={cn(
                      'text-[40px] font-medium text-[#363a5b]',
                      'leading-[1.3] tracking-[-0.6px] font-poppins whitespace-pre-wrap'
                    )}
                  >
                    {item.section.title}
                  </h3>
                </div>
                {/* Description */}
                <p
                  className={cn(
                    'text-[18px] text-[#7a7a7a]',
                    'leading-[1.4] tracking-[-0.27px] font-poppins'
                  )}
                >
                  {item.section.description}
                </p>
              </article>

              {/* Image - right side */}
              {item.imagePosition === 'right' && (
                <figure
                  className={cn(
                    'w-[320px] h-[400px] flex-shrink-0',
                    'overflow-hidden rounded-[24px] relative'
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.section.title}
                    fill
                    className="object-cover"
                  />
                </figure>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
