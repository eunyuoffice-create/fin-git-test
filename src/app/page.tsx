import { defaultLocale } from '@/lib/i18n';

// 미들웨어가 리다이렉트를 처리하지만, fallback으로 메타 리프레시 제공
export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
        <title>Redirecting...</title>
      </head>
      <body>
        <p>Redirecting to <a href={`/${defaultLocale}`}>/{defaultLocale}</a>...</p>
      </body>
    </html>
  );
}
