# Phase 5: 성능 & SEO 최적화

## 목표
인도네시아 인터넷 환경을 고려한 성능 최적화 및 Google Lighthouse 90점 이상 달성을 목표로 합니다.

---

## 1. 이미지 최적화

### 1.1 WebP 이미지 준비
모든 이미지를 WebP 포맷으로 변환하여 `public/images/` 폴더에 저장합니다.

**이미지 변환 (예시)**
```bash
# ImageMagick 사용
convert original.png -quality 85 public/images/hero-bg.webp

# 또는 온라인 도구 사용 (squoosh.app, cloudconvert.com 등)
```

### 1.2 Next/Image 컴포넌트 사용

#### `src/components/HeroSection/HeroSection.tsx` 업데이트
```typescript
import Image from 'next/image';
import { Dictionary } from '@/types/i18n';

interface HeroSectionProps {
  dict: Dictionary;
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-6 overflow-hidden">
      {/* Background Image with Lazy Loading */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/hero-bg.webp"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority // Hero 이미지는 priority 설정
          quality={85}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {dict.hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
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

### 1.3 Lazy Loading 적용
Hero 섹션 외의 이미지는 `priority={false}` (기본값) 사용으로 자동 lazy loading 적용됩니다.

---

## 2. Metadata & SEO 설정

### 2.1 Layout Metadata 강화

#### `src/app/[lang]/layout.tsx` 업데이트
```typescript
import { Inter } from 'next/font/google';
import { locales, isValidLocale, type Locale, getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Font loading 최적화
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finprofile.com';

  return {
    title: dict.meta.title,
    description: dict.meta.description,

    // Open Graph
    openGraph: {
      type: 'website',
      locale: lang,
      url: `${siteUrl}/${lang}`,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: 'FinProfile',
      images: [
        {
          url: `${siteUrl}/images/og-image.webp`,
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${siteUrl}/images/og-image.webp`],
    },

    // Alternate languages
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        en: `${siteUrl}/en`,
        id: `${siteUrl}/id`,
        ko: `${siteUrl}/ko`,
      },
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification (필요시)
    // verification: {
    //   google: 'your-google-site-verification',
    // },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  return (
    <html lang={params.lang}>
      <head>
        {/* Preconnect to external domains (if any) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 2.2 JSON-LD 구조화 데이터 추가

#### `src/components/JsonLd/JsonLd.tsx`
```typescript
import { Locale } from '@/lib/i18n';

interface JsonLdProps {
  lang: Locale;
}

export default function JsonLd({ lang }: JsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finprofile.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'FinProfile',
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}/images/logo.webp`,
    description: 'Professional financial consulting services',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID', // 인도네시아
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['en', 'id', 'ko'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
```

#### 메인 페이지에 추가: `src/app/[lang]/page.tsx`
```typescript
import JsonLd from '@/components/JsonLd/JsonLd';

export default async function HomePage({ params }: { params: { lang: string } }) {
  // ... existing code

  return (
    <>
      <JsonLd lang={params.lang as Locale} />
      <main className="min-h-screen">
        {/* ... existing components */}
      </main>
    </>
  );
}
```

---

## 3. Core Web Vitals 최적화

### 3.1 Font 최적화 (이미 적용됨)
```typescript
// src/app/[lang]/layout.tsx
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // FOIT 방지
});
```

### 3.2 CSS 최적화

#### Tailwind CSS 설정: `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Production에서 사용하지 않는 클래스 제거
  purge: {
    enabled: process.env.NODE_ENV === 'production',
  },
};

export default config;
```

### 3.3 Dynamic Import (Code Splitting)

ContactForm은 이미 Client Component이므로, 필요시 추가 최적화:

```typescript
// src/app/[lang]/page.tsx
import dynamic from 'next/dynamic';

// ContactForm을 dynamic import (lazy loading)
const ContactForm = dynamic(() => import('@/components/ContactForm/ContactForm'), {
  loading: () => <div className="py-16 text-center">Loading...</div>,
  ssr: false, // 필요시 SSR 비활성화
});
```

---

## 4. 성능 측정 및 검증

### 4.1 로컬 빌드 테스트
```bash
npm run build
npm start
```

### 4.2 Lighthouse 실행
1. Chrome DevTools 열기 (F12)
2. Lighthouse 탭 선택
3. Categories: Performance, Accessibility, Best Practices, SEO 모두 선택
4. "Analyze page load" 클릭

**목표 점수:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 4.3 Core Web Vitals 확인
- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 4.4 WebPageTest (실제 인도네시아 네트워크 시뮬레이션)
1. https://www.webpagetest.org/ 접속
2. Test Location: Jakarta, Indonesia 선택
3. Connection: 3G/4G 선택
4. URL 입력 후 테스트 실행

---

## 5. 접근성 (Accessibility) 검증

### 5.1 키보드 네비게이션 테스트
- Tab 키로 모든 폼 필드 접근 가능
- Enter 키로 폼 제출 가능
- 언어 전환 버튼 Tab으로 접근 가능

### 5.2 스크린 리더 테스트
- macOS VoiceOver (Cmd + F5) 또는
- NVDA (Windows 무료) 사용

### 5.3 WAVE 도구
1. https://wave.webaim.org/ 접속
2. URL 입력 후 분석
3. 에러 0개 목표

### 5.4 Contrast Checker
- 텍스트와 배경 색상 대비 4.5:1 이상 (WCAG AA 기준)
- https://webaim.org/resources/contrastchecker/

---

## 6. robots.txt 및 sitemap.xml

### 6.1 `public/robots.txt`
```txt
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

### 6.2 `src/app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finprofile.com';

  return locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }));
}
```

---

## ✅ 완료 체크리스트

- [ ] 모든 이미지 WebP 변환 및 Next/Image 적용
- [ ] Hero 이미지 priority 설정
- [ ] Lazy Loading 적용
- [ ] Metadata (Open Graph, Twitter Card) 설정
- [ ] JSON-LD 구조화 데이터 추가
- [ ] Font 최적화 (display: swap)
- [ ] Tailwind CSS purge 설정
- [ ] Dynamic Import 적용 (선택사항)
- [ ] Lighthouse 90+ 달성
- [ ] Core Web Vitals 기준 충족
- [ ] 키보드 네비게이션 확인
- [ ] WAVE 접근성 테스트 통과
- [ ] robots.txt 생성
- [ ] sitemap.xml 생성

---

## 성능 최적화 체크리스트 요약

### LCP (Largest Contentful Paint) 개선
- ✅ Hero 이미지 priority 설정
- ✅ WebP 이미지 사용
- ✅ Font display: swap

### INP (Interaction to Next Paint) 개선
- ✅ 불필요한 JavaScript 제거
- ✅ Dynamic Import로 코드 분할

### CLS (Cumulative Layout Shift) 개선
- ✅ 이미지 width/height 명시 (Next/Image 자동)
- ✅ Font display: swap

---

## 다음 단계

👉 **[Phase 6: AWS Amplify 배포](./phase6.md)**
