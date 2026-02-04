# 🚀 캐싱 전략 가이드

## 개요
이 문서는 정적 사이트의 캐싱 전략 및 최적화 방법을 설명합니다.

---

## 📊 캐싱 계층 구조

```
사용자
  ↓
브라우저 캐시 (Cache-Control 헤더)
  ↓
CloudFront CDN (AWS Amplify 자동 제공)
  ↓
S3 스토리지 (정적 파일)
```

---

## 🔧 캐싱 정책

### 1. HTML 파일 (짧은 캐싱)

**대상**: `*.html`, `/`, `/en/`, `/id/`, `/ko/`

**정책**:
```
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

**의미**:
- `public`: CDN 캐싱 허용
- `max-age=3600`: 1시간 동안 fresh
- `stale-while-revalidate=86400`: 24시간 동안 stale 컨텐츠 제공하며 백그라운드 갱신

**이유**:
- 컨텐츠 업데이트 시 빠른 반영 필요
- stale-while-revalidate로 성능과 신선도 균형

### 2. 정적 에셋 (장기 캐싱)

**대상**:
- 이미지: `*.jpg`, `*.png`, `*.webp`, `*.svg`
- 폰트: `*.woff`, `*.woff2`, `*.ttf`
- JavaScript/CSS: `*.js`, `*.css` (Next.js 해시 포함)

**정책**:
```
Cache-Control: public, max-age=31536000, immutable
```

**의미**:
- `max-age=31536000`: 1년 동안 캐싱
- `immutable`: 절대 변경되지 않음 (재검증 불필요)

**이유**:
- Next.js가 파일명에 해시 추가 (예: `main.abc123.js`)
- 파일 변경 시 해시 변경으로 새 파일 로드
- CDN 및 브라우저 캐시 히트율 극대화

### 3. 영상 파일 (중간 캐싱)

**대상**: `*.mp4`, `*.webm`

**정책**:
```
Cache-Control: public, max-age=2592000
```

**의미**:
- `max-age=2592000`: 30일 동안 캐싱

**이유**:
- 영상 파일은 크기가 크지만 자주 변경되지 않음
- 30일 정도면 충분한 캐싱 효과

### 4. API 응답 (캐싱 금지)

**대상**: `/api/*`

**정책**:
```
Cache-Control: no-store, no-cache, must-revalidate
```

**의미**:
- `no-store`: 어디에도 저장하지 않음
- `no-cache`: 매번 서버에 검증 요청
- `must-revalidate`: 만료 시 반드시 재검증

**이유**:
- Slack API 요청은 항상 새로 처리되어야 함
- 중복 제출 방지

---

## 🎯 Next.js 설정

### next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 빌드 (SSG)
  output: 'export',

  // 이미지 최적화 비활성화 (정적 빌드용)
  images: {
    unoptimized: true,
  },

  // 트레일링 슬래시 (URL 일관성)
  trailingSlash: true,

  // 보안 및 캐싱 헤더
  async headers() {
    return [
      // 정적 에셋 - 장기 캐싱
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // 영상 - 중간 캐싱
      {
        source: '/:all*(mp4|webm)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes', // 스트리밍 지원
          },
        ],
      },

      // HTML - 짧은 캐싱
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 📈 성능 향상 효과

### 캐싱 미적용 시

```
방문자 10,000명/월
평균 페이지 크기: 5MB
총 전송량: 50GB/월
로딩 시간: 2-3초
```

### 캐싱 적용 후

```
방문자 10,000명/월
평균 페이지 크기: 5MB

첫 방문:
- 전송량: 5MB (CDN에서 전송)
- 로딩 시간: 1-2초

재방문 (1시간 이내):
- 전송량: ~100KB (HTML만 재검증)
- 로딩 시간: 0.5초 이하

총 전송량: ~25GB/월 (50% 절감)
AWS 비용: ~$3-4/월 (기존 $6-8/월)
```

---

## 🔍 캐시 확인 방법

### 브라우저 개발자 도구

1. Chrome DevTools 열기 (F12)
2. **Network** 탭 선택
3. 페이지 새로고침
4. 파일 클릭 → **Headers** 탭 확인

**확인 항목**:
- `Cache-Control` 헤더
- `Age` (CDN 캐시 나이)
- `CF-Cache-Status` (CloudFront 캐시 상태)
  - `Hit`: 캐시에서 제공
  - `Miss`: 원본에서 가져옴
  - `RefreshHit`: 재검증 후 캐시 제공

### 명령어로 확인

```bash
# 헤더 확인
curl -I https://yourdomain.com/

# 특정 파일 헤더 확인
curl -I https://yourdomain.com/images/hero.webp
```

---

## 🔄 캐시 무효화 (Cache Invalidation)

### 자동 무효화

**Next.js 정적 빌드**:
- 파일명에 해시 자동 추가
- 파일 변경 시 새 해시 생성
- 별도 캐시 무효화 불필요

### 수동 무효화 (긴급 시)

**CloudFront 캐시 무효화** (Amplify 자동 제공 시):
1. AWS Console → CloudFront
2. 해당 Distribution 선택
3. **Invalidations** 탭
4. "Create invalidation" 클릭
5. Path 입력: `/*` (전체) 또는 `/images/*` (특정 폴더)

**비용**: 월 1,000개 경로까지 무료

---

## ⚡ 추가 최적화 팁

### 1. Preload 힌트

```html
<!-- 중요 리소스 우선 로딩 -->
<link rel="preload" href="/fonts/Poppins-Bold.woff2" as="font" type="font/woff2" crossorigin>
```

### 2. 이미지 지연 로딩

```tsx
<img
  src="/images/hero.webp"
  loading="lazy"  // 브라우저 네이티브 지연 로딩
  decoding="async" // 비동기 디코딩
/>
```

### 3. 영상 지연 로딩

```tsx
<video
  preload="metadata"  // 메타데이터만 미리 로드
  loading="lazy"
>
  <source src="/videos/hero.webm" type="video/webm" />
</video>
```

### 4. Service Worker (선택)

```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/images/logo.webp',
        '/fonts/Poppins-Regular.woff2',
      ]);
    })
  );
});
```

---

## 📊 모니터링

### CloudFront 캐시 히트율

**AWS Console → CloudFront → Monitoring**

**목표**:
- 캐시 히트율 > 80%
- Origin 요청 < 20%

**개선 방법**:
- TTL 증가
- 캐시 가능한 콘텐츠 최대화
- 쿼리 스트링 제거

### Lighthouse 성능 점수

```bash
# 로컬에서 테스트
npx lighthouse https://yourdomain.com --view
```

**목표**:
- Performance > 90
- Best Practices > 90

---

## 🎯 체크리스트

배포 후 확인:

- [ ] HTML 파일이 1시간 캐싱되는지 확인
- [ ] 정적 에셋(이미지, 폰트)이 1년 캐싱되는지 확인
- [ ] API 응답이 캐싱되지 않는지 확인
- [ ] CloudFront 캐시 히트율 > 80% 달성
- [ ] Lighthouse Performance 점수 > 85

---

**마지막 업데이트**: 2026-02-04
**작성자**: Development Team
