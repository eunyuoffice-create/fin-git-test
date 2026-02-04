# Plan to Implement  
## 프로젝트 방향성 분석 및 구현 계획

---

## 📋 문서 분석 요약

### 핵심 요구사항

- **프레임워크**: Next.js 14 + TypeScript ✅  
- **아키텍처**: 단일 저장소 (프론트엔드 + 백엔드 API 통합)  
- **배포**: AWS Amplify (CI/CD 자동화)  
- **포트**: 8080  
- **주요 기능**:  
  - 회사 소개 단일 페이지  
  - 예약 / 문의 Form  
  - Slack 연동  

---

## 기술적 요구사항

### 1. 성능 최적화 (인도네시아 인터넷 환경 고려)

- SSG (Static Site Generation) 기반
- WebP 이미지 포맷
- Lazy Loading
- Core Web Vitals 최적화

### 2. SEO & 접근성

- Google Lighthouse **90점 이상 목표**
- Semantic HTML
- 키보드 네비게이션
- ARIA 속성 적용

### 3. 다국어 지원 (i18n)

- 지원 언어: 영어(en), 인도네시아어(id), 한국어(ko)
- 라이브러리 미사용 (next-i18next 등 사용 안 함)

### 4. 환경 분리

- `.env.local`
- `.env.development`
- `.env.production`
- Slack Webhook URL 환경별 관리

---

## ✅ Next.js 14 사용 검토

### 결론: **Next.js 14 사용 권장**

#### 이유
1. 문서 명시 요구사항 충족 (`docs/init.md`)
2. 2023년 10월 출시 이후 안정화
3. AWS Amplify 공식 지원
4. App Router 기반 SSG 완벽 지원

#### Next.js 15 vs 14
- Next.js 15
  - 2024년 10월 출시
  - Amplify 호환성 추가 검증 필요
  - 일부 breaking changes 존재
- **본 프로젝트는 요구사항이 단순 → 14로 충분**

➡ **최종 권장 버전: Next.js 14.2.x**

---

## 🏗️ 프로젝트 구조 설계

finprofile/
├── src/
│   ├── app/
│   │   ├── [lang]/                # 다국어 라우팅 (en, id, ko)
│   │   │   ├── page.tsx           # 메인 페이지
│   │   │   └── layout.tsx         # 언어별 레이아웃
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts       # Slack Webhook API
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ContactForm/
│   │   ├── HeroSection/
│   │   ├── LanguageSwitcher/
│   │   └── ui/
│   ├── locales/
│   │   ├── en.json
│   │   ├── id.json
│   │   └── ko.json
│   ├── lib/
│   │   ├── i18n.ts
│   │   └── slack.ts
│   └── types/
├── public/
│   └── images/                    # WebP 이미지
├── .env.local
├── .env.development
├── .env.production
├── next.config.js
├── tailwind.config.ts
└── package.json

---

## 📝 구현 단계

### Phase 1. 프로젝트 초기화

**작업 내용**
1. Next.js 14 프로젝트 생성
```bash
npx create-next-app@14 . --typescript --tailwind --app

	2.	필수 패키지

	•	Tailwind CSS (기본 포함)
	•	Zod (Form validation)
	•	Axios (API 호출)

	3.	환경 설정

	•	next.config.js: 포트 8080, output: 'export'
	•	.env.* 파일 생성

⸻

Phase 2. 다국어(i18n) 인프라 구축

작업 내용
	1.	언어 리소스 작성

	•	locales/en.json
	•	locales/id.json
	•	locales/ko.json

	2.	i18n 헬퍼 구현

// src/lib/i18n.ts
export function getDictionary(lang: 'en' | 'id' | 'ko') {
  return import(`@/locales/${lang}.json`).then(m => m.default)
}

	3.	다국어 라우팅

	•	app/[lang]/page.tsx
	•	app/[lang]/layout.tsx

⸻

Phase 3. UI 컴포넌트 개발

구성
	•	Hero / 회사 소개 섹션
	•	예약·문의 Form
	•	필수: 회사명, 담당자명, 전화번호, 이메일
	•	선택: Business needs
	•	Zod 기반 Validation
	•	접근성 준수 (label, aria)

디자인
	•	Tailwind CSS
	•	모바일 우선
	•	명확한 focus / contrast

⸻

Phase 4. 백엔드 API 구현

Slack Webhook API

// src/app/api/contact/route.ts
export async function POST(request: Request) {
  // 1. Validation
  // 2. Slack Webhook 전송
  // 3. 응답 반환
}

환경 변수

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

	•	에러 처리
	•	Validation
	•	Network
	•	Rate limit

⸻

Phase 5. 성능 & SEO 최적화
	•	WebP 이미지 + Next/Image
	•	Lazy Loading
	•	Metadata API 활용
	•	Open Graph / JSON-LD
	•	Core Web Vitals
	•	LCP < 2.5s
	•	INP < 200ms
	•	CLS < 0.1

⸻

Phase 6. AWS Amplify 배포

amplify.yml

version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'

	•	Amplify Console에서 환경 변수 설정
	•	Node.js 버전 지정
	•	포트 8080 설정

⸻

🔍 주요 기술 결정 사항
	•	i18n: 직접 구현 (Dynamic Route + JSON)
	•	Styling: Tailwind CSS
	•	Form Validation: Zod
	•	이미지: Next/Image + WebP
	•	렌더링: SSG 선택

⸻

✅ 검증 계획

기능 테스트
	•	다국어 전환
	•	Form validation
	•	Slack 알림
	•	API 에러 처리

성능 테스트
	•	Lighthouse 90+
	•	Core Web Vitals 기준 충족

접근성 테스트
	•	키보드 네비게이션
	•	스크린 리더
	•	WAVE 도구

배포 테스트
	•	로컬 빌드
	•	정적 export
	•	Amplify 배포
	•	환경 변수 분리 확인

⸻

📌 결론

본 프로젝트는 Next.js 14.2.x + SSG + AWS Amplify 조합이
성능, 안정성, SEO, 운영 측면에서 가장 최적의 선택입니다.

⸻

🎯 다음 단계
	1.	프로젝트 초기화
	2.	구조 생성
	3.	i18n 인프라 구축
	4.	UI 개발
	5.	API 연동
	6.	성능/SEO 최적화
	7.	AWS Amplify 배포

진행 순서
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6

