# FinProfile - Company Landing Page

Next.js 15 기반 정적 사이트 + Slack 통합 문의 폼

---

## 🚀 프로젝트 개요

- **프레임워크**: Next.js 15.5.x (App Router)
- **렌더링**: SSG (Static Site Generation)
- **배포**: AWS Amplify
- **다국어**: 영어(en), 인도네시아어(id), 한국어(ko)
- **뷰포트**: 1440px 고정 (모바일 자동 축소)
- **주요 기능**: 회사 소개 페이지 + Slack 연동 문의 폼

---

## 📚 문서

- [배포 가이드](../docs/DEPLOYMENT.md) - AWS Amplify 배포 방법
- [보안 가이드](../docs/SECURITY.md) - 보안 설정 및 체크리스트
- [캐싱 전략](../docs/CACHING.md) - 성능 최적화 및 캐싱 정책

---

## 🛠️ 로컬 개발

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사하여 `.env.local` 생성:

```bash
cp .env.example .env.local
```

필수 환경 변수:
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
ALLOWED_ORIGINS=http://localhost:8080
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:8080](http://localhost:8080) 열기

### 4. 정적 빌드 테스트

```bash
# 빌드 (out/ 폴더에 생성)
npm run build

# 빌드 결과 로컬 서버로 확인
npx serve out -p 8080
```

---

## 📦 빌드 및 배포

### 로컬 빌드

```bash
npm run build
```

- 결과물: `out/` 폴더에 정적 HTML/CSS/JS 생성
- `output: 'export'` 모드로 완전 정적 사이트 생성

### AWS Amplify 배포

**자동 배포**:
- `main` 브랜치에 Push 시 자동 빌드 및 배포
- `amplify.yml` 설정 기반 자동 실행

**수동 배포**:
1. AWS Amplify Console 접속
2. "Redeploy this version" 클릭

**환경 변수 설정** (Amplify Console):
- `SLACK_WEBHOOK_URL` (필수)
- `ALLOWED_ORIGINS` (권장)
- `NODE_VERSION=18` (선택)

자세한 내용은 [배포 가이드](../docs/DEPLOYMENT.md) 참고

---

## 🔒 보안

### 적용된 보안 기능

- ✅ **Rate Limiting**: 1분당 5회 요청 제한 (IP 기반)
- ✅ **Input Validation**: Zod 스키마 검증
- ✅ **Sanitization**: XSS 공격 방지 (HTML 태그 제거)
- ✅ **Honeypot**: 봇 차단 (숨김 필드)
- ✅ **CORS**: 허용된 도메인만 접근 가능
- ✅ **보안 헤더**: X-Frame-Options, CSP 등

### 배포 전 체크리스트

- [ ] `SLACK_WEBHOOK_URL` 환경 변수 설정 완료
- [ ] `ALLOWED_ORIGINS`에 실제 도메인 설정
- [ ] `.env.*` 파일이 Git에 커밋되지 않았는지 확인
- [ ] 로컬에서 `npm run build` 테스트 완료

자세한 내용은 [보안 가이드](../docs/SECURITY.md) 참고

---

## ⚡ 성능 최적화

### 캐싱 전략

- **HTML**: 1시간 캐싱 + stale-while-revalidate
- **정적 에셋** (이미지, 폰트): 1년 캐싱 (immutable)
- **영상**: 30일 캐싱
- **API**: 캐싱 금지

### 목표 성능 지표

- ✅ Lighthouse Performance > 90
- ✅ Core Web Vitals 달성
  - LCP < 2.5s
  - INP < 200ms
  - CLS < 0.1

자세한 내용은 [캐싱 전략](../docs/CACHING.md) 참고

---

## 🗂️ 프로젝트 구조

```
finprofile/
├── src/
│   ├── app/
│   │   ├── [lang]/          # 다국어 라우팅 (en, id, ko)
│   │   ├── api/contact/     # Slack Webhook API
│   │   └── globals.css
│   ├── components/          # React 컴포넌트
│   ├── locales/             # 다국어 리소스 (JSON)
│   ├── lib/                 # 유틸리티 함수
│   └── types/               # TypeScript 타입 정의
├── public/                  # 정적 파일 (이미지, 폰트)
├── docs/                    # 프로젝트 문서
├── .env.example             # 환경 변수 템플릿
├── amplify.yml              # AWS Amplify 빌드 설정
├── next.config.mjs          # Next.js 설정 (보안 헤더, 캐싱)
└── package.json
```

---

## 🧪 테스트

### 코드 스타일 검사

```bash
# ESLint
npm run lint

# Prettier
npm run format:check

# 자동 포맷팅
npm run format
```

### 보안 취약점 점검

```bash
# 의존성 보안 감사
npm audit

# 심각한 취약점 자동 수정
npm audit fix
```

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | Next.js 15.5.x (App Router) |
| **언어** | TypeScript 5 |
| **UI 라이브러리** | React 19 |
| **스타일링** | Tailwind CSS 3.4 + shadcn/ui |
| **폼 검증** | Zod |
| **HTTP 클라이언트** | Axios |
| **배포** | AWS Amplify (Static Export) |
| **CDN** | CloudFront (Amplify 자동 제공) |
| **Node.js** | >= 20 |

---

## 📞 지원

### 문서
- [배포 가이드](../docs/DEPLOYMENT.md)
- [보안 가이드](../docs/SECURITY.md)
- [캐싱 전략](../docs/CACHING.md)
- [프로젝트 초기 계획](../docs/init.md)

### 문의
- 기술 문의: [개발팀 이메일]
- 긴급 상황: [담당자 연락처]

---

## 📄 라이센스

Private - All Rights Reserved

---

**마지막 업데이트**: 2026-02-12
