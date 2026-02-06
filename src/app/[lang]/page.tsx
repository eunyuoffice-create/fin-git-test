import { getDictionary, type Locale } from '@/lib/i18n';
import Header from '@/components/Header/Header';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import Section1 from '@/components/Sections/Section1';
import Section2 from '@/components/Sections/Section2';
import Section3 from '@/components/Sections/Section3';
import Section4 from '@/components/Sections/Section4';
import Section5 from '@/components/Sections/Section5';
import Section6 from '@/components/Sections/Section6';
import Footer from '@/components/Footer/Footer';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://main.do7mxvr098ojb.amplifyapp.com';

// 정적 생성할 언어 목록
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }];
}

// JSON-LD 구조화된 데이터
function generateJsonLd(lang: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FinProfile',
    url: `${baseUrl}/${lang}`,
    logo: `${baseUrl}/favicon.ico`,
    description:
      'AI-Powered Credit Infrastructure - Close credit data gaps with AI',
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

      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        {lang === 'ko' ? '본문으로 바로가기' : 'Skip to main content'}
      </a>

      <main id="main-content" className="min-h-screen bg-white min-w-[1440px]" role="main">
        {/* Header - Sticky Navigation */}
        <Header dict={dict} />

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
