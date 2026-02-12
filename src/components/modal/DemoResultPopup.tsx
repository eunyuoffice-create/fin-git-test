'use client';

import Modal from './Modal';

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
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center gap-2">
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
          {isSuccess ? 'Successfully submitted!' : 'Submission failed'}
        </span>
      }
      titleClassName={isSuccess ? undefined : 'text-[#d51737]'}
    >
      <p
        className={`font-poppins text-[14px] leading-[1.4] tracking-[-0.21px] ${isSuccess ? 'text-[#7a7a7a]' : 'text-[#d51737]'}`}
      >
        {isSuccess
          ? 'We appreciate you reaching out to our team and will be in touch shortly.'
          : 'Something went wrong while processing your request. Please try again later.'}
      </p>
    </Modal>
  );
}
