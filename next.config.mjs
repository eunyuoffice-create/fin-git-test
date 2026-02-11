const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===========================================
  // 이미지 최적화 설정
  // ===========================================
  // AWS Amplify SSR 호스팅에서 Next.js 이미지 최적화 활성화
  images: {
    unoptimized: false,
    quality: 100,
    minimumCacheTTL: 2592000, // 30일 (/_next/image/ 응답 캐시)
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
      // 1. Next.js 빌드 에셋 - 영구 캐싱 (1년, immutable)
      // -----------------------------------------------
      // 대상: _next/static/ 내 JS, CSS, 미디어 (파일명에 해시 포함)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // -----------------------------------------------
      // 2. 폰트 파일 - 장기 캐싱 (1년)
      // -----------------------------------------------
      // 대상: woff, woff2 폰트 파일 (변경 거의 없음)
      {
        source: '/:all*(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: isDev
              ? 'no-cache, no-store, must-revalidate'
              : 'public, max-age=31536000, immutable',
          },
        ],
      },

      // -----------------------------------------------
      // 3. 이미지 - 장기 캐싱 (30일 + SWR)
      // -----------------------------------------------
      // 대상: 이미지 파일
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: isDev
              ? 'no-cache, no-store, must-revalidate'
              : 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },

      // -----------------------------------------------
      // 4. 영상 파일 - 중간 캐싱 (30일)
      // -----------------------------------------------
      {
        source: '/:all*(mp4|webm)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },

      // -----------------------------------------------
      // 5. HTML 페이지 - 짧은 캐싱 (1시간) + 보안 헤더
      // -----------------------------------------------
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
