import { createResource, createSignal, Show, type Component } from "solid-js";
import * as i18n from "@solid-primitives/i18n";

import logo from "./logo.svg";
import styles from "./App.module.css";
import Button from "./components/Button";
import { fetchDictionary, Locale } from "./localizations/resources";
import HtmlPage from "./pages/html";

const App: Component = () => {
  const [locale, setLocale] = createSignal<Locale>("en");

  const [dict] = createResource(locale, fetchDictionary);

  dict();

  const t = i18n.translator(dict);

  t("tecno_exp_1"); // => string | undefined
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <Show when={dict()}>
          {(dict) => {
            dict(); // => Dictionary (narrowed by Show)

            const t = i18n.translator(dict);

            return (
              <div>
                <p>Current locale: {locale()}</p>
                <p>DAyum: {t("lang_1")}</p>
              </div>
            );
          }}
        </Show>

        <Button
          text="Learn Solid"
          url="https://github.com/solidjs/solid"
          target="_blank"
        />
      </header>
    </div>
  );
};

export default App;
