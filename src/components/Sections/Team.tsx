import Image from 'next/image';
import { cn } from '@/lib/utils';

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

const GRADIENT_RADIAL =
  'radial-gradient(ellipse at top left, rgba(70,103,248,1) 0%, rgba(70,71,232,1) 35%, rgba(69,39,217,1) 70%, rgba(61,18,180,1) 100%)';

const GRADIENT_DUAL = `${GRADIENT_RADIAL}, linear-gradient(135deg, rgba(114,71,234,1) 0%, rgba(87,45,207,1) 50%, rgba(61,18,180,1) 100%)`;

export default function Team({ dict }: TeamProps) {
  const memberImages = [
    '/images/team/people-01.png',
    '/images/team/people-02.png',
    '/images/team/people-03.png',
  ];

  return (
    <section
      id="team"
      className={cn(
        'w-full pt-20 pb-[100px] px-[220px]',
        'relative overflow-hidden'
      )}
      aria-labelledby="team-title"
    >
      <div
        className={cn(
          'w-[1000px] mx-auto relative z-10',
          'flex flex-col gap-16 items-center'
        )}
      >
        <div className="w-[512px] h-[512px] rounded-full blur-[200px] bg-[#C3C2FF] absolute right-[-256px] top-[-256px]" />
        <div className="w-[512px] h-[512px] rounded-full blur-[200px] bg-[#D2F9EA] absolute left-[-256px] bottom-[-256px]" />
        <div className="relative z-10">
          {/* Title */}
          <h2
            id="team-title"
            className={cn(
              'text-[40px] font-medium text-[#363a5b] text-center w-full',
              'leading-[1.3] tracking-[-0.6px] font-poppins'
            )}
          >
            {dict.team.title}
          </h2>

          {/* Team Grid */}
          <div
            className="flex gap-10 w-full justify-center"
            role="list"
            aria-label="Team members"
          >
            {dict.team.members.map((member, index) => (
              <article
                key={index}
                className={cn(
                  'flex-1 flex flex-col gap-10',
                  index < 2 && 'self-stretch'
                )}
                role="listitem"
              >
                {/* Profile Card */}
                <div className="h-[260px] relative overflow-hidden">
                  {/* Purple Gradient Bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[140px] rounded-2xl"
                    style={{
                      background: index === 0 ? GRADIENT_RADIAL : GRADIENT_DUAL,
                    }}
                    aria-hidden="true"
                  />

                  {/* Profile Image */}
                  <figure className="absolute left-[11px] top-[17px] w-[173px] bottom-0">
                    <Image
                      src={
                        memberImages[index] || '/images/team/placeholder.png'
                      }
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </figure>

                  {/* Logo & Info */}
                  <div className="absolute left-[188px] top-0 flex flex-col">
                    {/* Logo */}
                    <div className="h-4 mb-[49px]">
                      <Image
                        src="/images/logos/logo.svg"
                        alt="FinProfile"
                        width={75}
                        height={16}
                      />
                    </div>

                    {/* Role & Name */}
                    <div className="flex flex-col gap-1">
                      <p
                        className={cn(
                          'text-base text-[#363a5b] font-medium font-poppins',
                          'leading-[1.4] tracking-[-0.24px]'
                        )}
                      >
                        {member.role}
                      </p>
                      <h3
                        className={cn(
                          'text-2xl font-medium text-[#363a5b] font-poppins',
                          'leading-[1.2] tracking-[-0.36px] whitespace-pre-line'
                        )}
                      >
                        {member.name}
                      </h3>
                      {member.koreanName && (
                        <p
                          className={cn(
                            'text-sm text-[#7a7a7a] font-medium font-poppins',
                            'leading-[1.4] tracking-[-0.21px]'
                          )}
                        >
                          ({member.koreanName})
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={cn(
                    'flex-1 text-lg text-[#363a5b] font-poppins',
                    'leading-[1.3] tracking-[-0.27px]'
                  )}
                >
                  {member.description}
                </p>

                {/* Tags */}
                <div
                  className="flex flex-wrap gap-3"
                  role="list"
                  aria-label={`${member.name}'s expertise`}
                >
                  {member.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={cn(
                        'px-4 py-1.5 bg-[#f0f5ff] rounded-lg',
                        'text-base text-[#363a5b] font-medium font-poppins',
                        'leading-[1.3] tracking-[-0.24px]'
                      )}
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* LinkedIn Button */}
                <a
                  href="#"
                  className={cn(
                    'h-14 w-fit flex items-center gap-2 pl-8 pr-6',
                    'bg-[#363a5b] text-white rounded-full',
                    'shadow-[0px_8px_24px_0px_rgba(62,20,180,0.2)]',
                    'font-poppins font-bold text-[15px] leading-[1.4]',
                    'hover:bg-[#2d3049] transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2'
                  )}
                  aria-label={`View ${member.name}'s LinkedIn profile`}
                >
                  {dict.team.linkedIn}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                    className="rounded"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
