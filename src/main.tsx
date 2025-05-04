import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/index.ts"
import Contexts from "./Context/Contexts.tsx"
import { Toaster } from "react-hot-toast"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Contexts>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        <Toaster
          toastOptions={{
            position: "top-right",
            className: "noOutline",
          }}
        />
      </Contexts>
    </Provider>
  </BrowserRouter>
)
