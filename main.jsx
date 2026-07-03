import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "app/App.jsx";
import { AuthProvider } from "app/providers/AuthProvider.jsx";
import { ThemeProvider } from "context/ThemeContext.jsx";
import "app/styles/index.css";

// Initialize OpenTelemetry tracing before rendering
import "services/telemetry/tracing.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
