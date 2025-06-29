import { Show, type Component } from "solid-js";
import { useLanguage } from "../providers/LanguageProvider";
import HtmlPage from "../pages/html";

const HtmlRoute: Component = () => {
  const { dict, t } = useLanguage();

  return (
    <Show when={dict()} fallback={<div class="flex justify-center items-center min-h-screen"><span class="loading loading-spinner loading-lg"></span></div>}>
      <HtmlPage t={t} />
    </Show>
  );
};

export default HtmlRoute;