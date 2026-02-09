import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TeamProps {
  dict: {
    section5: {
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
    '/images/team/people-01.webp',
    '/images/team/people-02.webp',
    '/images/team/people-03.webp',
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
          'flex flex-col gap-16 items-center',
          'before:content-[""] before:w-[512px] before:h-[512px] before:rounded-full',
          'before:blur-[200px] before:bg-[#C3C2FF] before:absolute',
          'before:right-[-256px] before:top-[-256px]',
          'after:content-[""] after:w-[512px] after:h-[512px] after:rounded-full',
          'after:blur-[200px] after:bg-[#D2F9EA] after:absolute',
          'after:left-[-256px] after:bottom-[-256px]'
        )}
      >
        <div className="relative z-10 w-full">
          {/* Title */}
          <h2
            id="team-title"
            className={cn(
              'text-[40px] font-medium text-[#363a5b] text-center w-full',
              'leading-[1.3] tracking-[-0.6px] font-poppins whitespace-pre-wrap'
            )}
          >
            {dict.section5.title}
          </h2>

          {/* Team Grid */}
          <div
            className="flex w-full justify-between mt-[64px] whitespace-pre-wrap"
            role="list"
            aria-label="Team members"
          >
            {dict.section5.members.map((member, index) => (
              <article
                key={index}
                className={cn(
                  'flex-1 flex flex-col gap-10 max-w-[307px]',
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
                      src={memberImages[index] || '/images/team/people-01.webp'}
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
                        src="/images/common/logos/logo.svg"
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
                    'focus:outline-none focus:ring-2 focus:ring-[#3b3f61] focus:ring-offset-2',
                    'relative',
                    'after:content-[""] after:w-6 after:h-6 after:ml-2',
                    'after:bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M12.7505%206L18.7519%2012.0014L12.7505%2018.0028%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3Cpath%20d%3D%22M18.7531%2011.9999L5.25%2012%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E")]',
                    'after:bg-no-repeat after:bg-center after:bg-contain'
                  )}
                  aria-label={`View ${member.name}'s LinkedIn profile`}
                >
                  {dict.section5.linkedIn}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
