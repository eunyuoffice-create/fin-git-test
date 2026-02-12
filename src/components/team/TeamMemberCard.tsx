import { cn } from '@/lib/utils';
import TeamProfileCard from '@/components/team/TeamProfileCard';

export interface TeamMember {
  name: string;
  koreanName?: string;
  role: string;
  description: string;
  tags: string[];
  linkedInUrl: string;
  imgsize: {
    width: number;
    height: number;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  imageSrc: string;
  linkedInLabel: string;
}

export default function TeamMemberCard({
  member,
  index,
  imageSrc,
  linkedInLabel,
}: TeamMemberCardProps) {
  return (
    <article
      className={cn('flex flex-col gap-10 h-full', index < 2 && 'self-stretch')}
      role="listitem"
    >
      <TeamProfileCard
        index={index}
        imageSrc={imageSrc}
        name={member.name}
        koreanName={member.koreanName}
        role={member.role}
        imgsize={member.imgsize}
      />

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
        href={member.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
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
        {linkedInLabel}
      </a>
    </article>
  );
}
