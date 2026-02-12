'use client';

import Modal from './Modal';

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
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={dict.title}
      className="max-h-[min(624px,85vh)]"
    >
      {/* Scrollable Content */}
      <div className="flex-1">
        <div
          className="inset-0 overflow-y-auto pr-6 pb-10 h-full max-h-[470px]"
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
    </Modal>
  );
}
