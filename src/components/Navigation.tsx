import { type Component } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useLanguage } from "../providers/LanguageProvider";
import "../pages/html.css"; // Import the CSS that contains .btn-custom styles

const Navigation: Component = () => {
  const { locale, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  // Use PDF variant when on CV route
  const buttonClass = () => "btn-custom";
  const labelColor = () => "white";
  const containerClass = () =>
    location.pathname === "/cv" ? "pdf-button-container" : "";
  const topSpacing = () => (location.pathname === "/cv" ? "top-12" : "top-4");
  const flexDirection = () =>
    location.pathname === "/cv" ? "flex-col" : "flex-row";
  const showCVButton = () => location.pathname !== "/cv";
  const showHomeButton = () => location.pathname !== "/";

  return (
    <div class={`fixed ${topSpacing()} right-4 z-50 ${containerClass()}`}>
      <div class={`flex ${flexDirection()} gap-2`}>
        {showHomeButton() && (
          <a href="/" class={buttonClass()}>
            <span class="label" style={{ color: labelColor() }}>
              {t("home")}
            </span>
            <span class="label-hover">
              <span class="inner">{t("home")}</span>
            </span>
            <span class="border"></span>
          </a>
        )}
        {showCVButton() && (
          <a href="/cv" class={buttonClass()}>
            <span class="label" style={{ color: labelColor() }}>
              {t("cv")}
            </span>
            <span class="label-hover">
              <span class="inner">{t("cv")}</span>
            </span>
            <span class="border"></span>
          </a>
        )}
        <button onClick={toggleLanguage} class={buttonClass()}>
          <span class="label" style={{ color: labelColor() }}>
            {locale() === "en" ? "ES" : "EN"}
          </span>
          <span class="label-hover">
            <span class="inner">{locale() === "en" ? "ES" : "EN"}</span>
          </span>
          <span class="border"></span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
