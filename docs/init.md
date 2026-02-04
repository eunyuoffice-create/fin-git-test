# FinProfile 프로젝트 가이드

> **중요**: 이 문서는 프로젝트 작업 시 반드시 참고해야 할 핵심 정보를 담고 있습니다.

---

## 빠른 참조

| 항목 | 값 |
|------|-----|
| 프레임워크 | Next.js 15.5.x (App Router) |
| 배포 | AWS Amplify SSR |
| 포트 | 8080 (로컬) |
| 다국어 | `en`, `ko` |
| Node.js | 22.x |
| **타겟 시장** | **인도네시아** |

---

## 인도네시아 환경 고려사항 (필독)

> **이 사이트는 인도네시아에서 주로 사용됩니다. 성능 최적화가 매우 중요합니다.**

### 인도네시아 인터넷 환경

| 항목 | 현실 |
|------|------|
| 평균 모바일 속도 | 15-25 Mbps (한국의 1/4) |
| 평균 고정 회선 | 20-30 Mbps |
| 주요 사용 기기 | 저사양 안드로이드 (2-4GB RAM) |
| 모바일 비율 | 70%+ |
| 네트워크 | 4G 불안정, 3G 혼재 |

### 성능 최적화 원칙

1. **이미지 최적화 필수**
   - WebP 포맷 사용
   - 적절한 사이즈 (모바일 기준)
   - Lazy Loading 적용
   - 용량: 이미지당 100KB 이하 권장

2. **비디오 최적화 필수**
   - 5MB 이하로 압축
   - 720p 해상도 권장
   - `preload="none"` 또는 `preload="metadata"` 사용
   - 자동재생 시 `muted` 필수

3. **JavaScript 최소화**
   - 번들 사이즈 최소화
   - Code Splitting 활용
   - 불필요한 라이브러리 제거

4. **Core Web Vitals 목표**
   - LCP (Largest Contentful Paint): < 2.5초
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

### 테스트 권장사항

- Chrome DevTools → Network → "Slow 3G" 또는 "Fast 3G"로 테스트
- Lighthouse에서 "Mobile" 모드로 측정
- 실제 인도네시아 VPN으로 테스트 (선택)

---

## 핵심 주의사항 (반드시 읽기)

### 1. Amplify SSR 환경변수

**문제**: Amplify 환경변수는 빌드 타임에만 접근 가능. SSR 런타임(Lambda)에서는 자동 전달 안 됨.

**해결**: `amplify.yml`에서 빌드 시 `.env.production` 파일 생성

```yaml
build:
  commands:
    - echo "SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL" >> .env.production
    - echo "ALLOWED_ORIGINS=$ALLOWED_ORIGINS" >> .env.production
    - npm run build
```

> 자세한 내용: `docs/TROUBLESHOOTING.md`

### 2. 다국어 라우팅 구조

```
/           → 미들웨어가 /en 또는 /ko로 리다이렉트
/en         → 영어 페이지 (SSG)
/ko         → 한국어 페이지 (SSG)
```

- **미들웨어**: `src/middleware.ts` - locale 감지 및 리다이렉트
- **locale 파일**: `src/locales/en.json`, `src/locales/ko.json`
- **i18n 설정**: `src/lib/i18n.ts`

### 3. 루트 페이지 리다이렉트

**주의**: 루트 페이지(`/`)에서 Next.js `redirect()` 사용 금지!

```tsx
// ❌ 잘못된 방법 - Lighthouse NO_FCP 오류 발생
redirect(`/${defaultLocale}`);

// ✅ 올바른 방법 - 미들웨어 + HTML fallback
// src/middleware.ts에서 리다이렉트 처리
// src/app/page.tsx에서 meta refresh fallback 제공
```

### 4. trailingSlash 설정

`next.config.mjs`에 `trailingSlash: true` 설정됨.

```
/api/contact  → /api/contact/ 로 리다이렉트됨
```

API 호출 시 trailing slash 포함하거나 `-L` 옵션 사용.

---

## 프로젝트 구조

```
finprofile/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── page.tsx          # 메인 페이지 (SSG)
│   │   │   └── layout.tsx        # SEO 메타데이터
│   │   ├── api/contact/
│   │   │   └── route.ts          # Slack Webhook API
│   │   ├── page.tsx              # 루트 리다이렉트 (fallback)
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── middleware.ts         # locale 리다이렉트
│   │   ├── robots.ts             # robots.txt 생성
│   │   └── sitemap.ts            # sitemap.xml 생성
│   ├── components/
│   │   ├── Header/
│   │   ├── HeroBanner/
│   │   ├── Sections/
│   │   │   ├── FeatureSections.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Team.tsx
│   │   │   └── ContactForm.tsx   # Slack 연동 폼
│   │   ├── Footer/
│   │   └── LanguageSwitcher/
│   ├── locales/
│   │   ├── en.json               # 영어
│   │   └── ko.json               # 한국어
│   ├── lib/
│   │   ├── i18n.ts               # 다국어 헬퍼
│   │   └── slack.ts              # Slack 알림 전송
│   └── types/
│       └── api.ts
├── public/
│   ├── og-image.png              # OG 이미지 (1200x630)
│   ├── videos/
│   │   ├── test-video.mp4        # 27MB - 최적화 필요!
│   │   └── test-video.webm       # 28MB - 최적화 필요!
│   └── favicon.ico
├── docs/
│   ├── init.md                   # 이 파일
│   ├── DEPLOYMENT.md             # 배포 가이드
│   ├── TROUBLESHOOTING.md        # 문제 해결
│   ├── SEO.md                    # SEO 설정
│   ├── SECURITY.md               # 보안 설정
│   └── CACHING.md                # 캐싱 설정
├── amplify.yml                   # Amplify 빌드 설정
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## 환경변수

### 로컬 개발 (`.env.local`)

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx
ALLOWED_ORIGINS=http://localhost:8080
NEXT_PUBLIC_SITE_URL=http://localhost:8080
```

