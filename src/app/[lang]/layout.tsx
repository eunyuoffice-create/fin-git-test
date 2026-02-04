import { locales, isValidLocale, type Locale, getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://main.do7mxvr098ojb.amplifyapp.com';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const url = `${baseUrl}/${lang}`;

  return {
    title: dict.meta.title,
    description: dict.meta.description,

    // Canonical URL - 중복 콘텐츠 방지
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en`,
        'ko': `${baseUrl}/ko`,
      },
    },

    // Open Graph - 소셜 미디어 공유
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: url,
      siteName: 'FinProfile',
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'FinProfile - AI-Powered Credit Infrastructure',
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${baseUrl}/og-image.png`],
    },

    // 추가 메타태그
    keywords: ['FinProfile', 'AI', 'Credit', 'Finance', 'Bank Statement Analysis', 'FinTech'],
    authors: [{ name: 'FinProfile' }],
    creator: 'FinProfile',
    publisher: 'FinProfile',

    // 검색엔진 설정
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // 유효하지 않은 언어는 404
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  return <>{children}</>;
}
