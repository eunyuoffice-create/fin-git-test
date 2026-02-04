import { NextRequest, NextResponse } from 'next/server';
import { ContactFormRequest } from '@/types/api';
import { sendSlackNotification } from '@/lib/slack';
import axios from 'axios';
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
    const validationResult = z.object({
      company: z.string().min(1, 'companyRequired'),
      name: z.string().min(1, 'nameRequired'),
      phone: z.string().min(1, 'phoneRequired').regex(/^[+]?[\d\s-()]+$/, 'phoneInvalid'),
      email: z.string().min(1, 'emailRequired').email('emailInvalid'),
      needs: z.string().optional(),
      lang: z.string().optional(),
    }).safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.message
        },
        { status: 400 }
      );
    }

    // Extract validated data as ContactFormRequest
    const formData: ContactFormRequest = {
      company: validationResult.data.company,
      name: validationResult.data.name,
      phone: validationResult.data.phone,
      email: validationResult.data.email,
      needs: validationResult.data.needs,
      lang: validationResult.data.lang || 'en',
    };

    // Send to Slack
    await sendSlackNotification(formData);

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