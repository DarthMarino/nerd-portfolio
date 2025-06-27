import { lazy, type Component } from "solid-js";
import { Router, Route } from "@solidjs/router";

import { ImagePreviewProvider } from "./providers/PreviewProvider";
import { LanguageProvider } from "./providers/LanguageProvider";
import Navigation from "./components/Navigation";

const App: Component = () => {
  return (
    <LanguageProvider>
      <ImagePreviewProvider>
        <Router
          root={(props) => (
            <div class="min-h-screen bg-base-100">
              <Navigation />
              {props.children}
            </div>
          )}
        >
          <Route path="/" component={lazy(() => import("./routes/index"))} />
          <Route path="/cv" component={lazy(() => import("./routes/cv"))} />
        </Router>
      </ImagePreviewProvider>
    </LanguageProvider>
  );
};

export default App;
