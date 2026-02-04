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
    website: '', // 🔒 Honeypot 필드 (봇 차단용)
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
          website: formData.website, // 🔒 Honeypot 필드 (봇 차단용)
          lang: lang,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Success alert
      alert('✓ Form submitted successfully! We\'ll contact you soon.');

      // Reset form
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        privacy: false,
        website: '', // 🔒 Honeypot 필드 리셋
      });
    } catch (error) {
      console.error('Form submission error:', error);
      const message = error instanceof Error ? error.message : 'An error occurred';

      // Error alert
      alert('✗ Failed to submit form: ' + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full px-4 py-20 md:px-8 lg:px-[220px] bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#363a5b] mb-16 text-center">
          {dict.contactForm.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ========================================
              비디오 섹션
              ======================================== */}
          <div className="bg-gradient-to-br from-[#3b3f61] to-[#5a5e80] rounded-3xl h-[600px] overflow-hidden relative">
            {/* 배경 비디오 */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/test-video.mp4" type="video/mp4" />
              {/* Fallback: 비디오 로딩 실패 시 표시 */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-xl font-semibold">Demo Video</p>
                </div>
              </div>
            </video>

            {/* 오버레이 (선택사항 - 비디오 위에 텍스트 표시) */}
            {/*
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">Our Solution</h3>
                <p className="text-lg">Transforming Finance</p>
              </div>
            </div>
            */}
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#363a5b] mb-2">
                {dict.contactForm.subtitle}
              </h3>
              <p className="text-sm text-red-600">{dict.contactForm.required}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ========================================
                  🔒 Honeypot 필드 (봇 차단용)
                  ========================================
                  - 정상 사용자는 이 필드를 볼 수 없음 (CSS로 숨김)
                  - 봇이 자동으로 채우면 서버에서 차단
                  - API route.ts에서 검증 로직 있음
              */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                }}
                aria-hidden="true"
              />

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.contactForm.fields.name} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={dict.contactForm.placeholders.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b3f61] focus:border-transparent outline-none"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.contactForm.fields.company} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={dict.contactForm.placeholders.company}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b3f61] focus:border-transparent outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.contactForm.fields.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={dict.contactForm.placeholders.phone}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b3f61] focus:border-transparent outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.contactForm.fields.email} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={dict.contactForm.placeholders.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3b3f61] focus:border-transparent outline-none"
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  checked={formData.privacy}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#3b3f61] focus:ring-[#3b3f61]"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700">
                  {dict.contactForm.privacy}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#393d5f] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2d3049] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : dict.contactForm.submit}
                {!isSubmitting && <span>→</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
