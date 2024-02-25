import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShopifyProvider } from "context/ShopifyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ShopifyProvider>
      <App />
    </ShopifyProvider>
  </React.StrictMode>
);
