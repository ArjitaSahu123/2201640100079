// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Log } from "./logging";

// Attempt a startup log (will silently fail if no token)
(async function init() {
  try {
    await Log("frontend", "info", "config", "App started");
  } catch {
    // do nothing
  }
})();

createRoot(document.getElementById("root")).render(<App />);
