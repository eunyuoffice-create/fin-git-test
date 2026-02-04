# 배포 트러블슈팅 가이드

이 문서는 AWS Amplify + Next.js SSR 배포 중 발생한 문제들과 해결 방법을 기록합니다.

---

## 문제 1: Lighthouse NO_FCP 오류

### 증상
```
There were issues affecting this run of Lighthouse:
The page did not paint any content. (NO_FCP)
```

Lighthouse에서 First Contentful Paint를 측정할 수 없다는 오류 발생.

### 원인
루트 페이지(`/`)에서 Next.js의 `redirect()` 함수를 사용하여 서버 사이드 리다이렉트만 수행하고, **실제 HTML 콘텐츠를 렌더링하지 않음**.

```tsx
// 문제가 된 코드 (src/app/page.tsx)
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(`/${defaultLocale}`);  // HTTP 307 리다이렉트만 발생, HTML 없음
}
```

Next.js `redirect()`는 서버에서 HTTP 307/308 응답만 보내므로 브라우저가 렌더링할 HTML이 없습니다.

### 해결 방법

#### 1. 미들웨어 추가 (`src/middleware.ts`)
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 이미 locale이 포함된 경로인지 확인
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 정적 파일, API, _next 경로는 제외
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 브라우저 언어 감지 후 리다이렉트
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',],
};
```

#### 2. 루트 페이지 수정 (`src/app/page.tsx`)
```tsx
// Fallback으로 실제 HTML 콘텐츠 제공
export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
        <title>Redirecting...</title>
      </head>
      <body>
        <p>Redirecting to <a href={`/${defaultLocale}`}>/{defaultLocale}</a>...</p>
      </body>
    </html>
  );
}
```

### 결과
- 미들웨어가 locale 리다이렉트 처리
- 루트 페이지는 fallback으로 실제 HTML 제공
- Lighthouse FCP 측정 가능

---

## 문제 2: Amplify SSR 환경변수가 런타임에 안 읽힘

### 증상
```json
{
  "error": "Internal server error",
  "debug": {
    "message": "SLACK_WEBHOOK_URL is not configured",
    "hasWebhook": false
  }
}
```

Amplify Console에서 환경변수를 설정했는데도 API에서 `process.env.SLACK_WEBHOOK_URL`이 `undefined`.

### 원인
**Amplify의 환경변수는 빌드 타임에만 사용 가능**하고, SSR 런타임(Lambda)에 자동 전달되지 않습니다.

```
[빌드 타임]                    [런타임 - Lambda]
Amplify 환경변수 ──────────→   process.env = undefined
       ↓
  npm run build
```

### 해결 방법

`amplify.yml`에서 빌드 시 환경변수를 `.env.production` 파일로 저장:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        # 환경변수를 .env.production에 기록
        - echo "SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL" >> .env.production
        - echo "ALLOWED_ORIGINS=$ALLOWED_ORIGINS" >> .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 동작 원리
```
[빌드 타임]
Amplify 환경변수 → .env.production 파일 생성 → npm run build

[런타임 - Lambda]
Next.js가 .env.production 파일 읽음 → process.env 사용 가능
```

### 주의사항
- 로컬 `.env.production` 파일에는 **실제 값을 넣지 마세요** (보안 문제)
- 로컬 개발: `.env.local` 사용
- 프로덕션: Amplify Console 환경변수 + amplify.yml 빌드 스크립트

---

## 문제 3: i18n Locale 불일치

### 증상
TypeScript 빌드 에러:
```
Type error: Object literal may only specify known properties,
and 'id' does not exist in type 'Record<Locale, string>'.
```

### 원인
여러 파일에서 locale 설정이 불일치:

| 파일 | 설정값 |
|------|--------|
| `src/lib/i18n.ts` | `['en', 'id']` |
| `generateStaticParams` | `['en', 'ko']` |
| `LanguageSwitcher.tsx` | `{ en: 'English', id: 'Bahasa' }` |

### 해결 방법

모든 파일에서 locale 일치시키기:

```typescript
// src/lib/i18n.ts
export type Locale = 'en' | 'ko';
export const locales: Locale[] = ['en', 'ko'];

// src/app/[lang]/page.tsx
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }];
}

// src/components/LanguageSwitcher/LanguageSwitcher.tsx
const languageNames: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
};
```

그리고 locale 파일 생성:
```bash
# ko.json이 없으면 복사
cp src/locales/en.json src/locales/ko.json
```

---

## 인프라 담당자를 위한 체크리스트

### Amplify Console 환경변수 설정

| Key | 설명 | 예시 |
|-----|------|------|
| `SLACK_WEBHOOK_URL` | Slack 웹훅 URL (필수) | `https://hooks.slack.com/services/...` |
| `ALLOWED_ORIGINS` | CORS 허용 도메인 | `https://yourdomain.com` |

### 설정 순서
1. Amplify Console → Hosting → Environment variables
2. 환경변수 추가
3. **반드시 재배포** (환경변수 변경 후 재배포 필요)

### amplify.yml 역할
- **개발자가 관리**: 빌드 방법, 어떤 환경변수가 필요한지 정의
- **인프라 담당자가 관리**: Amplify Console에서 실제 환경변수 값 입력

---

## 참고 커밋 히스토리

| 커밋 | 설명 |
|------|------|
| `ed1cc26` | Lighthouse NO_FCP 수정 - 미들웨어 추가 |
| `e6ac024` | Honeypot 필드 제거 |
| `e347d53` | Amplify SSR 환경변수 문제 해결 |

---

**마지막 업데이트**: 2026-02-04
**작성자**: Development Team
