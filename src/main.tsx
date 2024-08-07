import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import resources from "./localizations/resources";
import "./index.css";

// initialize i18next with catalog and language to use
i18n.init({
  resources,
  lng: "en",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
