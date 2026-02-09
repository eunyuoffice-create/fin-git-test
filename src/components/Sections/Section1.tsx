import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Section1Props {
  dict: {
    section1: {
      title: string;
      point1: { title: string };
      point2: { title: string };
      bankStatement: { line1: string; line2: string };
      timeConsuming: string;
      but: string;
      experienceTitle: string;
    };
  };
}

export default function Section1CreditAccess({ dict }: Section1Props) {
  return (
    <section
      id="why-finprofile"
      className={cn('w-full pt-[80px]', 'relative z-10')}
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
          className={cn('flex gap-[24px] items-start', 'justify-center w-full')}
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
                src="/images/common/icons/icon-arrow-sm.webp"
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
                src="/images/common/icons/icon-arrow-sm.webp"
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
            'relative flex items-center pl-[368px]',
            'after:content-[""] after:w-[153px] after:h-[119px] after:rounded-[18px] after:absolute after:left-[166.5px] after:top-3',
            'after:bg-[url("/images/common/icons/icon-bank.webp")] after:bg-center after:bg-no-repeat',
            'before:content-[""] before:w-full before:h-full before:rounded-[18px] before:absolute before:left-0 before:top-0',
            'before:bg-[url("/images/sections/section1/bg-bank.webp")] before:bg-center before:bg-no-repeat'
          )}
          style={{
            background:
              'linear-gradient(132deg, rgb(208, 226, 255) 0%, rgb(223, 230, 244) 58%, rgb(164, 198, 255) 89%, rgb(118, 168, 255) 100%) ',
          }}
          role="region"
          aria-label="Bank Statement highlight"
        >
          <div
            className={cn(
              'text-[#363a5b] poppins font-medium',
              'leading-[1.4] tracking-[-0.38px]'
            )}
          >
            <p className="text-[20px] whitespace-pre-wrap">
              {dict.section1.bankStatement.line1}
            </p>
            <p className="text-[28px] whitespace-pre-wrap">
              {dict.section1.bankStatement.line2}
            </p>
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
              'text-[24px] font-medium italic text-[#4e4bfb] font-poppins whitespace-pre-wrap'
            )}
            aria-hidden="true"
          >
            {dict.section1.but}
          </span>
          <p
            className={cn(
              'text-[28px] font-medium text-[#3e4ed1] text-center',
              'tracking-[-0.42px] font-poppins relative z-10 whitespace-pre-wrap'
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
              src="/images/sections/section1/money-stack.svg"
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
            src="/images/common/icons/icon-arrow.webp"
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
              'leading-[1.4] tracking-[-0.6px] font-poppins whitespace-pre-wrap'
            )}
          >
            {dict.section1.experienceTitle}
          </h3>

          <div className="w-full h-[420px] relative overflow-hidden mt-6">
            <Image
              src="/images/sections/section1/experience.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
