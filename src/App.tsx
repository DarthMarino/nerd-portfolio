import { BrowserRouter, Routes, Route } from "react-router-dom";
import HtmlPage from "./pages/html";
import ThreePage from "./pages/threeHtml";
import Button from "./components/Button";
import i18n from "i18next";
import PdfViewer from "./pages/cv";
import "./App.css";
import "./pages/style.css";
import { useEffect } from "react";
import { isPhone } from "./utils/detect_phone";

function App() {
  useEffect(() => {
    if (isPhone()) {
      window.location.href = "path/to/your/html/page.html";
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="absolute">
                <div
                  className="button-list"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "auto",
                  }}
                >
                  <Button text={i18n.t("2d")} url="/html" target="_self" />
                  <Button text="CV" url="/cv" target="_blank" />
                </div>
              </div>
              <ThreePage />
            </>
          }
        />
        <Route
          path="/html"
          element={
            <>
              <div className="absolute">
                <div
                  className="button-list"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "auto",
                  }}
                >
                  <Button text={i18n.t("3d")} url="/" target="_self" />
                  <Button text="CV" url="/cv" target="_self" />
                </div>
              </div>
              <HtmlPage />
            </>
          }
        />
        <Route path="/cv" element={<PdfViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
