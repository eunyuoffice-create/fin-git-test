# SEO 최적화 가이드

이 문서는 FinProfile 사이트의 SEO 설정 및 구현 내용을 설명합니다.

---

## 구현 현황

| 항목 | 상태 | 파일 |
|------|------|------|
| robots.txt | ✅ | `src/app/robots.ts` |
| sitemap.xml | ✅ | `src/app/sitemap.ts` |
| Meta Title/Description | ✅ | `src/app/[lang]/layout.tsx` |
| Open Graph (OG) | ✅ | `src/app/[lang]/layout.tsx` |
| Twitter Card | ✅ | `src/app/[lang]/layout.tsx` |
| Canonical URL | ✅ | `src/app/[lang]/layout.tsx` |
| hreflang (다국어) | ✅ | `src/app/[lang]/layout.tsx` |
| JSON-LD 구조화 데이터 | ✅ | `src/app/[lang]/page.tsx` |
| OG 이미지 | ⚠️ | `public/og-image.png` (추가 필요) |

---

## 1. robots.txt

**파일**: `src/app/robots.ts`

검색엔진 크롤러에게 사이트 크롤링 규칙을 알려줍니다.

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

**설정 내용:**
- 모든 크롤러(`*`) 허용
- `/api/`, `/_next/` 경로 크롤링 차단
- sitemap.xml 위치 명시

**생성 결과** (`/robots.txt`):
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://example.com/sitemap.xml
```

---

## 2. sitemap.xml

**파일**: `src/app/sitemap.ts`

검색엔진에게 사이트의 모든 페이지 목록을 제공합니다.

```typescript
import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://...';

  const localePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    ...localePages,
  ];
}
```

**생성 결과** (`/sitemap.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com</loc>
    <lastmod>2026-02-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/en</loc>
    ...
  </url>
  <url>
    <loc>https://example.com/ko</loc>
    ...
  </url>
</urlset>
```

---

## 3. 메타데이터 (Open Graph, Twitter Card)

**파일**: `src/app/[lang]/layout.tsx`

### Open Graph
소셜 미디어(Facebook, LinkedIn, KakaoTalk 등)에서 링크 공유 시 미리보기 표시.

```typescript
openGraph: {
  title: dict.meta.title,
  description: dict.meta.description,
  url: url,
  siteName: 'FinProfile',
  locale: lang === 'ko' ? 'ko_KR' : 'en_US',
  type: 'website',
  images: [
    {
      url: `${baseUrl}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'FinProfile - AI-Powered Credit Infrastructure',
    },
  ],
},
```

### Twitter Card
Twitter/X에서 링크 공유 시 카드 형태로 표시.

```typescript
twitter: {
  card: 'summary_large_image',
  title: dict.meta.title,
  description: dict.meta.description,
  images: [`${baseUrl}/og-image.png`],
},
```

### 생성되는 HTML
```html
<!-- Open Graph -->
<meta property="og:title" content="FinProfile - AI-Powered Credit Infrastructure" />
<meta property="og:description" content="Close credit data gaps with AI..." />
<meta property="og:url" content="https://example.com/en" />
<meta property="og:site_name" content="FinProfile" />
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://example.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="FinProfile - AI-Powered Credit Infrastructure" />
<meta name="twitter:description" content="Close credit data gaps with AI..." />
<meta name="twitter:image" content="https://example.com/og-image.png" />
```

---

## 4. Canonical URL & hreflang

**파일**: `src/app/[lang]/layout.tsx`

### Canonical URL
검색엔진에게 "이 페이지의 대표 URL"을 알려줍니다. 중복 콘텐츠 문제 방지.

### hreflang
다국어 페이지 간의 관계를 알려줍니다. 검색엔진이 사용자 언어에 맞는 페이지 표시.

```typescript
alternates: {
  canonical: url,  // 현재 페이지의 대표 URL
  languages: {
    'en': `${baseUrl}/en`,
    'ko': `${baseUrl}/ko`,
  },
},
```

### 생성되는 HTML
```html
<link rel="canonical" href="https://example.com/en" />
<link rel="alternate" hreflang="en" href="https://example.com/en" />
<link rel="alternate" hreflang="ko" href="https://example.com/ko" />
```

---

## 5. JSON-LD 구조화 데이터

**파일**: `src/app/[lang]/page.tsx`

Google 검색 결과에서 리치 스니펫(회사 정보, 로고 등) 표시.

```typescript
function generateJsonLd(lang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FinProfile',
    url: `${baseUrl}/${lang}`,
    logo: `${baseUrl}/favicon.ico`,
    description: 'AI-Powered Credit Infrastructure...',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '503, 474 Gwangnaru-ro, Gwangjin-gu',
      addressLocality: 'Seoul',
      addressCountry: 'KR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@finprofile.id',
      contactType: 'customer service',
    },
  };
}
```

### 생성되는 HTML
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FinProfile",
  "url": "https://example.com/en",
  "logo": "https://example.com/favicon.ico",
  ...
}
</script>
```

---

## 6. OG 이미지 가이드

### 필요 사항
- **파일 위치**: `public/og-image.png`
- **권장 사이즈**: 1200 x 630 px
- **포맷**: PNG 또는 JPG
- **파일 크기**: 1MB 이하 권장

### 디자인 권장사항
- 브랜드 로고 포함
- 핵심 메시지/슬로건
- 배경색은 브랜드 컬러 사용
- 텍스트는 이미지 중앙에 배치

### 테스트 도구
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## 7. 환경변수 설정

SEO 메타데이터에서 사용하는 환경변수:

| 변수 | 설명 | 예시 |
|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 사이트 기본 URL | `https://finprofile.com` |

### 로컬 개발
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 프로덕션 (Amplify)
Amplify Console → Environment variables에서 설정

---

## 8. SEO 체크리스트

배포 전 확인사항:

- [ ] `NEXT_PUBLIC_SITE_URL` 환경변수 설정
- [ ] `public/og-image.png` 이미지 추가 (1200x630px)
- [ ] 각 locale의 `meta.title`, `meta.description` 작성
- [ ] robots.txt 접근 확인 (`/robots.txt`)
- [ ] sitemap.xml 접근 확인 (`/sitemap.xml`)
- [ ] Google Search Console 등록
- [ ] 소셜 미디어 공유 테스트

---

## 9. 추가 개선 가능 항목

| 항목 | 설명 | 우선순위 |
|------|------|----------|
| Google Search Console | 검색 성능 모니터링 | 높음 |
| Google Analytics | 트래픽 분석 | 높음 |
| 페이지별 메타데이터 | 서브 페이지 추가 시 개별 SEO | 중간 |
| FAQ 구조화 데이터 | FAQ 섹션 리치 스니펫 | 낮음 |
| Breadcrumb 구조화 데이터 | 탐색 경로 표시 | 낮음 |

---

**마지막 업데이트**: 2026-02-04
**작성자**: Development Team
