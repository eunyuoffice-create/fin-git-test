'use client';

import Modal from './Modal';

interface TermsOfUseDict {
  title: string;
  intro: {
    subtitle: string;
  };
}

interface TermsOfUsePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: TermsOfUseDict;
}

export default function TermsOfUsePopup({
  open,
  onOpenChange,
  dict,
}: TermsOfUsePopupProps) {
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
            </div>
          </div>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-6 h-10 bg-gradient-to-t from-[#fafbff] to-transparent pointer-events-none z-10" />
      </div>
    </Modal>
  );
}
