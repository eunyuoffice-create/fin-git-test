export type Locale = 'en' | 'id';

export const locales: Locale[] = ['en', 'id'];
export const defaultLocale: Locale = 'en';

export async function getDictionary(locale: Locale) {
  try {
    const dict = await import(`@/locales/${locale}.json`);
    return dict.default;
  } catch {
    // Fallback to default locale if import fails
    const dict = await import(`@/locales/${defaultLocale}.json`);
    return dict.default;
  }
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
