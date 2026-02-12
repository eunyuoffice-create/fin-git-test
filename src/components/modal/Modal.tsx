'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  titleClassName?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Modal({
  open,
  onOpenChange,
  title,
  titleClassName,
  children,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'max-w-[900px] w-[90vw] rounded-[24px] bg-[#fafbff] p-10 border-none shadow-2xl overflow-hidden',
          'flex flex-col gap-10',
          className
        )}
        aria-describedby={undefined}
      >
        {/* Header: Title + Close */}
        <div className="flex items-start justify-between gap-6 shrink-0">
          <DialogTitle
            className={cn(
              'font-poppins font-medium text-[24px] leading-[1.4] tracking-[-0.36px] text-[#363a5b]',
              titleClassName
            )}
          >
            {title}
          </DialogTitle>
          <DialogClose
            className="shrink-0 w-6 h-6 flex items-center justify-center text-[#363a5b] hover:text-[#363a5b]/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </DialogClose>
        </div>

        {children}
      </DialogContent>
    </Dialog>
  );
}
