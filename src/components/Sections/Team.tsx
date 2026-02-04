interface TeamProps {
  dict: {
    team: {
      title: string;
      linkedIn: string;
      members: Array<{
        name: string;
        koreanName?: string;
        role: string;
        description: string;
        tags: string[];
      }>;
    };
  };
}

export default function Team({ dict }: TeamProps) {
  return (
    <section id="team" className="w-full px-[220px] py-[80px] bg-white relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-[-256px] right-0 w-[512px] h-[512px] bg-[#e3ecfc] rounded-full blur-[200px] opacity-30" />
      <div className="absolute bottom-[-200px] left-0 w-[422px] h-[422px] bg-[#e8e3fc] rounded-full blur-[100px] opacity-30" />

      <div className="relative z-10">
        {/* Title */}
        <h2 className="text-[52px] font-medium text-[#363a5b] mb-[64px] font-['Poppins',sans-serif]">
          {dict.team.title}
        </h2>

        {/* Team Grid */}
        <div className="flex gap-[40px]">
          {dict.team.members.map((member, index) => (
            <div key={index} className="flex-1 flex flex-col">
              {/* Profile Card */}
              <div className="flex gap-[16px] mb-[40px]">
                {/* Profile Image Placeholder */}
                <div className="w-[184px] h-[260px] bg-gradient-to-br from-[#3b3f61] to-[#5a5e80] rounded-[16px] flex items-center justify-center text-white text-[48px] font-bold">
                  {member.name.charAt(0)}
                </div>

                {/* Name & Role */}
                <div className="pt-[65px]">
                  <p className="text-[16px] text-[#363a5b] font-medium font-['Poppins',sans-serif] mb-[4px]">
                    {member.role}
                  </p>
                  <h3 className="text-[24px] font-medium text-[#363a5b] leading-[1.2] font-['Poppins',sans-serif]">
                    {member.name}
                  </h3>
                  {member.koreanName && (
                    <p className="text-[14px] text-[#7a7a7a] font-['Poppins',sans-serif]">
                      ({member.koreanName})
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-[18px] text-[#363a5b] leading-[1.4] tracking-[-0.27px] font-['Poppins',sans-serif] mb-[40px]">
                {member.description}
              </p>

              {/* Tags */}
              <div className="flex flex-col gap-[12px] mb-[40px]">
                {member.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="w-fit px-[16px] py-[6px] bg-[#f0f5ff] rounded-[8px] text-[16px] text-[#363a5b] font-['Poppins',sans-serif]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* LinkedIn Button */}
              <button className="w-[153px] h-[56px] flex items-center gap-[8px] px-[32px] border-2 border-[#363a5b] text-[#363a5b] rounded-[999px] hover:bg-[#363a5b] hover:text-white transition-colors font-['Poppins',sans-serif] font-bold text-[15px]">
                {dict.team.linkedIn}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
