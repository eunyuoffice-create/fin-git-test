# Phase 6: AWS Amplify 배포

## 목표
AWS Amplify를 사용하여 프로젝트를 배포하고 CI/CD 파이프라인을 구축합니다.

---

## 1. 사전 준비

### 1.1 Git 저장소 설정
```bash
# Git 초기화 (아직 안했다면)
git init

# .gitignore 확인
cat .gitignore
# 확인 항목: .env*.local, .env.development, .env.production, node_modules, .next, out

# 첫 커밋
git add .
git commit -m "Initial commit: FinProfile project"

# GitHub 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/finprofile.git
git branch -M main
git push -u origin main
```

---

## 2. amplify.yml 설정 파일 생성

### 프로젝트 루트에 `amplify.yml` 생성
```yaml
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
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

**설명:**
- `npm ci`: package-lock.json 기반 클린 설치 (빠르고 안정적)
- `baseDirectory: out`: SSG 빌드 결과물 위치 (next.config.js의 output: 'export' 설정)
- `cache`: 빌드 속도 향상을 위한 캐싱

---

## 3. AWS Amplify 콘솔 설정

### 3.1 Amplify 앱 생성
1. AWS Console → **AWS Amplify** 접속
2. "New app" → "Host web app" 선택
3. GitHub 연동 (또는 GitLab, Bitbucket)
4. 저장소 선택: `YOUR_USERNAME/finprofile`
5. 브랜치 선택: `main`

### 3.2 빌드 설정
- **App name**: `finprofile`
- **Environment**: `production`
- **Build settings**: Amplify가 자동으로 `amplify.yml` 탐지
- 확인 후 "Next" 클릭

### 3.3 환경 변수 설정
"Environment variables" 섹션에서 다음 추가:

| Variable Name            | Value                                      |
|--------------------------|--------------------------------------------|
| `SLACK_WEBHOOK_URL`      | `https://hooks.slack.com/services/...`    |
| `NEXT_PUBLIC_SITE_URL`   | `https://main.d1234abcd5678.amplifyapp.com` (Amplify 도메인) |

**중요:**
- Production Slack Webhook URL 사용
- `NEXT_PUBLIC_SITE_URL`은 Amplify 자동 생성 도메인 (배포 후 확인 가능)

### 3.4 고급 설정 (선택사항)
- **Node.js version**: `18` (또는 프로젝트에서 사용 중인 버전)
- **Build timeout**: `10` minutes (기본값)
- **Port**: 기본값 유지 (SSG는 포트 무관)

### 3.5 배포 시작
"Save and deploy" 클릭

---

## 4. 커스텀 도메인 설정 (선택사항)

### 4.1 Amplify 콘솔에서 도메인 추가
1. 앱 대시보드 → "Domain management" 탭
2. "Add domain" 클릭
3. 도메인 입력 (예: `finprofile.com`)
4. DNS 제공업체(Route 53, Cloudflare 등)에서 CNAME 레코드 추가
5. SSL 인증서 자동 발급 대기 (약 5-10분)

### 4.2 서브도메인 설정
```
finprofile.com       → main 브랜치
www.finprofile.com   → main 브랜치
dev.finprofile.com   → develop 브랜치 (선택사항)
```

### 4.3 환경 변수 업데이트
커스텀 도메인 설정 후 `NEXT_PUBLIC_SITE_URL` 업데이트:
```
NEXT_PUBLIC_SITE_URL=https://finprofile.com
```

---

## 5. 배포 확인

### 5.1 빌드 로그 확인
1. Amplify 콘솔 → 앱 선택
2. "Build history" 탭
3. 최신 빌드 클릭 → 로그 확인

**주요 단계:**
- Provision (환경 준비)
- Build (npm ci, npm run build)
- Deploy (정적 파일 배포)

### 5.2 배포된 사이트 접속
```
https://main.d1234abcd5678.amplifyapp.com/en
https://main.d1234abcd5678.amplifyapp.com/id
https://main.d1234abcd5678.amplifyapp.com/ko
```

### 5.3 기능 테스트
- [ ] 언어 전환 동작 확인
- [ ] Contact Form 제출 → Slack 알림 확인
- [ ] 이미지 로딩 확인
- [ ] 모바일 반응형 확인
- [ ] 각 언어별 메타데이터 확인 (개발자 도구)

---

## 6. CI/CD 자동화

### 6.1 자동 배포 설정 (기본 활성화)
- `main` 브랜치에 푸시 시 자동 빌드/배포
- PR 생성 시 Preview 환경 자동 생성 (선택사항)

### 6.2 브랜치별 환경 분리 (선택사항)

#### `develop` 브랜치 추가
1. Amplify 콘솔 → "Branch" 탭
2. "Connect branch" 선택
3. `develop` 브랜치 선택
4. 별도 환경 변수 설정:
   - `SLACK_WEBHOOK_URL`: 개발용 Webhook
   - `NEXT_PUBLIC_SITE_URL`: 개발용 도메인

