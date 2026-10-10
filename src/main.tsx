
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App.tsx";
import i18n from "./i18n";
import "./styles/index.css";

const container = document.getElementById("root")!;

// Les pages pré-rendues arrivent avec leur HTML : on charge d'abord la langue de l'URL
// pour que le premier rendu React corresponde exactement à ce HTML, puis on l'hydrate.
const urlLang = window.location.pathname.split("/")[1];

if (container.hasChildNodes()) {
  const ready = ["fr", "en", "de"].includes(urlLang) ? i18n.changeLanguage(urlLang) : Promise.resolve();
  ready.finally(() => hydrateRoot(container, <App />));
} else {
  createRoot(container).render(<App />);
}
