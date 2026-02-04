'use client';

interface FooterProps {
  dict: {
    nav: {
      whyFinProfile: string;
      solutions: string;
      testimonial: string;
      team: string;
      requestDemo: string;
    };
    footer: {
      contact: string;
      email: string;
      address: string;
      ceo: string;
      copyright: string;
      explore: string;
      privacy: string;
      terms: string;
    };
  };
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="w-full px-[220px] py-[40px] bg-[#363a5b]">
      <div className="flex items-start justify-between">
        {/* Logo */}
        <div className="text-[24px] font-bold text-white font-['Poppins',sans-serif]">
          FinProfile
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-[24px] items-start">
          {/* Links Row */}
          <div className="flex items-center gap-[24px] text-[16px] text-white/65 font-['Lato',sans-serif]">
            <span className="font-bold">{dict.footer.terms}</span>
            <div className="w-[1px] h-[14px] bg-white/65" />
            <span className="font-bold">{dict.footer.privacy}</span>
            <div className="w-[1px] h-[14px] bg-white/65" />
            <div className="flex items-center gap-[8px]">
              <span className="font-bold">{dict.footer.contact}</span>
              <a
                href={`mailto:${dict.footer.email}`}
                className="underline font-medium hover:text-white transition-colors"
              >
                {dict.footer.email}
              </a>
            </div>
          </div>

          {/* Address Row */}
          <div className="flex flex-col gap-[8px] text-[16px] text-white/65 font-['Lato',sans-serif]">
            <div className="flex items-center gap-[16px]">
              <span className="font-medium">{dict.footer.address}</span>
              <div className="w-[1px] h-[14px] bg-white/65" />
              <span className="font-bold">{dict.footer.ceo}</span>
            </div>
            <span className="text-[14px] font-medium">{dict.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
