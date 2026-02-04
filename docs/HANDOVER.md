# 📦 프로젝트 인수인계 문서

---

## 🎯 프로젝트 개요

**프로젝트명**: FinProfile - 회사 소개 랜딩 페이지
**기술 스택**: Next.js 14 + TypeScript + Tailwind CSS
**배포 환경**: AWS Amplify
**개발 완료일**: 2026-02-04

---

## 📁 전달 파일 목록

### 소스 코드
- `finprofile/` - 전체 프로젝트 폴더
- `.env.example` - 환경 변수 템플릿 (보안 관련)

### 문서
- `docs/DEPLOYMENT.md` - **배포 가이드** (필수 읽기)
- `docs/SECURITY.md` - 보안 설정 및 체크리스트
- `docs/CACHING.md` - 성능 최적화 가이드
- `docs/init.md` - 프로젝트 초기 계획서
- `README.md` - 개발자 가이드

---

## ✅ 배포 전 필수 작업

### 1. Slack Webhook 생성 (5분)

**Slack 워크스페이스 설정**:
1. Slack 워크스페이스 로그인
2. https://api.slack.com/apps 접속
3. "Create New App" → "From scratch" 선택
4. App 이름: "Contact Form" (또는 원하는 이름)
5. Workspace 선택
6. "Incoming Webhooks" 활성화
7. "Add New Webhook to Workspace" 클릭
8. 알림 받을 채널 선택 (예: #contact-forms)
9. **Webhook URL 복사** (예: `https://hooks.slack.com/services/...`)

⚠️ **중요**: 이 URL은 절대 외부에 노출하지 마세요!

---

### 2. AWS Amplify 환경 변수 설정 (5분)

**Amplify Console 설정**:
1. AWS Console → Amplify 서비스 접속
2. 해당 앱 선택 (또는 새로 생성)
3. 좌측 메뉴 → **"Environment variables"** 클릭
4. 다음 환경 변수 추가:

| Key | Value | 설명 |
|-----|-------|------|
| `SLACK_WEBHOOK_URL` | (위에서 생성한 Webhook URL) | **필수** |
| `ALLOWED_ORIGINS` | `https://yourdomain.com` | 실제 도메인 입력 |
| `NODE_VERSION` | `18` | Node.js 버전 |

5. "Save" 클릭

---

### 3. Git 리포지토리 연결 (10분)

**Amplify와 Git 연결**:
1. Amplify Console → "New app" → "Host web app"
2. Git provider 선택 (GitHub/GitLab/Bitbucket)
3. 리포지토리 및 브랜치 선택 (`main` 권장)
4. 빌드 설정 확인:
   - `amplify.yml` 파일이 자동 감지됨
   - 수정 없이 그대로 진행
5. "Save and deploy" 클릭

**예상 빌드 시간**: 3-5분

---

## 🚀 배포 완료 후 확인사항

### 1. 빌드 성공 확인
- Amplify Console에서 빌드 로그 확인
- "Deployed" 상태로 변경되었는지 확인

### 2. 사이트 동작 확인
- Amplify가 제공하는 URL 접속 (예: `https://xxx.amplifyapp.com`)
- 페이지 로딩 확인
- 다국어 전환 테스트 (en/id/ko)

### 3. 문의 폼 테스트
- 문의 폼 작성 및 제출
- Slack 채널에 알림 도착 확인
- 필수 필드 검증 테스트 (빈 값 제출 시 에러 확인)

### 4. 성능 점검
```bash
# Google Lighthouse로 성능 측정
# Chrome DevTools → Lighthouse 탭 → "Generate report"
```

**목표 점수**:
- Performance: 85점 이상
- Best Practices: 90점 이상
- SEO: 90점 이상

---

## 🌐 커스텀 도메인 연결 (선택)

### 1. Amplify에서 도메인 추가
1. Amplify Console → **"Domain management"**
2. "Add domain" 클릭
3. 도메인 입력 (예: `yourdomain.com`)
4. SSL 인증서 자동 발급 (무료)

### 2. DNS 설정
Amplify가 제공하는 CNAME 레코드를 도메인 등록 업체에 추가:

```
Type: CNAME
Name: www (또는 원하는 서브도메인)
Value: <amplify-provided-value>.amplifyapp.com
TTL: 300
```

**DNS 전파 시간**: 10분 ~ 48시간 (보통 10-20분)

---

## 🔒 보안 주의사항

### ⚠️ 절대 하지 말아야 할 것

1. **환경 변수 노출**
   - `.env.local`, `.env.production` 파일을 Git에 커밋하지 마세요
   - Slack Webhook URL을 코드에 하드코딩하지 마세요

2. **보안 설정 변경**
   - `next.config.mjs`의 보안 헤더 제거하지 마세요
   - API의 Rate Limiting 비활성화하지 마세요

3. **CORS 전면 개방**
   - `ALLOWED_ORIGINS`를 `*`로 설정하지 마세요
   - 실제 도메인만 허용하세요

### ✅ 정기 점검 (월 1회 권장)

```bash
# 보안 취약점 점검
npm audit

# 심각한 취약점 자동 수정
npm audit fix

# 의존성 업데이트
npm update
```

---

## 🆘 문제 해결 (트러블슈팅)

### 빌드 실패: "npm ci failed"

**원인**: `package-lock.json` 불일치

**해결**:
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix package-lock.json"
git push
```

---

### 문의 폼이 작동하지 않음

**체크리스트**:
1. Amplify 환경 변수에 `SLACK_WEBHOOK_URL` 설정되었는지 확인
2. Slack Webhook URL이 유효한지 테스트:
   ```bash
   curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"Test from curl"}' \
     YOUR_WEBHOOK_URL
   ```
3. 브라우저 DevTools → Network 탭에서 API 요청 확인
4. 429 에러 발생 시: Rate Limit (1분 대기 후 재시도)

---

### 페이지 로딩이 느림

**원인**: 영상 파일 용량이 너무 큼

**해결**:
1. 영상 파일을 10-15MB 이하로 압축
2. WebM 포맷 추가 제공
3. 또는 Vimeo/YouTube 임베딩 고려

---

### CORS 에러 발생

**원인**: `ALLOWED_ORIGINS`에 현재 도메인이 포함되지 않음

**해결**:
1. Amplify Console → Environment variables
2. `ALLOWED_ORIGINS`에 실제 도메인 추가
3. 예: `https://yourdomain.com,https://www.yourdomain.com`
4. 재배포 (Redeploy this version)

