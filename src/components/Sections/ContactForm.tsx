'use client';

import { useState } from 'react';

interface ContactFormProps {
  dict: {
    contactForm: {
      title: string;
      subtitle: string;
      required: string;
      fields: {
        name: string;
        company: string;
        phone: string;
        email: string;
      };
      placeholders: {
        name: string;
        company: string;
        phone: string;
        email: string;
      };
      privacy: string;
      submit: string;
    };
  };
  lang: string;
}

export default function ContactForm({ dict, lang }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacy) {
      alert('Please agree to the privacy policy');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: formData.company,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          lang: lang,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      alert('✓ Form submitted successfully! We\'ll contact you soon.');

      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        privacy: false,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      const message = error instanceof Error ? error.message : 'An error occurred';
      alert('✗ Failed to submit form: ' + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full px-[220px] py-[80px] bg-white">
      {/* Title */}
      <h2 className="text-[52px] font-medium text-[#363a5b] text-center mb-[54px] font-['Poppins',sans-serif]">
        {dict.contactForm.title}
      </h2>

      <div className="flex flex-col items-center gap-[54px]">
        {/* Video Section */}
        <div className="w-[800px] h-[600px] bg-gradient-to-br from-[#3b3f61] to-[#5a5e80] rounded-[24px] overflow-hidden relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/test-video.mp4" type="video/mp4" />
          </video>
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80px] h-[80px] bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-[800px] bg-[#f8faff] rounded-[24px] p-[40px]">
          {/* Form Header */}
          <div className="flex items-center justify-between mb-[40px]">
            <h3 className="text-[28px] font-medium text-[#363a5b] font-['Poppins',sans-serif]">
              {dict.contactForm.subtitle}
            </h3>
            <span className="text-[16px] text-[#ff6b6b] font-['Poppins',sans-serif]">
              {dict.contactForm.required}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-[4px] text-[16px] text-[#363a5b] font-['Poppins',sans-serif] mb-[8px]">
                <span className="pl-[8px]">{dict.contactForm.fields.name}</span>
                <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={dict.contactForm.placeholders.name}
                className="w-full h-[52px] px-[16px] bg-white border border-[#e0e0e0] rounded-[8px] text-[18px] text-[#363a5b] placeholder:text-[#b0b0b0] focus:border-[#3b3f61] focus:outline-none font-['Poppins',sans-serif]"
              />
            </div>

            {/* Company Field */}
            <div>
              <label className="flex items-center gap-[4px] text-[16px] text-[#363a5b] font-['Poppins',sans-serif] mb-[8px]">
                <span className="pl-[8px]">{dict.contactForm.fields.company}</span>
                <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={dict.contactForm.placeholders.company}
                className="w-full h-[52px] px-[16px] bg-white border border-[#e0e0e0] rounded-[8px] text-[18px] text-[#363a5b] placeholder:text-[#b0b0b0] focus:border-[#3b3f61] focus:outline-none font-['Poppins',sans-serif]"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="flex items-center gap-[4px] text-[16px] text-[#363a5b] font-['Poppins',sans-serif] mb-[8px]">
                <span className="pl-[8px]">{dict.contactForm.fields.phone}</span>
                <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={dict.contactForm.placeholders.phone}
                className="w-full h-[52px] px-[16px] bg-white border border-[#e0e0e0] rounded-[8px] text-[18px] text-[#363a5b] placeholder:text-[#b0b0b0] focus:border-[#3b3f61] focus:outline-none font-['Poppins',sans-serif]"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-[4px] text-[16px] text-[#363a5b] font-['Poppins',sans-serif] mb-[8px]">
                <span className="pl-[8px]">{dict.contactForm.fields.email}</span>
                <span className="text-[#ff6b6b]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={dict.contactForm.placeholders.email}
                className="w-full h-[52px] px-[16px] bg-white border border-[#e0e0e0] rounded-[8px] text-[18px] text-[#363a5b] placeholder:text-[#b0b0b0] focus:border-[#3b3f61] focus:outline-none font-['Poppins',sans-serif]"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-[8px]">
              <input
                type="checkbox"
                id="privacy"
                required
                checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                className="w-[24px] h-[24px] mt-[2px] rounded border-[#e0e0e0] text-[#3b3f61] focus:ring-[#3b3f61]"
              />
              <label htmlFor="privacy" className="text-[14px] text-[#7a7a7a] leading-[1.5] font-['Poppins',sans-serif]">
                {dict.contactForm.privacy}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[198px] h-[56px] bg-[#363a5b] text-white rounded-[999px] font-bold text-[15px] flex items-center justify-center gap-[8px] hover:bg-[#2d3049] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins',sans-serif]"
            >
              {isSubmitting ? 'Submitting...' : dict.contactForm.submit}
              {!isSubmitting && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
