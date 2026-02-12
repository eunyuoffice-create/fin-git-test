import { cn } from '@/lib/utils';

interface SectionTitleProps {
  id?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SectionTitle({
  id,
  children,
  size = 'md',
  className,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        'font-medium text-[#363a5b] text-center font-poppins whitespace-pre-wrap',
        size === 'sm'
          ? 'text-[32px] leading-[1.3] tracking-[-0.48px]'
          : size === 'lg'
            ? 'text-[48px] leading-[1.3] tracking-[-0.72px]'
            : 'text-[40px] leading-[1.3] tracking-[-0.6px]',
        className
      )}
    >
      {children}
    </h2>
  );
}
