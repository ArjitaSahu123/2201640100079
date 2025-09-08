// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import RedirectHandler from "./pages/RedirectHandler";
import ConfigPage from "./pages/ConfigPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 12, borderBottom: "1px solid #eee", marginBottom: 12 }}>
        <Link to="/" style={{ marginRight: 12 }}>Shortener</Link>
        <Link to="/stats" style={{ marginRight: 12 }}>Statistics</Link>
        <Link to="/config">Config</Link>
      </div>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/:code" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}
