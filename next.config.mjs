/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===========================================
  // Standalone 모드 (AWS Amplify SSR 배포용)
  // ===========================================
  // 독립 실행 가능한 최소한의 빌드 생성
  output: 'standalone',

  // ===========================================
  // 이미지 최적화 설정
  // ===========================================
  // AWS Amplify SSR 호스팅에서 Next.js 이미지 최적화 활성화
  images: {
    unoptimized: false,
  },

  // ===========================================
  // URL 설정
  // ===========================================
  // 모든 URL에 트레일링 슬래시 추가 (일관성 유지)
  // 예: /about → /about/
  trailingSlash: true,

  // ===========================================
  // 보안 및 캐싱 헤더
  // ===========================================
  async headers() {
    return [
      // -----------------------------------------------
      // 1. 정적 에셋 - 장기 캐싱 (1년)
      // -----------------------------------------------
      // 대상: 이미지, 폰트 등 변경되지 않는 파일
      // Next.js가 자동으로 파일명에 해시 추가 (예: main.abc123.js)
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            // public: CDN 캐싱 허용
            // max-age=31536000: 1년 동안 캐싱
            // immutable: 절대 변경되지 않음 (재검증 불필요)
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // -----------------------------------------------
      // 2. 영상 파일 - 중간 캐싱 (30일)
      // -----------------------------------------------
      // 대상: MP4, WebM 영상 파일
      {
        source: '/:all*(mp4|webm)',
        headers: [
          {
            key: 'Cache-Control',
            // max-age=2592000: 30일 동안 캐싱
            value: 'public, max-age=2592000',
          },
          {
            key: 'Accept-Ranges',
            // 스트리밍 지원 (부분 다운로드 가능)
            value: 'bytes',
          },
        ],
      },

      // -----------------------------------------------
      // 3. HTML 페이지 - 짧은 캐싱 (1시간) + 보안 헤더
      // -----------------------------------------------
      // 대상: 모든 HTML 페이지
      {
        source: '/:path*',
        headers: [
          // 캐싱 설정
          {
            key: 'Cache-Control',
            // public: CDN 캐싱 허용
            // max-age=3600: 1시간 동안 fresh
            // stale-while-revalidate=86400: 24시간 동안 stale 컨텐츠 제공하며 백그라운드 갱신
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },

          // 보안 헤더
          {
            key: 'X-Frame-Options',
            // DENY: iframe 삽입 완전 차단 (클릭재킹 방지)
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            // nosniff: MIME 타입 추측 차단 (XSS 방지)
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            // 다른 origin으로 이동 시 origin만 전송
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            // 불필요한 브라우저 API 차단
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            // 브라우저 XSS 필터 활성화
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
