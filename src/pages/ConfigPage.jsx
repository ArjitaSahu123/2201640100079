// src/pages/ConfigPage.jsx
import React, { useState, useEffect } from "react";

export default function ConfigPage() {
  const [token, setToken] = useState("");
  useEffect(()=>{
    const t = localStorage.getItem("access_token") || "";
    setToken(t);
  }, []);

  function save() {
    if (!token.trim()) {
      localStorage.removeItem("access_token");
      alert("Token cleared");
      setToken("");
      return;
    }
    localStorage.setItem("access_token", token.trim());
    alert("Token saved to localStorage (not in git)");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Config (Dev only)</h1>
      <p> <strong>access_token</strong>  obtained from the /auth API here. This stores it in localStorage for the app to use when calling the logging endpoint. <em>Not commit this token.</em></p>
      <textarea value={token} onChange={(e)=>setToken(e.target.value)} rows={6} style={{ width: "100%" }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={save}>Save token</button>
        <button onClick={() => { localStorage.removeItem("access_token"); setToken(""); alert("removed"); }} style={{ marginLeft: 8 }}>Clear token</button>
      </div>
    </div>
  );
}
