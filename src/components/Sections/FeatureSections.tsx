import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FeatureSectionsProps {
  dict: {
    section1: {
      title: string;
      point1: {
        title: string;
      };
      point2: {
        title: string;
      };
      bankStatement: {
        line1: string;
        line2: string;
      };
      timeConsuming: string;
      but: string;
      experienceTitle: string;
    };
    section2: {
      title: string;
      finsightAI: string;
      manual: {
        perLoan: string;
        timeValue: string;
        timeUnit: string;
        timeDetail: string;
        descriptions: string[];
      };
      ai: {
        perLoan: string;
        timeValue: string;
        timeUnit: string;
        description: string;
      };
    };
    section3: { badge: string; title: string; description: string };
    section4: { badge: string; title: string; description: string };
    section5: { badge: string; title: string; description: string };
    section6: { badge: string; title: string; description: string };
  };
}

export default function FeatureSections({ dict }: FeatureSectionsProps) {
  return (
    <>
      {/* Section 1 - Expand credit access safely */}
      <section
        id="why-finprofile"
        className={cn('w-full pt-[80px]', 'relative')}
        aria-labelledby="section1-title"
      >
        <div
          className={cn(
            'w-[1000px] mx-auto flex flex-col gap-[40px]',
            'items-center relative z-10'
          )}
        >
          {/* Title */}
          <h2
            id="section1-title"
            className={cn(
              'text-[32px] font-medium text-[#363a5b] text-center',
              'leading-[1.4] tracking-[-0.48px] font-poppins whitespace-pre-wrap'
            )}
          >
            {dict.section1.title}
          </h2>

          {/* Two Point Boxes */}
          <div
            className={cn(
              'flex gap-[24px] items-start',
              'justify-center w-full'
            )}
            role="list"
          >
            {/* Point 1 */}
            <article
              className="flex flex-col gap-[16px] items-center"
              role="listitem"
            >
              <div
                className={cn(
                  'w-[400px] h-[110px] bg-[#e7efff] rounded-[16px]',
                  'flex items-center justify-center'
                )}
              >
                <p
                  className={cn(
                    'text-[20px] font-medium text-[#363a5b] text-center',
                    'leading-[1.4] tracking-[-0.3px] font-poppins whitespace-pre-wrap'
                  )}
                >
                  {dict.section1.point1.title}
                </p>
              </div>
              <div
                className={cn(
                  'w-[64px] h-[64px] flex items-center',
                  'justify-center overflow-hidden'
                )}
              >
                <Image
                  src="/images/icons/icon-arrow-sm.png"
                  alt=""
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </article>

            {/* Point 2 */}
            <article
              className="flex flex-col gap-[16px] items-center"
              role="listitem"
            >
              <div
                className={cn(
                  'w-[400px] h-[110px] bg-[#e7efff] rounded-[16px]',
                  'flex items-center justify-center'
                )}
              >
                <p
                  className={cn(
                    'text-[20px] font-medium text-[#363a5b] text-center',
                    'leading-[1.4] tracking-[-0.3px] font-poppins whitespace-pre-wrap'
                  )}
                >
                  {dict.section1.point2.title}
                </p>
              </div>
              <div
                className={cn(
                  'w-[64px] h-[64px] flex items-center',
                  'justify-center overflow-hidden'
                )}
              >
                <Image
                  src="/images/icons/icon-arrow-sm.png"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
            </article>
          </div>

          {/* Bank Statement Box */}
          <div
            className={cn(
              'w-[824px] h-[130px] rounded-[18px] overflow-hidden',
              'relative flex items-center justify-center'
            )}
            style={{
              background:
                'linear-gradient(132deg, rgb(208, 226, 255) 0%, rgb(223, 230, 244) 58%, rgb(164, 198, 255) 89%, rgb(118, 168, 255) 100%)',
            }}
            role="region"
            aria-label="Bank Statement highlight"
          >
            <div
              className={cn(
                'text-[#363a5b] text-center font-poppins font-medium',
                'leading-[1.4] tracking-[-0.38px]'
              )}
            >
              <p className="text-[20px]">{dict.section1.bankStatement.line1}</p>
              <p className="text-[28px]">{dict.section1.bankStatement.line2}</p>
            </div>
          </div>

          {/* Time consuming with But label */}
          <div
            className={cn(
              'relative flex gap-[16px] items-center justify-center',
              'pl-[56px] pr-[36px] py-[24px] rounded-[8px]'
            )}
            role="region"
            aria-label="Time consuming note"
          >
            <div
              className="rounded-[8px] w-[635px] h-[84px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, #C3FFE2 0%, rgba(195, 255, 226, 0.00) 100%)',
              }}
            />
            {/* But Badge */}
            <span
              className={cn(
                'absolute left-[-39px] top-1/2 -translate-y-1/2 -rotate-[16deg]',
                'bg-[#76f8b6] px-[16px] py-[4px] rounded-[4px]',
                'text-[24px] font-medium italic text-[#4e4bfb] font-poppins'
              )}
              aria-hidden="true"
            >
              {dict.section1.but}
            </span>
            <p
              className={cn(
                'text-[28px] font-medium text-[#3e4ed1] text-center',
                'tracking-[-0.42px] font-poppins relative z-10'
              )}
            >
              {dict.section1.timeConsuming}
            </p>
            {/* Money Stack Icon */}
            <div
              className="w-[80px] h-[40px] flex items-center justify-center"
              aria-hidden="true"
            >
              <Image
                src="/images/section1/money-stack.svg"
                alt=""
                width={74}
                height={35}
              />
            </div>
          </div>

          {/* Large Chevron Down Arrow */}
          <div
            className={cn(
              'w-[128px] h-[128px] flex items-center',
              'justify-center overflow-hidden'
            )}
          >
            <Image
              src="/images/icons/icon-arrow.png"
              alt=""
              width={128}
              height={128}
              className="object-contain"
            />
          </div>

          <div className="w-full relative overflow-hidden">
            {/* Experience FinProfile Title */}
            <h3
              id="experience-title"
              className={cn(
                'text-[40px] font-medium text-[#363a5b] text-center',
                'leading-[1.4] tracking-[-0.6px] font-poppins'
              )}
            >
              {dict.section1.experienceTitle}
            </h3>

            <div className="w-full h-[420px] relative overflow-hidden mt-6">
              <Image
                src="/images/experience.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Reinvent Credit Reviews */}
      <section
        id="solutions"
        className={cn(
          'w-full pt-[80px] pb-[100px]',
          'relative overflow-hidden'
        )}
        style={{
          background: 'linear-gradient(180deg, #F2F6FF 0%, #E6EEFF 100%)',
        }}
        aria-labelledby="section2-title"
      >
        <div className="w-[420px] h-[420px] rounded-full blur-[100px] bg-[#C0DDFFCC] opacity-80 absolute top-[-211px] left-[50%] -translate-x-1/2"></div>
        <div className="w-[420px] h-[420px] rounded-full blur-[100px] bg-[#DBDAFFCC] opacity-80 absolute bottom-[-211px] left-[50%] -translate-x-1/2"></div>
        <div className={cn('flex flex-col', 'items-center relative z-10')}>
          {/* Title */}
          <h2
            id="section2-title"
            className={cn(
              'text-[32px] font-medium text-[#363a5b] text-center',
              'leading-[1.3] tracking-[-0.48px] font-poppins whitespace-pre-wrap'
            )}
          >
            {dict.section2.title}
          </h2>
          {/* Spacer for background image height */}
          <div
            className={cn(
              'w-full',
              "before:content-[''] before:flex before:items-center before:justify-center  before:h-[573px] before:inset-0 before:ml-[-220px] before:mt-[-20px]",
              "before:bg-[url('/images/Solutions.png')] before:bg-[length:1228px_573px] before:bg-center before:bg-no-repeat"
            )}
            aria-hidden="true"
          >
            <div>
              <span className="text-[18px] font-bold text-[#363a5b] font-poppins">
                {dict.section2.finsightAI} Per Loan Application 5day+ = 7,200min
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3-6 - Feature Details */}
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
          ].map((item, index) => (
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
    </>
  );
}
