# Phase 2: i18n 인프라 구축

## 목표
라이브러리 없이 다국어(영어, 인도네시아어, 한국어) 지원 인프라를 구축합니다.

---

## 1. 언어 리소스 파일 생성

### 1.1 `src/locales/en.json`
```json
{
  "meta": {
    "title": "FinProfile - Financial Consulting Services",
    "description": "Professional financial consulting for your business growth"
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "title": "Professional Financial Consulting",
    "subtitle": "We help your business grow with expert financial solutions",
    "cta": "Contact Us"
  },
  "about": {
    "title": "About FinProfile",
    "description": "We provide comprehensive financial consulting services..."
  },
  "contact": {
    "title": "Contact Us",
    "form": {
      "company": "Company Name",
      "name": "Contact Person",
      "phone": "Phone Number",
      "email": "Email",
      "needs": "Business Needs",
      "needsPlaceholder": "Tell us about your requirements (optional)",
      "submit": "Submit",
      "submitting": "Submitting..."
    },
    "validation": {
      "companyRequired": "Company name is required",
      "nameRequired": "Name is required",
      "phoneRequired": "Phone number is required",
      "phoneInvalid": "Invalid phone number format",
      "emailRequired": "Email is required",
      "emailInvalid": "Invalid email format"
    },
    "success": "Thank you! We will contact you soon.",
    "error": "Failed to submit. Please try again."
  }
}
```

### 1.2 `src/locales/id.json`
```json
{
  "meta": {
    "title": "FinProfile - Layanan Konsultasi Keuangan",
    "description": "Konsultasi keuangan profesional untuk pertumbuhan bisnis Anda"
  },
  "nav": {
    "home": "Beranda",
    "about": "Tentang",
    "contact": "Kontak"
  },
  "hero": {
    "title": "Konsultasi Keuangan Profesional",
    "subtitle": "Kami membantu bisnis Anda berkembang dengan solusi keuangan ahli",
    "cta": "Hubungi Kami"
  },
  "about": {
    "title": "Tentang FinProfile",
    "description": "Kami menyediakan layanan konsultasi keuangan komprehensif..."
  },
  "contact": {
    "title": "Hubungi Kami",
    "form": {
      "company": "Nama Perusahaan",
      "name": "Nama Kontak",
      "phone": "Nomor Telepon",
      "email": "Email",
      "needs": "Kebutuhan Bisnis",
      "needsPlaceholder": "Ceritakan kebutuhan Anda (opsional)",
      "submit": "Kirim",
      "submitting": "Mengirim..."
    },
    "validation": {
      "companyRequired": "Nama perusahaan wajib diisi",
      "nameRequired": "Nama wajib diisi",
      "phoneRequired": "Nomor telepon wajib diisi",
      "phoneInvalid": "Format nomor telepon tidak valid",
      "emailRequired": "Email wajib diisi",
      "emailInvalid": "Format email tidak valid"
    },
    "success": "Terima kasih! Kami akan menghubungi Anda segera.",
    "error": "Gagal mengirim. Silakan coba lagi."
  }
}
```

### 1.3 `src/locales/ko.json`
```json
{
  "meta": {
    "title": "FinProfile - 금융 컨설팅 서비스",
    "description": "비즈니스 성장을 위한 전문 금융 컨설팅"
  },
  "nav": {
    "home": "홈",
    "about": "소개",
    "contact": "문의"
  },
  "hero": {
    "title": "전문 금융 컨설팅",
    "subtitle": "전문가의 금융 솔루션으로 비즈니스 성장을 돕습니다",
    "cta": "문의하기"
  },
  "about": {
    "title": "FinProfile 소개",
    "description": "포괄적인 금융 컨설팅 서비스를 제공합니다..."
  },
  "contact": {
    "title": "문의하기",
    "form": {
      "company": "회사명",
      "name": "담당자명",
      "phone": "전화번호",
      "email": "이메일",
      "needs": "비즈니스 니즈",
      "needsPlaceholder": "요구사항을 알려주세요 (선택)",
      "submit": "제출",
      "submitting": "제출 중..."
    },
    "validation": {
      "companyRequired": "회사명은 필수입니다",
      "nameRequired": "이름은 필수입니다",
      "phoneRequired": "전화번호는 필수입니다",
      "phoneInvalid": "유효하지 않은 전화번호 형식입니다",
      "emailRequired": "이메일은 필수입니다",
      "emailInvalid": "유효하지 않은 이메일 형식입니다"
    },
    "success": "감사합니다! 곧 연락드리겠습니다.",
    "error": "제출 실패. 다시 시도해주세요."
  }
}
```

