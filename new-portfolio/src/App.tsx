import { createResource, createSignal, Show, type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";

import Button from "./components/Button";
import { fetchDictionary, Locale } from "./localizations/resources";
import HtmlPage from "./pages/html";
import { ImagePreviewProvider } from "./providers/PreviewProvider";

const App: Component = () => {
  const [locale, setLocale] = createSignal<Locale>("en");

  const [dict] = createResource(locale, fetchDictionary);

  const toggleLanguage = () => {
    setLocale(locale() === "en" ? "es" : "en");
  };

  return (
    <ImagePreviewProvider>
      <div class="min-h-screen bg-base-100">
        {/* Language Toggle Button */}
        <div class="fixed top-4 right-4 z-50">
          <Show when={dict()}>
            {(dict) => {
              const t = i18n.translator(dict);
              return (
                <div class="flex gap-2">
                  <a href="#" class="btn-custom">
                    <span class="label" style={{ color: "white" }}>
                      {t(locale() === "en" ? "3d" : "2d")}
                    </span>
                    <span class="label-hover">
                      <span class="inner">{t(locale() === "en" ? "3d" : "2d")}</span>
                    </span>
                    <span class="border"></span>
                  </a>
                  <button 
                    onClick={toggleLanguage}
                    class="btn-custom"
                  >
                    <span class="label" style={{ color: "white" }}>
                      {locale() === "en" ? "ES" : "EN"}
                    </span>
                    <span class="label-hover">
                      <span class="inner">{locale() === "en" ? "ES" : "EN"}</span>
                    </span>
                    <span class="border"></span>
                  </button>
                </div>
              );
            }}
          </Show>
        </div>

        {/* Main Content */}
        <Show when={dict()} fallback={<div class="flex justify-center items-center min-h-screen"><span class="loading loading-spinner loading-lg"></span></div>}>
          {(dict) => {
            const t = i18n.translator(dict);
            return <HtmlPage t={t} />;
          }}
        </Show>
      </div>
    </ImagePreviewProvider>
  );
};

export default App;
