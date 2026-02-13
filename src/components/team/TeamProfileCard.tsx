import Image from 'next/image';
import { cn } from '@/lib/utils';

const GRADIENT_RADIAL =
  'radial-gradient(ellipse at top left, rgba(70,103,248,1) 0%, rgba(70,71,232,1) 35%, rgba(69,39,217,1) 70%, rgba(61,18,180,1) 100%)';

const GRADIENT_DUAL = `${GRADIENT_RADIAL}, linear-gradient(135deg, rgba(114,71,234,1) 0%, rgba(87,45,207,1) 50%, rgba(61,18,180,1) 100%)`;

const IMAGE_SIZES: Record<number, string> = {
  0: 'w-[193px] h-[249px]',
  1: 'w-[205px] h-[258px]',
  2: 'w-[186px] h-[243px]',
};

interface TeamProfileCardProps {
  index: number;
  imageSrc: string;
  name: string;
  koreanName?: string;
  role: string;
  imgsize: {
    width: number;
    height: number;
  };
}

export default function TeamProfileCard({
  index,
  imageSrc,
  name,
  koreanName,
  role,
}: TeamProfileCardProps) {
  return (
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
      <figure
        className={cn(
          'absolute left-0 bottom-0 flex items-end',
          IMAGE_SIZES[index] ?? IMAGE_SIZES[0]
        )}
      >
        <Image
          src={imageSrc}
          alt={name}
          className="object-cover w-[180px] h-[252px]"
          quality={100}
          width={360}
          height={504}
        />
      </figure>

      {/* Logo & Info */}
      <div className="absolute left-[188px] top-0 flex flex-col">
        <div className="h-[16px] mb-[49px]">
          <Image
            src="/images/common/logos/logo.svg"
            alt="FinProfile"
            width={75}
            height={16}
            className="h-[16px] w-auto"
            quality={100}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p
            className={cn(
              'text-base text-[#363a5b] font-medium font-poppins',
              'leading-[1.4] tracking-[-0.24px]'
            )}
          >
            {role}
          </p>
          <h3
            className={cn(
              'text-2xl font-medium text-[#363a5b] font-poppins',
              'leading-[1.2] tracking-[-0.36px] whitespace-pre-line'
            )}
          >
            {name}
          </h3>
          {koreanName && (
            <p
              className={cn(
                'text-sm text-[#7a7a7a] font-medium font-poppins',
                'leading-[1.4] tracking-[-0.21px]'
              )}
            >
              ({koreanName})
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
