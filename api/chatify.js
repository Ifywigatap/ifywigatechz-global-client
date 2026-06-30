// Serverless API route to proxy chat requests to Groq AI on the server-side
// - Read `GROQ_API_KEY` from server env (do NOT expose VITE_ prefixed key)
// - Accepts POST { message: string }
// - Returns JSON { reply: string }

import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server misconfiguration: GROQ_API_KEY not set" });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'message' in request body" });
  }

  let client;
  try {
    client = new Groq({ apiKey, dangerouslyAllowBrowser: false });
  } catch (err) {
    console.error("Groq init error:", err);
    return res.status(500).json({ error: "Failed to initialize Groq client" });
  }

  try {
    const systemPrompt = `You are ChatIFY, an AI support assistant for IFYWIGATechz - a technology company offering website development, UI/UX, mobile apps, digital marketing, AI integration, and maintenance. Keep responses concise and professional.`;

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      model: "mixtral-8x7b-32768",
      max_tokens: 512,
      temperature: 0.7,
    });

    const aiResponse = response?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ reply: aiResponse });
  } catch (error) {
    console.error("Groq API Error:", error);
    const status = error?.status || 500;
    if (status === 401) return res.status(401).json({ error: "Invalid API key" });
    if (status === 429) return res.status(429).json({ error: "Rate limit" });
    return res.status(500).json({ error: "AI service error" });
  }
}
