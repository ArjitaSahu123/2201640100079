// src/pages/StatsPage.jsx
import React, { useEffect, useState } from "react";
import * as urlService from "../services/urlService";

export default function StatsPage() {
  const [links, setLinks] = useState([]);

  useEffect(()=> setLinks(urlService.getAllShortLinks()), []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Shortener Statistics</h1>
      {links.length === 0 && <div>No short links yet</div>}
      {links.map((l) => (
        <div key={l.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 8 }}>
          <div><strong>{window.location.origin}/{l.shortcode}</strong></div>
          <div>Original: {l.originalUrl}</div>
          <div>Created: {new Date(l.createdAt).toLocaleString()}</div>
          <div>Expires: {new Date(l.expiresAt).toLocaleString()}</div>
          <div>Total clicks: {l.clickCount}</div>
          <details>
            <summary>Click details ({l.clicks.length})</summary>
            <ul>
              {l.clicks.slice().reverse().map((c, i) => (
                <li key={i}>{new Date(c.ts).toLocaleString()} — source: {c.source}</li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}
