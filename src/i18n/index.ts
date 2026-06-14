import { en } from './en';
import { id } from './id';

export type Lang = 'id' | 'en';
export type { Translations } from './en';

const translations = { id, en };

export function getTranslations(lang: string) {
  return translations[lang as Lang] ?? translations.id;
}
