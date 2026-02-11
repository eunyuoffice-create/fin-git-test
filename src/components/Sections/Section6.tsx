'use client';

import { useState, useId, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';

interface ContactFormProps {
  dict: {
    section6: {
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
      errors: {
        name: string;
        company: string;
        phone: string;
        email: string;
        emailInvalid: string;
        privacy: string;
      };
      privacy: string;
      privacyLink?: string;
      submit: string;
    };
  };
  lang: string;
}

type FormErrors = Partial<Record<'name' | 'company' | 'phone' | 'email' | 'privacy', string>>;

export default function ContactForm({ dict, lang }: ContactFormProps) {
  const formId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    const { errors: errMsg } = dict.section6;

    if (!formData.name.trim()) newErrors.name = errMsg.name;
    if (!formData.company.trim()) newErrors.company = errMsg.company;
    if (!formData.phone.trim()) newErrors.phone = errMsg.phone;
    if (!formData.email.trim()) {
      newErrors.email = errMsg.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = errMsg.emailInvalid;
    }
    if (!formData.privacy) newErrors.privacy = errMsg.privacy;

    return newErrors;
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

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

      setSubmitStatus('success');
      alert("Form submitted successfully! We'll contact you soon.");

      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        privacy: false,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      alert('Failed to submit form: ' + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    cn(
      'w-full px-4 py-3 bg-white rounded-2xl',
      'text-xl text-[#363a5b] placeholder:text-[#bdbdbd]',
      'tracking-[-0.3px] leading-[1.4]',
      'focus:outline-none focus:ring-2 transition-shadow',
      errors[field]
        ? 'ring-2 ring-red-400 focus:ring-red-400'
        : 'focus:ring-[#3e14b4]/30'
    );

  const labelClass = cn(
    'flex items-center gap-1 px-2',
    'text-base font-medium text-black',
    'tracking-[-0.24px] leading-[1.4]'
  );

  return (
    <section
      id="contact"
      className={cn(
        'relative w-full px-4 sm:px-8 lg:px-[220px]',
        'pt-20 pb-[100px] overflow-hidden'
      )}
      aria-labelledby="contact-title"
    >
      <div className="relative max-w-[1000px] mx-auto">
        {/* Title */}
        <ScrollReveal>
          <h2
            id="contact-title"
            className={cn(
              'text-[32px] sm:text-[40px] lg:text-5xl',
              'font-medium text-[#363a5b] text-center',
              'mb-[54px] tracking-[-0.72px] leading-[1.4]'
            )}
          >
            {dict.section6.title}
          </h2>
        </ScrollReveal>

        <div className="flex flex-col items-center gap-[54px] rounded-3xl">
          {/* Video Section */}
          <ScrollReveal
            delay={150}
            className="w-full px-0 sm:px-[50px] lg:px-[100px]"
          >
            <figure
              className={cn(
                'relative w-full aspect-video',
                'bg-[#d9d9d9] rounded-3xl overflow-hidden'
              )}
              role="group"
              aria-label="Product demo video"
            >
              {/* Video Background Image */}
              <Image
                src="/images/sections/section6/bg.webp"
                alt=""
                fill
                sizes="800px"
                quality={90}
                className="object-cover blur-[10px]"
                aria-hidden="true"
              />

              {/* Video Overlay */}
              <div
                className="absolute inset-0 bg-black/40"
                aria-hidden="true"
              />

              {/* Video Element */}
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                poster="/videos/demoVideo-poster.webp"
                className="absolute inset-0 w-full h-full object-cover"
                aria-label="FinProfile service introduction video"
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/videos/demoVideo-optimized.mp4" type="video/mp4" />
                <p>Your browser does not support video playback.</p>
              </video>

              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={handlePlayVideo}
                className={cn(
                  'absolute inset-0 flex items-center justify-center group',
                  'focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50'
                )}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <div
                  className={cn(
                    'w-20 h-20 bg-white rounded-full',
                    'flex items-center justify-center shadow-lg',
                    'transition-all duration-300',
                    isPlaying
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100 group-hover:scale-105'
                  )}
                >
                  {isPlaying ? (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="#363a5b"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="#363a5b"
                      aria-hidden="true"
                      focusable="false"
                      className="ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </button>
            </figure>
          </ScrollReveal>

          {/* Form Section */}
          <ScrollReveal
            delay={300}
            className="w-full px-0 sm:px-[50px] lg:px-[100px]"
          >
            <div className="bg-[#f0f5ff] rounded-3xl p-6 sm:p-8 lg:p-10">
              {/* Form Header */}
              <div className="flex items-center justify-between gap-4 mb-10">
                <h3
                  className={cn(
                    'text-2xl sm:text-[28px] font-medium text-[#363a5b]',
                    'tracking-[-0.42px] leading-[1.3]'
                  )}
                >
                  {dict.section6.subtitle}
                </h3>
                <span
                  className={cn(
                    'text-base text-[#7a7a7a] shrink-0',
                    'tracking-[-0.24px] leading-[1.4]'
                  )}
                  aria-hidden="true"
                >
                  {dict.section6.required}
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-10"
                aria-describedby={`${formId}-required`}
                noValidate
              >
                <p id={`${formId}-required`} className="sr-only">
                  Fields marked with * are required.
                </p>

                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${formId}-name`} className={labelClass}>
                    <span>{dict.section6.fields.name}</span>
                    <span className="text-[#3e14b4]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      clearError('name');
                    }}
                    placeholder={dict.section6.placeholders.name}
                    className={inputClass('name')}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                  />
                  {errors.name && (
                    <p id={`${formId}-name-error`} className="text-sm text-red-500 px-2" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Company Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${formId}-company`} className={labelClass}>
                    <span>{dict.section6.fields.company}</span>
                    <span className="text-[#3e14b4]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={`${formId}-company`}
                    type="text"
                    required
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      clearError('company');
                    }}
                    placeholder={dict.section6.placeholders.company}
                    className={inputClass('company')}
                    aria-required="true"
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? `${formId}-company-error` : undefined}
                  />
                  {errors.company && (
                    <p id={`${formId}-company-error`} className="text-sm text-red-500 px-2" role="alert">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${formId}-phone`} className={labelClass}>
                    <span>{dict.section6.fields.phone}</span>
                    <span className="text-[#3e14b4]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      clearError('phone');
                    }}
                    placeholder={dict.section6.placeholders.phone}
                    className={inputClass('phone')}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                  />
                  {errors.phone && (
                    <p id={`${formId}-phone-error`} className="text-sm text-red-500 px-2" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${formId}-email`} className={labelClass}>
                    <span>{dict.section6.fields.email}</span>
                    <span className="text-[#3e14b4]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      clearError('email');
                    }}
                    placeholder={dict.section6.placeholders.email}
                    className={inputClass('email')}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                  />
                  {errors.email && (
                    <p id={`${formId}-email-error`} className="text-sm text-red-500 px-2" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-1">
                  <div className="relative shrink-0 w-6 h-6">
                    <input
                      type="checkbox"
                      id={`${formId}-privacy`}
                      required
                      checked={formData.privacy}
                      onChange={(e) => {
                        setFormData({ ...formData, privacy: e.target.checked });
                        clearError('privacy');
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 peer"
                      aria-required="true"
                      aria-invalid={!!errors.privacy}
                      aria-describedby={`${formId}-privacy-desc${errors.privacy ? ` ${formId}-privacy-error` : ''}`}
                    />
                    <div
                      className={cn(
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                        'w-4 h-4 border border-[#363a5b] rounded-sm',
                        'peer-checked:bg-[#3e14b4] peer-checked:border-[#3e14b4]',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-[#3e14b4]/50',
                        'transition-colors'
                      )}
                      aria-hidden="true"
                    >
                      {formData.privacy && (
                        <svg
                          className="w-full h-full text-white"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <label
                    id={`${formId}-privacy-desc`}
                    htmlFor={`${formId}-privacy`}
                    className={cn(
                      'flex-1 text-base text-[#363a5b] cursor-pointer',
                      'tracking-[-0.24px] leading-[1.4]'
                    )}
                  >
                    <span>I agree to the </span>
                    <a
                      href={dict.section6.privacyLink || '/privacy'}
                      className={cn(
                        'underline decoration-solid',
                        'hover:text-[#3e14b4]',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e14b4]'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    <span>
                      and consent to the processing of my personal data for the
                      purpose of a product demo and marketing communications.
                    </span>
                    <span className="text-[#3e14b4]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  </div>
                  {errors.privacy && (
                    <p id={`${formId}-privacy-error`} className="text-sm text-red-500 px-2" role="alert">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'inline-flex items-center justify-center gap-2',
                    'h-14 pl-8 pr-6 py-2 w-fit',
                    'bg-[#363a5b] text-white rounded-full',
                    'font-bold text-[15px] tracking-[-0.225px] leading-[1.4]',
                    'shadow-[0px_8px_24px_0px_rgba(62,20,180,0.2)]',
                    'hover:bg-[#2d3049] transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3e14b4] focus-visible:ring-offset-2',
                    'relative',
                    'after:content-[""] after:w-6 after:h-6 after:ml-2',
                    'after:bg-[url("/images/common/icons/icon-arrow.svg")]',
                    'after:bg-no-repeat after:bg-center after:bg-contain'
                  )}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="sr-only">Submitting...</span>
                      <span aria-hidden="true">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>{dict.section6.submit}</span>
                    </>
                  )}
                </button>

                {/* Status message for screen readers */}
                <div className="sr-only" role="status" aria-live="polite">
                  {submitStatus === 'success' && 'Form submitted successfully.'}
                  {submitStatus === 'error' &&
                    'Form submission failed. Please try again.'}
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
