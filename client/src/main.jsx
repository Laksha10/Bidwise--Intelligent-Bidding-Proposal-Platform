import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ServiceProvider from "./context/ServiceContext";
import { AuthProvider } from "./context/AuthContext"; // 👈 import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>               {/* 👈 Wrap the whole app in AuthProvider */}
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </AuthProvider>
  </React.StrictMode>
);
