// src/pages/RedirectHandler.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as urlService from "../services/urlService";
import { Log } from "../logging";

export default function RedirectHandler() {
  const { code } = useParams();
  const [status, setStatus] = useState("checking");

  useEffect(()=>{
    (async ()=>{
      const link = urlService.findByShortcode(code);
      if (!link) {
        setStatus("notfound");
        await Log("frontend", "error", "api", `redirect failed: shortcode ${code} not found or expired`);
        return;
      }
      urlService.recordClick(code, "direct");
      await Log("frontend", "info", "api", `redirected shortcode ${code}`);
      window.location.replace(link.originalUrl);
    })();
  }, [code]);

  if (status === "notfound") return <div style={{ padding: 20 }}><h2>Link not found or expired</h2></div>;
  return <div style={{ padding: 20 }}><h2>Redirecting...</h2></div>;
}
