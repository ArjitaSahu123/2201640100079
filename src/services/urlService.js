// src/services/urlService.js
import { v4 as uuidv4 } from "uuid";

const KEY = "shortlinks_v1";

function readAll() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) || []; } catch { return []; }
}
function writeAll(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

function genShortcode(len = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}
function validShortcodeFormat(code) {
  return /^[a-zA-Z0-9]{4,12}$/.test(code);
}

export function createShortLink({ originalUrl, customCode = null, validityMinutes = 30 }) {
  if (!originalUrl) throw new Error("originalUrl required");
  const all = readAll();
  const now = Date.now();
  const createdAt = now;
  const expiresAt = now + (Number.isFinite(+validityMinutes) ? (+validityMinutes * 60000) : (30 * 60000));

  let shortcode = customCode ? String(customCode).trim() : null;
  if (shortcode) {
    if (!validShortcodeFormat(shortcode)) throw new Error("Invalid shortcode format (alphanumeric 4-12)");
    if (all.find((l) => l.shortcode.toLowerCase() === shortcode.toLowerCase())) {
      throw new Error("Shortcode already in use");
    }
  } else {
    let attempt = 0;
    while (attempt < 20) {
      const candidate = genShortcode(6);
      if (!all.find((l) => l.shortcode === candidate)) {
        shortcode = candidate;
        break;
      }
      attempt++;
    }
    if (!shortcode) shortcode = genShortcode(8);
  }

  const id = uuidv4();
  const link = { id, originalUrl, shortcode, createdAt, expiresAt, clicks: [], clickCount: 0 };
  all.push(link);
  writeAll(all);
  return link;
}

export function getAllShortLinks() {
  return readAll().sort((a,b)=>b.createdAt - a.createdAt);
}

export function findByShortcode(code) {
  if (!code) return null;
  const all = readAll();
  const match = all.find((l) => l.shortcode.toLowerCase() === String(code).toLowerCase());
  if (!match) return null;
  if (Date.now() > match.expiresAt) return null;
  return match;
}

export function recordClick(shortcode, source = "unknown") {
  const all = readAll();
  const idx = all.findIndex((l) => l.shortcode.toLowerCase() === String(shortcode).toLowerCase());
  if (idx === -1) return null;
  const link = all[idx];
  const click = { ts: Date.now(), source };
  link.clicks.push(click);
  link.clickCount = link.clicks.length;
  all[idx] = link;
  writeAll(all);
  return link;
}
