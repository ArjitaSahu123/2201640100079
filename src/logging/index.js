// src/logging/index.js
const LOG_API = "http://20.244.56.144/evaluation-service/logs";

/**
 * Log to evaluation server.
 * Reads the access token from localStorage key 'access_token'.
 * Returns the parsed JSON response or { ok: false, error } on failure.
 */
export async function Log(stack, level, pkg, message) {
  try {
    const token = localStorage.getItem("access_token");
    // if no token stored, we still return (do not throw)
    if (!token) return { ok: false, error: "no_token" };

    const payload = {
      stack: String(stack).toLowerCase(),
      level: String(level).toLowerCase(),
      package: String(pkg).toLowerCase(),
      message: String(message),
    };

    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { ok: false, status: res.status, error: txt || "non-200" };
    }

    const json = await res.json().catch(() => null);
    return { ok: true, body: json };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
