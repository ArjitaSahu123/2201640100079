// src/logging/logger.js
export async function Log(stack, level, pkg, message, token) {
  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    if (!response.ok) {
      console.error("Failed to log:", await response.text());
    } else {
      console.log("Log sent successfully:", await response.json());
    }
  } catch (error) {
    console.error("Log API error:", error);
  }
}