---

## 2. i18n 헬퍼 함수 작성

### 2.1 `src/lib/i18n.ts`
```typescript
export type Locale = 'en' | 'id' | 'ko';

export const locales: Locale[] = ['en', 'id', 'ko'];
export const defaultLocale: Locale = 'en';

export async function getDictionary(locale: Locale) {
  try {
    const dict = await import(`@/locales/${locale}.json`);
    return dict.default;
  } catch {
    // Fallback to default locale if import fails
    const dict = await import(`@/locales/${defaultLocale}.json`);
    return dict.default;
  }
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
```

### 2.2 `src/types/i18n.ts` (타입 정의)
```typescript
export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    form: {
      company: string;
      name: string;
      phone: string;
      email: string;
      needs: string;
      needsPlaceholder: string;
      submit: string;
      submitting: string;
    };
    validation: {
      companyRequired: string;
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      emailRequired: string;
      emailInvalid: string;
    };
    success: string;
    error: string;
  };
}
```

---

## 3. 다국어 라우팅 설정

### 3.1 루트 페이지 리다이렉트: `src/app/page.tsx`
```typescript
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
```

### 3.2 언어별 레이아웃: `src/app/[lang]/layout.tsx`
```typescript
import { Inter } from 'next/font/google';
import { locales, isValidLocale, type Locale, getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params
}: {
  params: { lang: string }
}) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // 유효하지 않은 언어는 404
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 3.3 언어별 메인 페이지: `src/app/[lang]/page.tsx`
```typescript
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function HomePage({
  params
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <main className="min-h-screen">
      <h1>{dict.hero.title}</h1>
      <p>{dict.hero.subtitle}</p>
      {/* 이후 Phase 3에서 컴포넌트 추가 */}
    </main>
  );
}
```

---

## 4. 언어 전환 컴포넌트 작성

### `src/components/LanguageSwitcher/LanguageSwitcher.tsx`
```typescript
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

const languageNames: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa',
  ko: '한국어',
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split('/')[1] as Locale;

  const switchLanguage = (newLang: Locale) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang)}
          className={`px-3 py-1 rounded ${
            currentLang === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {languageNames[lang]}
        </button>
      ))}
    </div>
  );
}
```

---

## 5. 테스트

### 5.1 개발 서버 실행
```bash
npm run dev
```

### 5.2 URL 확인
- `http://localhost:8080/en` → 영어 버전
- `http://localhost:8080/id` → 인도네시아어 버전
- `http://localhost:8080/ko` → 한국어 버전
- `http://localhost:8080` → `/en`으로 자동 리다이렉트

---

## ✅ 완료 체크리스트

- [ ] 3개 언어 JSON 파일 생성 (en, id, ko)
- [ ] `src/lib/i18n.ts` 헬퍼 함수 작성
- [ ] `src/types/i18n.ts` 타입 정의
- [ ] `src/app/[lang]/layout.tsx` 다국어 레이아웃
- [ ] `src/app/[lang]/page.tsx` 다국어 페이지
- [ ] `LanguageSwitcher` 컴포넌트 작성
- [ ] 각 언어별 URL 접근 확인

---

## 다음 단계

👉 **[Phase 3: UI 컴포넌트 개발](./phase3.md)**
