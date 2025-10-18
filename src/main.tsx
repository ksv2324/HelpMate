
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { CapacitorUtils } from "./utils";

  // Initialize Capacitor plugins
  CapacitorUtils.initialize();

  createRoot(document.getElementById("root")!).render(<App />);
  