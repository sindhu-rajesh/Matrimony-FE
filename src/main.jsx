import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "../src/contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css"; // Tailwind CSS
import QuickRegisterButtons from "./components/QuickRegisterButtons";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter> */}
        <AuthProvider>
          <App />
          <QuickRegisterButtons />
        </AuthProvider>
      {/* </BrowserRouter> */}
    </QueryClientProvider>
  </React.StrictMode>
);
