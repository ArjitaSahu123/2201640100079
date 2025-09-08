// src/components/UrlList.jsx
import React from "react";

export default function UrlList({ links = [] }) {
  if (!links.length) return <div>No short links created yet.</div>;
  return (
    <div>
      {links.map((l) => (
        <div key={l.id} style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
          <div><strong>Short:</strong> <a href={`/${l.shortcode}`}>{window.location.origin}/{l.shortcode}</a></div>
          <div><strong>Original:</strong> <a href={l.originalUrl} target="_blank" rel="noreferrer">{l.originalUrl}</a></div>
          <div>Expires: {new Date(l.expiresAt).toLocaleString()}</div>
          <div>Clicks: {l.clickCount || 0}</div>
        </div>
      ))}
    </div>
  );
}
