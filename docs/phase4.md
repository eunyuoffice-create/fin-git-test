# Phase 4: 백엔드 API 구현

## 목표
Contact Form 제출 시 Slack Webhook으로 알림을 보내는 API를 구현합니다.

---

## 1. Slack Webhook URL 설정

### 1.1 Slack Webhook 생성
1. Slack 워크스페이스에서 **Incoming Webhooks** 앱 설치
2. 채널 선택 후 Webhook URL 복사
3. 환경 변수 파일에 추가

### 1.2 `.env.local` 업데이트
```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WEBHOOK_URL
NEXT_PUBLIC_SITE_URL=http://localhost:8080
```

---

## 2. Slack 헬퍼 함수 작성

### `src/lib/slack.ts`
```typescript
import axios from 'axios';

export interface SlackMessage {
  company: string;
  name: string;
  phone: string;
  email: string;
  needs?: string;
  lang: string;
}

export async function sendSlackNotification(data: SlackMessage): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('SLACK_WEBHOOK_URL is not configured');
  }

  const message = {
    text: '🔔 New Contact Form Submission',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📋 New Contact Request',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Company:*\n${data.company}`,
          },
          {
            type: 'mrkdwn',
            text: `*Contact Person:*\n${data.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*Phone:*\n${data.phone}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.email}`,
          },
        ],
      },
    ],
  };

  // Add Business Needs if provided
  if (data.needs) {
    message.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Business Needs:*\n${data.needs}`,
      },
    });
  }

  // Add metadata
  message.blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `Language: *${data.lang.toUpperCase()}* | Submitted: <!date^${Math.floor(Date.now() / 1000)}^{date_short_pretty} at {time}|${new Date().toISOString()}>`,
      },
    ],
  });

  await axios.post(webhookUrl, message, {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

---

## 3. Contact API Route 구현

### `src/app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { sendSlackNotification } from '@/lib/slack';
import { z } from 'zod';

// Rate limiting (간단한 메모리 기반)
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 5; // 5 requests
const RATE_WINDOW = 60 * 1000; // per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];

  // 시간 윈도우 밖의 요청 제거
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);

  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    // Extract validated data
    const { company, name, phone, email, needs } = validationResult.data;
    const lang = body.lang || 'en';

    // Send to Slack
    await sendSlackNotification({
      company,
      name,
      phone,
      email,
      needs,
      lang,
    });

    // Success response
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API Error:', error);

    // Slack 전송 실패 시
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 502 }
      );
    }

    // 기타 에러
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight (필요시)
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
```

---

## 4. API 타입 정의

### `src/types/api.ts`
```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface ContactFormRequest {
  company: string;
  name: string;
  phone: string;
  email: string;
  needs?: string;
  lang: string;
}
```

---

## 5. 로컬 테스트

### 5.1 개발 서버 실행
```bash
npm run dev
```

### 5.2 테스트 시나리오

#### A. 정상 제출 테스트
1. `http://localhost:8080/en` 접속
2. Contact Form 모든 필드 입력
3. Submit 버튼 클릭
4. Slack 채널에 알림 도착 확인

#### B. Validation 테스트
- 필수 필드 누락 → 400 에러
- 잘못된 이메일 형식 → 400 에러
- 잘못된 전화번호 형식 → 400 에러

#### C. Rate Limit 테스트
- 1분 내 5회 이상 제출 → 429 에러

#### D. 에러 처리 테스트
- `.env.local`에서 `SLACK_WEBHOOK_URL` 제거 → 502 에러

### 5.3 curl을 통한 API 직접 테스트
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Test Corp",
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "needs": "Financial consulting",
    "lang": "en"
  }'
```

**예상 응답:**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

---

## 6. 로깅 (선택사항)

### `src/lib/logger.ts` (간단한 로거)
```typescript
export function logInfo(message: string, data?: any) {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
}

export function logError(message: string, error?: any) {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
}
```

### API Route에 로깅 추가
```typescript
import { logInfo, logError } from '@/lib/logger';

// 성공 시
logInfo('Contact form submitted', { company, email, lang });

// 에러 시
logError('Contact API Error', error);
```

---

## ✅ 완료 체크리스트

- [ ] Slack Webhook URL 생성 및 환경 변수 설정
- [ ] `src/lib/slack.ts` Slack 헬퍼 함수 작성
- [ ] `src/app/api/contact/route.ts` API 구현
- [ ] Rate limiting 구현
- [ ] Zod validation 적용
- [ ] 에러 처리 구현
- [ ] 로컬에서 정상 제출 테스트
- [ ] Slack 알림 도착 확인
- [ ] Validation 에러 테스트
- [ ] Rate limit 테스트

---

## 다음 단계

👉 **[Phase 5: 성능 & SEO 최적화](./phase5.md)**
