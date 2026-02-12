'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface DemoResultPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: 'success' | 'error';
}

export default function DemoResultPopup({
  open,
  onOpenChange,
  status,
}: DemoResultPopupProps) {
  const isSuccess = status === 'success';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[900px] w-[90vw] rounded-[24px] bg-[#fafbff] p-10 border-none shadow-2xl flex flex-col gap-10"
        aria-describedby={undefined}
      >
        {/* Title + Close Button */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="15" stroke="#363a5b" strokeWidth="2" />
                <path
                  d="M10 16.5L14 20.5L22 12.5"
                  stroke="#363a5b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="15" stroke="#d51737" strokeWidth="2" />
                <path
                  d="M16 10V18"
                  stroke="#d51737"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="22" r="1.5" fill="#d51737" />
              </svg>
            )}
            <DialogTitle className={`font-poppins font-medium text-[24px] leading-[1.4] tracking-[-0.36px] ${isSuccess ? 'text-[#363a5b]' : 'text-[#d51737]'}`}>
              {isSuccess ? 'Successfully submitted!' : 'Submission failed'}
            </DialogTitle>
          </div>
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

        {/* Description */}
        <p className={`font-poppins text-[14px] leading-[1.4] tracking-[-0.21px] ${isSuccess ? 'text-[#7a7a7a]' : 'text-[#d51737]'}`}>
          {isSuccess
            ? 'We appreciate you reaching out to our team and will be in touch shortly.'
            : 'Something went wrong while processing your request. Please try again later.'}
        </p>
      </DialogContent>
    </Dialog>
  );
}
