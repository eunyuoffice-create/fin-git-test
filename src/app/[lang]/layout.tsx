import { locales, isValidLocale, type Locale, getDictionary } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
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
