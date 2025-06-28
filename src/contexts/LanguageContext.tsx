import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '../i18n/i18n';

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: 'en' | 'pl') => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get saved language from localStorage or use browser language
  const getBrowserLanguage = (): 'en' | 'pl' => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'pl' ? 'pl' : 'en';
  };

  const [language, setLanguage] = useState<'en' | 'pl'>(
    (localStorage.getItem('language') as 'en' | 'pl') || getBrowserLanguage()
  );

  const changeLanguage = (lang: 'en' | 'pl') => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Initialize language
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
