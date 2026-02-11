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
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const url = `${baseUrl}/${lang}`;

  const ogTitle = dict.meta.ogTitle || dict.meta.title;
  const ogDescription = dict.meta.ogDescription || dict.meta.description;
  const keywords = dict.meta.keywords
    ? dict.meta.keywords.split(', ').map((k: string) => k.trim())
    : ['FinSight AI', 'Credit', 'Finance', 'Bank Statement Analysis', 'FinTech'];

  return {
    title: dict.meta.title,
    description: dict.meta.description,

    // Canonical URL - 중복 콘텐츠 방지
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en`,
        'ko': `${baseUrl}/ko`,
        'id': `${baseUrl}/id`,
      },
    },

    // Open Graph - 소셜 미디어 공유
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: url,
      siteName: 'FinSight AI',
      locale: lang === 'ko' ? 'ko_KR' : lang === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'FinSight AI - Autonomous Credit Underwriting',
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [`${baseUrl}/og-image.png`],
    },

    // 추가 메타태그
    keywords,
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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // 유효하지 않은 언어는 404
  if (!isValidLocale(lang)) {
    notFound();
  }

  return <>{children}</>;
}
