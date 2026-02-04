# 🔒 보안 가이드

## 개요
이 문서는 정적 사이트 + Slack API 통합 프로젝트의 보안 설정 및 체크리스트를 설명합니다.

---

## 🛡️ 적용된 보안 기능

### 1. API 보안

#### Rate Limiting
- **제한**: 1분당 5회 요청 (IP 기반)
- **목적**: DDoS 및 스팸 방지
- **구현**: 메모리 기반 (서버리스 환경 고려)

#### 입력값 검증
- **라이브러리**: Zod
- **검증 항목**:
  - 필수 필드 존재 여부
  - 이메일 형식
  - 전화번호 형식
  - 문자열 길이 제한 (500자)

#### Sanitization (XSS 방지)
- **처리**: HTML 태그 제거 (`<`, `>`)
- **대상**: 모든 사용자 입력값
- **적용**: Slack 전송 전

#### Honeypot (봇 차단)
- **필드**: `website` (숨김 필드)
- **로직**: 값이 채워지면 봇으로 판단하여 거부

#### CORS 설정
- **환경 변수**: `ALLOWED_ORIGINS`
- **기본값**: 환경별 도메인 제한
- **Production**: 실제 도메인만 허용

### 2. 보안 헤더

Next.js 설정에 다음 헤더가 적용되어 있습니다:

| 헤더 | 값 | 목적 |
|------|-----|------|
| `X-Frame-Options` | `DENY` | 클릭재킹 방지 |
| `X-Content-Type-Options` | `nosniff` | MIME 스니핑 방지 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer 정보 제한 |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | 불필요한 권한 차단 |
| `X-XSS-Protection` | `1; mode=block` | XSS 필터 활성화 |

### 3. 환경 변수 보안

#### 필수 환경 변수
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ
ALLOWED_ORIGINS=https://yourdomain.com
NODE_VERSION=18
```

#### 주의사항
- ⚠️ **절대 커밋하지 마세요**: `.env.*` 파일은 `.gitignore`에 포함
- ✅ **Amplify Console에서만 설정**: 환경 변수는 Amplify의 Environment variables에서 관리
- ✅ **Webhook URL 보호**: Slack Webhook URL 유출 시 즉시 재생성

---

## ✅ 배포 전 보안 체크리스트

### 필수 (MUST)
- [ ] `SLACK_WEBHOOK_URL` 환경 변수 설정 완료
- [ ] `ALLOWED_ORIGINS`에 실제 프로덕션 도메인 설정
- [ ] HTTPS 적용 확인 (Amplify 기본 제공)
- [ ] `.env.*` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] API 응답에서 에러 상세 정보가 노출되지 않는지 확인

### 권장 (SHOULD)
- [ ] Slack Webhook URL을 프로덕션 전용으로 분리
- [ ] 로그 모니터링 설정 (AWS CloudWatch)
- [ ] 비정상적인 트래픽 패턴 모니터링
- [ ] 정기적인 보안 업데이트 (npm audit)

### 선택 (OPTIONAL)
- [ ] reCAPTCHA 통합 (스팸 방지 강화)
- [ ] WAF (Web Application Firewall) 설정
- [ ] Rate Limiting을 Redis 등 영구 저장소로 전환
- [ ] 요청 로그 분석 및 알림 설정

---

## 🚨 보안 인시던트 대응

### Slack Webhook URL 유출 시
1. Slack 워크스페이스에서 즉시 Webhook 재생성
2. Amplify 환경 변수 업데이트
3. 재배포
4. 유출 경로 파악 및 차단

### 비정상 트래픽 감지 시
1. AWS CloudWatch 로그 확인
2. Rate Limiting 임계값 조정
3. 필요시 특정 IP 차단 (CloudFront 또는 WAF)

### XSS/Injection 공격 시도 감지 시
1. 입력값 검증 로직 재확인
2. Sanitization 강화
3. 보안 패치 적용

---

## 📚 참고 자료

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Slack Webhook 보안 가이드](https://api.slack.com/messaging/webhooks)
- [AWS Amplify 보안 모범 사례](https://docs.aws.amazon.com/amplify/latest/userguide/security.html)

---

## 🔄 정기 점검 (월 1회 권장)

```bash
# 1. 의존성 보안 취약점 점검
npm audit

# 2. 의존성 업데이트
npm update

# 3. 심각한 취약점 자동 수정
npm audit fix
```

---

**마지막 업데이트**: 2026-02-04
**담당자**: Development Team
