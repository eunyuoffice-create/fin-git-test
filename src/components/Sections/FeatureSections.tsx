interface FeatureSectionsProps {
  dict: {
    section1: { title: string; challenges: string[]; badge: string };
    section2: {
      title: string;
      manual: { label: string; time: string; note: string; description: string; additionalNote: string };
      ai: { label: string; time: string; description: string };
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
      {/* Section 1 - Why FinProfile */}
      <section id="why-finprofile" className="w-full px-[220px] pt-[80px] pb-[100px] relative">
        {/* Background gradient circle */}
        <div className="absolute bottom-[-447px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#e8e3fc] rounded-full blur-[200px] opacity-30" />

        <div className="flex flex-col gap-[40px] items-center relative z-10">
          {/* Title */}
          <h2 className="text-[32px] font-medium text-[#363a5b] text-center leading-[1.4] tracking-[-0.48px] font-['Poppins',sans-serif]">
            Expand credit access safely<br />
            with AI-powered credit infrastructure.
          </h2>

          {/* Challenge Cards */}
          <div className="flex gap-[24px] items-center">
            {dict.section1.challenges.map((challenge, index) => (
              <div
                key={index}
                className="w-[300px] h-[100px] bg-[#e7efff] rounded-[16px] flex items-center justify-center"
              >
                <p className="text-[20px] font-medium text-[#363a5b] text-center leading-[1.4] tracking-[-0.3px] font-['Poppins',sans-serif]">
                  {challenge}
                </p>
              </div>
            ))}
          </div>

          {/* FinSight AI Card */}
          <div className="w-[696px] h-[219px] rounded-[18px] bg-gradient-to-r from-[#cee1ff] to-[#9abffb] shadow-[0px_9px_18px_0px_rgba(62,20,180,0.08)] flex items-center justify-center">
            <div className="text-[48px] font-bold text-[#363a5b] font-['Poppins',sans-serif]">
              FinSight AI
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center text-[#363a5b] font-['Poppins',sans-serif]">
            <p className="text-[28px] font-medium tracking-[-0.48px]">
              The only thing you can trust is
            </p>
            <p className="text-[48px] font-medium tracking-[-0.48px]">
              Bank Statement
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - Solutions (5day vs 5min) */}
      <section id="solutions" className="w-full pt-[80px] pb-[100px] bg-gradient-to-b from-[#f2f6ff] to-[#e6eeff] relative">
        {/* Background circles */}
        <div className="absolute top-[-248px] left-1/2 -translate-x-1/2 w-[422px] h-[422px] bg-[#e8e3fc] rounded-full blur-[100px] opacity-30" />
        <div className="absolute bottom-[-211px] left-1/2 -translate-x-1/2 w-[422px] h-[422px] bg-[#e8e3fc] rounded-full blur-[100px] opacity-30" />

        <div className="px-[220px] relative z-10">
          {/* Title */}
          <h2 className="text-[32px] font-medium text-[#363a5b] text-center leading-[1.3] tracking-[-0.48px] font-['Poppins',sans-serif] mb-[64px]">
            Reinvent Credit Reviews<br />
            with AI Automation
          </h2>

          {/* Comparison Section */}
          <div className="flex justify-between items-start">
            {/* Manual Process - Left */}
            <div className="flex flex-col items-center">
              <p className="text-[18px] font-medium text-[#363a5b] tracking-[-0.27px] font-['Poppins',sans-serif] mb-[24px]">
                {dict.section2.manual.label}
              </p>
              <div className="text-[#363a5b] font-['Poppins',sans-serif] text-center">
                <span className="text-[124px] font-extrabold leading-[96px] tracking-[-1.62px]">5</span>
                <span className="text-[56px] font-extrabold leading-[96px] tracking-[-1.62px]">day+</span>
              </div>
              <p className="text-[20px] font-semibold text-[#363a5b] tracking-[-0.3px] font-['Poppins',sans-serif] mt-[24px]">
                {dict.section2.manual.note}
              </p>

              {/* Manual Process Card */}
              <div className="w-[360px] bg-white rounded-[24px] p-[24px] mt-[100px]">
                <ul className="text-[18px] font-medium text-[#7a7a7a] leading-[1.4] tracking-[-0.27px] font-['Poppins',sans-serif] space-y-[16px]">
                  <li className="list-disc ml-[27px]">{dict.section2.manual.description}</li>
                  <li className="list-disc ml-[27px]">{dict.section2.manual.additionalNote}</li>
                </ul>
              </div>
            </div>

            {/* FinSight AI Logo - Center */}
            <div className="flex flex-col items-center mt-[60px]">
              <div className="bg-white rounded-[18px] shadow-[0px_6px_12px_0px_rgba(62,20,180,0.08)] px-[24px] py-[18px]">
                <div className="text-[24px] font-bold text-[#363a5b] font-['Poppins',sans-serif]">
                  FinSight AI
                </div>
              </div>
              {/* Arrow down */}
              <div className="mt-[8px]">
                <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
                  <path d="M9 0V26M9 26L1 18M9 26L17 18" stroke="#363a5b" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            {/* AI Process - Right */}
            <div className="flex flex-col items-center">
              <p className="text-[18px] font-medium text-[#363a5b] tracking-[-0.27px] font-['Poppins',sans-serif] mb-[24px]">
                {dict.section2.ai.label}
              </p>
              <div className="text-[#363a5b] font-['Poppins',sans-serif]">
                <span className="text-[180px] font-extrabold leading-[160px] tracking-[-2.7px]">5</span>
                <span className="text-[80px] font-extrabold leading-[160px] tracking-[-2.7px]">min</span>
              </div>

              {/* AI Process Card */}
              <div className="w-[360px] bg-white rounded-[24px] p-[24px] mt-[100px]">
                <ul className="text-[18px] font-medium text-[#7a7a7a] leading-[1.4] tracking-[-0.27px] font-['Poppins',sans-serif]">
                  <li className="list-disc ml-[27px]">{dict.section2.ai.description}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3-6 - Feature Details */}
      {[
        { section: dict.section3, id: 'section3', badge: 'Context-Aware AI' },
        { section: dict.section4, id: 'section4', badge: 'Pre-Verification AI' },
        { section: dict.section5, id: 'section5', badge: 'Precision Beyond Human' },
        { section: dict.section6, id: 'section6', badge: 'Country-Specific Financial AI' },
      ].map((item, index) => (
        <section
          key={item.id}
          className="w-full px-[220px] py-[80px] bg-white"
        >
          <div className="flex gap-[80px] items-center">
            {/* Image - alternating sides */}
            {index % 2 === 0 ? (
              <>
                <div className="w-[320px] h-[400px] bg-gradient-to-b from-[#7dabff] to-[#d4e2ff] rounded-[24px] flex items-center justify-center flex-shrink-0">
                  <span className="text-[24px] text-[#363a5b] font-bold opacity-30">
                    Image {index + 3}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-[8px] mb-[24px]">
                    <div className="w-[24px] h-[24px] bg-[#3b3f61] rounded-[4px]" />
                    <span className="text-[16px] font-medium text-[#363a5b] tracking-[-0.24px] font-['Poppins',sans-serif]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-[40px] font-medium text-[#363a5b] leading-[1.3] tracking-[-0.6px] font-['Poppins',sans-serif] mb-[40px]">
                    {item.section.title}
                  </h3>
                  <p className="text-[18px] text-[#7a7a7a] leading-[1.4] tracking-[-0.27px] font-['Poppins',sans-serif]">
                    {item.section.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <div className="flex items-center gap-[8px] mb-[24px]">
                    <div className="w-[24px] h-[24px] bg-[#3b3f61] rounded-[4px]" />
                    <span className="text-[16px] font-medium text-[#363a5b] tracking-[-0.24px] font-['Poppins',sans-serif]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-[40px] font-medium text-[#363a5b] leading-[1.3] tracking-[-0.6px] font-['Poppins',sans-serif] mb-[40px]">
                    {item.section.title}
                  </h3>
                  <p className="text-[18px] text-[#7a7a7a] leading-[1.4] tracking-[-0.27px] font-['Poppins',sans-serif]">
                    {item.section.description}
                  </p>
                </div>
                <div className="w-[320px] h-[400px] bg-gradient-to-b from-[#7dabff] to-[#d4e2ff] rounded-[24px] flex items-center justify-center flex-shrink-0">
                  <span className="text-[24px] text-[#363a5b] font-bold opacity-30">
                    Image {index + 3}
                  </span>
                </div>
              </>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
