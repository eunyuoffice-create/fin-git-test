import { getDictionary, type Locale } from '@/lib/i18n';
import dynamic from 'next/dynamic';
import Header from '@/components/Header/Header';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import Section1 from '@/components/Sections/Section1';

// Below-fold: 동적 임포트 (초기 번들 크기 절감)
const Section2 = dynamic(() => import('@/components/Sections/Section2'));
const Section3 = dynamic(() => import('@/components/Sections/Section3'));
const Section4 = dynamic(() => import('@/components/Sections/Section4'));
const Section5 = dynamic(() => import('@/components/Sections/Section5'));
const Section6 = dynamic(() => import('@/components/Sections/Section6'));
const Footer = dynamic(() => import('@/components/Footer/Footer'));

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://main.do7mxvr098ojb.amplifyapp.com';

// 정적 생성할 언어 목록
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }, { lang: 'id' }];
}

// JSON-LD 구조화된 데이터
function generateJsonLd(lang: string) {
  const descriptions: Record<string, string> = {
    en: 'Beyond OCR. FinSight AI uses Agentic AI to deliver autonomous bank statement analysis and forgery detection for MSMEs and thin-filers in just 5 minutes.',
    id: 'Transformasi underwriting UMKM dengan Agentic AI. Dapatkan analisa rekening koran & deteksi fraud otomatis dalam 5 menit dengan akurasi level laporan keuangan.',
    ko: 'OCR을 넘어서. FinSight AI는 에이전틱 AI로 은행 거래내역 분석과 위변조 탐지를 5분 만에 자율적으로 수행합니다.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FinProfile',
    url: `${baseUrl}/${lang}`,
    logo: `${baseUrl}/favicon.ico`,
    description: descriptions[lang] || descriptions.en,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '503, 474 Gwangnaru-ro, Gwangjin-gu',
      addressLocality: 'Seoul',
      addressCountry: 'KR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@finprofile.id',
      contactType: 'customer service',
    },
    sameAs: [],
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const jsonLd = generateJsonLd(lang);

  return (
    <>
      {/* JSON-LD 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        id="main-content"
        className="min-h-screen bg-white min-w-[1440px]"
        role="main"
      >
        {/* Header - Sticky Navigation */}
        <Header dict={dict} lang={lang} />

        {/* Hero Banner */}
        <HeroBanner dict={dict} />

        {/* Section 1 - Why FinProfile */}
        <Section1 dict={dict} />

        {/* Section 2 - Credit Reviews */}
        <Section2 dict={dict} />

        {/* Section 3 - Feature Details */}
        <Section3 dict={dict} />

        {/* Section 4 - Testimonials */}
        <Section4 dict={dict} />

        {/* Section 5 - Team */}
        <Section5 dict={dict} />

        {/* Section 6 - Contact Form */}
        <Section6 dict={dict} lang={lang} />

        {/* Footer */}
        <Footer dict={dict} />
      </main>
    </>
  );
}
