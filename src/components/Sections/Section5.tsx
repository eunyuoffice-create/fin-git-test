import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';
import SectionTitle from '@/components/common/SectionTitle';
import TeamMemberCard, { type TeamMember } from '../team/TeamMemberCard';

interface TeamProps {
  dict: {
    section5: {
      title: string;
      linkedIn: string;
      members: TeamMember[];
    };
  };
}

const MEMBER_IMAGES = [
  '/images/team/people-01.png',
  '/images/team/people-02.png',
  '/images/team/people-03.png',
];

export default function Team({ dict }: TeamProps) {
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
        {/* Decorative gradient orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full"
            style={{
              width: '512px',
              height: '512px',
              right: '-256px',
              top: '-256px',
              background: '#C3C2FF',
              filter: 'blur(200px)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '422px',
              height: '422px',
              left: '-211px',
              bottom: '-211px',
              background: '#D2F9EA',
              filter: 'blur(200px)',
            }}
          />
        </div>

        <div className="relative z-10 w-full">
          <ScrollReveal>
            <SectionTitle id="team-title" className="w-full">
              {dict.section5.title}
            </SectionTitle>
          </ScrollReveal>

          <div
            className="flex w-full justify-between mt-[64px] whitespace-pre-wrap"
            role="list"
            aria-label="Team members"
          >
            {dict.section5.members.map((member, index) => (
              <ScrollReveal
                key={index}
                delay={index * 150}
                className="flex-1 max-w-[307px]"
              >
                <TeamMemberCard
                  member={member}
                  index={index}
                  imageSrc={MEMBER_IMAGES[index] || MEMBER_IMAGES[0]}
                  linkedInLabel={dict.section5.linkedIn}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
