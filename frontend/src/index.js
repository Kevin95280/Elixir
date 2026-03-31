import ReactDOM from "react-dom/client";
import App from "./components/App/index.jsx";
import "./assets/css/styleV2.css";
import "./assets/videos/presentation.mp4";
import "./i18n";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LanguageProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </LanguageProvider>
);

