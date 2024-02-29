import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styling/_index.scss";
import "./styling/_globalClasses.scss";
import { AuthProvider } from "./helpers/Auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
