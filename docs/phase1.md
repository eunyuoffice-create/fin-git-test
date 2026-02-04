# Phase 1: 프로젝트 초기화

## 목표
Next.js 14 프로젝트를 생성하고 필수 패키지 및 환경 설정을 완료합니다.

---

## 1. Next.js 14 프로젝트 생성

```bash
npx create-next-app@14 . --typescript --tailwind --app
```

### 설치 중 옵션 선택
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ❌ `import alias` (기본값 @ 사용)

---

## 2. 필수 패키지 설치

```bash
npm install zod axios
npm install -D @types/node
```

### 패키지 설명
- **zod**: Form validation 스키마 정의
- **axios**: Slack Webhook API 호출

---

## 3. 환경 설정 파일 생성

### 3.1 `.env.local` (로컬 개발용)
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_LOCAL_WEBHOOK
NEXT_PUBLIC_SITE_URL=http://localhost:8080
```

### 3.2 `.env.development` (개발 서버용)
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_DEV_WEBHOOK
NEXT_PUBLIC_SITE_URL=https://dev.yoursite.com
```

### 3.3 `.env.production` (프로덕션용)
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_PROD_WEBHOOK
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### 3.4 `.gitignore` 확인
```gitignore
# 이미 포함되어 있는지 확인
.env*.local
.env.development
.env.production
```

---

## 4. next.config.js 수정

프로젝트 루트의 `next.config.js` (또는 `next.config.mjs`) 파일을 다음과 같이 수정:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSG (정적 사이트 생성) 설정
  output: 'export',

  // 이미지 최적화 (export 모드에서는 unoptimized 필요)
  images: {
    unoptimized: true,
  },

  // 후행 슬래시 추가 (선택사항)
  trailingSlash: true,
}

module.exports = nextConfig
```

> **참고**: `output: 'export'`는 SSG를 활성화합니다. 이는 AWS Amplify에 배포 시 정적 파일로 생성됩니다.

---

## 5. package.json 스크립트 수정

`package.json`에서 dev 명령어를 포트 8080으로 변경:

```json
{
  "scripts": {
    "dev": "next dev -p 8080",
    "build": "next build",
    "start": "next start -p 8080",
    "lint": "next lint"
  }
}
```

---

## 6. 기본 폴더 구조 생성

```bash
mkdir -p src/components/ui
mkdir -p src/components/ContactForm
mkdir -p src/components/HeroSection
mkdir -p src/components/LanguageSwitcher
mkdir -p src/locales
mkdir -p src/lib
mkdir -p src/types
mkdir -p public/images
```

---

## 7. 프로젝트 실행 및 확인

```bash
npm run dev
```

브라우저에서 `http://localhost:8080` 접속하여 Next.js 기본 페이지가 표시되는지 확인.

---

## ✅ 완료 체크리스트

- [ ] Next.js 14 프로젝트 생성 완료
- [ ] zod, axios 설치 완료
- [ ] 환경 변수 파일 (.env.*) 생성
- [ ] next.config.js 설정 완료 (output: 'export')
- [ ] package.json 포트 8080 설정
- [ ] 폴더 구조 생성 완료
- [ ] `npm run dev` 실행 확인

---

## 다음 단계

👉 **[Phase 2: i18n 인프라 구축](./phase2.md)**