### 프로덕션 (Amplify Console)

| Key | 설명 |
|-----|------|
| `SLACK_WEBHOOK_URL` | Slack Incoming Webhook URL |
| `ALLOWED_ORIGINS` | CORS 허용 도메인 |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL (SEO용) |

> **중요**: Amplify에서 환경변수 변경 후 **반드시 재배포** 필요!

---

## 주요 명령어

```bash
# 로컬 개발 서버 (포트 8080)
npm run dev

# 빌드
npm run build

# 빌드 결과 로컬 실행
npm start

# 타입 체크
npm run lint
```

---

## API 엔드포인트

### POST /api/contact/

Contact Form 제출 → Slack 알림 전송

**Request:**
```json
{
  "company": "회사명",
  "name": "담당자명",
  "phone": "전화번호",
  "email": "이메일",
  "needs": "요구사항 (선택)",
  "lang": "en"
}
```

**Response:**
```json
{ "success": true, "message": "Form submitted successfully" }
```

**보안:**
- Rate Limiting: IP당 1분에 5회
- CORS: ALLOWED_ORIGINS만 허용
- Zod 입력 검증
- XSS Sanitization

---

## 성능 최적화 현황

### Lighthouse 점수 (2026-02-04)

| 항목 | 점수 | 목표 |
|------|------|------|
| Performance | 84 | 90+ |
| Accessibility | 84 | 90+ |
| Best Practices | 100 | 90+ |
| SEO | 100 | 90+ |

### 개선 필요 사항

| 문제 | 현재 | 권장 | 우선순위 |
|------|------|------|----------|
| `og-image.png` | 1.9MB | 100KB 이하 | 중간 |
| `test-video.mp4` | 27MB | 5MB 이하 | **높음** |
| `test-video.webm` | 28MB | 5MB 이하 | **높음** |

**비디오 최적화 방법:**
1. HandBrake로 압축 (H.264, CRF 28)
2. 해상도 축소 (720p 권장)
3. 또는 비디오 → 애니메이션 GIF/이미지로 대체

---

## SEO 설정

### 구현 완료

- [x] robots.txt (`src/app/robots.ts`)
- [x] sitemap.xml (`src/app/sitemap.ts`)
- [x] Open Graph 메타태그
- [x] Twitter Card
- [x] Canonical URL
- [x] hreflang (다국어)
- [x] JSON-LD 구조화 데이터
- [x] OG 이미지

> 자세한 내용: `docs/SEO.md`

---

## 자주 발생하는 문제

### 1. "SLACK_WEBHOOK_URL is not configured"

**원인**: Amplify SSR 런타임에서 환경변수 못 읽음

**해결**: `amplify.yml`에서 `.env.production` 파일 생성 확인

### 2. Lighthouse NO_FCP 오류

**원인**: 루트 페이지에서 서버 리다이렉트만 수행

**해결**: 미들웨어 사용 + 루트 페이지에 HTML fallback

### 3. i18n locale 불일치

**체크 포인트:**
- `src/lib/i18n.ts` - `locales` 배열
- `src/app/[lang]/page.tsx` - `generateStaticParams`
- `src/components/LanguageSwitcher/LanguageSwitcher.tsx` - `languageNames`
- `src/locales/*.json` - 파일 존재 여부

### 4. API 307 리다이렉트

**원인**: `trailingSlash: true` 설정

**해결**: API URL에 trailing slash 포함 (`/api/contact/`)

> 자세한 내용: `docs/TROUBLESHOOTING.md`

---

## 배포 체크리스트

- [ ] 환경변수 설정 (Amplify Console)
  - [ ] `SLACK_WEBHOOK_URL`
  - [ ] `ALLOWED_ORIGINS`
  - [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] 빌드 성공 확인
- [ ] `/robots.txt` 접근 확인
- [ ] `/sitemap.xml` 접근 확인
- [ ] Contact Form → Slack 알림 테스트
- [ ] 다국어 전환 테스트 (`/en`, `/ko`)
- [ ] OG 이미지 미리보기 테스트

---

## 관련 문서

| 문서 | 설명 |
|------|------|
| `docs/DEPLOYMENT.md` | AWS Amplify 배포 가이드 |
| `docs/TROUBLESHOOTING.md` | 문제 해결 가이드 |
| `docs/SEO.md` | SEO 설정 가이드 |
| `docs/SECURITY.md` | 보안 설정 |
| `docs/CACHING.md` | 캐싱 전략 |

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 15.5.x (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Validation | Zod |
| HTTP Client | Axios |
| Hosting | AWS Amplify (SSR) |
| CDN | CloudFront (Amplify 기본) |

---

**마지막 업데이트**: 2026-02-04
