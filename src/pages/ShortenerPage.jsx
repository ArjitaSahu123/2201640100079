// src/pages/ShortenerPage.jsx
import React, { useEffect, useState } from "react";
import ShortenForm from "../components/ShortenForm";
import UrlList from "../components/UrlList";
import * as urlService from "../services/urlService";
import { Log } from "../logging";

export default function ShortenerPage() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=> setLinks(urlService.getAllShortLinks()), []);

  async function handleCreate({ url, shortcode, validity }) {
    setError(null);
    try {
      // client-side URL validation
      try { new URL(url); } catch { throw new Error("Invalid URL format"); }
      const link = urlService.createShortLink({ originalUrl: url, customCode: shortcode, validityMinutes: validity || 30 });
      setLinks(urlService.getAllShortLinks());
      await Log("frontend", "info", "api", `created shortcode ${link.shortcode} for ${url}`);
    } catch (err) {
      setError(err.message);
      await Log("frontend", "error", "api", `create failed: ${err.message} for ${url}`);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>URL Shortener</h1>
      <ShortenForm onCreate={handleCreate} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h3>Created Links</h3>
      <UrlList links={links} />
    </div>
  );
}
