'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

const languageNames: Record<Locale, string> = {
  en: 'English',
  id: 'Bahasa',
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split('/')[1] as Locale;

  const switchLanguage = (newLang: Locale) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang)}
          className={`px-3 py-1 rounded ${
            currentLang === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {languageNames[lang]}
        </button>
      ))}
    </div>
  );
}
