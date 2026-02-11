# Phase 3: UI 컴포넌트 개발

## 목표

Hero 섹션, 회사 소개, 예약/문의 폼을 포함한 UI 컴포넌트를 개발합니다.

---

## 1. Hero Section 컴포넌트

### `src/components/HeroSection/HeroSection.tsx`

```typescript
import { Dictionary } from '@/types/i18n';

interface HeroSectionProps {
  dict: Dictionary;
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-6">
          {dict.hero.title}
        </h1>
        <p className="text-2xl mb-8 opacity-90">
          {dict.hero.subtitle}
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          {dict.hero.cta}
        </a>
      </div>
    </section>
  );
}
```

---

## 2. About Section 컴포넌트

### `src/components/AboutSection/AboutSection.tsx`

```typescript
import { Dictionary } from '@/types/i18n';

interface AboutSectionProps {
  dict: Dictionary;
}

export default function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          {dict.about.title}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {dict.about.description}
        </p>
      </div>
    </section>
  );
}
```

---

## 3. Contact Form 컴포넌트

### 3.1 Validation 스키마: `src/lib/validation.ts`

```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  company: z.string().min(1, 'companyRequired'),
  name: z.string().min(1, 'nameRequired'),
  phone: z
    .string()
    .min(1, 'phoneRequired')
    .regex(/^[+]?[\d\s-()]+$/, 'phoneInvalid'),
  email: z.string().min(1, 'emailRequired').email('emailInvalid'),
  needs: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### 3.2 Form 컴포넌트: `src/components/ContactForm/ContactForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { Dictionary } from '@/types/i18n';

interface ContactFormProps {
  dict: Dictionary;
  lang: string;
}

export default function ContactForm({ dict, lang }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    company: '',
    name: '',
    phone: '',
    email: '',
    needs: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    // Validation
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        const messageKey = err.message;
        fieldErrors[field] = dict.contact.validation[messageKey as keyof typeof dict.contact.validation];
      });
      setErrors(fieldErrors);
      return;
    }

    // Submit to API
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ company: '', name: '', phone: '', email: '', needs: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">
          {dict.contact.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Company Name */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.company} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
            {errors.company && (
              <p id="company-error" className="mt-1 text-sm text-red-600">
                {errors.company}
              </p>
            )}
          </div>

          {/* Contact Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.phone} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.email} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Business Needs (Optional) */}
          <div>
            <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-1">
              {dict.contact.form.needs}
            </label>
            <textarea
              id="needs"
              name="needs"
              value={formData.needs}
              onChange={handleChange}
              rows={4}
              placeholder={dict.contact.form.needsPlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? dict.contact.form.submitting : dict.contact.form.submit}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {dict.contact.success}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {dict.contact.error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
```

---

## 4. 메인 페이지에 컴포넌트 통합

### `src/app/[lang]/page.tsx` 업데이트

```typescript
import { getDictionary, type Locale } from '@/lib/i18n';
import HeroSection from '@/components/HeroSection/HeroSection';
import AboutSection from '@/components/AboutSection/AboutSection';
import ContactForm from '@/components/ContactForm/ContactForm';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

export default async function HomePage({
  params
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <main className="min-h-screen">
      {/* Header with Language Switcher */}
      <header className="absolute top-0 right-0 p-6 z-10">
        <LanguageSwitcher />
      </header>

      {/* Hero Section */}
      <HeroSection dict={dict} />

      {/* About Section */}
      <AboutSection dict={dict} />

      {/* Contact Form */}
      <ContactForm dict={dict} lang={params.lang} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 text-center">
        <p>&copy; 2024 FinProfile. All rights reserved.</p>
      </footer>
    </main>
  );
}
```

---

## 5. 테스트

### 5.1 개발 서버 실행

```bash
npm run dev
```

### 5.2 확인 사항

- [ ] Hero 섹션이 표시되는가?
- [ ] 언어 전환 버튼이 동작하는가?
- [ ] About 섹션 텍스트가 각 언어로 표시되는가?
- [ ] Contact 폼의 모든 필드가 표시되는가?
- [ ] 필수 필드를 비우고 제출 시 에러 메시지가 표시되는가?
- [ ] 이메일/전화번호 형식 검증이 동작하는가?
- [ ] 키보드로 폼 네비게이션이 가능한가?

---

## ✅ 완료 체크리스트

- [ ] `HeroSection` 컴포넌트 작성
- [ ] `AboutSection` 컴포넌트 작성
- [ ] `ContactForm` 컴포넌트 작성
- [ ] Zod validation 스키마 작성
- [ ] 메인 페이지에 모든 컴포넌트 통합
- [ ] 언어 전환 동작 확인
- [ ] Form validation 테스트
- [ ] 접근성 (ARIA, label) 적용 확인

---

## 다음 단계

👉 **[Phase 4: 백엔드 API 구현](./phase4.md)**
