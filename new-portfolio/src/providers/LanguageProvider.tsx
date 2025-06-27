import { createContext, useContext, createResource, createSignal, type Component, type JSX } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { fetchDictionary, type Locale } from "../localizations/resources";

// Language context type
type LanguageContextType = {
  locale: () => Locale;
  setLocale: (locale: Locale) => void;
  dict: () => i18n.Flatten<Record<string, any>> | undefined;
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>();

export const LanguageProvider: Component<{ children: JSX.Element }> = (props) => {
  const [locale, setLocale] = createSignal<Locale>("en");
  const [dict] = createResource(locale, fetchDictionary);
  
  const t = i18n.translator(dict);

  const toggleLanguage = () => {
    setLocale(locale() === "en" ? "es" : "en");
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    dict,
    t,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};