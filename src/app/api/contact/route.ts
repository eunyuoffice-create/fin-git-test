// ===========================================
// Contact Form API - Slack 통합
// ===========================================
// 역할: 문의 폼 데이터를 검증하고 Slack으로 전송
// 보안: Rate Limiting, Input Validation, Sanitization, CORS
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { ContactFormRequest } from '@/types/api';
import { sendSlackNotification } from '@/lib/slack';
import axios from 'axios';
import { z } from 'zod';

// ===========================================
// Rate Limiting 설정
// ===========================================
// 메모리 기반 간단한 Rate Limiting (서버리스 환경용)
// 프로덕션에서는 Redis 등 영구 저장소 사용 권장
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 5; // 허용 요청 수
const RATE_WINDOW = 60 * 1000; // 시간 윈도우 (1분)

/**
 * IP 기반 Rate Limiting 체크
 * @param ip - 클라이언트 IP 주소
 * @returns 요청 허용 여부 (true: 허용, false: 차단)
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];

  // 시간 윈도우 밖의 오래된 요청 제거
  const recentRequests = requests.filter((time) => now - time < RATE_WINDOW);

  // 제한 초과 시 차단
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }

  // 새 요청 기록 및 저장
  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return true;
}

// ===========================================
// 입력값 Sanitization (XSS 방지)
// ===========================================
/**
 * 사용자 입력값에서 위험한 문자 제거
 * @param str - 정제할 문자열
 * @returns 정제된 안전한 문자열
 */
function sanitizeInput(str: string): string {
  return (
    str
      // HTML 태그 제거 (XSS 방지)
      .replace(/[<>]/g, '')
      // 앞뒤 공백 제거
      .trim()
      // 최대 길이 제한 (500자)
      .slice(0, 500)
  );
}

// ===========================================
// POST /api/contact
// ===========================================
export async function POST(request: NextRequest) {
  try {
    // -----------------------------------------------
    // 1. CORS 체크 (Origin 검증)
    // -----------------------------------------------
    const origin = request.headers.get('origin');
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

    // 허용되지 않은 Origin에서의 요청 차단
    if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
      console.warn(`[CORS] Blocked request from origin: ${origin}`);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // -----------------------------------------------
    // 2. Rate Limiting (요청 빈도 제한)
    // -----------------------------------------------
    // IP 주소 추출 (Proxy/CloudFront 환경 고려)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate Limit 초과 시 차단
    if (!checkRateLimit(ip)) {
      console.warn(`[Rate Limit] IP ${ip} exceeded rate limit`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // -----------------------------------------------
    // 3. 요청 본문 파싱
    // -----------------------------------------------
    const body = await request.json();

    // -----------------------------------------------
    // 4. Zod 스키마 검증
    // -----------------------------------------------
    const validationResult = z
      .object({
        company: z.string().min(1, 'companyRequired'),
        name: z.string().min(1, 'nameRequired'),
        phone: z
          .string()
          .min(1, 'phoneRequired')
          .regex(/^[+]?[\d\s-()]+$/, 'phoneInvalid'),
        email: z.string().min(1, 'emailRequired').email('emailInvalid'),
        needs: z.string().optional(),
        lookingFor: z.array(z.string()).optional(),
        lang: z.string().optional(),
      })
      .safeParse(body);

    // 검증 실패 시 에러 반환
    if (!validationResult.success) {
      console.warn(`[Validation] Failed for IP ${ip}:`, validationResult.error.message);
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.message,
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // 5. Sanitization (XSS 공격 방지)
    // -----------------------------------------------
    // 검증된 데이터에서 위험한 문자 제거
    const formData: ContactFormRequest = {
      company: sanitizeInput(validationResult.data.company),
      name: sanitizeInput(validationResult.data.name),
      phone: sanitizeInput(validationResult.data.phone),
      email: sanitizeInput(validationResult.data.email),
      needs: validationResult.data.needs
        ? sanitizeInput(validationResult.data.needs)
        : undefined,
      lookingFor: validationResult.data.lookingFor?.map(sanitizeInput),
      lang: validationResult.data.lang || 'en',
    };

    // -----------------------------------------------
    // 6. Slack 알림 전송
    // -----------------------------------------------
    await sendSlackNotification(formData);

    // -----------------------------------------------
    // 7. 성공 응답
    // -----------------------------------------------
    console.log(`[Success] Contact form submitted from IP ${ip}`);
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      {
        status: 200,
        headers: {
          // API 응답은 절대 캐싱하지 않음
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    // -----------------------------------------------
    // 에러 처리
    // -----------------------------------------------
    console.error('Contact API Error:', error);

    // 디버그용 - 에러 상세 정보 반환 (프로덕션에서는 제거 필요)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const hasWebhook = !!process.env.SLACK_WEBHOOK_URL;

    // Slack 전송 실패 (네트워크 오류 등)
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        error: 'Failed to send notification',
        debug: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          hasWebhook
        }
      }, { status: 502 });
    }

    // 기타 서버 에러
    return NextResponse.json({
      error: 'Internal server error',
      debug: {
        message: errorMessage,
        hasWebhook
      }
    }, { status: 500 });
  }
}

// ===========================================
// OPTIONS /api/contact (CORS Preflight)
// ===========================================
// 브라우저가 실제 요청 전에 보내는 사전 요청 처리
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];

  return new NextResponse(null, {
    status: 204, // No Content
    headers: {
      // Origin 검증 후 허용
      'Access-Control-Allow-Origin':
        origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400', // 24시간 동안 preflight 결과 캐싱
    },
  });
}
