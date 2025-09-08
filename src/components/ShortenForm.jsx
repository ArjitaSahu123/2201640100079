// src/components/ShortenForm.jsx
import React, { useState } from "react";

export default function ShortenForm({ onCreate, maxRows = 5 }) {
  const emptyRow = { url: "", shortcode: "", validity: "" };
  const [rows, setRows] = useState([ {...emptyRow} ]);

  function updateRow(i, field, value) {
    const r = rows.slice();
    r[i] = { ...r[i], [field]: value };
    setRows(r);
  }
  function addRow() {
    if (rows.length >= maxRows) return;
    setRows([...rows, {...emptyRow}]);
  }
  function removeRow(i) {
    const r = rows.slice(); r.splice(i,1); setRows(r);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    for (const r of rows) {
      if (!r.url.trim()) continue;
      await onCreate({ url: r.url.trim(), shortcode: r.shortcode.trim() || null, validity: r.validity ? Number(r.validity) : 30 });
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      {rows.map((r, idx) => (
        <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={r.url} onChange={(e)=>updateRow(idx,"url",e.target.value)} placeholder="Enter long URL" style={{ flex: 1 }} />
          <input value={r.shortcode} onChange={(e)=>updateRow(idx,"shortcode",e.target.value)} placeholder="optional shortcode (4-12 alnum)" style={{ width: 200 }} />
          <input value={r.validity} onChange={(e)=>updateRow(idx,"validity",e.target.value)} placeholder="validity (minutes) default 30" style={{ width: 160 }} />
          {idx > 0 && <button type="button" onClick={()=>removeRow(idx)}>Remove</button>}
        </div>
      ))}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">Shorten</button>
        <button type="button" onClick={addRow} disabled={rows.length >= maxRows}>Add row</button>
      </div>
    </form>
  );
}
