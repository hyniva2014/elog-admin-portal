import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "notistack";
import { AuthProvider, LayoutProvider } from "./states";
import { Provider } from "react-redux";
import App from "@src/App";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "@src/assets/css/app.css";
import { persistor, store } from "./store/reduxSlice";

const handleGlobalError = (event) => {
  const error = event.error || event.reason || {};
  const message = error.message || event.message || "";

  if (/module|chunk|fetch|dynamically|imported|loading|failed/i.test(message)) {
    console.warn("Chunk loading error detected globally. Refreshing page...");

    const now = Date.now();
    const lastReload = sessionStorage.getItem("last_chunk_reload");

    if (!lastReload || now - parseInt(lastReload) > 10000) {
      sessionStorage.setItem("last_chunk_reload", now.toString());
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.error("Global chunk error persists. Stopping automatic refresh.");
    }
  }
};

window.addEventListener("error", handleGlobalError);
window.addEventListener("unhandledrejection", handleGlobalError);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <LayoutProvider>
              <SnackbarProvider>
                <PersistGate loading={null} persistor={persistor}>
                  <App />
                </PersistGate>
              </SnackbarProvider>
            </LayoutProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  </Provider>,
);
