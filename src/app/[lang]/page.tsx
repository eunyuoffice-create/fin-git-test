import { getDictionary, type Locale } from '@/lib/i18n';
import Header from '@/components/Header/Header';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import FeatureSections from '@/components/Sections/FeatureSections';
import Testimonials from '@/components/Sections/Testimonials';
import Team from '@/components/Sections/Team';
import ContactForm from '@/components/Sections/ContactForm';
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

        {/* Feature Sections (1-6) */}
        <FeatureSections dict={dict} />

        {/* Testimonials */}
        <Testimonials dict={dict} />

        {/* Team */}
        <Team dict={dict} />

        {/* Contact Form */}
        <ContactForm dict={dict} lang={lang} />

        {/* Footer */}
        <Footer dict={dict} />
      </main>
    </>
  );
}