**결과:**
```
main branch      → https://finprofile.com (production)
develop branch   → https://develop.d1234abcd5678.amplifyapp.com (staging)
```

---

## 7. 모니터링 및 유지보수

### 7.1 Amplify 모니터링
- **Amplify Console**에서 제공하는 기본 메트릭:
  - 트래픽 (방문자 수)
  - 대역폭 사용량
  - 빌드 히스토리

### 7.2 Google Analytics 추가 (선택사항)

#### `src/app/[lang]/layout.tsx`에 추가
```typescript
export default function LangLayout({ children, params }: { ... }) {
  return (
    <html lang={params.lang}>
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### 7.3 에러 모니터링 (선택사항)
- **Sentry** 통합
- **LogRocket** 통합

---

## 8. 성능 최적화 (Production)

### 8.1 Amplify 캐싱 설정
Amplify는 기본적으로 CDN 캐싱을 제공합니다.

#### 커스텀 헤더 추가 (선택사항)
Amplify 콘솔 → "Rewrites and redirects" 탭:
```json
[
  {
    "source": "/<*>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  },
  {
    "source": "/images/<*>",
    "target": "/images/<*>",
    "status": "200",
    "headers": {
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  }
]
```

### 8.2 Lighthouse 재검증
배포 후 Production URL로 Lighthouse 실행:
```bash
# Chrome DevTools 또는 CLI
npx lighthouse https://finprofile.com --view
```

**목표:** Performance, SEO, Accessibility 모두 90+

---

## 9. 백업 및 롤백

### 9.1 자동 백업
Amplify는 각 빌드마다 스냅샷 저장 (자동)

### 9.2 롤백 방법
1. Amplify 콘솔 → "Build history"
2. 이전 성공한 빌드 선택
3. "Redeploy this version" 클릭

### 9.3 Git 롤백
```bash
# 특정 커밋으로 롤백
git revert <commit-hash>
git push origin main

# Amplify가 자동으로 새 빌드 시작
```

---

## 10. 비용 최적화

### 10.1 Amplify 요금제
- **무료 티어**:
  - 빌드: 월 1000분
  - 호스팅: 월 15GB 저장, 5GB 전송
- **초과 시**:
  - 빌드: $0.01/분
  - 호스팅: $0.15/GB (전송)

### 10.2 비용 절감 팁
- 불필요한 브랜치 배포 비활성화
- `.next/cache` 캐싱으로 빌드 시간 단축
- 이미지 최적화로 대역폭 절감

---

## ✅ 완료 체크리스트

- [ ] Git 저장소 생성 및 푸시
- [ ] `amplify.yml` 생성
- [ ] AWS Amplify 앱 생성
- [ ] 환경 변수 설정 (SLACK_WEBHOOK_URL, NEXT_PUBLIC_SITE_URL)
- [ ] 첫 배포 성공
- [ ] 배포된 사이트 접속 확인
- [ ] 언어 전환 동작 확인
- [ ] Contact Form → Slack 알림 테스트
- [ ] Lighthouse 90+ 달성
- [ ] 커스텀 도메인 설정 (선택사항)
- [ ] CI/CD 자동 배포 확인
- [ ] Google Analytics 추가 (선택사항)

---

## 🎉 배포 완료!

프로젝트가 성공적으로 배포되었습니다.

### 최종 확인 사항
1. ✅ 3개 언어 모두 정상 작동 (en, id, ko)
2. ✅ Contact Form 제출 → Slack 알림
3. ✅ Lighthouse 90+ (Performance, SEO, Accessibility)
4. ✅ 모바일 반응형
5. ✅ Core Web Vitals 기준 충족

---

## 📚 추가 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [AWS Amplify 문서](https://docs.amplify.aws/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Zod 문서](https://zod.dev/)
- [Web.dev (Core Web Vitals)](https://web.dev/vitals/)

---

## 문제 해결 (Troubleshooting)

### 빌드 실패 시
1. Amplify 콘솔 빌드 로그 확인
2. 로컬에서 `npm run build` 실행하여 에러 재현
3. Node.js 버전 확인 (Amplify와 로컬 일치 여부)

### 환경 변수 오류 시
1. Amplify 콘솔에서 환경 변수 재확인
2. 빌드 로그에서 환경 변수 로드 확인
3. 필요 시 앱 재배포 ("Redeploy this version")

### Slack 알림 안 올 때
1. `.env.production` 파일이 Git에 푸시되지 않았는지 확인 (.gitignore)
2. Amplify 환경 변수에 올바른 Webhook URL 입력 확인
3. API Route 로그 확인 (Amplify 콘솔 → Monitoring)

---

**모든 Phase 완료를 축하합니다!** 🚀
