import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { NewsFilterProvider } from "./context/NewsFilterContext";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <FavouritesProvider>
        <NewsFilterProvider>
          <App />
        </NewsFilterProvider>
      </FavouritesProvider>
    </AuthProvider>
  </StrictMode>
);
