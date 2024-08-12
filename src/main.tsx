import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import resources from "./localizations/resources";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./index.css";
import { ImagePreviewProvider } from "./providers/PreviewProvider";

// initialize i18next with catalog and language to use
i18n.init({
  resources,
  lng: "en",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ImagePreviewProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ImagePreviewProvider>
  </React.StrictMode>
);
