import { getDictionary, type Locale } from '@/lib/i18n';
import Header from '@/components/Header/Header';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import FeatureSections from '@/components/Sections/FeatureSections';
import Testimonials from '@/components/Sections/Testimonials';
import Team from '@/components/Sections/Team';
import ContactForm from '@/components/Sections/ContactForm';
import Footer from '@/components/Footer/Footer';

// 정적 생성할 언어 목록
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ko' }
  ];
}

export default async function HomePage({
  params
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <main className="min-h-screen bg-white">
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
      <ContactForm dict={dict} lang={params.lang} />

      {/* Footer */}
      <Footer dict={dict} />
    </main>
  );
}
