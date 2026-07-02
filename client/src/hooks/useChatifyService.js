// src/hooks/useChatIFY.js

import { useState } from "react";
import { sendMessage } from "../services/chatifyService";

export const useChatIFY = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);

  const send = async (text) => {
    if (!text.trim()) return;

    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const res = await sendMessage(text);

    setMessages((prev) => [
      ...prev,
      { from: "bot", text: res.reply || "..." },
    ]);

    setLoading(false);
  };

  return { messages, send, loading };
};