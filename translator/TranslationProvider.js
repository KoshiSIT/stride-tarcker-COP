import { useState } from "react";
import * as Localization from "expo-localization";
import translations from "./languages";
import TranslationContext from "./TranslationContext";

const detectSystemLanguage = () => {
  return Localization.locale.split("-")[0];
};

const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(detectSystemLanguage());
  const currentTranslations = translations[language] || translations["en"];

  return (
    <TranslationContext.Provider
      value={{ translations: currentTranslations, setLanguage, language }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
