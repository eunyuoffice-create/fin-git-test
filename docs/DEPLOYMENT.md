# 🚀 AWS Amplify 배포 가이드

## 개요
이 문서는 고객사가 AWS Amplify에 정적 사이트를 배포하는 절차를 설명합니다.

---

## 📋 사전 요구사항

### 1. AWS 계정
- AWS 계정 및 IAM 권한 필요
- Amplify Console 접근 권한

### 2. GitHub/GitLab 연동
- 소스 코드 리포지토리
- Amplify에서 접근 가능한 권한

### 3. Slack Webhook URL
- Slack 워크스페이스 관리자 권한
- Incoming Webhook 생성 완료

---

## 🔧 배포 단계

### Step 1: AWS Amplify Console 접속

1. AWS Console에 로그인
2. **AWS Amplify** 서비스 검색 및 접속
3. **"New app" → "Host web app"** 클릭

### Step 2: Git 리포지토리 연결

1. GitHub/GitLab/Bitbucket 선택
2. 리포지토리 및 브랜치 선택 (`main` 또는 `production`)
3. 연결 권한 승인

### Step 3: 빌드 설정 확인

Amplify는 자동으로 `amplify.yml`을 감지합니다.

**확인 사항:**
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
    baseDirectory: out  # ✅ 정적 빌드 출력 폴더
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

> ⚠️ **중요**: `baseDirectory`가 `out`으로 설정되어 있는지 확인하세요.

### Step 4: 환경 변수 설정 (필수)

**Amplify Console → App settings → Environment variables**

| Key | Value | 예시 |
|-----|-------|------|
| `SLACK_WEBHOOK_URL` | Slack Webhook URL (필수) | `https://hooks.slack.com/services/...` |
| `ALLOWED_ORIGINS` | 허용할 도메인 (쉼표로 구분) | `https://yourdomain.com` |
| `NODE_VERSION` | Node.js 버전 | `18` |

**설정 방법:**
1. "Add environment variable" 클릭
2. Key와 Value 입력
3. "Save" 클릭

> 🔒 **보안**: 환경 변수는 암호화되어 저장되며, 빌드 시에만 주입됩니다.

### Step 5: 배포 시작

1. "Save and deploy" 클릭
2. 빌드 진행 상황 모니터링
3. 빌드 완료 후 제공되는 URL 확인

**예상 빌드 시간**: 3-5분

---

## 🌐 커스텀 도메인 설정 (선택)

### Step 1: 도메인 추가
1. Amplify Console → **"Domain management"**
2. "Add domain" 클릭
3. 도메인 입력 (예: `yourdomain.com`)

### Step 2: DNS 설정
1. Amplify가 제공하는 CNAME 레코드 복사
2. 도메인 등록 업체(예: Route 53, GoDaddy)에서 DNS 레코드 추가

```
Type: CNAME
Name: www (또는 subdomain)
Value: <amplify-provided-value>.amplifyapp.com
```

### Step 3: SSL 인증서
- Amplify가 자동으로 AWS Certificate Manager를 통해 SSL 인증서 발급
- HTTPS 자동 적용 (무료)

**DNS 전파 시간**: 최대 48시간 (보통 10-20분)

---

## 🔄 자동 배포 설정

### Git Push 자동 배포

1. Amplify Console → **"Build settings"**
2. "Automatically build the app" 활성화
3. 이후 Git push 시 자동으로 빌드 및 배포

### 배포 브랜치 변경

- **Production**: `main` 브랜치
- **Staging**: `develop` 브랜치 추가 가능

---

## ⚙️ 빌드 설정 (고급)

### Node.js 버전 변경

**Amplify Console → Build settings → Build image settings**

```yaml
# amplify.yml에 추가
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18  # Node.js 버전 명시
        - npm ci
```

### 빌드 타임아웃 설정

- 기본: 30분
- 변경: Amplify Console → Build settings → Timeout

---

## 📊 모니터링 및 로그

### 빌드 로그 확인

1. Amplify Console → 해당 앱 선택
2. 최근 빌드 클릭
3. 각 단계별 로그 확인

### CloudWatch 로그

- Amplify는 자동으로 CloudWatch에 로그 전송
- **CloudWatch Logs** → `/aws/amplify/<app-id>` 확인

---

## 🐛 트러블슈팅

### 빌드 실패: "npm ci failed"

**원인**: `package-lock.json`과 `package.json` 불일치

**해결**:
```bash
# 로컬에서 실행
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix package-lock.json"
git push
```

### 빌드 실패: "Command failed with exit code 1"

**원인**: TypeScript 또는 ESLint 에러

**해결**:
```bash
# 로컬에서 확인
npm run build

# 에러 수정 후 푸시
```

### 환경 변수가 적용되지 않음

**원인**: 환경 변수 설정 후 재배포 필요

**해결**:
1. Amplify Console → "Redeploy this version" 클릭
2. 또는 Git에 빈 커밋 푸시:
```bash
git commit --allow-empty -m "Trigger rebuild"
git push
```

### 정적 빌드 실패: "Error: Export encountered errors"

**원인**: SSR 기능 사용 중 (정적 빌드 불가)

**해결**:
- `next.config.mjs`에서 `output: 'export'` 확인
- 동적 라우트 제거 또는 `generateStaticParams` 사용

---

## 📈 성능 최적화

### CloudFront 캐싱

Amplify는 자동으로 CloudFront CDN을 사용합니다.

**캐싱 정책**:
- 정적 에셋 (이미지, 폰트): 1년
- HTML: 1시간 (stale-while-revalidate 적용)

### 빌드 캐싱

`amplify.yml`에 캐시 설정이 포함되어 있습니다:
```yaml
cache:
  paths:
    - node_modules/**/*
    - .next/cache/**/*
```

**효과**: 재빌드 시간 50% 단축

---

## 💰 비용 예상

### Amplify 요금 (2026년 기준)

| 항목 | 무료 티어 | 초과 시 |
|------|----------|---------|
| 빌드 시간 | 1,000분/월 | $0.01/분 |
| 호스팅 | 15GB 전송/월 | $0.15/GB |
| 스토리지 | 5GB | $0.023/GB |

**예상 월 비용** (월 10,000 방문자):
- 빌드: 약 30분/월 = 무료
- 호스팅: 약 50GB 전송 = $5-7
- **총**: ~$5-7/월

> 💡 **Tip**: 이미지/영상 최적화로 전송량 50% 절감 가능

---

## 🔐 보안 체크리스트

배포 전 반드시 확인하세요:

- [ ] `SLACK_WEBHOOK_URL` 환경 변수 설정 완료
- [ ] `ALLOWED_ORIGINS`에 실제 도메인만 포함
- [ ] HTTPS 적용 확인 (Amplify 기본 제공)
- [ ] Git에 `.env.*` 파일이 커밋되지 않았는지 확인
- [ ] 빌드 로그에 민감 정보가 노출되지 않는지 확인

---

## 📞 지원

### AWS Support
- [AWS Amplify 문서](https://docs.aws.amazon.com/amplify/)
- [AWS Support Center](https://console.aws.amazon.com/support/)

### 개발팀
- 기술 문의: [이메일 또는 Slack 채널]
- 긴급 상황: [담당자 연락처]

---

**마지막 업데이트**: 2026-02-04
**작성자**: Development Team
