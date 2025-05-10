import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import Contexts from "./Context/Contexts.tsx";
import { Toaster } from "react-hot-toast";
import { lazy } from "react";
import { GoogleAuthProvider } from "./components/buttons/GoogleSignIn.tsx";
import { Suspense } from "react";

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GoogleAuthProvider>
      <Provider store={store}>
        <Contexts>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Suspense>
          <Toaster
            toastOptions={{
              position: "top-right",
              className: "noOutline",
            }}
          />
        </Contexts>
      </Provider>
    </GoogleAuthProvider>
  </BrowserRouter>
);
