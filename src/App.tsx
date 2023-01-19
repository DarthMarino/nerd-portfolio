import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./pages/style.css";
import HtmlPage from "./pages/html";
import ThreePage from "./pages/threeHtml";
import Button from "./components/Button";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="absolute">
                <Button text="2D Page" url="/html" target="_self" />
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
                <Button text="3D Page" url="/" target="_self" />
              </div>
              <HtmlPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
