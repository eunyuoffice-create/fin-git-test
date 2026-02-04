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
    <section id="team" className="w-full px-4 py-20 md:px-8 lg:px-[220px] bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20" />

      <div className="max-w-[1000px] mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#363a5b] mb-16 text-center">
          {dict.team.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.team.members.map((member, index) => (
            <div key={index} className="flex flex-col">
              {/* Profile Image Placeholder */}
              <div className="relative mb-6">
                <div className="w-full h-[460px] bg-gradient-to-br from-[#3b3f61] to-[#5a5e80] rounded-2xl overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-6">
                    <h3 className="text-xl font-bold text-[#363a5b]">{member.name}</h3>
                    <p className="text-sm text-gray-600">
                      {member.koreanName ? `${member.koreanName}・${member.role}` : member.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {member.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {member.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* LinkedIn Button */}
              <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#3b3f61] text-[#3b3f61] rounded-lg hover:bg-[#3b3f61] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                {dict.team.linkedIn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
