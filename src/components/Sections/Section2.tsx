import { cn } from '@/lib/utils';

interface Section2Props {
  dict: {
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
  };
}

export default function Section2CreditReview({ dict }: Section2Props) {
  return (
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
          {dict.section2.finsightAI}
          <div className="w-[1000px] mx-auto flex justify-between">
            <div>
              <div>
                <span className="text-[18px] font-bold text-[#363a5b] font-poppins">
                  Per Loan Application 5day+ = 7,200min
                </span>
              </div>

              <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4 w-[360px]">
                <ul className="list-disc ml-[27px] text-[18px] font-medium text-[#7a7a7a] font-poppins leading-normal tracking-[-0.27px] break-words">
                  <li>
                    Requires analysis of 6,000 to 20,000 cases transactions
                    and manual attribute classification
                  </li>
                </ul>
                <ul className="list-disc ml-[27px] text-[18px] font-medium text-[#7a7a7a] font-poppins leading-normal tracking-[-0.27px] break-words">
                  <li>Unable to secure management cost</li>
                </ul>
              </div>
            </div>
            <div>
              <div>
                <span className="text-[18px] font-bold text-[#363a5b] font-poppins">
                  Per Loan Application 5min
                </span>
              </div>

              <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4 w-[360px]">
                <ul className="list-disc ml-[27px] text-[18px] font-medium text-[#7a7a7a] font-poppins leading-normal tracking-[-0.27px] break-words">
                  <li>
                    AI automatically verifies uploads and suggests review
                    requirements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