---

## 📞 지원 및 문의

### 개발팀 연락처
- **이메일**: [개발팀 이메일]
- **Slack**: [Slack 채널]
- **긴급 상황**: [담당자 전화번호]

### 응답 시간
- 일반 문의: 영업일 기준 1-2일
- 긴급 상황: 당일 응답

### 추가 개발 문의
- 기능 추가
- 디자인 변경
- 성능 개선

---

## 📋 체크리스트

배포 완료 전 모든 항목을 확인하세요:

### 필수 (MUST)
- [ ] Slack Webhook 생성 완료
- [ ] Amplify 환경 변수 설정 완료 (`SLACK_WEBHOOK_URL`, `ALLOWED_ORIGINS`)
- [ ] Git 리포지토리 연결 및 빌드 성공
- [ ] 배포된 사이트 접속 확인
- [ ] 문의 폼 제출 → Slack 알림 도착 확인
- [ ] 다국어 전환 테스트 (en/id/ko)
- [ ] `.env.*` 파일이 Git에 커밋되지 않았는지 확인

### 권장 (SHOULD)
- [ ] 커스텀 도메인 연결
- [ ] Google Lighthouse 성능 점수 85+ 달성
- [ ] 모바일 환경에서 테스트
- [ ] 보안 점검 완료 (`npm audit`)

### 선택 (OPTIONAL)
- [ ] CloudWatch 로그 모니터링 설정
- [ ] 알림 설정 (빌드 실패 시 이메일 알림)
- [ ] Google Analytics 연동

---

## 🎓 참고 자료

### 필수 문서
1. **[배포 가이드](DEPLOYMENT.md)** - AWS Amplify 배포 상세 절차
2. **[보안 가이드](SECURITY.md)** - 보안 설정 및 모범 사례
3. **[README.md](../finprofile/README.md)** - 개발자 가이드

### 외부 자료
- [AWS Amplify 공식 문서](https://docs.aws.amazon.com/amplify/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Slack API 문서](https://api.slack.com/)

---

## 🎉 완료!

모든 체크리스트를 완료하셨다면 배포가 완료되었습니다!

**다음 단계**:
1. 팀원들에게 사이트 URL 공유
2. 실제 고객에게 테스트 요청
3. 피드백 수집 및 개선

---

**프로젝트 인수인계 완료**
**작성일**: 2026-02-04
**개발팀**: [팀명]
