'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface PrivacyNoticeDict {
  title: string;
  intro: {
    subtitle: string;
    lastUpdated: string;
    description: string;
  };
  sections: {
    title: string;
    description?: string;
    items: string[];
  }[];
}

interface PrivacyNoticePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: PrivacyNoticeDict;
}

export default function PrivacyNoticePopup({
  open,
  onOpenChange,
  dict,
}: PrivacyNoticePopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[900px] w-[90vw] max-h-[min(624px,85vh)] rounded-[24px] bg-[#fafbff] p-10 border-none shadow-2xl flex flex-col gap-10"
        aria-describedby={undefined}
      >
        {/* Title + Close Button */}
        <div className="flex items-start justify-between gap-6 shrink-0">
          <DialogTitle className="font-poppins font-medium text-[24px] leading-[1.4] tracking-[-0.36px] text-[#363a5b]">
            {dict.title}
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

        {/* Scrollable Content */}
        <div className="relative min-h-0 flex-1">
          <div
            className="absolute inset-0 overflow-y-auto pr-6 pb-10"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#8088ca #f0f5ff',
            }}
          >
            <div className="flex flex-col gap-10 font-poppins text-[#7a7a7a]">
              {/* Intro Section */}
              <div className="flex flex-col gap-2 text-[14px] leading-[1.4] tracking-[-0.21px]">
                <p>{dict.intro.subtitle}</p>
                <p>{dict.intro.lastUpdated}</p>
                <p>{dict.intro.description}</p>
              </div>

              {/* Numbered Sections */}
              {dict.sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className="font-semibold text-[16px] leading-[1.4] tracking-[-0.24px]">
                    {index + 1}. {section.title}
                  </p>
                  <div className="flex flex-col gap-2 pl-6 text-[14px] leading-[1.4] tracking-[-0.21px]">
                    {section.description && <p>{section.description}</p>}
                    {section.items.map((item, itemIndex) => (
                      <p key={itemIndex} className="flex gap-2">
                        <span className="shrink-0">•</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Fade Gradient */}
          <div className="absolute bottom-0 left-0 right-6 h-10 bg-gradient-to-t from-[#fafbff] to-transparent pointer-events-none z-10" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
