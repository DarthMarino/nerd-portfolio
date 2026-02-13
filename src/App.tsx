import { lazy, type Component, Show } from "solid-js";
import { Router, Route, useLocation } from "@solidjs/router";

import { ImagePreviewProvider } from "./providers/PreviewProvider";
import { LanguageProvider } from "./providers/LanguageProvider";
import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";

const App: Component = () => {
  return (
    <LanguageProvider>
      <ImagePreviewProvider>
        <Router
          root={(props) => {
            return (
              <div class="min-h-screen bg-base-100">
                <Sidebar />
                <Navigation />
                <div class="main-content-with-sidebar">
                  {props.children}
                </div>
              </div>
            );
          }}
        >
          <Route path="/" component={lazy(() => import("./routes/home"))} />
          <Route path="/about" component={lazy(() => import("./routes/about"))} />
          <Route path="/projects" component={lazy(() => import("./routes/projects"))} />
          <Route path="/experience" component={lazy(() => import("./routes/experience"))} />
          <Route path="/skills" component={lazy(() => import("./routes/skills"))} />
          <Route path="/contact" component={lazy(() => import("./routes/html"))} />
          <Route path="/cv" component={lazy(() => import("./routes/cv"))} />
          <Route path="/cv-rd" component={lazy(() => import("./routes/cv-rd"))} />
          <Route path="/cv-img" component={lazy(() => import("./routes/cv-img"))} />
          <Route path="/cv-rd-img" component={lazy(() => import("./routes/cv-rd-img"))} />
          <Route path="/project/:slug" component={lazy(() => import("./routes/project"))} />
        </Router>
      </ImagePreviewProvider>
    </LanguageProvider>
  );
};

export default App;
